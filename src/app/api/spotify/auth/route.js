import { NextResponse } from "next/server";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;

export async function GET() {
    if (!SPOTIFY_CLIENT_ID) {
        return NextResponse.json(
            { error: "Spotify API not configured" },
            { status: 503 }
        );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL;
    const redirectUri = baseUrl && !baseUrl.includes('127.0.0.1')
        ? `https://${baseUrl.startsWith('http') ? baseUrl.replace(/^https?:\/\//, '') : baseUrl}/api/spotify/callback`
        : "http://127.0.0.1:3000/api/spotify/callback";

    const authUrl = new URL("https://accounts.spotify.com/authorize");
    authUrl.searchParams.set("client_id", SPOTIFY_CLIENT_ID);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("scope", "user-read-currently-playing user-read-recently-played user-top-read");
    authUrl.searchParams.set("show_dialog", "false");

    return NextResponse.redirect(authUrl.toString());
}

