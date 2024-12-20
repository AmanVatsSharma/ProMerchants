
// auth.ts
import { prisma } from "@/lib/prisma"
import { signInSchema } from "@/schemas"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import AppleProvider from "next-auth/providers/apple"
import FacebookProvider from "next-auth/providers/facebook"
import bcrypt from "bcryptjs"
import { getUserById } from "./data/user"

export const { handlers, signIn, signOut, auth } = NextAuth({

    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
        AppleProvider({
            clientId: process.env.AUTH_APPLE_ID!,
            clientSecret: process.env.AUTH_APPLE_SECRET!,
        }),
        FacebookProvider({
            clientId: process.env.AUTH_FACEBOOK_CLIENT_ID!,
            clientSecret: process.env.AUTH_FACEBOOK_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const validatedFields = signInSchema.safeParse(credentials)

                if (!validatedFields.success) {
                    return null
                }

                const { email, password } = validatedFields.data

                const user = await prisma.user.findUnique({
                    where: { email }
                })

                if (!user || !user.password) {
                    return null
                }

                const passwordsMatch = await bcrypt.compare(password, user.password)

                if (!passwordsMatch) {
                    return null
                }

                return user
            },
        }),
    ],
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },
    events: {
        async linkAccount({ user }) {
            await prisma.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {

            // allow OAuth without email verification
            if (account?.provider !== "credentials")
                return true;

            const existingUser = await getUserById(user.id)

            // prevent sign in without email verification
            if (!existingUser?.emailVerified) return false

            // Todo: Add 2FA check
            return true;
        },
        async session({ session, token }) {
            if (token) {
                session.user = session.user || {}; // Ensure `user` object is initialized
                session.user.id = token.id as string;
                session.user.name = token.name;
                session.user.email = token.email;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
})

