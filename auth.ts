// //auth.ts
// import { prisma } from "@/lib/prisma"
// import { signInSchema } from "@/schemas"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import NextAuth from "next-auth"
// import credentials from "next-auth/providers/credentials"
// import google from "next-auth/providers/google"

// export const { handlers, signIn, signOut, auth } = NextAuth({
//     adapter: PrismaAdapter(prisma),
//     providers: [
//         google,
//         credentials({
//             // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//             // e.g. domain, username, password, 2FA token, etc.
//             credentials: {
//                 email: {},
//                 password: {},
//             },
//             authorize: async (credentials) => {

//                 const { email, password } = await signInSchema.parseAsync(credentials)

//                 // logic to salt and hash password
//                 // const pwHash = saltAndHashPassword(credentials.password)

//                 // logic to verify if the user exists
//                 // user = await getUserFromDb(credentials.email, pwHash)

//                 const user = await prisma.user.findUnique({
//                     where: { email: credentials.email }
//                 })

//                 if (!user) {
//                     // No user found, so this is their first attempt to login
//                     // meaning this is also the place you could do registration
//                     throw new Error("User not found.")
//                 }

//                 // return user object with their profile data
//                 return user
//             },
//         }),
//     ],
//     session: {
//         strategy: "jwt"
//     },
//     pages: {
//         signIn: '/auth/signin',
//         // Add custom pages as needed
//     }
// })


// auth.ts
import { prisma } from "@/lib/prisma"
import { signInSchema } from "@/schemas"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
        signIn: '/auth/signin',
    },
    callbacks: {
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            return session
        },
        async jwt({ token }) {
            const dbUser = await prisma.user.findUnique({
                where: { id: token.sub },
            })
            if (dbUser) {
                token.role = dbUser.role
            }
            return token
        }
    }
})