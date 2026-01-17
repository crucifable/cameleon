import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;

    if (!id || !/^\d+$/.test(id)) {
        return NextResponse.json({ error: "Invalid User ID" }, { status: 400 });
    }

    const botToken = process.env.DISCORD_BOT_TOKEN;

    if (!botToken) {
        return NextResponse.json({
            error: "Discord Bot Token not configured. Please add DISCORD_BOT_TOKEN to environment variables."
        }, { status: 500 });
    }

    try {
        const response = await fetch(`https://discord.com/api/v10/users/${id}`, {
            headers: {
                Authorization: `Bot ${botToken}`,
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }
            throw new Error(`Discord API error: ${response.statusText}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Discord Lookup Error:", error);
        return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
    }
}
