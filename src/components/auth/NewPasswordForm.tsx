"use client";

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FaEnvelope } from 'react-icons/fa';
import CardWrapper from '@/components/auth/CardWrapper';
import FormError from '@/components/form-error';
import FormSucess from '@/components/form-sucess';
import { useSearchParams } from 'next/navigation';
import { newPassword } from '@/actions/auth.actions';

const forgotPasswordSchema = z.object({
    password: z.string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token")
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const form = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            password: "",
        }
    });

    const onSubmit = (values: ForgotPasswordFormValues) => {
        setError(undefined);
        setSuccess(undefined);

        startTransition(async () => {
            try {
                const response = await newPassword(values, token);

                if (response?.error) {
                    setError(response.error);
                } else if (response?.success) {
                    setSuccess(response.success);
                    form.reset();
                } else {
                    setError("An unexpected error occurred. Please try again.");
                }
            } catch (error) {
                setError("An unexpected error occurred. Please try again.");
                console.error("Form submission error:", error);
            }
        });
    };

    return (
        <CardWrapper
            headerLabel="Enter a new password"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
            showSocial={false}
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <FaEnvelope
                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                            />
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                placeholder="*********"
                                                type="password"
                                                className="pl-10"
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
                                <svg
                                    className="animate-spin -ml-1 mr-3 h-5 w-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Password is resetting...
                            </div>
                        ) : (
                            "Reset Password"
                        )}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};

export default ForgotPasswordForm;

