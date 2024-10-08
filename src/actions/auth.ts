// //actions/auth.ts
// "use server"
// import { signInSchema, signUpSchema } from '@/schemas'
// import * as z from 'zod'

// export const login = async (values: z.infer<typeof signInSchema>) => {
//     console.log(values)
//     const validatedFields = signInSchema.safeParse(values)

//     if (!validatedFields) {
//         return { error: "Invalid Fields" }
//     }

//     return { success: "Authenticated Sucessfully!" }

// }

// export const register = async (values: z.infer<typeof signUpSchema>) => {
//     console.log(values)
//     const validatedFields = signUpSchema.safeParse(values)

//     if (!validatedFields) {
//         return { error: "Invalid Fields" }
//     }

//     return { success: "Authenticated Sucessfully!" }

// }

// export const forgotPassword = async (values: string) => {
//     console.log(values)

//     return { success: "Authenticated Sucessfully!" }
// }


// actions/auth.ts

"use server"
import { signInSchema, signUpSchema } from "@/schemas"
import { prisma } from "@/lib/prisma"
import { AuthError } from "next-auth"
import { signIn } from "../../auth"
import  bcrypt  from 'bcryptjs';
import * as z from 'zod'

export const login = async (values: z.infer<typeof signInSchema>) => {
    const validatedFields = signInSchema.safeParse(values)

    if (!validatedFields.success) {
        return { error: "Invalid fields!" }
    }

    const { email, password } = validatedFields.data

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

        return { success: "User registered successfully!" }
    } catch (error) {
        console.error("Registration error:", error)
        return { error: "Something went wrong during registration!" }
    }
}