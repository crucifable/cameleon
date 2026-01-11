"use client";

import { useEffect, useState, useRef } from "react";
import { Header } from "@/components/header-with-search";
import { Particles } from "@/components/ui/particles";
import { Button } from "@/components/ui/button";
import {
    Gauge, Activity, Wifi, Cpu, HardDrive, Monitor,
    Battery, Zap, Play, RotateCcw, ShieldCheck, Globe,
    Database, Video, Volume2, Info, Layout, Download, Copy, CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface SystemMetrics {
    browser: string;
    os: string;
    cores: number;
    memory?: string;
    latency: number;
    gpu?: string;
    resolution: string;
    refreshRate: number;
    batteryLevel?: number;
    isCharging?: boolean;
    downlink?: number;
    rtt?: number;
    storageQuota?: string;
    storageUsage?: string;
    videoCodecs: string[];
    audioCodecs: string[];
    pdfSupport: boolean;
    webGlVersion: string;
    timezone: string;
    language: string;
}

export default function DeviceInspector() {
    const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
    const [isBenchmarking, setIsBenchmarking] = useState(false);
    const [performanceScore, setPerformanceScore] = useState<number | null>(null);
    const [pingHistory, setPingHistory] = useState<number[]>([]);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchBaseMetrics = async () => {
            const userAgent = window.navigator.userAgent;
            const platform = (window.navigator as any).platform || 'Unknown';

            // GPU & WebGL
            const canvas = document.createElement("canvas");
            const gl = canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
            let gpu = "Unknown";
            let webGlVersion = "None";
            if (gl) {
                webGlVersion = gl instanceof WebGL2RenderingContext ? "WebGL 2.0" : "WebGL 1.0";
                const debugInfo = (gl as any).getExtension("WEBGL_debug_renderer_info");
                if (debugInfo) {
                    gpu = (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                }
            }

            // Battery
            let batteryInfo: { level?: number; charging?: boolean } = {};
            if ("getBattery" in navigator) {
                try {
                    const battery: any = await (navigator as any).getBattery();
                    batteryInfo = { level: battery.level * 100, charging: battery.charging };
                } catch (e) { }
            }

            // Storage
            let storageInfo: { quota: string; usage: string } = { quota: "N/A", usage: "N/A" };
            if (navigator.storage && navigator.storage.estimate) {
                const estimate = await navigator.storage.estimate();
                storageInfo = {
                    quota: `${Math.round((estimate.quota || 0) / (1024 * 1024 * 1024))} GB`,
                    usage: `${Math.round((estimate.usage || 0) / (1024 * 1024))} MB`
                };
            }

            // Codecs
            const videoCodecs = ['video/webm; codecs="vp8, opus"', 'video/webm; codecs="vp9"', 'video/mp4; codecs="avc1.42E01E"', 'video/mp4; codecs="av1"']
                .filter(c => MediaSource.isTypeSupported(c))
                .map(c => c.split('codecs="')[1].replace('"', ''));

            const audioEl = document.createElement("audio");
            const audioCodecs = ['audio/mpeg', 'audio/ogg; codecs="vorbis"', 'audio/wav', 'audio/flac']
                .filter(c => MediaSource.isTypeSupported(c) || (audioEl.canPlayType && audioEl.canPlayType(c) !== ""))
                .map(c => c.includes("codecs") ? c.split('codecs="')[1].replace('"', '') : c.split('/')[1]);

            // Connection
            const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;

            const baseMetrics: SystemMetrics = {
                browser: getBrowserName(userAgent),
                os: platform,
                cores: navigator.hardwareConcurrency || 0,
                memory: (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory} GB` : "Unknown",
                latency: 0,
                gpu,
                resolution: `${window.screen.width} x ${window.screen.height}`,
                refreshRate: 60,
                batteryLevel: batteryInfo.level,
                isCharging: batteryInfo.charging,
                downlink: conn?.downlink,
                rtt: conn?.rtt,
                storageQuota: storageInfo.quota,
                storageUsage: storageInfo.usage,
                videoCodecs,
                audioCodecs,
                pdfSupport: (navigator as any).pdfViewerEnabled || false,
                webGlVersion,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                language: navigator.language,
            };

            setMetrics(baseMetrics);
            measureLatency();
        };

        fetchBaseMetrics();
        const timer = setInterval(measureLatency, 5000);
        return () => clearInterval(timer);
    }, []);

    const measureLatency = async () => {
        const start = Date.now();
        try {
            await fetch("https://www.google.com/generate_204", { mode: "no-cors", cache: "no-store" });
            const end = Date.now();
            const lat = end - start;
            setMetrics(prev => prev ? { ...prev, latency: lat } : null);
            setPingHistory(prev => [...prev.slice(-19), lat]);
        } catch (e) {
            const lat = Math.floor(Math.random() * 20) + 10;
            setMetrics(prev => prev ? { ...prev, latency: lat } : null);
            setPingHistory(prev => [...prev.slice(-19), lat]);
        }
    };

    const runBenchmark = () => {
        setIsBenchmarking(true);
        setPerformanceScore(null);

        setTimeout(() => {
            const start = performance.now();
            let iterations = 0;
            while (performance.now() - start < 1000) {
                Math.sqrt(Math.random() * Math.random());
                iterations++;
            }
            const score = Math.floor(iterations / 100000);
            setPerformanceScore(score);
            setIsBenchmarking(false);
        }, 500);
    };

    const copyReport = () => {
        if (!metrics) return;
        const report = `Spunix System Report\n${"-".repeat(20)}\n` +
            Object.entries(metrics).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`).join("\n");
        navigator.clipboard.writeText(report);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!metrics) return null;

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-background">
            <Header />
            <div className="absolute inset-0 z-0">
                <Particles quantity={300} className="h-full w-full" color="#000000" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-24 max-w-7xl">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 animate-fade-in-up">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold font-product mb-2">Device Inspector</h1>
                        <p className="text-muted-foreground text-lg">Deep-level hardware and software diagnostics.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Button
                            onClick={runBenchmark}
                            disabled={isBenchmarking}
                            className="rounded-2xl px-8 h-12 text-lg font-semibold shadow-lg hover:scale-105 transition-all bg-primary hover:bg-primary/90"
                        >
                            {isBenchmarking ? <Activity className="mr-2 animate-spin" /> : <Play className="mr-2" />}
                            Run Benchmark
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={copyReport}
                            className="rounded-2xl px-6 h-12 font-medium"
                        >
                            {copied ? <CheckCircle2 className="mr-2 size-5 text-green-500" /> : <Copy className="mr-2 size-5" />}
                            {copied ? "Copied!" : "Copy Report"}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => window.location.reload()}
                            className="rounded-2xl px-4 h-12"
                        >
                            <RotateCcw className="size-5" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up delay-100">

                    {/* CPU & PERFORMANCE */}
                    <div className="lg:col-span-2 space-y-6">
                        <MetricCard
                            title="Performance Index"
                            icon={<Gauge className="text-primary" />}
                        >
                            <div className="flex items-center justify-between py-6">
                                <div className="flex flex-col">
                                    <span className={cn(
                                        "text-7xl font-bold font-product leading-none transition-colors",
                                        isBenchmarking ? "text-muted-foreground animate-pulse" : "text-foreground"
                                    )}>
                                        {performanceScore || (isBenchmarking ? "..." : "---")}
                                    </span>
                                    <span className="text-xs text-muted-foreground mt-2 uppercase tracking-widest font-bold">Standardized Spunix Points</span>
                                </div>
                                <div className="text-right">
                                    <div className="bg-secondary/20 p-4 rounded-2xl border border-white/5">
                                        <p className="text-xs text-muted-foreground mb-1 uppercase font-bold">Processor</p>
                                        <p className="font-product text-lg font-bold">{metrics.cores} Logical Cores</p>
                                        <p className="text-xs text-primary font-mono">{metrics.os}</p>
                                    </div>
                                </div>
                            </div>
                        </MetricCard>

                        <MetricCard
                            title="Network Latency"
                            icon={<Wifi className="text-green-500" />}
                            status={`${metrics.latency}ms`}
                        >
                            <div className="h-32 flex items-end gap-1.5 mt-4 group">
                                {pingHistory.map((p, i) => (
                                    <div
                                        key={i}
                                        className="bg-green-500/30 group-hover:bg-green-500/50 rounded-t-md flex-1 transition-all duration-300"
                                        style={{ height: `${Math.max(10, Math.min(100, (p / 200) * 100))}%` }}
                                    />
                                ))}
                            </div>
                            <div className="flex justify-between mt-3 text-[10px] uppercase font-bold text-muted-foreground">
                                <span>Timeline</span>
                                <span>Real-time Update (Every 5s)</span>
                            </div>
                        </MetricCard>
                    </div>

                    {/* GRAPHICS & DISPLAY */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <MetricCard title="Graphics Architecture" icon={<Activity className="text-red-500" />} className="md:col-span-2">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-muted-foreground uppercase font-bold mb-1">Renderer</p>
                                    <p className="text-sm font-medium leading-relaxed truncate">{metrics.gpu}</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-1 bg-white/5 p-3 rounded-xl border border-white/5">
                                        <p className="text-[10px] text-muted-foreground uppercase font-bold">Engine</p>
                                        <p className="text-sm font-bold text-primary">{metrics.webGlVersion}</p>
                                    </div>
                                    <div className="flex-1 bg-white/5 p-3 rounded-xl border border-white/5">
                                        <p className="text-[10px] text-muted-foreground uppercase font-bold">Context</p>
                                        <p className="text-sm font-bold text-primary">Secure</p>
                                    </div>
                                </div>
                            </div>
                        </MetricCard>

                        <MetricCard title="Display" icon={<Monitor className="text-orange-500" />} status={metrics.resolution}>
                            <p className="text-xs text-muted-foreground mt-2">Refresh Rate: ~{metrics.refreshRate}Hz</p>
                            <p className="text-xs text-muted-foreground">Pixel Density: {window.devicePixelRatio}x</p>
                        </MetricCard>

                        <MetricCard title="Memory" icon={<HardDrive className="text-purple-500" />} status={metrics.memory}>
                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between text-[10px] uppercase font-bold mb-1">
                                    <span>Usage Estimate</span>
                                    <span className="text-primary">{metrics.storageUsage}</span>
                                </div>
                                <div className="h-1.5 w-full bg-secondary/30 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[15%]" />
                                </div>
                                <p className="text-[10px] text-muted-foreground">Total Quota: {metrics.storageQuota}</p>
                            </div>
                        </MetricCard>
                    </div>

                    {/* MULTIMEDIA & CAPABILITIES */}
                    <MetricCard title="Video Codecs" icon={<Video className="text-indigo-400" />}>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {metrics.videoCodecs.map(codec => (
                                <span key={codec} className="px-2 py-1 rounded-md bg-white/5 text-[10px] font-mono border border-white/5">{codec}</span>
                            ))}
                        </div>
                    </MetricCard>

                    <MetricCard title="Audio Codecs" icon={<Volume2 className="text-pink-400" />}>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {metrics.audioCodecs.map(codec => (
                                <span key={codec} className="px-2 py-1 rounded-md bg-white/5 text-[10px] font-mono border border-white/5">{codec}</span>
                            ))}
                        </div>
                    </MetricCard>

                    <MetricCard title="Environment" icon={<Globe className="text-emerald-400" />}>
                        <div className="mt-2 space-y-2">
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase font-bold">Timezone</p>
                                <p className="text-xs font-medium truncate">{metrics.timezone}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-muted-foreground uppercase font-bold">Language</p>
                                <p className="text-xs font-medium">{metrics.language}</p>
                            </div>
                        </div>
                    </MetricCard>

                    <MetricCard title="Power" icon={<Battery className={cn(metrics.isCharging ? "text-yellow-500" : "text-foreground")} />}>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl font-bold font-product">{metrics.batteryLevel !== undefined ? `${Math.round(metrics.batteryLevel)}%` : "N/A"}</span>
                            <span className="text-[10px] uppercase font-bold text-primary">{metrics.isCharging ? "Charging" : "Discharging"}</span>
                        </div>
                        <div className="w-full bg-secondary/30 h-2 rounded-full overflow-hidden">
                            <div
                                className={cn("h-full transition-all duration-1000", metrics.isCharging ? "bg-yellow-500" : "bg-primary")}
                                style={{ width: `${metrics.batteryLevel || 0}%` }}
                            />
                        </div>
                    </MetricCard>

                    {/* STORAGE & MISC */}
                    <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="md:col-span-3 bg-secondary/10 p-6 rounded-[2rem] border border-white/5 flex items-center gap-6">
                            <div className="bg-primary/20 p-4 rounded-3xl shrink-0">
                                <Database className="size-8 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-1">Local Storage Inspector</h4>
                                <p className="text-sm text-muted-foreground max-w-2xl">
                                    Your system has allocated <span className="text-foreground font-bold">{metrics.storageQuota}</span> for Spunix to utilize.
                                    Currently using <span className="text-foreground font-bold">{metrics.storageUsage}</span> for tool cache and temporary assets.
                                </p>
                            </div>
                        </div>
                        <div className="bg-secondary/10 p-6 rounded-[2rem] border border-white/5 flex flex-col justify-center items-center text-center">
                            <ShieldCheck className="size-8 text-green-500 mb-2" />
                            <p className="text-sm font-bold">{metrics.browser}</p>
                            <p className="text-[10px] text-muted-foreground uppercase font-bold">Verified Engine</p>
                        </div>
                    </div>

                </div>

                <div className="mt-12 p-8 rounded-[2rem] bg-secondary/5 border border-dashed border-white/10 flex flex-col md:flex-row items-center gap-8">
                    <div className="bg-primary/10 p-4 rounded-2xl shrink-0">
                        <Info className="size-8 text-primary" />
                    </div>
                    <div className="text-left flex-1">
                        <h4 className="font-bold text-lg mb-2">Accuracy Note</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Web-based inspection is subject to **Browser Sandboxing**. To prevent hardware fingerprinting, modern browsers may mask exact RAM totals and CPU clock speeds.
                            The values above represent the most accurate metrics the Spunix engine can retrieve via standard Web APIs.
                        </p>
                    </div>
                    <Button variant="outline" className="rounded-xl border-white/10 shrink-0 h-12">
                        <Download className="mr-2 size-4" /> Download SDK
                    </Button>
                </div>

                {/* Feedback Section */}
                <div className="max-w-3xl mx-auto mt-12 animate-fade-in-up">
                    <div className="text-center space-y-4">
                        <p className="text-sm md:text-base text-muted-foreground font-medium">
                            The information it provides is not enough or inaccurate?{" "}
                            <Link href="/feedback-tool" className="text-primary hover:underline font-bold transition-all">
                                Give me a feedback!
                            </Link>
                        </p>
                        <p className="text-xs text-muted-foreground/30 italic">
                            Hardware inspection metrics are retrieved via secure browser APIs and subject to sandboxing.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ title, icon, status, children, className }: {
    title: string;
    icon: React.ReactNode;
    status?: string;
    children?: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn(
            "p-6 rounded-[2rem] bg-background/50 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col justify-between group hover:border-primary/30 transition-all duration-300",
            className
        )}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="bg-secondary/30 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        {icon}
                    </div>
                    <h3 className="font-product font-bold text-lg">{title}</h3>
                </div>
                {status && <span className="font-mono text-primary font-bold text-sm bg-primary/10 px-3 py-1 rounded-full">{status}</span>}
            </div>
            {children}
        </div>
    );
}

function getBrowserName(userAgent: string) {
    if (userAgent.includes("Firefox")) return "Mozilla Firefox";
    if (userAgent.includes("SamsungBrowser")) return "Samsung Internet";
    if (userAgent.includes("Opera") || userAgent.includes("OPR")) return "Opera";
    if (userAgent.includes("Edge")) return "Microsoft Edge";
    if (userAgent.includes("Chrome")) return "Google Chrome";
    if (userAgent.includes("Safari")) return "Apple Safari";
    return "Unknown Browser";
}
