//actions/auth.ts
"use server"
import { signInSchema, signUpSchema } from '@/schemas'
import * as z from 'zod'

export const login = async (values: z.infer<typeof signInSchema>) => {
    console.log(values)
    const validatedFields = signInSchema.safeParse(values)

    if (!validatedFields) {
        return { error: "Invalid Fields" }
    }

    return { success: "Authenticated Sucessfully!" }

}

export const register = async (values: z.infer<typeof signUpSchema>) => {
    console.log(values)
    const validatedFields = signUpSchema.safeParse(values)

    if (!validatedFields) {
        return { error: "Invalid Fields" }
    }

    return { success: "Authenticated Sucessfully!" }

}

export const forgotPassword = async (values: string) => {
    console.log(values)

    return { success: "Authenticated Sucessfully!" }
}
