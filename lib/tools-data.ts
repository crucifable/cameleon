import {
    FileText, Merge, Scissors, Lock, Unlock, RotateCw, FileType,
    Image, FileSpreadsheet, FileCode, FileInput, FileOutput,
    Video, Mic, Speaker, Play, Square, Layers, Crop,
    FlipHorizontal, Minimize2, Repeat, Volume2, Gauge,
    Activity, Music, Type, FileArchive, BookOpen, HardDrive, LucideIcon, Download, QrCode, Link2
} from 'lucide-react';
import React from 'react';

export type ToolItem = {
    id: string;
    title: string;
    description: string;
    category: 'PDF Tools' | 'Video Tools' | 'Audio Tools' | 'Converters' | 'System Tools' | 'Link Tools';
    icon: LucideIcon;
    tags?: string[];
};

export const toolsData: ToolItem[] = [
    // PDF Tools
    {
        id: 'pdf-split',
        title: 'Split PDF',
        description: 'Separate one PDF file into multiple files.',
        category: 'PDF Tools',
        icon: Scissors,
        tags: ['Light'],
    },
    {
        id: 'pdf-merge',
        title: 'Merge PDF',
        description: 'Combine multiple PDFs into a single file.',
        category: 'PDF Tools',
        icon: Merge,
    },
    {
        id: 'pdf-compress',
        title: 'Compress PDF',
        description: 'Reduce the size of your PDF files.',
        category: 'PDF Tools',
        icon: Minimize2,
        tags: ['Heavy'],
    },
    {
        id: 'pdf-unlock',
        title: 'Unlock PDF',
        description: 'Remove password security from PDF files.',
        category: 'PDF Tools',
        icon: Unlock,
    },
    {
        id: 'pdf-protect',
        title: 'Protect PDF',
        description: 'Add password security to PDF files.',
        category: 'PDF Tools',
        icon: Lock,
    },
    {
        id: 'pdf-rotate',
        title: 'Rotate PDF',
        description: 'Rotate pages within your PDF file.',
        category: 'PDF Tools',
        icon: RotateCw,
    },
    {
        id: 'pdf-page-numbers',
        title: 'Add Page Numbers',
        description: 'Insert page numbers into your PDF.',
        category: 'PDF Tools',
        icon: FileText,
    },
    {
        id: 'pdf-to-word',
        title: 'PDF to Word',
        description: 'Convert PDF files to editable Word documents.',
        category: 'PDF Tools',
        icon: FileType,
        tags: ['Online'],
    },
    {
        id: 'pdf-to-excel',
        title: 'PDF to Excel',
        description: 'Convert PDF files to Excel spreadsheets.',
        category: 'PDF Tools',
        icon: FileSpreadsheet,
    },
    {
        id: 'pdf-to-jpg',
        title: 'PDF to JPG',
        description: 'Convert PDF pages to JPG images.',
        category: 'PDF Tools',
        icon: Image,
    },
    {
        id: 'pdf-to-html',
        title: 'PDF to HTML',
        description: 'Convert PDF files to HTML web pages.',
        category: 'PDF Tools',
        icon: FileCode,
    },
    {
        id: 'word-to-pdf',
        title: 'Word to PDF',
        description: 'Convert Word documents to PDF format.',
        category: 'PDF Tools',
        icon: FileInput,
    },
    {
        id: 'jpg-to-pdf',
        title: 'JPG to PDF',
        description: 'Convert JPG images into a PDF file.',
        category: 'PDF Tools',
        icon: FileOutput,
        tags: ['Light'],
    },

    // Video Tools
    {
        id: 'video-editor',
        title: 'Video Editor',
        description: 'Edit your videos directly in the browser.',
        category: 'Video Tools',
        icon: Video,
        tags: ['Heavy', 'App Only'],
    },
    {
        id: 'screen-recorder',
        title: 'Screen Recorder',
        description: 'Record your screen directly from your browser.',
        category: 'Video Tools',
        icon: Video,
        tags: ['Light', 'New'],
    },
    {
        id: 'text-to-speech',
        title: 'Text to speech',
        description: 'Convert text into natural sounding speech.',
        category: 'Video Tools',
        icon: Speaker,
        tags: ['Online', 'Heavy'],
    },
    {
        id: 'merge-videos',
        title: 'Merge Videos',
        description: 'Combine multiple videos into one.',
        category: 'Video Tools',
        icon: Merge,
    },
    {
        id: 'trim-video',
        title: 'Trim Video',
        description: 'Cut out unwanted parts of your video.',
        category: 'Video Tools',
        icon: Scissors,
    },
    {
        id: 'crop-video',
        title: 'Crop Video',
        description: 'Crop your video to a specific aspect ratio.',
        category: 'Video Tools',
        icon: Crop,
    },
    {
        id: 'rotate-video',
        title: 'Rotate Video',
        description: 'Rotate your video 90, 180, or 270 degrees.',
        category: 'Video Tools',
        icon: RotateCw,
    },
    {
        id: 'resize-video',
        title: 'Resize Video',
        description: 'Change the resolution of your video.',
        category: 'Video Tools',
        icon: Minimize2,
    },
    {
        id: 'loop-video',
        title: 'Loop Video',
        description: 'Create a repeating loop of your video.',
        category: 'Video Tools',
        icon: Repeat,
    },
    {
        id: 'video-volume',
        title: 'Change Video Volume',
        description: 'Adjust the volume of your video clip.',
        category: 'Video Tools',
        icon: Volume2,
    },
    {
        id: 'video-speed',
        title: 'Change Video Speed',
        description: 'Speed up or slow down your video.',
        category: 'Video Tools',
        icon: Gauge,
    },
    {
        id: 'stabilize-video',
        title: 'Stabilize Video',
        description: 'Remove shakiness from your video.',
        category: 'Video Tools',
        icon: Activity,
        tags: ['Limited'],
    },
    {
        id: 'video-downloader',
        title: 'Video Downloader',
        description: 'Download videos from various platforms using just a link.',
        category: 'Link Tools',
        icon: Download,
        tags: ['Online', 'New'],
    },
    {
        id: 'video-recorder',
        title: 'Video Recorder',
        description: 'Record video from your webcam.',
        category: 'Video Tools',
        icon: Video,
    },

    // Audio Tools
    {
        id: 'trim-audio',
        title: 'Trim Audio',
        description: 'Cut out unwanted parts of your audio.',
        category: 'Audio Tools',
        icon: Scissors,
    },
    {
        id: 'voice-recorder',
        title: 'Voice Recorder',
        description: 'Record audio from your microphone.',
        category: 'Audio Tools',
        icon: Mic,
    },
    {
        id: 'change-pitch',
        title: 'Change Pitch',
        description: 'Change the pitch of your audio file.',
        category: 'Audio Tools',
        icon: Music,
    },

    // Converters
    {
        id: 'audio-converter',
        title: 'Audio Converter',
        description: 'Convert audio files to different formats.',
        category: 'Converters',
        icon: Music,
        tags: ['Online'],
    },
    {
        id: 'video-converter',
        title: 'Video Converter',
        description: 'Convert video files to different formats.',
        category: 'Converters',
        icon: Video,
        tags: ['Heavy'],
    },
    {
        id: 'image-converter',
        title: 'Image Converter',
        description: 'Convert image files to different formats.',
        category: 'Converters',
        icon: Image,
        tags: ['Light', 'Direct'],
    },
    {
        id: 'document-converter',
        title: 'Document Converter',
        description: 'Convert documents between various formats.',
        category: 'Converters',
        icon: FileText,
    },
    {
        id: 'font-converter',
        title: 'Font Converter',
        description: 'Convert font files to different formats.',
        category: 'Converters',
        icon: Type,
    },
    {
        id: 'archive-extract',
        title: 'Archive Extractor',
        description: 'Extract files from compressed archives.',
        category: 'Converters',
        icon: FileArchive,
    },
    // System Tools
    {
        id: 'device-inspector',
        title: 'Device Inspector',
        description: 'Check your device performance, network latency, and system specifications.',
        category: 'System Tools',
        icon: Activity,
        tags: ['Light', 'Direct'],
    },
    {
        id: 'metadata-checker',
        title: 'Metadata Checker',
        description: 'View and analyze metadata for any file. Supports multiple files.',
        category: 'System Tools',
        icon: FileText,
        tags: ['Light', 'Direct', 'New'],
    },
    // Link Tools
    {
        id: 'qr-generator',
        title: 'QR Code Generator',
        description: 'Generate high-quality QR codes for links, text, or contact information.',
        category: 'Link Tools',
        icon: QrCode,
        tags: ['Light', 'Direct', 'New'],
    },
    {
        id: 'url-encoder',
        title: 'URL Encoder/Decoder',
        description: 'Safely encode or decode URLs for web compatibility.',
        category: 'Link Tools',
        icon: Link2,
        tags: ['Light', 'Direct', 'New'],
    },
    {
        id: 'url-shortener',
        title: 'URL Shortener',
        description: 'Transform long, complex links into short, shareable URLs.',
        category: 'Link Tools',
        icon: Scissors,
        tags: ['Light', 'Online', 'New'],
    },
];
