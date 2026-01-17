"use client";

import React, { useState } from "react";
import { Particles } from "@/components/ui/particles";
import { Header } from "@/components/header-with-search";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    User,
    Shield,
    BadgeCheck,
    Calendar,
    Hash,
    ExternalLink,
    AlertCircle,
    Loader2,
    Copy,
    Check,
    Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface DiscordUser {
    id: string;
    username: string;
    global_name: string | null;
    avatar: string | null;
    banner: string | null;
    accent_color: number | null;
    banner_color: string | null;
    public_flags: number;
    discriminator: string;
    avatar_decoration_data?: any;
}

export default function DiscordLookupPage() {
    const [userId, setUserId] = useState("");
    const [userData, setUserData] = useState<DiscordUser | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);

    const handleLookup = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!userId.trim()) return;

        setLoading(true);
        setError("");
        setUserData(null);

        try {
            const res = await fetch(`/api/discord/user/${userId.trim()}`);
            const data = await res.json();

            if (data.error) {
                setError(data.error);
            } else {
                setUserData(data);
            }
        } catch (err) {
            setError("Failed to connect to Discord API. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const getAvatarUrl = (user: DiscordUser) => {
        if (!user.avatar) return `https://cdn.discordapp.com/embed/avatars/${parseInt(user.id) % 5}.png`;
        return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`;
    };

    const getBannerUrl = (user: DiscordUser) => {
        if (!user.banner) return null;
        return `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.png?size=1024`;
    };

    const copyId = () => {
        if (!userData) return;
        navigator.clipboard.writeText(userData.id);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
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
                        <Search className="size-8 md:size-12 text-primary" />
                    </div>
                    <h1 className="font-product text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-white">
                        Discord User Lookup
                    </h1>
                    <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto font-product px-4">
                        Search for any Discord user by their ID to view their full profile information.
                    </p>
                </div>

                <div className="space-y-8 animate-fade-in-up delay-200">
                    <section className="bg-background/40 backdrop-blur-xl p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
                        <form onSubmit={handleLookup} className="relative z-10 space-y-6">
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-muted-foreground uppercase tracking-widest ml-1">Discord User ID</label>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Input
                                        placeholder="Enter User ID (e.g. 1460591325455057054)"
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value.replace(/\D/g, ""))}
                                        className="h-14 md:h-16 px-6 bg-white/5 border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:ring-primary/50 text-lg flex-1 font-mono"
                                    />
                                    <Button
                                        type="submit"
                                        disabled={loading || !userId}
                                        className="h-14 md:h-16 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg shadow-lg shadow-primary/20 transition-all border-none disabled:opacity-50"
                                    >
                                        {loading ? <Loader2 className="size-6 animate-spin" /> : "Lookup"}
                                    </Button>
                                </div>
                            </div>

                            {error && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400 text-sm">
                                    <AlertCircle className="size-5 shrink-0" />
                                    {error}
                                </div>
                            )}
                        </form>
                    </section>

                    <AnimatePresence>
                        {userData && (
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="relative group"
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-[2.5rem] blur opacity-25" />
                                <div className="relative bg-background/60 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
                                    {/* Banner */}
                                    <div
                                        className="h-32 md:h-48 w-full relative bg-primary/10 transition-all duration-500 group-hover:h-40 md:group-hover:h-56"
                                        style={{
                                            backgroundColor: userData.banner_color || '#333',
                                            backgroundImage: getBannerUrl(userData) ? `url(${getBannerUrl(userData)})` : 'none',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    >
                                        {!getBannerUrl(userData) && userData.accent_color && (
                                            <div
                                                className="absolute inset-0 opacity-50"
                                                style={{ backgroundColor: `#${userData.accent_color.toString(16).padStart(6, '0')}` }}
                                            />
                                        )}
                                    </div>

                                    {/* Profile Content */}
                                    <div className="relative px-6 md:px-10 pb-10">
                                        {/* Avatar */}
                                        <div className="relative -mt-16 md:-mt-20 mb-6">
                                            <div className="size-32 md:size-40 rounded-full border-[6px] border-[#111] bg-[#111] overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500">
                                                <img
                                                    src={getAvatarUrl(userData)}
                                                    alt={userData.username}
                                                    className="size-full object-cover"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-10">
                                            <div className="space-y-6">
                                                <div>
                                                    <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                                                        {userData.global_name || userData.username}
                                                        {userData.public_flags > 0 && (
                                                            <BadgeCheck className="size-6 text-primary" />
                                                        )}
                                                    </h2>
                                                    <p className="text-xl text-muted-foreground font-medium">@{userData.username}</p>
                                                </div>

                                                <div className="flex flex-wrap gap-3">
                                                    <button
                                                        onClick={copyId}
                                                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-sm group/btn"
                                                    >
                                                        {copied ? <Check className="size-4 text-green-400" /> : <Hash className="size-4 text-primary" />}
                                                        <span className="font-mono">{userData.id}</span>
                                                        {!copied && <Copy className="size-3 opacity-0 group-hover/btn:opacity-50 transition-opacity" />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="p-5 bg-white/5 border border-white/5 rounded-2xl space-y-4">
                                                    <h3 className="text-xs font-bold uppercase tracking-widest text-primary/80">User Details</h3>
                                                    <div className="space-y-3">
                                                        <DetailItem
                                                            icon={User}
                                                            label="System Name"
                                                            value={userData.username}
                                                        />
                                                        <DetailItem
                                                            icon={Shield}
                                                            label="Badges"
                                                            value={userData.public_flags.toString()}
                                                        />
                                                        <DetailItem
                                                            icon={ImageIcon}
                                                            label="Banner"
                                                            value={userData.banner ? "Custom" : "Inherited"}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex gap-3">
                                                    <Button
                                                        variant="outline"
                                                        className="flex-1 rounded-xl h-12 border-white/10 hover:bg-primary/10 hover:border-primary/50 transition-all"
                                                        asChild
                                                    >
                                                        <a href={getAvatarUrl(userData)} target="_blank" rel="noopener noreferrer">
                                                            View Avatar <ExternalLink className="ml-2 size-4" />
                                                        </a>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.section>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}

function DetailItem({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
                <Icon className="size-4 text-primary/60" />
                {label}
            </span>
            <span className="font-medium text-white">{value}</span>
        </div>
    );
}
