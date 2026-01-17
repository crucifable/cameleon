import { NextResponse } from "next/server";
import ytdl from "@distube/ytdl-core";

export const runtime = "edge";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { url } = body;

        if (!url) {
            return NextResponse.json({ status: "error", text: "URL is required" }, { status: 400 });
        }

        // Logic for YouTube links (Native Engine)
        if (url.includes("youtube.com") || url.includes("youtu.be")) {
            try {
                const info = await ytdl.getInfo(url);

                // Filter for formats that have both audio and video (easier for direct download)
                // Filter out formats without a URL or that are just audio unless requested
                interface DownloadFormat {
                    quality: string;
                    size: string;
                    ext: string;
                    url: string;
                    height?: number;
                }

                // Get all formats and deduplicate by quality label
                const uniqueFormatsMap = new Map<string, DownloadFormat>();

                info.formats
                    .filter(f => f.hasVideo && f.container === 'mp4')
                    .forEach(f => {
                        const quality = f.qualityLabel || "HD";
                        const size = f.contentLength ? `${(parseInt(f.contentLength) / (1024 * 1024)).toFixed(1)} MB` : "Dynamic";

                        // If we don't have this quality yet, or this one has audio (is progressive), or is higher bitrate
                        const existing = uniqueFormatsMap.get(quality);
                        if (!existing || (f.hasAudio && !info.formats.find(ef => ef.url === existing.url)?.hasAudio)) {
                            uniqueFormatsMap.set(quality, {
                                quality,
                                size,
                                ext: "mp4",
                                // Proxy the download through our server to bypass IP locks (403 Forbidden)
                                url: `/api/proxy?url=${encodeURIComponent(f.url)}&title=${encodeURIComponent(info.videoDetails.title)}`,
                                height: f.height || 0
                            });
                        }
                    });

                // Convert map to array and sort by height descending
                const formats: DownloadFormat[] = Array.from(uniqueFormatsMap.values())
                    .sort((a, b) => (b.height || 0) - (a.height || 0))
                    .slice(0, 4);

                // Add an audio-only option at the very end
                const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio', filter: 'audioonly' });
                if (audioFormat) {
                    formats.push({
                        quality: "Audio Only",
                        size: audioFormat.contentLength ? `${(parseInt(audioFormat.contentLength) / (1024 * 1024)).toFixed(1)} MB` : "Dynamic",
                        ext: "mp3",
                        // Reuse the same proxy for audio
                        url: `/api/proxy?url=${encodeURIComponent(audioFormat.url)}&title=${encodeURIComponent(info.videoDetails.title)}`
                    });
                }

                return NextResponse.json({
                    status: "stream",
                    title: info.videoDetails.title,
                    thumbnail: info.videoDetails.thumbnails[0].url,
                    author: info.videoDetails.author.name,
                    platform: "YouTube",
                    formats: formats
                });
            } catch (ytError: any) {
                console.error("YouTube Native Error:", ytError);
                return NextResponse.json({
                    status: "error",
                    text: "YouTube's internal security blocked our native request. This usually happens with restricted videos. Check feedback for updates!"
                }, { status: 500 });
            }
        }

        // For non-YouTube platforms, we'll use a simple mock or a very standard scraper if available
        // (Instagram/TikTok natively is extremely complex for a single route)
        return NextResponse.json({
            status: "error",
            text: "Native Spunix support for this platform is under development. YouTube is currently our primary native engine!"
        }, { status: 501 });

    } catch (error: any) {
        console.error("Native Engine Critical Error:", error);
        return NextResponse.json(
            { status: "error", text: "Spunix Native Engine failed to initialize." },
            { status: 500 }
        );
    }
}
