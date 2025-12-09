import { NextResponse } from "next/server";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

function getRedirectUri(request) {
    const host = request.headers.get('host');
    const protocol = request.headers.get('x-forwarded-proto') || (host?.includes('127.0.0.1') ? 'http' : 'https');
    
    if (host) {
        const normalizedHost = host.replace('localhost', '127.0.0.1');
        return `${protocol}://${normalizedHost}/api/spotify/callback`;
    }
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL;
    if (baseUrl && !baseUrl.includes('127.0.0.1')) {
        return `https://${baseUrl.startsWith('http') ? baseUrl.replace(/^https?:\/\//, '') : baseUrl}/api/spotify/callback`;
    }
    
    return "http://127.0.0.1:3000/api/spotify/callback";
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    // Handle error from Spotify
    if (error) {
        return NextResponse.redirect(
            new URL(`/?error=${encodeURIComponent(error)}`, request.url)
        );
    }

    // Handle missing code
    if (!code) {
        return NextResponse.json(
            { error: "Missing authorization code" },
            { status: 400 }
        );
    }

    if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
        return NextResponse.json(
            { error: "Spotify API not configured" },
            { status: 503 }
        );
    }

    try {
        // Exchange authorization code for access token and refresh token
        const redirectUri = getRedirectUri(request);
        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64")}`,
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                code: code,
                redirect_uri: redirectUri,
            }),
        });

        if (!response.ok) {
            return NextResponse.redirect(
                new URL(`/?error=${encodeURIComponent("Failed to exchange token")}`, request.url)
            );
        }

        const data = await response.json();
        const { refresh_token } = data;

        if (!refresh_token) {
            return NextResponse.redirect(
                new URL(`/?error=${encodeURIComponent("No refresh token received")}`, request.url)
            );
        }

        const baseUrl = new URL(request.url).origin;
        return NextResponse.redirect(
            `${baseUrl}/?spotify_setup=true&refresh_token=${encodeURIComponent(refresh_token)}`
        );
    } catch (error) {
        return NextResponse.redirect(
            new URL(`/?error=${encodeURIComponent(error.message)}`, request.url)
        );
    }
}

