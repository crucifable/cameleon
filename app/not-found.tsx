"use client";

import { useRouter } from "next/navigation";
import { Particles } from "@/components/ui/particles";
import { Header } from "@/components/header-with-search";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Home, Search, Compass, Rocket, Activity, Scissors, Video } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    const router = useRouter();

    const quickLinks = [
        { title: "Home", icon: Home, href: "/" },
        { title: "All Tools", icon: Compass, href: "/tools" },
        { title: "Split PDF", icon: Scissors, href: "/tools/pdf-split" },
        { title: "Video Editor", icon: Video, href: "/tools/video-editor" },
        { title: "Device Inspector", icon: Activity, href: "/tools/device-inspector" },
    ];

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-background">
            <Header />

            {/* Cosmic Background */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.1),transparent_50%)]">
                <Particles quantity={500} className="h-full w-full" color="#ffffff" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 py-20">
                {/* Massive 404 Background Text */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.05, scale: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute font-black text-[25vw] pointer-events-none select-none text-foreground leading-none"
                >
                    404
                </motion.div>

                {/* Content Container */}
                <div className="max-w-3xl w-full text-center space-y-12">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-wider"
                        >
                            <Rocket className="size-4 animate-bounce" />
                            Signal Lost in Space
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-product text-5xl md:text-7xl font-bold tracking-tight text-foreground"
                        >
                            You've Drifted Too Far
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-muted-foreground font-product leading-relaxed max-w-2xl mx-auto"
                        >
                            The coordinates you entered seem to lead to empty space. Let's get you back to the system.
                        </motion.p>
                    </div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap items-center justify-center gap-4"
                    >
                        <Button
                            size="lg"
                            className="rounded-2xl h-14 px-10 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:scale-105"
                            onClick={() => router.push("/")}
                        >
                            <Home className="mr-2 size-5" />
                            To Safety (Home)
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-2xl h-14 px-10 text-lg border-white/10 backdrop-blur-md hover:bg-white/5 transition-all hover:scale-105"
                            onClick={() => router.back()}
                        >
                            Back to Previous
                        </Button>
                    </motion.div>

                    {/* Quick Access Grid */}
                    <div className="pt-20 space-y-6">
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground/50"
                        >
                            Or jump straight to a tool
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="grid grid-cols-2 md:grid-cols-5 gap-4"
                        >
                            {quickLinks.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.href}
                                    className="group p-6 rounded-[2rem] bg-white/5 border border-white/5 backdrop-blur-xl hover:bg-primary/10 hover:border-primary/20 transition-all duration-300 flex flex-col items-center gap-3"
                                >
                                    <link.icon className="size-6 text-muted-foreground group-hover:text-primary transition-colors group-hover:scale-125 duration-300" />
                                    <span className="text-sm font-medium whitespace-nowrap">{link.title}</span>
                                </Link>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 size-96 bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
        </div>
    );
}
