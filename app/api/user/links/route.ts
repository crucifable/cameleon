import { auth } from "@/auth";
import { getUserLinks } from "@/lib/short-db";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
    try {
        const session = await auth();
        if (!session || !(session.user as any)?.discordId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const discordId = (session.user as any).discordId;
        const links = await getUserLinks(discordId);

        return NextResponse.json({ links });
    } catch (error) {
        console.error("Fetch User Links Error:", error);
        return NextResponse.json({ error: "Failed to fetch links" }, { status: 500 });
    }
}
