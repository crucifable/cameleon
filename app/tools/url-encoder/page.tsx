"use client";

import React, { useState } from "react";
import { Particles } from "@/components/ui/particles";
import { Header } from "@/components/header-with-search";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    Link2,
    ArrowLeftRight,
    Copy,
    Check,
    RefreshCw,
    Type,
    ShieldCheck,
    Eraser
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function UrlEncoderPage() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [mode, setMode] = useState<"encode" | "decode">("encode");
    const [copied, setCopied] = useState(false);

    const handleProcess = (val: string, currentMode: "encode" | "decode") => {
        setInput(val);
        try {
            if (currentMode === "encode") {
                setOutput(encodeURIComponent(val));
            } else {
                setOutput(decodeURIComponent(val));
            }
        } catch (e) {
            setOutput("Error: Invalid URL or character sequence");
        }
    };

    const toggleMode = () => {
        const newMode = mode === "encode" ? "decode" : "encode";
        setMode(newMode);
        handleProcess(output, newMode); // Process the previous output as new input
        setInput(output);
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(output);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    const clearAll = () => {
        setInput("");
        setOutput("");
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
            <Header />
            <div className="absolute inset-0 z-0 pointer-events-none">
                <Particles quantity={300} className="h-full w-full" color="#ffffff" />
            </div>

            <main className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-20">
                <div className="flex flex-col items-center text-center mb-10 md:mb-16 animate-fade-in-up">
                    <div className="p-3 md:p-4 bg-primary/10 rounded-2xl md:rounded-3xl mb-4 md:mb-6">
                        <Link2 className="size-8 md:size-12 text-primary" />
                    </div>
                    <h1 className="font-product text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-white">
                        URL Encoder & Decoder
                    </h1>
                    <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto font-product px-4">
                        Easily encode or decode URLs content. Perfect for web developers and SEO professionals.
                    </p>
                </div>

                <div className="space-y-6 md:space-y-8 animate-fade-in-up delay-200">
                    <div className="bg-background/40 backdrop-blur-xl p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/10 shadow-2xl">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                            <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                                <button
                                    onClick={() => {
                                        setMode("encode");
                                        handleProcess(input, "encode");
                                    }}
                                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${mode === "encode" ? "bg-primary text-primary-foreground shadow-lg" : "text-white/40 hover:text-white"}`}
                                >
                                    Encode
                                </button>
                                <button
                                    onClick={() => {
                                        setMode("decode");
                                        handleProcess(input, "decode");
                                    }}
                                    className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${mode === "decode" ? "bg-primary text-primary-foreground shadow-lg" : "text-white/40 hover:text-white"}`}
                                >
                                    Decode
                                </button>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearAll}
                                    className="text-muted-foreground hover:text-red-400 h-9"
                                >
                                    <Eraser className="size-4 mr-2" />
                                    Clear
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={toggleMode}
                                    className="text-primary hover:text-primary hover:bg-primary/10 h-9 font-bold"
                                >
                                    <ArrowLeftRight className="size-4 mr-2" />
                                    Swap Mode
                                </Button>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between px-1">
                                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Input</label>
                                    <Type className="size-4 text-muted-foreground/30" />
                                </div>
                                <Textarea
                                    placeholder={mode === "encode" ? "Enter normal URL or text..." : "Enter encoded URL component..."}
                                    value={input}
                                    onChange={(e) => handleProcess(e.target.value, mode)}
                                    className="min-h-[200px] md:min-h-[300px] bg-white/5 border-white/10 rounded-2xl p-4 text-white placeholder:text-white/10 focus:ring-primary/50 text-base font-mono resize-none shadow-inner"
                                />
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between px-1">
                                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Output</label>
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={copyToClipboard}
                                            disabled={!output}
                                            className={`flex items-center gap-2 text-xs font-bold transition-all ${copied ? 'text-green-500' : 'text-primary hover:text-primary/80 disabled:opacity-30 disabled:cursor-not-allowed'}`}
                                        >
                                            {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
                                            {copied ? 'COPIED' : 'COPY'}
                                        </button>
                                    </div>
                                </div>
                                <Textarea
                                    readOnly
                                    value={output}
                                    placeholder="Result will appear here..."
                                    className="min-h-[200px] md:min-h-[300px] bg-black/40 border-white/10 rounded-2xl p-4 text-primary font-mono text-base resize-none shadow-inner cursor-default"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8 bg-primary/5 rounded-[1.5rem] md:rounded-[2.5rem] border border-primary/10">
                        <div className="flex items-center gap-4 text-center md:text-left">
                            <div className="p-3 bg-primary/10 rounded-2xl">
                                <ShieldCheck className="size-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Client-Side Processing</h3>
                                <p className="text-sm text-muted-foreground">Your data NEVER leaves your browser. Secure and private.</p>
                            </div>
                        </div>
                        <Button
                            onClick={copyToClipboard}
                            disabled={!output}
                            className="w-full md:w-auto h-12 px-8 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                        >
                            <Copy className="size-4 mr-2" />
                            Copy Result
                        </Button>
                    </div>
                </div>

                {/* Feedback Section */}
                <div className="max-w-3xl mx-auto mt-16 animate-fade-in-up">
                    <div className="text-center space-y-4">
                        <p className="text-xs md:text-sm text-muted-foreground font-medium">
                            Need Base64 or other encoding types?{" "}
                            <Link href="/feedback-tool" className="text-primary hover:underline font-bold transition-all">
                                Suggest a feature!
                            </Link>
                        </p>
                        <p className="text-[10px] md:text-xs text-muted-foreground/30 leading-relaxed italic">
                            Spunix Cameleon provides professional-grade tools for modern workflows.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
