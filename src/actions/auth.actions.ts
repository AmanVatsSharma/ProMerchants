// actions/auth.ts

"use server"
import { signInSchema, signUpSchema } from "@/schemas"
import { prisma } from "@/lib/prisma"
import { AuthError } from "next-auth"
import { signIn } from "../../auth"
import bcrypt from 'bcryptjs';
import * as z from 'zod'
import { generateVerificationToken } from "@/lib/tokens"
import { getUserByEmail } from "../../data/user"
import { sendVerificationEmail } from "@/lib/ResendMail"

export const login = async (values: z.infer<typeof signInSchema>) => {
    const validatedFields = signInSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email, password } = validatedFields.data

    const existingUser = await getUserByEmail(email)

    if (!existingUser || !existingUser.email || !existingUser.password) {
        return { error: "Email does not exist!" }
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(existingUser.email)

        return {success: "Confirmation email sent!"}
    }

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/dashboard"
        })
        return { success: "Logged in successfully!" }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Something went wrong!" }
            }
        }
        throw error
    }
}

export const register = async (values: z.infer<typeof signUpSchema>) => {
    const validatedFields = signUpSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email, password, name } = validatedFields.data

    const existingUser = await prisma.user.findUnique({
        where: { email }
    })

    if (existingUser) {
        return { error: "Email already in use!" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        })

        const verificationToken = await generateVerificationToken(email)
        await sendVerificationEmail(verificationToken.email, verificationToken.token)

        return { success: "Confirmation email sent!" }
    } catch (error) {
        console.error("Registration error:", error)
        return { error: "Something went wrong during registration!" }
    }


}