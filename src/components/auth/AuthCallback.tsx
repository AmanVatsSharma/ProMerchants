import React, {  useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FaGoogle, FaFacebook, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'
import confetti from 'canvas-confetti'

type SocialProvider = 'google' | 'facebook'


const AuthCallback = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [errorMessage, setErrorMessage] = useState<string | undefined>('')
    const [provider, setProvider] = useState<SocialProvider>('google')

    useEffect(() => {

        const authCode = searchParams?.get('code')
        const state = searchParams?.get('state')
        const error = searchParams?.get('error')

        if (error) {
            setStatus('error')
            setErrorMessage(error)
            return
        }

        if (!authCode || !state) {
            setStatus('error')
            setErrorMessage('Invalid callback parameters')
            return
        }

        // Determine the provider from the state parameter
        setProvider(state.includes('google') ? 'google' : 'facebook')

        handleSocialAuth(authCode, state)
    }, [searchParams])

    const handleSocialAuth = async (authCode: string, state: string) => {
        try {
            // Simulating API call to exchange auth code for tokens
            await new Promise(resolve => setTimeout(resolve, 2000))

            // For demonstration purposes, we'll randomly succeed or fail
            if (Math.random() > 0.2) {
                setStatus('success')
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                })
            } else {
                throw new Error('Authentication failed')
            }
        } catch (error) {
            setStatus('error')
            setErrorMessage(error?.message || 'An unexpected error occurred')
        }
    }

    const getProviderIcon = (provider: SocialProvider) => {
        switch (provider) {
            case 'google':
                return <FaGoogle className="text-4xl text-red-500" />
            case 'facebook':
                return <FaFacebook className="text-4xl text-blue-600" />
        }
    }

    const getProviderName = (provider: SocialProvider) => {
        return provider.charAt(0).toUpperCase() + provider.slice(1)
    }

  return (
    <Card className="w-full max-w-md overflow-hidden p-2">
    <CardHeader className="bg-green-600 text-white rounded-md">
        <CardTitle className="text-2xl font-bold text-center">
            {status === 'loading' ? 'Authenticating...' : status === 'success' ? 'Authentication Successful' : 'Authentication Failed'}
        </CardTitle>
    </CardHeader>
    <CardContent className="p-6">
        <AnimatePresence mode="wait">
            {status === 'loading' && (
                <motion.div
                    key="loading"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                >
                    <div className="flex justify-center mb-4">{getProviderIcon(provider)}</div>
                    <h2 className="text-xl font-semibold mb-2">Connecting to {getProviderName(provider)}</h2>
                    <p className="text-gray-600 mb-4">Please wait while we complete the authentication process...</p>
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 mx-auto"></div>
                </motion.div>
            )}
            {status === 'success' && (
                <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                >
                    <FaCheckCircle className="text-6xl text-green-500 mb-4 mx-auto" />
                    <h2 className="text-2xl font-semibold mb-2">Welcome to ProMerchants!</h2>
                    <p className="text-gray-600 mb-6">
                        You have successfully authenticated with {getProviderName(provider)}.
                    </p>
                    <Button
                        onClick={() => router.push('/dashboard')}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                    >
                        Go to Dashboard
                    </Button>
                </motion.div>
            )}
            {status === 'error' && (
                <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                >
                    <FaExclamationTriangle className="text-6xl text-yellow-500 mb-4 mx-auto" />
                    <h2 className="text-xl font-semibold mb-2">Authentication Failed</h2>
                    <p className="text-red-600 mb-6">{errorMessage}</p>
                    <Button
                        onClick={() => router.push('/auth/login')}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                    >
                        Back to Login
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    </CardContent>
    <CardFooter className="bg-gray-50 p-4">
        <p className="text-sm text-gray-600 text-center w-full">
            By logging in, you agree to our{' '}
            <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and{' '}
            <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
        </p>
    </CardFooter>
</Card>
)
}

export default AuthCallback