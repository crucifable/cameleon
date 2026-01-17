"use client";

import React, { useState } from "react";
import { Particles } from "@/components/ui/particles";
import { Header } from "@/components/header-with-search";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    Scissors,
    Link as LinkIcon,
    Copy,
    Check,
    ArrowRight,
    ExternalLink,
    AlertCircle,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UrlShortenerPage() {
    const [longUrl, setLongUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    const handleShorten = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!longUrl) return;

        setLoading(true);
        setError("");
        setShortUrl("");

        try {
            const res = await fetch("/api/shorten", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: longUrl, alias }),
            });

            const data = await res.json();

            if (data.error) {
                setError(data.error);
            } else {
                setShortUrl(data.shortUrl);
                setAlias(""); // Clear alias on success
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
            <Header />
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Particles quantity={300} className="h-full w-full" color="#ffffff" />
            </div>

            <main className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-20">
                <div className="flex flex-col items-center text-center mb-10 md:mb-16 animate-fade-in-up">
                    <div className="p-3 md:p-4 bg-primary/10 rounded-2xl md:rounded-3xl mb-4 md:mb-6">
                        <Scissors className="size-8 md:size-12 text-primary" />
                    </div>
                    <h1 className="font-product text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-white">
                        Branded URL Shortener
                    </h1>
                    <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto font-product px-4">
                        Create professional, shareable links using your own <span className="text-primary font-bold">ccameleon.com</span> domain.
                    </p>
                </div>

                <div className="space-y-8 animate-fade-in-up delay-200">
                    <section className="bg-background/40 backdrop-blur-xl p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <LinkIcon className="size-32 text-primary" />
                        </div>

                        <form onSubmit={handleShorten} className="relative z-10 space-y-6">
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">Paste your long link</label>
                                <Input
                                    placeholder="https://example.com/very/long/url/that/needs/to/be/shortened"
                                    value={longUrl}
                                    onChange={(e) => setLongUrl(e.target.value)}
                                    className="h-14 md:h-16 px-6 bg-white/5 border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:ring-primary/50 text-lg flex-1"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">Custom Alias (Optional)</label>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <div className="relative flex-1 group">
                                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 font-mono text-lg group-focus-within:text-primary transition-colors">
                                            ccameleon.com/
                                        </div>
                                        <Input
                                            placeholder="my-awesome-link"
                                            value={alias}
                                            onChange={(e) => setAlias(e.target.value.replace(/\s+/g, '-'))}
                                            className="h-14 md:h-16 pl-[135px] pr-6 bg-white/5 border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:ring-primary/50 text-lg flex-1 font-mono"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        disabled={loading || !longUrl}
                                        className="h-14 md:h-16 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg shadow-lg shadow-primary/20 transition-all border-none disabled:opacity-50"
                                    >
                                        {loading ? <Loader2 className="size-6 animate-spin" /> : "Shorten"}
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground/60 ml-1">
                                    Login to your <Link href="/account" className="text-primary hover:underline">Account</Link> to manage and track your links.
                                </p>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm"
                                >
                                    <AlertCircle className="size-5 shrink-0" />
                                    {error}
                                </motion.div>
                            )}

                            <AnimatePresence>
                                {shortUrl && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="pt-6 border-t border-white/10 mt-6"
                                    >
                                        <div className="space-y-4">
                                            <label className="text-sm font-bold text-primary uppercase tracking-widest ml-1">Your shortened link</label>
                                            <div className="flex items-center gap-3 bg-primary/5 p-2 rounded-[1.5rem] border border-primary/20 group">
                                                <div className="flex-1 px-4 font-mono text-xl text-white truncate py-2">
                                                    {shortUrl}
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button
                                                        type="button"
                                                        onClick={copyToClipboard}
                                                        className={`h-12 w-12 sm:w-auto sm:px-6 rounded-[1.2rem] transition-all font-bold ${copied ? 'bg-green-500 hover:bg-green-600' : 'bg-white/10 hover:bg-white/20'}`}
                                                    >
                                                        {copied ? <Check className="size-5" /> : (
                                                            <>
                                                                <Copy className="size-5 sm:mr-2" />
                                                                <span className="hidden sm:inline">Copy</span>
                                                            </>
                                                        )}
                                                    </Button>
                                                    <Link
                                                        href={shortUrl}
                                                        target="_blank"
                                                        className="h-12 w-12 flex items-center justify-center rounded-[1.2rem] bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-bold shadow-lg shadow-primary/20"
                                                    >
                                                        <ExternalLink className="size-5" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </section>

                    <div className="grid md:grid-cols-3 gap-6">
                        <FeatureCard
                            icon={Check}
                            title="Safe & Secure"
                            description="All links are processed through verified shortening engines."
                        />
                        <FeatureCard
                            icon={ArrowRight}
                            title="Instant Redirect"
                            description="No delay or intermediate pages. Direct access to your content."
                        />
                        <FeatureCard
                            icon={ExternalLink}
                            title="Share Anywhere"
                            description="Perfect for social media, emails, or printed materials."
                        />
                    </div>
                </div>

                <div className="max-w-3xl mx-auto mt-16 animate-fade-in-up">
                    <div className="text-center space-y-4">
                        <p className="text-xs md:text-sm text-muted-foreground font-medium">
                            Need custom aliases or analytics?{" "}
                            <Link href="/feedback-tool" className="text-primary hover:underline font-bold transition-all">
                                Tell us more!
                            </Link>
                        </p>
                        <p className="text-[10px] md:text-xs text-muted-foreground/30 leading-relaxed italic">
                            Powered by TinyURL. Spunix Cameleon does not track or store your shortened link history.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
    return (
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all group">
            <div className="p-3 bg-primary/10 rounded-2xl w-fit mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                <Icon className="size-6 text-primary group-hover:text-inherit" />
            </div>
            <h3 className="font-bold text-white mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
    );
}
