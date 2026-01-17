"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { ExternalLink, Copy, Check, Clock, AlertCircle } from "lucide-react";
import { ShortLink } from "@/lib/short-db";

const allColumns = [
  "Alias",
  "Original URL",
  "Expires In",
  "Status",
  "Actions"
] as const;

export default function ShortLinkTable() {
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const res = await fetch("/api/user/links");
      const data = await res.json();
      if (data.links) {
        setLinks(data.links);
      }
    } catch (err) {
      console.error("Failed to fetch links:", err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (code: string) => {
    const url = `https://ccameleon.com/${code}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const filteredData = links.filter((link) => {
    return (
      link.code.toLowerCase().includes(search.toLowerCase()) ||
      link.url.toLowerCase().includes(search.toLowerCase())
    );
  });

  const getStatus = (expiresAt: number) => {
    const now = Date.now();
    return now > expiresAt ? "Expired" : "Active";
  };

  const getTimeRemaining = (expiresAt: number) => {
    const now = Date.now();
    const diff = expiresAt - now;
    if (diff <= 0) return "Expired";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h remaining`;
  };

  return (
    <div className="space-y-4 p-6 border border-white/10 rounded-[2rem] bg-background/40 backdrop-blur-xl shadow-2xl overflow-hidden animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-2">
        <h2 className="text-xl font-bold font-product flex items-center gap-2">
          <Clock className="size-5 text-primary" />
          Your Shortened Links
        </h2>
        <Input
          placeholder="Search links..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-64 bg-white/5 border-white/10 rounded-xl"
        />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/5 bg-black/20">
        <Table>
          <TableHeader className="bg-white/5">
            <TableRow className="hover:bg-transparent border-white/10">
              <TableHead className="font-bold text-white py-4">Alias</TableHead>
              <TableHead className="font-bold text-white py-4">Original URL</TableHead>
              <TableHead className="font-bold text-white py-4">Expires In</TableHead>
              <TableHead className="font-bold text-white py-4 text-center">Status</TableHead>
              <TableHead className="font-bold text-white py-4 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground animate-pulse">
                  Loading your links...
                </TableCell>
              </TableRow>
            ) : filteredData.length ? (
              filteredData.map((link) => {
                const status = getStatus(link.expiresAt);
                return (
                  <TableRow key={link.code} className="border-white/5 hover:bg-white/5 transition-colors group">
                    <TableCell className="font-mono font-bold text-primary py-4">
                      /{link.code}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate py-4 text-muted-foreground group-hover:text-white transition-colors">
                      {link.url}
                    </TableCell>
                    <TableCell className="py-4 font-medium italic text-muted-foreground/80">
                      {getTimeRemaining(link.expiresAt)}
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <Badge
                        className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                          status === "Active"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                        )}
                      >
                        {status}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(link.code)}
                          className="size-9 rounded-xl hover:bg-primary/20 hover:text-primary"
                        >
                          {copiedCode === link.code ? <Check className="size-4" /> : <Copy className="size-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="size-9 rounded-xl hover:bg-primary/20 hover:text-primary"
                        >
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="size-4" />
                          </a>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 space-y-2">
                  <div className="flex justify-center mb-2">
                    <AlertCircle className="size-10 text-muted-foreground/20" />
                  </div>
                  <p className="text-muted-foreground font-product text-lg">No shortened links found.</p>
                  <p className="text-sm text-muted-foreground/60">Links you create will show up here for 7 days.</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}