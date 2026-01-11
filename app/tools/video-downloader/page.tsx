"use client";

import { useState } from "react";
import { Header } from "@/components/header-with-search";
import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Download, Link2, Youtube, Instagram, Twitter,
    Facebook, Play, AlertCircle, CheckCircle2, Infinity as InfinityIcon,
    Video, Music, Monitor, Smartphone, Globe
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface VideoResult {
    title: string;
    thumbnail: string;
    duration?: string;
    author?: string;
    platform: string;
    formats: {
        quality: string;
        size: string;
        ext: string;
        url: string;
    }[];
}

export default function VideoDownloader() {
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<VideoResult | null>(null);
    const [error, setError] = useState<React.ReactNode | null>(null);
    const [downloadingId, setDownloadingId] = useState<number | null>(null);

    const handleStartDownload = (url: string, id: number) => {
        if (!url || url === "#") return;
        setDownloadingId(id);

        // Open the download link in a new tab
        window.open(url, '_blank');

        setTimeout(() => {
            setDownloadingId(null);
        }, 3000);
    };

    const handleDownload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setIsLoading(true);
        setError(null);
        setResult(null);

        // Add a slight artificial delay so the premium spinner is actually visible
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        try {
            await delay(800);

            // First, get basic info via OEmbed for the UI (Instant)
            let oEmbedData: any = {};
            if (url.includes("youtube.com") || url.includes("youtu.be")) {
                const oResponse = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`);
                if (oResponse.ok) oEmbedData = await oResponse.json();
            }

            // Now, get actual download links via our local API route (Bypass CORS)
            const response = await fetch("/api/download", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    url: url
                })
            });

            const data = await response.json();

            if (data.status === "error") {
                throw new Error(data.text || "Service is currently unavailable. Please try again later.");
            }

            // If the response already contains full metadata (Native Engine)
            if (data.formats && data.title) {
                setResult({
                    title: data.title,
                    thumbnail: data.thumbnail || oEmbedData.thumbnail_url || "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800",
                    author: data.author || oEmbedData.author_name || "Creator",
                    platform: data.platform || (url.includes("youtube") ? "YouTube" : "Universal"),
                    formats: data.formats
                });
                return;
            }

            // Legacy support for external API responses
            if (data.status === "tunnel" || data.status === "redirect" || data.status === "stream") {
                setResult({
                    title: oEmbedData.title || "Spunix Download",
                    thumbnail: oEmbedData.thumbnail_url || "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800",
                    author: oEmbedData.author_name || "Creator",
                    platform: url.includes("youtube") ? "YouTube" : url.includes("instagram") ? "Instagram" : url.includes("tiktok") ? "TikTok" : "Universal",
                    formats: [
                        { quality: "Primary (Highest)", size: "Verified", ext: "media", url: data.url },
                    ]
                });
            } else if (data.status === "picker") {
                // If the API returns multiple formats (like Instagram carousels or Twitter posts)
                setResult({
                    title: oEmbedData.title || "Spunix Selection",
                    thumbnail: oEmbedData.thumbnail_url || "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800",
                    author: oEmbedData.author_name || "Creator",
                    platform: "Universal",
                    formats: data.picker.map((item: any, index: number) => ({
                        quality: `${item.type || "Item"} #${index + 1}`,
                        size: "Ready",
                        ext: "media",
                        url: item.url
                    }))
                });
            }
        } catch (err) {
            setError(
                <>
                    {err instanceof Error ? err.message : "The Spunix Engine experienced an internal error."}
                    <br />
                    <span className="text-[10px] opacity-70 mt-2 block">
                        If you see this message, please let me know via the{" "}
                        <Link href="/feedback-tool" className="underline font-bold">feedback page</Link>!
                    </span>
                </>
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-background">
            <Header />
            <div className="absolute inset-0 z-0">
                <Particles quantity={300} className="h-full w-full" color="#000000" />
            </div>

            <main className="relative z-10 container mx-auto px-4 pt-32 pb-20 max-w-5xl">
                {/* Hero section */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-6 uppercase tracking-widest">
                        <Download className="size-3" />
                        Spunix Media Engine
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-product mb-6 tracking-tight">
                        Universal <span className="text-primary">Video Downloader</span>
                    </h1>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed italic">
                        The easiest way to save your favorite clips from across the web. No ads, no tracking, just high-quality downloads.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-3xl mx-auto mb-16 animate-fade-in-up delay-100">
                    <form onSubmit={handleDownload} className="relative group">
                        <div className="absolute inset-0 bg-primary/20 blur-[40px] opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        <div className="relative flex items-center p-2 rounded-[2rem] bg-background/50 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden ring-1 ring-white/5 focus-within:ring-primary/40 transition-all">
                            <div className="pl-6 text-muted-foreground">
                                <Link2 className="size-6" />
                            </div>
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="Paste video link here (YouTube, Instagram, TikTok...)"
                                className="w-full bg-transparent border-none focus:outline-none p-4 text-lg font-medium text-foreground placeholder:text-muted-foreground/50"
                            />
                            <Button
                                type="submit"
                                disabled={isLoading || !url}
                                className="rounded-2xl px-8 h-12 text-base font-bold shadow-lg hover:scale-105 transition-all bg-primary hover:bg-primary/90"
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-3">
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                rotate: [0, 180, 360],
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Number.POSITIVE_INFINITY,
                                                ease: "linear"
                                            }}
                                            className="relative flex items-center justify-center size-6"
                                        >
                                            <InfinityIcon className="size-full text-current filter drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                                        </motion.div>
                                        <span className="text-sm animate-pulse">Analyzing...</span>
                                    </div>
                                ) : (
                                    <>
                                        <Play className="mr-2 size-5 fill-current" />
                                        Analyze
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>

                    {/* Quick Badge info */}
                    <div className="flex flex-wrap items-center justify-center gap-6 mt-8 animate-fade-in opacity-50 hover:opacity-100 transition-opacity">
                        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><Youtube className="size-4" /> YouTube</span>
                        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><Instagram className="size-4" /> Instagram</span>
                        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><Twitter className="size-4" /> Twitter / X</span>
                        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest"><Globe className="size-4" /> & More</span>
                    </div>
                </div>

                {/* Content Section */}
                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-xl mx-auto p-6 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-4 text-red-500"
                        >
                            <div className="flex-1 space-y-2">
                                <div className="text-sm font-medium">{error}</div>
                                <p className="text-[10px] opacity-50 italic">
                                    Pro Tip: If YouTube is being stubborn, it&apos;s likely a platform-wide block. Instagram and TikTok links usually work even when YouTube is restricted!
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid md:grid-cols-[1.5fr_1fr] gap-8 bg-background/50 backdrop-blur-2xl p-6 md:p-10 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden"
                        >
                            {/* Result Preview */}
                            <div className="space-y-6">
                                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 bg-black/20 group">
                                    <img
                                        src={result.thumbnail}
                                        alt={result.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                        <div className="flex-1">
                                            <p className="text-white font-bold line-clamp-2 leading-tight">{result.title}</p>
                                            <p className="text-white/60 text-xs mt-1">@{result.author}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        {result.platform === "YouTube" ? <Youtube className="size-6" /> : <Globe className="size-6" />}
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Platform</p>
                                        <p className="text-sm font-bold">{result.platform}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Download Info */}
                            <div className="flex flex-col h-full bg-white/5 p-6 rounded-[2rem] border border-white/5">
                                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                    <Download className="size-5 text-primary" />
                                    Select Format
                                </h3>
                                <div className="space-y-3 flex-1 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                                    {result.formats.map((format, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between p-4 rounded-2xl bg-background/50 border border-white/5 hover:border-primary/40 transition-all group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-lg bg-secondary/30 flex items-center justify-center text-muted-foreground group-hover:text-primary">
                                                    {format.ext === "mp3" ? <Music className="size-4" /> : <Video className="size-4" />}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold">{format.quality}</p>
                                                    <p className="text-[10px] text-muted-foreground uppercase">{format.size} • {format.ext}</p>
                                                </div>
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="rounded-xl hover:bg-primary/20 hover:text-primary relative overflow-hidden"
                                                disabled={downloadingId === i}
                                                onClick={() => handleStartDownload(format.url, i)}
                                            >
                                                {downloadingId === i ? (
                                                    <InfinityIcon className="size-5 animate-infinity text-primary" />
                                                ) : (
                                                    <Download className="size-4" />
                                                )}
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8 pt-6 border-t border-white/5">
                                    <p className="text-[10px] text-muted-foreground text-center italic">
                                        By downloading, you agree to our Terms of Service and only for personal use.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {!result && !isLoading && !error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up delay-300"
                        >
                            <FeatureCard
                                icon={<Monitor className="size-6" />}
                                title="High Resolution"
                                description="Download up to 4K resolution whenever available on the source platform."
                            />
                            <FeatureCard
                                icon={<Smartphone className="size-6" />}
                                title="Format Options"
                                description="Extract audio-only MP3s or choose from various video containers."
                            />
                            <FeatureCard
                                icon={<Globe className="size-6" />}
                                title="Multi Platform"
                                description="Support for YouTube, TikTok, Reddit, Instagram, Pinterest and more."
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Feedback Section */}
                <div className="max-w-3xl mx-auto mt-24 animate-fade-in-up">
                    <div className="text-center space-y-4">
                        <p className="text-xs md:text-sm text-muted-foreground font-medium">
                            Need a new platform supported or experiencing issues?{" "}
                            <Link href="/feedback-tool" className="text-primary hover:underline font-bold transition-all">
                                Give me a feedback!
                            </Link>
                        </p>
                        <p className="text-[10px] md:text-xs text-muted-foreground/30 leading-relaxed italic">
                            Video processing is transient and not stored on Spunix servers. Respect copyright laws.
                        </p>
                    </div>
                </div>
            </main >

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(var(--primary-rgb), 0.2);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(var(--primary-rgb), 0.4);
                }
                @keyframes infinity-glow {
                    0%, 100% { opacity: 0.5; filter: drop-shadow(0 0 2px var(--primary)); }
                    50% { opacity: 1; filter: drop-shadow(0 0 8px var(--primary)); }
                }
                .animate-infinity {
                    animation: infinity-glow 1.5s infinite ease-in-out;
                }
            `}</style>
        </div >
    );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-white/10 transition-all text-center">
            <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6">
                {icon}
            </div>
            <h3 className="font-product font-bold text-lg mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
    );
}
