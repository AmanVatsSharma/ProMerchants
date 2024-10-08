"use client"
import React, { Suspense } from 'react'
import EmailVerification from '@/components/auth/EmailVerification'

const EmailVerificationPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EmailVerification />
        </Suspense>
    )
}

export default EmailVerificationPage