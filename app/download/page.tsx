"use client";

import { Particles } from "@/components/ui/particles";
import { Header } from "@/components/header-with-search";
import { useEffect, useState } from "react";
import { AppleIcon, WindowsIcon, LinuxIcon, AndroidIcon } from "@/components/icons";
import { DownloadIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DownloadPage() {
    const [osName, setOsName] = useState("Windows");

    useEffect(() => {
        const userAgent = window.navigator.userAgent;
        if (userAgent.indexOf("Mac") !== -1) {
            setOsName("macOS");
        } else if (userAgent.indexOf("Linux") !== -1) {
            setOsName("Linux");
        } else if (userAgent.indexOf("Android") !== -1) {
            setOsName("Android");
        } else if (userAgent.indexOf("iPhone") !== -1 || userAgent.indexOf("iPad") !== -1) {
            setOsName("iOS");
        } else {
            setOsName("Windows");
        }
    }, []);

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
            <Header />
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Particles quantity={300} className="h-full w-full" color="#000000" />
            </div>

            <div className="relative z-10 flex flex-col items-center pt-32 pb-20 px-4">
                {/* Hero Section */}
                <div className="flex flex-col items-center mb-16 text-center animate-fade-in-up">
                    <img src="/cameleon.png" alt="Cameleon Logo" className="size-20 mb-8" />
                    <h1 className="font-product text-5xl md:text-6xl font-medium tracking-tight mb-4">
                        Download Cameleon
                    </h1>
                </div>

                {/* Downloads Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl animate-fade-in-up delay-100">

                    {/* MacOS Card */}
                    <DownloadCard
                        icon={<AppleIcon className="size-16" />}
                        title="MacOS"
                        available={true}
                    >
                        <DownloadOption label="Download for Apple Silicon" />
                        <DownloadOption label="Download for Intel" />
                    </DownloadCard>

                    {/* Windows Card */}
                    <DownloadCard
                        icon={<WindowsIcon className="size-16" />}
                        title="Windows"
                        available={true}
                    >
                        <DownloadOption label="Download for x64" />
                        <DownloadOption label="Download for ARM64" />
                    </DownloadCard>

                    {/* Linux Card */}
                    <DownloadCard
                        icon={<LinuxIcon className="size-16" />}
                        title="Linux"
                        available={false}
                    >
                        <DownloadOption label="Download" />
                    </DownloadCard>

                    {/* Android Card */}
                    <DownloadCard
                        icon={<AndroidIcon className="size-16" />}
                        title="Android"
                        available={false}
                    >
                        <DownloadOption label="Download APK" />
                        <DownloadOption label="Get it on Google Play" />
                    </DownloadCard>

                </div>
            </div>
        </div>
    );
}

function DownloadCard({
    icon,
    title,
    children,
    available = true
}: {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
    available?: boolean;
}) {
    return (
        <div className={cn(
            "flex flex-col items-center p-8 rounded-3xl backdrop-blur-md border border-white/10 transition-colors h-full",
            available ? "bg-secondary/30 hover:bg-secondary/40" : "bg-secondary/10 opacity-75"
        )}>
            <div className="mb-6 p-4 bg-background/50 rounded-2xl">
                {icon}
            </div>
            <h2 className="font-product text-2xl font-medium mb-8 w-full text-left">{title}</h2>
            <div className="w-full flex flex-col gap-2 flex-grow">
                {available ? children : (
                    <div className="flex h-full items-center justify-center p-4 text-center rounded-xl bg-muted/20 border border-dashed border-muted-foreground/30">
                        <p className="text-muted-foreground font-product italic">Not available / Under development</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function DownloadOption({ label }: { label: string }) {
    return (
        <button className="flex items-center justify-between w-full p-4 rounded-xl hover:bg-white/5 transition-colors group text-left">
            <span className="text-muted-foreground group-hover:text-foreground transition-colors font-product text-lg">
                {label}
            </span>
            <DownloadIcon className="size-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
    );
}
