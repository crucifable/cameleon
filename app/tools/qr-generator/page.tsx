"use client";

import React, { useState, useRef } from "react";
import { Particles } from "@/components/ui/particles";
import { Header } from "@/components/header-with-search";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    QrCode,
    Download,
    Copy,
    Settings,
    Link as LinkIcon,
    Palette,
    Maximize,
    Check,
    RefreshCw,
    Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QRCodeCanvas } from "qrcode.react";

export default function QrGeneratorPage() {
    const [text, setText] = useState("https://spunix.io");
    const [size, setSize] = useState(512);
    const [fgColor, setFgColor] = useState("#ffffff");
    const [bgColor, setBgColor] = useState("#000000");
    const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("H");
    const [includeMargin, setIncludeMargin] = useState(true);
    const [copied, setCopied] = useState(false);

    const qrRef = useRef<HTMLDivElement>(null);

    const downloadQR = () => {
        const canvas = qrRef.current?.querySelector("canvas");
        if (!canvas) return;

        const url = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = url;
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const copyToClipboard = async () => {
        const canvas = qrRef.current?.querySelector("canvas");
        if (!canvas) return;

        try {
            canvas.toBlob(async (blob) => {
                if (!blob) return;
                const item = new ClipboardItem({ "image/png": blob });
                await navigator.clipboard.write([item]);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
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

            <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-20">
                <div className="flex flex-col items-center text-center mb-10 md:mb-16 animate-fade-in-up">
                    <div className="p-3 md:p-4 bg-primary/10 rounded-2xl md:rounded-3xl mb-4 md:mb-6">
                        <QrCode className="size-8 md:size-12 text-primary" />
                    </div>
                    <h1 className="font-product text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-white">
                        QR Code Generator
                    </h1>
                    <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto font-product px-4">
                        Create customizable, high-resolution QR codes in seconds. Fast, secure, and completely on-device.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
                    {/* Left Column: Input & Customization */}
                    <div className="space-y-6 md:space-y-8 animate-fade-in-up delay-200">
                        <section className="bg-background/40 backdrop-blur-xl p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/10 shadow-2xl">
                            <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                                <LinkIcon className="size-5 md:size-6 text-primary" />
                                Content
                            </h2>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="qr-text" className="text-muted-foreground ml-1">URL or Text</Label>
                                    <Input
                                        id="qr-text"
                                        placeholder="Enter link or text here..."
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        className="bg-white/5 border-white/10 h-12 md:h-14 px-4 rounded-xl md:rounded-2xl text-white placeholder:text-white/20 focus:ring-primary/50"
                                    />
                                </div>
                            </div>
                        </section>

                        <section className="bg-background/40 backdrop-blur-xl p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/10 shadow-2xl">
                            <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3 text-white">
                                <Palette className="size-5 md:size-6 text-primary" />
                                Styling
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-muted-foreground ml-1">Foreground Color</Label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="color"
                                            value={fgColor}
                                            onChange={(e) => setFgColor(e.target.value)}
                                            className="size-10 rounded-lg cursor-pointer bg-transparent border-none"
                                        />
                                        <Input
                                            value={fgColor}
                                            onChange={(e) => setFgColor(e.target.value)}
                                            className="bg-white/5 border-white/10 h-10 px-3 rounded-lg text-xs md:text-sm font-mono text-white"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-muted-foreground ml-1">Background Color</Label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="color"
                                            value={bgColor}
                                            onChange={(e) => setBgColor(e.target.value)}
                                            className="size-10 rounded-lg cursor-pointer bg-transparent border-none"
                                        />
                                        <Input
                                            value={bgColor}
                                            onChange={(e) => setBgColor(e.target.value)}
                                            className="bg-white/5 border-white/10 h-10 px-3 rounded-lg text-xs md:text-sm font-mono text-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 space-y-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center px-1">
                                        <Label className="text-muted-foreground">Size (px)</Label>
                                        <span className="text-primary font-bold text-sm bg-primary/10 px-2 py-0.5 rounded-lg">{size}x{size}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="128"
                                        max="1024"
                                        step="16"
                                        value={size}
                                        onChange={(e) => setSize(parseInt(e.target.value))}
                                        className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-muted-foreground px-1">Error Correction Level</Label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {(["L", "M", "Q", "H"] as const).map((l) => (
                                            <button
                                                key={l}
                                                onClick={() => setLevel(l)}
                                                className={`py-2 rounded-xl text-xs font-bold transition-all border ${level === l
                                                    ? "bg-primary text-primary-foreground border-primary"
                                                    : "bg-white/5 text-white/50 border-white/5 hover:border-white/20"
                                                    }`}
                                            >
                                                {l}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Preview & Actions */}
                    <div className="animate-fade-in-up delay-300">
                        <div className="bg-background/40 backdrop-blur-xl p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/10 shadow-2xl sticky top-24 md:top-32">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl md:text-2xl font-bold flex items-center gap-3 text-white">
                                    <Maximize className="size-5 md:size-6 text-primary" />
                                    Preview
                                </h2>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setFgColor("#ffffff");
                                        setBgColor("#000000");
                                        setSize(512);
                                        setLevel("H");
                                        setText("https://spunix.io");
                                    }}
                                    className="text-muted-foreground hover:text-white group h-9"
                                >
                                    <RefreshCw className="size-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                                    Reset
                                </Button>
                            </div>

                            <div className="flex flex-col items-center gap-10">
                                <div
                                    ref={qrRef}
                                    className="p-6 md:p-8 bg-black/40 rounded-[2rem] border border-white/10 shadow-inner flex items-center justify-center relative group overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative z-10 bg-white p-4 rounded-2xl shadow-2xl">
                                        <QRCodeCanvas
                                            value={text || " "}
                                            size={Math.min(size, 300)} // Visual size vs actual size
                                            fgColor={fgColor}
                                            bgColor={bgColor}
                                            level={level}
                                            includeMargin={includeMargin}
                                        />
                                    </div>

                                    {/* Real-size hidden canvas for downloading */}
                                    <div className="hidden">
                                        <QRCodeCanvas
                                            value={text || " "}
                                            size={size}
                                            fgColor={fgColor}
                                            bgColor={bgColor}
                                            level={level}
                                            includeMargin={includeMargin}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <Button
                                        onClick={downloadQR}
                                        className="h-12 md:h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base shadow-lg shadow-primary/20 transition-all border-none"
                                    >
                                        <Download className="size-5 mr-3" />
                                        Download PNG
                                    </Button>
                                    <Button
                                        onClick={copyToClipboard}
                                        variant="secondary"
                                        className={`h-12 md:h-14 rounded-2xl font-bold text-base transition-all bg-white/5 hover:bg-white/10 text-white border-white/10 ${copied ? 'bg-green-500/20 text-green-500 border-green-500/30' : ''}`}
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="size-5 mr-3" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="size-5 mr-3" />
                                                Copy Image
                                            </>
                                        )}
                                    </Button>
                                </div>

                                <p className="text-xs text-muted-foreground/50 text-center max-w-xs italic leading-relaxed">
                                    Tip: Use high error correction (H) if you plan to print the QR code or add a logo over it.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feedback Section */}
                <div className="max-w-3xl mx-auto mt-16 animate-fade-in-up">
                    <div className="text-center space-y-4">
                        <p className="text-xs md:text-sm text-muted-foreground font-medium">
                            Need more customization or vector formats?{" "}
                            <Link href="/feedback-tool" className="text-primary hover:underline font-bold transition-all">
                                Let me know!
                            </Link>
                        </p>
                        <p className="text-[10px] md:text-xs text-muted-foreground/30 leading-relaxed italic">
                            Spunix QR Generator runs entirely in your browser. Your URLs and text are never transmitted to our servers.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
