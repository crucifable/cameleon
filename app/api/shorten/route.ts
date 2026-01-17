import { NextResponse } from "next/server";
import { saveShortLink, isAliasAvailable } from "@/lib/short-db";
import { auth } from "@/auth";

export const runtime = "edge";

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
        const session = await auth();
        const { url, alias } = await request.json();

        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 });
        }

        // Validate URL
        try {
            new URL(url);
        } catch (e) {
            return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
        }

        let code = alias;

        if (code) {
            // Validate alias format (alphanumeric only)
            if (!/^[a-zA-Z0-9_-]+$/.test(code)) {
                return NextResponse.json({ error: "Alias can only contain letters, numbers, underscores and hyphens" }, { status: 400 });
            }
            if (code.length < 3) {
                return NextResponse.json({ error: "Alias must be at least 3 characters" }, { status: 400 });
            }
            if (!(await isAliasAvailable(code))) {
                return NextResponse.json({ error: "This alias is already taken" }, { status: 400 });
            }
        } else {
            code = generateCode();
        }

        const discordId = (session?.user as any)?.discordId;
        await saveShortLink(code, url, discordId);

        // We use the custom domain ccameleon.com
        const shortUrl = `https://ccameleon.com/${code}`;

        return NextResponse.json({ shortUrl, code });
    } catch (error) {
        console.error("URL Shorten Error:", error);
        return NextResponse.json({ error: "Failed to create short link" }, { status: 500 });
    }
}
