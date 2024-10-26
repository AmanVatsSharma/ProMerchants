// actions/auth.ts

"use server"
import { signInSchema, signUpSchema } from "@/schemas"
import { prisma } from "@/lib/prisma"
import { AuthError } from "next-auth"
import { signIn } from "../../auth"
import bcrypt from 'bcryptjs';
import * as z from 'zod'
import { generatePasswordResetVerificationToken, generateVerificationToken } from "@/lib/tokens"
import { getUserByEmail } from "../../data/user"
import { sendPasswordResetEmail, sendVerificationEmail } from "@/lib/ResendMail"
import { getVerificationTokenByToken } from "../../data/verification-token"
import { PasswordResetResponse } from "../../types"

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
        await sendVerificationEmail(verificationToken.email, verificationToken.token)

        return { success: "Confirmation email sent!" }
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


export const newVerification = async (token: string) => {

    const existingToken = await getVerificationTokenByToken(token)

    if (!existingToken) {
        return { error: "Token does not exist!" }
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Token has expired!" }
    }

    const existingUser = await getUserByEmail(existingToken.email)

    if (!existingUser) {
        return { error: "Email does not exist!" }
    }

    await prisma.user.update({
        where: { id: existingUser.id },
        data: {
            emailVerified: new Date(),
            email: existingToken.email
        }
    });

    await prisma.verificationToken.delete({
        where: { token },
    })

    return { success: "Email verified!" }
}

export const resetPassword = async (values: { email: string }): Promise<PasswordResetResponse> => {
    if (!values.email) {
        return { error: "Email is required" };
    }

    try {
        const existingUser = await getUserByEmail(values.email);

        // For security, we don't want to reveal if an email exists or not
        if (!existingUser) {
            return {
                success: "If an account exists with this email, you will receive password reset instructions shortly"
            };
        }

        const passwordResetToken = await generatePasswordResetVerificationToken(values.email);
        await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

        return {
            success: "If an account exists with this email, you will receive password reset instructions shortly"
        };
    } catch (error) {
        console.error("Password reset error:", error);
        return {
            error: "Something went wrong. Please try again later."
        };
    }
};

