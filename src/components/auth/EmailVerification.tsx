import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FaCheckCircle, FaExclamationTriangle, FaEnvelope } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'


const EmailVerification = ( ) => {
    const searchParams = useSearchParams()
    const [token, setToken] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)

    const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending')
    const [isResending, setIsResending] = useState(false)
    const [resendCooldown, setResendCooldown] = useState(0)

    useEffect(() => {
        // Check if we're on the client before accessing search params
        if (typeof window !== 'undefined') {
            setToken(searchParams?.get('token') ?? '123456')
            setEmail(searchParams?.get('email') ?? 'test@email.com')
        }
    }, [searchParams])

    useEffect(() => {
        if (token) {
            verifyEmail(token)
        }
    }, [token])

    const verifyEmail = async (token: string) => {
        await new Promise(resolve => setTimeout(resolve, 2000))

        const success = Math.random() > 0.5
        setVerificationStatus(success ? 'success' : 'error')

        if (success) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            })
        }
    }

    const resendVerificationEmail = async () => {
        setIsResending(true)
        await new Promise(resolve => setTimeout(resolve, 2000))
        setIsResending(false)
        setResendCooldown(60)

        const countdownInterval = setInterval(() => {
            setResendCooldown((prevCooldown) => {
                if (prevCooldown <= 1) {
                    clearInterval(countdownInterval)
                    return 0
                }
                return prevCooldown - 1
            })
        }, 1000)
    }


    return (
        <Card className="w-full max-w-md overflow-hidden">
        <CardHeader className="bg-green-600 text-white p-6">
            <CardTitle className="text-2xl font-bold text-center">Email Verification</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
            <AnimatePresence mode="wait">
                {verificationStatus === 'pending' && (
                    <motion.div
                        key="pending"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="text-center"
                    >
                        <FaEnvelope className="mx-auto text-6xl text-green-600 mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Verifying your email</h2>
                        <p className="text-gray-600 mb-4">Please wait while we verify your email address...</p>
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 mx-auto"></div>
                    </motion.div>
                )}
                {verificationStatus === 'success' && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="text-center"
                    >
                        <FaCheckCircle className="mx-auto text-6xl text-green-600 mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Email Verified!</h2>
                        <p className="text-gray-600">Your email has been successfully verified. You can now access all features of ProMerchants.</p>
                    </motion.div>
                )}
                {verificationStatus === 'error' && (
                    <motion.div
                        key="error"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="text-center"
                    >
                        <FaExclamationTriangle className="mx-auto text-6xl text-yellow-500 mb-4" />
                        <h2 className="text-xl font-semibold mb-2">Verification Failed</h2>
                        <p className="text-gray-600 mb-4">We couldn&apos;t verify your email. The link may have expired or been used already.</p>
                        <Button
                            onClick={resendVerificationEmail}
                            disabled={isResending || resendCooldown > 0}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                        >
                            {isResending ? 'Resending...' : resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Verification Email'}
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </CardContent>
        <CardFooter className="bg-gray-50 p-4">
            <p className="text-sm text-gray-600 text-center w-full">
                If you&apos;re having trouble, please contact <a href="mailto:support@promerchants.com" className="text-green-600 hover:underline">support@promerchants.com</a>
            </p>
        </CardFooter>
    </Card>
)
}

export default EmailVerification