import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const user = searchParams.get("user") || "7DcNB";
        const limit = parseInt(searchParams.get("limit") || "6", 10);

        // Resolve boxd.it shortlink to actual username
        let username = user;
        if (!user.includes('/')) {
            // Se è un codice come 7DcNB, dobbiamo risolvere l'URL
            try {
                const shortUrlRes = await fetch(`https://boxd.it/${user}`, { redirect: 'manual' });
                const location = shortUrlRes.headers.get('location');
                if (location) {
                    const match = location.match(/letterboxd\.com\/([^\/]+)/);
                    if (match) username = match[1];
                }
            } catch (e) {
                // Fallback: try direct RSS
                console.error("Error resolving shortlink:", e);
            }
        }

        const rssUrl = `https://letterboxd.com/${username}/rss/`;
        const res = await fetch(rssUrl, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
            cache: 'no-store'
        });

        if (!res.ok) {
            return NextResponse.json({ items: [], error: 'Failed to fetch RSS' }, { status: 500 });
        }

        const text = await res.text();

        // Parse RSS items
        const items = Array.from(text.matchAll(/<item>([\s\S]*?)<\/item>/g))
            .slice(0, limit)
            .map((m) => {
                const itemXml = m[1];
                const titleMatch = itemXml.match(/<letterboxd:filmTitle>(.*?)<\/letterboxd:filmTitle>/) ||
                                   itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) ||
                                   itemXml.match(/<title>(.*?)<\/title>/);
                const linkMatch = itemXml.match(/<link>(.*?)<\/link>/);
                const pubDateMatch = itemXml.match(/<letterboxd:watchedDate>(.*?)<\/letterboxd:watchedDate>/) ||
                                     itemXml.match(/<pubDate>(.*?)<\/pubDate>/);
                const descMatch = itemXml.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) ||
                                  itemXml.match(/<description>(.*?)<\/description>/);
                const ratingMatch = itemXml.match(/<letterboxd:memberRating>(.*?)<\/letterboxd:memberRating>/);

                // Extract image from description
                const imgMatch = descMatch && descMatch[1].match(/<img.*?src="(.*?)"/);

                return {
                    title: titleMatch ? titleMatch[1] : 'Unknown',
                    link: linkMatch ? linkMatch[1] : null,
                    date: pubDateMatch ? pubDateMatch[1] : null,
                    image: imgMatch ? imgMatch[1] : null,
                    rating: ratingMatch ? parseFloat(ratingMatch[1]) : null,
                };
            })
            .filter(item => item.title && item.link);

        return NextResponse.json({ items, username }, { status: 200 });
    } catch (e) {
        console.error("Letterboxd API error:", e);
        return NextResponse.json({ items: [], error: e.message || "error" }, { status: 500 });
    }
}
