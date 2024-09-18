"use client"

import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { forgotPassword } from '@/actions/auth'
import { FaEnvelope } from 'react-icons/fa'
import CardWrapper from '@/components/auth/CardWrapper'
import FormError from '@/components/form-error'
import FormSucess from '@/components/form-sucess'

const forgotPasswordSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
})

const ForgotPasswordForm = () => {
    const [isPending, startTransition] = useTransition()
    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")

    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
        setError("")
        setSuccess("")

        try {
            startTransition(async () => {
                await forgotPassword(values)
                    .then((data) => {
                        setError(data.error)
                        setSuccess(data.success)
                    })
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
            <CardWrapper
                headerLabel='Forgot your password?'
                backButtonLabel="Back to login"
                backButtonHref='/auth/login'
                showSocial={false}
            >
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                        <div className='space-y-4'>
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-gray-700">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="john.doe@example.com"
                                                    type='email'
                                                    className="pl-10 border-gray-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 rounded-md shadow-sm"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormError message={error} />
                        <FormSucess message={success} />
                        <Button
                            disabled={isPending}
                            type='submit'
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                        >
                            {isPending ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Sending reset link...
                                </div>
                            ) : (
                                "Send Password Reset Link"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardWrapper>
    )
}

export default ForgotPasswordForm