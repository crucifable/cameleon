import { auth } from "@/auth"
import { NextResponse } from "next/server"

export const runtime = 'edge'

export async function POST(req: Request) {
    const session = await auth()

    if (!session || !session.user) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const body = await req.json()
        const { type, toolName, toolDescription, toolUrl } = body

        if (!type || !toolName || !toolDescription) {
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

        const typeLabels: Record<string, string> = {
            feature: "✨ Missing Feature / Inaccuracy",
            bug: "🐛 Bug Report",
            request: "🛠️ New Tool Request",
            other: "📝 Other Feedback"
        }

        const discordPayload = {
            content: `📣 **New Feedback Received: ${typeLabels[type] || type}**`,
            embeds: [
                {
                    title: toolName,
                    description: toolDescription,
                    color: type === 'bug' ? 15548997 : (type === 'feature' ? 5763719 : 5814783),
                    fields: [
                        {
                            name: "Type",
                            value: typeLabels[type] || type,
                            inline: true,
                        },
                        {
                            name: "Reference URL",
                            value: toolUrl || "N/A",
                            inline: true,
                        },
                        {
                            name: "Submitted By",
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
