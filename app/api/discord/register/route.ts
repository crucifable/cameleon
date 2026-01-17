import { auth } from "@/auth";
import { registerDiscordMetadataSchema } from "@/lib/discord-metadata";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST() {
    const session = await auth();

    // In a real app, you'd want to restrict this to admins
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const success = await registerDiscordMetadataSchema();

    if (success) {
        return NextResponse.json({ message: "Discord metadata schema registered successfully" });
    } else {
        return NextResponse.json({ error: "Failed to register Discord metadata schema" }, { status: 500 });
    }
}
