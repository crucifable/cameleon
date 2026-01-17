import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const downloadUrl = searchParams.get("url");
    const title = searchParams.get("title") || "video";

    if (!downloadUrl) {
        return new Response("URL is required", { status: 400 });
    }

    try {
        // Use high-level ytdl stream
        // For direct links from ytdl.getInfo, we can Fetch them and Pipe them
        // But since we are passing the direct googlvideo URL, we use a different approach

        const response = await fetch(downloadUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
                "Referer": "https://www.youtube.com/",
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch stream: ${response.statusText}`);
        }

        const headers = new Headers();
        // Force download by setting attachment
        headers.set("Content-Disposition", `attachment; filename="${encodeURIComponent(title)}.mp4"`);
        headers.set("Content-Type", response.headers.get("Content-Type") || "video/mp4");

        // If content-length is present, pass it along
        const contentLength = response.headers.get("Content-Length");
        if (contentLength) {
            headers.set("Content-Length", contentLength);
        }

        // Return the stream directly from the fetch response
        return new Response(response.body, {
            headers,
        });
    } catch (error) {
        console.error("Streaming Proxy Error:", error);
        return new Response("The Spunix Proxy could not bridge the stream. The link might have expired.", { status: 500 });
    }
}
