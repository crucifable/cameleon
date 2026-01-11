/**
 * Utility to sync user activity metadata with Discord Linked Roles.
 * This allows showing Cameleon stats directly on a user's Discord profile.
 */

interface DiscordMetadata {
    tools_used?: number;
    last_tool_title?: string;
}

export async function syncDiscordMetadata(accessToken: string, metadata: DiscordMetadata) {
    const url = `https://discord.com/api/v10/users/@me/applications/${process.env.DISCORD_CLIENT_ID}/role-connection`;

    const body = {
        platform_name: "Cameleon",
        platform_username: metadata.last_tool_title || "Cameleon Alpha",
        metadata: {
            tools_used: metadata.tools_used || 0,
        },
    };

    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('Failed to sync Discord metadata:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error syncing Discord metadata:', error);
        return false;
    }
}

/**
 * ONE-TIME SETUP: Run this once to register your metadata schema with Discord.
 * You would normally run this via a standalone script or an admin route.
 */
export async function registerDiscordMetadataSchema() {
    const url = `https://discord.com/api/v10/applications/${process.env.DISCORD_CLIENT_ID}/role-connections/metadata`;

    const body = [
        {
            key: 'tools_used',
            name: 'Tools Used',
            description: 'The number of Cameleon tools you have utilized.',
            type: 2, // INTEGER_GREATER_THAN_OR_EQUAL
        },
    ];

    try {
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
                'Content-Type': 'application/json',
            },
        });

        return response.ok;
    } catch (error) {
        console.error('Error registering schema:', error);
        return false;
    }
}
