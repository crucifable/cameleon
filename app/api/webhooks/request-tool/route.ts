import { auth } from "@/auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const session = await auth()

    if (!session || !session.user) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const body = await req.json()
        const { toolName, toolDescription, toolUrl } = body

        if (!toolName || !toolDescription) {
            return new NextResponse("Missing required fields", { status: 400 })
        }

        const webhookUrl = process.env.DISCORD_WEBHOOK_URL
        const guildId = process.env.DISCORD_GUILD_ID

        if (!webhookUrl) {
            console.error("DISCORD_WEBHOOK_URL is not set")
            return new NextResponse("Server Configuration Error", { status: 500 })
        }

        // Get Discord user info from session
        const discordId = (session.user as any).discordId
        const discordUsername = (session.user as any).discordUsername
        const discordDiscriminator = (session.user as any).discordDiscriminator
        const accessToken = (session as any).accessToken

        // Format Discord tag (username#0 for new system, username#discriminator for old)
        const discordTag = discordDiscriminator && discordDiscriminator !== "0"
            ? `${discordUsername}#${discordDiscriminator}`
            : `@${discordUsername}`

        // Check if user is in the server (if guild ID is provided)
        if (guildId && accessToken) {
            try {
                const guildMemberResponse = await fetch(
                    `https://discord.com/api/v10/users/@me/guilds/${guildId}/member`,
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                )

                if (!guildMemberResponse.ok) {
                    return new NextResponse(
                        "You must be a member of our Discord server to submit requests. Please join our server first.",
                        { status: 403 }
                    )
                }
            } catch (error) {
                console.error("Error checking guild membership:", error)
                // Continue anyway if check fails (optional: you can make this stricter)
            }
        }

        const discordPayload = {
            content: "🛠️ **New Tool Request Received!**",
            embeds: [
                {
                    title: toolName,
                    description: toolDescription,
                    color: 5814783, // Bluish color
                    fields: [
                        {
                            name: "Reference URL",
                            value: toolUrl || "N/A",
                        },
                        {
                            name: "Requested By",
                            value: `${session.user.name || discordTag}`,
                            inline: true,
                        },
                        {
                            name: "Discord Tag",
                            value: discordTag,
                            inline: true,
                        },
                        {
                            name: "Discord ID",
                            value: discordId || "Unknown",
                            inline: true,
                        },
                    ],
                    timestamp: new Date().toISOString(),
                },
            ],
        }

        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(discordPayload),
        })

        if (!response.ok) {
            throw new Error(`Discord API error: ${response.statusText}`)
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error sending webhook:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
