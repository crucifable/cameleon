import NextAuth from "next-auth"
import Discord from "next-auth/providers/discord"

if (!process.env.AUTH_SECRET) {
    console.warn("Warning: AUTH_SECRET is not set in environment variables.")
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Discord({
            authorization: {
                params: {
                    scope: "identify email",
                },
            },
        }),
    ],
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, account, profile }) {
            if (account && profile) {
                token.discordId = profile.id as string
                token.discordUsername = (profile as any).username as string
                token.discordDiscriminator = (profile as any).discriminator as string
                token.accessToken = account.access_token as string
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).discordId = token.discordId as string
                (session.user as any).discordUsername = token.discordUsername as string
                (session.user as any).discordDiscriminator = token.discordDiscriminator as string
                (session as any).accessToken = token.accessToken as string
            }
            return session
        },
    },
})
