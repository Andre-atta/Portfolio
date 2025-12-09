import { NextResponse } from "next/server";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

async function getAccessToken() {
    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
        throw new Error("Spotify credentials not configured");
    }

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64")}`,
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: SPOTIFY_REFRESH_TOKEN,
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to get access token: ${error}`);
    }

    const data = await response.json();
    return data.access_token;
}

async function getCurrentlyPlaying(accessToken) {
    try {
        const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.status === 204 || !response.ok) {
            return null;
        }

        const data = await response.json();
        if (!data.item) return null;

        return {
            name: data.item.name,
            artists: data.item.artists.map((artist) => artist.name),
            album: data.item.album.name,
            albumImage: data.item.album.images[0]?.url || null,
            trackUrl: data.item.external_urls.spotify,
            isPlaying: data.is_playing,
            progress: data.progress_ms || 0,
            duration: data.item.duration_ms,
        };
    } catch {
        return null;
    }
}

async function getTopArtists(accessToken, timeRange = "medium_term", limit = 5) {
    try {
        const response = await fetch(
            `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=${limit}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (!response.ok) {
            return [];
        }

        const data = await response.json();
        return data.items.map((artist) => ({
            name: artist.name,
            url: artist.external_urls.spotify,
            image: artist.images[0]?.url || null,
        }));
    } catch {
        return [];
    }
}

async function getTopGenres(accessToken, timeRange = "medium_term", limit = 20, topTracksData = null) {
    try {
        let data = topTracksData;
        if (!data) {
            const response = await fetch(
                `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${limit}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (!response.ok) {
                return [];
            }

            data = await response.json();
        }

        if (!data.items || data.items.length === 0) {
            return [];
        }

        const artistIds = new Set();
        data.items.forEach((track) => {
            track.artists.forEach((artist) => artistIds.add(artist.id));
        });

        const artistIdArray = Array.from(artistIds);
        const genreCount = {};
        const batchSize = 50;
        for (let i = 0; i < artistIdArray.length; i += batchSize) {
            const batch = artistIdArray.slice(i, i + batchSize);
            const idsParam = batch.join(",");

            try {
                const artistsResponse = await fetch(
                    `https://api.spotify.com/v1/artists?ids=${idsParam}`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                if (artistsResponse.ok) {
                    const artistsData = await artistsResponse.json();
                    artistsData.artists.forEach((artist) => {
                        if (artist && artist.genres) {
                            artist.genres.forEach((genre) => {
                                genreCount[genre] = (genreCount[genre] || 0) + 1;
                            });
                        }
                    });
                }
            } catch {}
        }

        return Object.entries(genreCount)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([genre]) => genre);
    } catch {
        return [];
    }
}

async function getListeningTime(accessToken, topTracksData = null) {
    try {
        let data = topTracksData?.items ? topTracksData : null;
        if (!data) {
            const response = await fetch(
                "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=50",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            if (!response.ok) {
                return null;
            }

            data = await response.json();
        }

        if (!data.items || data.items.length === 0) {
            return null;
        }

        const totalMs = data.items.reduce((sum, track) => sum + (track.duration_ms || 0), 0) * 10;
        return totalMs;
    } catch {
        return null;
    }
}

export async function GET(request) {
    try {
        if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
            return NextResponse.json(
                {
                    error: "Spotify API not configured",
                    message: "Please set SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, and SPOTIFY_REFRESH_TOKEN in your environment variables",
                },
                { status: 503 }
            );
        }

        const { searchParams } = new URL(request.url);
        const onlyNowPlaying = searchParams.get("onlyNowPlaying") === "true";
        const accessToken = await getAccessToken();

        if (onlyNowPlaying) {
            const currentlyPlaying = await getCurrentlyPlaying(accessToken);
            return NextResponse.json(
                {
                    currentlyPlaying,
                    stats: null,
                },
                {
                    headers: {
                        "Cache-Control": "public, s-maxage=10, stale-while-revalidate=30",
                    },
                }
            );
        }

        const [currentlyPlaying, topArtists, topTracksResponse] = await Promise.all([
            getCurrentlyPlaying(accessToken),
            getTopArtists(accessToken),
            fetch("https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=20", {
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        ]);

        const topTracksData = topTracksResponse.ok ? await topTracksResponse.json() : null;
        const [topGenres, listeningTime] = await Promise.all([
            getTopGenres(accessToken, "medium_term", 20, topTracksData),
            getListeningTime(accessToken, topTracksData),
        ]);

        return NextResponse.json(
            {
                currentlyPlaying,
                stats: {
                    topArtists,
                    topGenres,
                    totalListeningTime: listeningTime,
                },
            },
            {
                headers: {
                    "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
                },
            }
        );
    } catch (error) {
        return NextResponse.json(
            {
                error: "Failed to fetch Spotify data",
                message: error.message,
            },
            { status: 500 }
        );
    }
}

