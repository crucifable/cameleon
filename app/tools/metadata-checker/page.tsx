"use client";

import React, { useState, useEffect } from "react";
import { Particles } from "@/components/ui/particles";
import { Header } from "@/components/header-with-search";
import { FileUpload } from "@/components/ui/file-upload";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
    FileIcon,
    Info,
    Calendar,
    HardDrive,
    Type,
    Maximize,
    Clock,
    ShieldCheck,
    X,
    Eye,
    Tag,
    FileText,
    Image as ImageIcon,
    Layout
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ExifReader from 'exifreader';

type FileMetadata = {
    name: string;
    size: number;
    type: string;
    lastModified: number;
    url?: string;
    content?: string;
    dimensions?: { width: number; height: number };
    duration?: number;
    exif?: Record<string, any>;
};

export default function MetadataCheckerPage() {
    const [rawFiles, setRawFiles] = useState<File[]>([]);
    const [filesMetadata, setFilesMetadata] = useState<FileMetadata[]>([]);
    const [selectedFile, setSelectedFile] = useState<FileMetadata | null>(null);
    const [showPreview, setShowPreview] = useState(false);

    const handleFilesChange = (newFiles: File[]) => {
        setRawFiles(prev => [...prev, ...newFiles]);

        newFiles.forEach(async (file) => {
            const baseMetadata: FileMetadata = {
                name: file.name,
                size: file.size,
                type: file.type || "unknown",
                lastModified: file.lastModified,
                exif: {}
            };

            // Read deep metadata using ExifReader
            try {
                const buffer = await file.arrayBuffer();
                const tags = ExifReader.load(buffer);
                const deepData: any = {};
                for (const [key, value] of Object.entries(tags)) {
                    deepData[key] = value.description || value.value;
                }
                baseMetadata.exif = deepData;
            } catch (e) {
                console.log("Exif error:", e);
            }

            // Create URL for preview
            if (file.type.startsWith("image/") || file.type.startsWith("video/") || file.type.startsWith("audio/")) {
                baseMetadata.url = URL.createObjectURL(file);
            }

            // Read text content
            if (file.type.startsWith("text/") || file.name.endsWith(".json") || file.name.endsWith(".js") || file.name.endsWith(".ts")) {
                const text = await file.text();
                baseMetadata.content = text.slice(0, 10000); // Limit preview
            }

            // Detect image dimensions
            if (file.type.startsWith("image/")) {
                const img = new Image();
                img.onload = () => {
                    setFilesMetadata(prev => [...prev, {
                        ...baseMetadata,
                        dimensions: { width: img.width, height: img.height }
                    }]);
                };
                img.src = baseMetadata.url!;
            }
            // Detect audio/video duration
            else if (file.type.startsWith("video/") || file.type.startsWith("audio/")) {
                const media = document.createElement(file.type.startsWith("video/") ? "video" : "audio");
                media.onloadedmetadata = () => {
                    setFilesMetadata(prev => [...prev, {
                        ...baseMetadata,
                        duration: media.duration
                    }]);
                };
                media.src = baseMetadata.url!;
            }
            else {
                setFilesMetadata(prev => [...prev, baseMetadata]);
            }
        });
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
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
                        <Layout className="size-8 md:size-12 text-primary" />
                    </div>
                    <h1 className="font-product text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-white">
                        Metadata & Preview
                    </h1>
                    <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto font-product px-4">
                        Detailed file analysis and instant content preview. Guaranteed privacy with 100% on-device processing.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
                    {/* Left Column: Upload & History */}
                    <div className="space-y-6 md:space-y-8 animate-fade-in-up delay-200 w-full overflow-hidden">
                        <section className="bg-background/40 backdrop-blur-xl p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/10 shadow-2xl">
                            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-3 text-white">
                                <HardDrive className="size-5 md:size-6 text-primary" />
                                Drop Files
                            </h2>
                            <FileUpload files={rawFiles} onChange={handleFilesChange} />
                        </section>

                        {filesMetadata.length > 0 && (
                            <section className="bg-background/40 backdrop-blur-xl p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden">
                                <div className="flex items-center justify-between mb-4 md:mb-6">
                                    <h2 className="text-xl md:text-2xl font-bold flex items-center gap-3 text-white">
                                        <Clock className="size-5 md:size-6 text-primary" />
                                        Collection
                                    </h2>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                            setFilesMetadata([]);
                                            setRawFiles([]);
                                            setSelectedFile(null);
                                        }}
                                        className="text-red-500 hover:text-red-400 hover:bg-red-500/10 h-8 px-2 md:h-9 md:px-4"
                                    >
                                        Remove All
                                    </Button>
                                </div>
                                <div className="space-y-2 md:space-y-3 max-h-[300px] md:max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {filesMetadata.map((file, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => setSelectedFile(file)}
                                            className={`p-3 md:p-4 rounded-xl md:rounded-2xl border transition-all cursor-pointer group ${selectedFile === file
                                                ? "bg-primary/20 border-primary/40"
                                                : "bg-white/5 border-white/5 hover:border-white/20"
                                                }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3 md:gap-4">
                                                    <div className="p-2 bg-background/50 rounded-lg">
                                                        {file.type.startsWith("image/") ? <ImageIcon className="size-4 md:size-5 text-primary" /> : <FileIcon className="size-4 md:size-5 text-muted-foreground" />}
                                                    </div>
                                                    <div className="text-left overflow-hidden">
                                                        <p className="font-medium truncate max-w-[120px] sm:max-w-[200px] text-white/90 text-sm md:text-base">{file.name}</p>
                                                        <p className="text-[10px] md:text-xs text-muted-foreground">{formatSize(file.size)}</p>
                                                    </div>
                                                </div>
                                                <Eye className={`size-4 md:size-5 transition-all ${selectedFile === file ? "text-primary opacity-100" : "opacity-0 group-hover:opacity-100 text-muted-foreground"}`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Column: Information & Preview */}
                    <div className="animate-fade-in-up delay-300 w-full overflow-hidden">
                        <AnimatePresence mode="wait">
                            {selectedFile ? (
                                <motion.div
                                    key={selectedFile.name}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    className="bg-background/40 backdrop-blur-xl p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/10 shadow-2xl lg:sticky lg:top-32"
                                >
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
                                        <div className="max-w-full sm:max-w-[70%]">
                                            <h2 className="text-2xl md:text-3xl font-bold truncate mb-2 text-white">{selectedFile.name}</h2>
                                            <p className="text-primary font-medium text-[10px] md:text-sm px-2 md:px-3 py-1 bg-primary/10 rounded-full w-fit max-w-full truncate">{selectedFile.type}</p>
                                        </div>
                                        <div className="flex items-center sm:flex-col items-end gap-3 w-full sm:w-auto justify-between sm:justify-start">
                                            <div className="p-2 md:p-3 bg-primary/10 rounded-xl md:rounded-2xl border border-primary/20">
                                                <ShieldCheck className="size-5 md:size-6 text-primary" />
                                            </div>
                                            <div className="flex items-center space-x-2 bg-white/5 p-1.5 md:p-2 rounded-lg md:rounded-xl border border-white/10">
                                                <Label htmlFor="preview-mode" className="text-[10px] md:text-xs font-bold text-muted-foreground">PREVIEW</Label>
                                                <Switch
                                                    id="preview-mode"
                                                    checked={showPreview}
                                                    onCheckedChange={setShowPreview}
                                                    className="scale-90 md:scale-100"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {!showPreview ? (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-4 md:space-y-6"
                                        >
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 md:gap-4">
                                                <MetaItem
                                                    icon={HardDrive}
                                                    label="Storage"
                                                    value={formatSize(selectedFile.size)}
                                                />
                                                <MetaItem
                                                    icon={Calendar}
                                                    label="Modified"
                                                    value={new Date(selectedFile.lastModified).toLocaleDateString()}
                                                />
                                                {selectedFile.dimensions && (
                                                    <MetaItem
                                                        icon={Maximize}
                                                        label="Canvas"
                                                        value={`${selectedFile.dimensions.width}x${selectedFile.dimensions.height}`}
                                                    />
                                                )}
                                                {selectedFile.duration && (
                                                    <MetaItem
                                                        icon={Clock}
                                                        label="Runtime"
                                                        value={formatDuration(selectedFile.duration)}
                                                    />
                                                )}
                                            </div>

                                            {selectedFile.exif && Object.keys(selectedFile.exif).length > 0 && (
                                                <div className="mt-6 md:mt-8">
                                                    <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 flex items-center gap-2 text-white">
                                                        <Tag className="size-4 text-primary" />
                                                        Extended Properties
                                                    </h3>
                                                    <div className="grid grid-cols-1 gap-2 max-h-[300px] md:max-h-[400px] overflow-y-auto custom-scrollbar pr-1 md:pr-2">
                                                        {Object.entries(selectedFile.exif).map(([key, value]) => {
                                                            if (typeof value === 'object') return null;
                                                            return (
                                                                <div key={key} className="flex flex-col sm:flex-row sm:justify-between p-2.5 md:p-3 rounded-lg md:rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                                                    <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1 sm:mb-0">{key}</span>
                                                                    <span className="text-xs font-medium text-white/80 break-all sm:ml-4 sm:text-right">{String(value)}</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-4 md:space-y-6 min-h-[300px] flex flex-col"
                                        >
                                            <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                                                <Eye className="size-4 text-primary" />
                                                Content Preview
                                            </h3>

                                            <div className="flex-1 rounded-xl md:rounded-[1.5rem] overflow-hidden bg-black/40 border border-white/10 p-2 md:p-4 flex items-center justify-center min-h-[250px]">
                                                {selectedFile.type.startsWith("image/") && selectedFile.url && (
                                                    <img
                                                        src={selectedFile.url}
                                                        alt="Preview"
                                                        className="max-w-full max-h-[400px] md:max-h-[500px] object-contain rounded-lg shadow-2xl"
                                                    />
                                                )}

                                                {selectedFile.type.startsWith("video/") && selectedFile.url && (
                                                    <video
                                                        src={selectedFile.url}
                                                        controls
                                                        className="max-w-full max-h-[400px] md:max-h-[500px] rounded-lg shadow-2xl"
                                                    />
                                                )}

                                                {selectedFile.type.startsWith("audio/") && selectedFile.url && (
                                                    <audio
                                                        src={selectedFile.url}
                                                        controls
                                                        className="w-full"
                                                    />
                                                )}

                                                {selectedFile.content && (
                                                    <pre className="text-[10px] md:text-xs text-white/70 font-mono text-left w-full h-[300px] md:h-[400px] overflow-auto custom-scrollbar p-3 md:p-4 bg-background/50 rounded-lg md:rounded-xl whitespace-pre-wrap break-all">
                                                        {selectedFile.content}
                                                    </pre>
                                                )}

                                                {!selectedFile.url && !selectedFile.content && (
                                                    <div className="flex flex-col items-center gap-3 md:gap-4 text-muted-foreground/50">
                                                        <X className="size-10 md:size-12" />
                                                        <p className="text-sm">Preview not available</p>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ) : (
                                <div className="h-[400px] md:h-[600px] flex flex-col items-center justify-center text-center p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-dashed border-white/10 bg-white/2 backdrop-blur-sm">
                                    <div className="size-16 md:size-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 md:mb-8 border border-primary/20 animate-pulse">
                                        <Search className="size-8 md:size-12 text-primary/40" />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-white/50 mb-3 md:mb-4">No file selected</h3>
                                    <p className="text-sm md:text-base text-muted-foreground/40 max-w-xs mx-auto leading-relaxed">
                                        Select a scanned file from the collection on the left to reveal deep insights and content.
                                    </p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Feedback Section */}
                <div className="max-w-3xl mx-auto mt-12 animate-fade-in-up">
                    <div className="text-center space-y-4">
                        <p className="text-xs md:text-sm text-muted-foreground font-medium">
                            The information it provides is not enough or inaccurate?{" "}
                            <Link href="/feedback-tool" className="text-primary hover:underline font-bold transition-all">
                                Give me a feedback!
                            </Link>
                        </p>
                        <p className="text-[10px] md:text-xs text-muted-foreground/30 leading-relaxed italic">
                            Spunix uses 256-bit browser-local encryption for metadata extraction. Data never reaches our servers.
                        </p>
                    </div>
                </div>
            </main>

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
            `}</style>
        </div>
    );
}

function MetaItem({ icon: Icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
            <div className="flex items-center gap-4">
                <div className="p-2 bg-background/50 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Icon className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-muted-foreground font-medium text-sm">{label}</span>
            </div>
            <span className="font-bold text-white/90 text-sm">{value}</span>
        </div>
    );
}

function Search({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
        </svg>
    )
}
