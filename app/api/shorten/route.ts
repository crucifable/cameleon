import { NextResponse } from "next/server";
import { saveShortLink } from "@/lib/short-db";

export const runtime = "edge";
import { crypto } from "next/dist/compiled/@edge-runtime/primitives";

function generateCode(length = 6) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export async function POST(request: Request) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 });
        }

        // Validate URL
        try {
            new URL(url);
        } catch (e) {
            return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
        }

        const code = generateCode();
        await saveShortLink(code, url);

        // We use the custom domain ccameleon.com
        const shortUrl = `https://ccameleon.com/${code}`;

        return NextResponse.json({ shortUrl, code });
    } catch (error) {
        console.error("URL Shorten Error:", error);
        return NextResponse.json({ error: "Failed to create short link" }, { status: 500 });
    }
}
