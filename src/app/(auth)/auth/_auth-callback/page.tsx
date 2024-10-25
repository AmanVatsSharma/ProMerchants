"use client"

import React, { Suspense } from 'react'
import AuthCallback from '@/components/auth/AuthCallback'


const SocialAuthCallback = () => {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthCallback />
        </Suspense>
    )
}

export default SocialAuthCallback