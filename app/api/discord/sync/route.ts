import { auth } from "@/auth";
import { syncDiscordMetadata } from "@/lib/discord-metadata";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const session = await auth() as any;

    if (!session || !session.accessToken) {
        return NextResponse.json({ error: "Unauthorized or missing access token" }, { status: 401 });
    }

    try {
        const { tools_used, last_tool_title } = await req.json();

        const success = await syncDiscordMetadata(session.accessToken, {
            tools_used: tools_used || 0,
            last_tool_title: last_tool_title || "Cameleon Active"
        });

        if (success) {
            return NextResponse.json({ message: "Discord metadata synced successfully" });
        } else {
            return NextResponse.json({ error: "Failed to sync Discord metadata" }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
}
