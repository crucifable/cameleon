import { getOriginalUrl } from "@/lib/short-db";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ code: string }> }
) {
    const code = (await params).code;

    // Ignore requests for system files or common next.js paths if they fall through
    if (code.includes('.') || code === 'favicon.ico') {
        return new Response(null, { status: 404 });
    }

    const originalUrl = await getOriginalUrl(code);

    if (originalUrl) {
        return NextResponse.redirect(originalUrl);
    }

    // If not found, redirect to home or show 404
    return NextResponse.redirect(new URL('/', request.url));
}
