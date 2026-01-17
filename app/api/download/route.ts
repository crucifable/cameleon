import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { url } = body;

        if (!url) {
            return NextResponse.json({ status: "error", text: "URL is required" }, { status: 400 });
        }

        // Using a public Cobalt API instance (Edge compatible)
        // We use a robust fetch instead of ytdl-core which is not Edge compatible
        const cobaltResponse = await fetch("https://api.cobalt.tools/api/json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                url: url,
                videoQuality: "720",
                filenameStyle: "pretty",
            }),
        });

        if (!cobaltResponse.ok) {
            const errorText = await cobaltResponse.text();
            throw new Error(`External API error: ${errorText}`);
        }

        const data = await cobaltResponse.json();

        if (data.status === "error") {
            return NextResponse.json({
                status: "error",
                text: data.text || "Failed to process video. The link might be protected or invalid."
            }, { status: 400 });
        }

        // Transform Cobalt response to match our UI expectations
        // Cobalt returns status: "redirect", "stream", "picker", etc.
        return NextResponse.json({
            status: "stream",
            title: "Downloaded Video",
            thumbnail: "/spunix.png", // Generic thumbnail for now
            author: "Cameleon Downloader",
            platform: url.includes("youtube") ? "YouTube" : "Video",
            formats: [
                {
                    quality: "High Quality",
                    size: "Dynamic",
                    ext: "mp4",
                    // Use our proxy if needed, or direct link
                    url: data.url
                }
            ]
        });

    } catch (error: any) {
        console.error("Video Downloader Error:", error);
        return NextResponse.json(
            { status: "error", text: "Download service is currently updating. Please try again in a moment." },
            { status: 500 }
        );
    }
}
