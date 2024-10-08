"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FaLock, FaUnlock, FaEnvelope, FaClock, FaExclamationTriangle } from 'react-icons/fa'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const AccountLockoutPage = () => {
    const [lockoutEndTime, setLockoutEndTime] = useState(Date.now() + 15 * 60 * 1000) // 15 minutes from now
    const [timeRemaining, setTimeRemaining] = useState(15 * 60) // 15 minutes in seconds
    const [email, setEmail] = useState('')
    const [isRequestingUnlock, setIsRequestingUnlock] = useState(false)
    const [unlockRequestSent, setUnlockRequestSent] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        const timer = setInterval(() => {
            const now = Date.now()
            const remaining = Math.max(0, Math.floor((lockoutEndTime - now) / 1000))
            setTimeRemaining(remaining)

            if (remaining === 0) {
                clearInterval(timer)
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [lockoutEndTime])

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = seconds % 60
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    }

    const handleUnlockRequest = async () => {
        setIsRequestingUnlock(true)
        setError('')

        // Simulating API call to request account unlock
        try {
            await new Promise(resolve => setTimeout(resolve, 2000))
            // For demonstration, we'll consider the request successful if the email is not empty
            if (email.trim() !== '') {
                setUnlockRequestSent(true)
            } else {
                throw new Error('Please enter a valid email address.')
            }
        } catch (err) {
            setError(err.message || 'An error occurred while processing your request.')
        } finally {
            setIsRequestingUnlock(false)
        }
    }

    return (
            <Card className="w-full max-w-md overflow-hidden m-10">
                <CardHeader className="bg-red-600 text-white">
                    <CardTitle className="text-2xl font-bold flex items-center justify-center">
                        <FaLock className="mr-2" />
                        Account Locked
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key="lockout-info"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="text-center mb-6">
                                <FaExclamationTriangle className="text-5xl text-yellow-500 mb-4 mx-auto" />
                                <h2 className="text-xl font-semibold mb-2">Your account has been temporarily locked</h2>
                                <p className="text-gray-600">
                                    Due to multiple failed login attempts, your account has been locked for security reasons.
                                </p>
                            </div>

                            {timeRemaining > 0 ? (
                                <div className="mb-6">
                                    <h3 className="font-semibold mb-2 text-center">Time remaining until you can try again:</h3>
                                    <div className="w-32 h-32 mx-auto">
                                        <CircularProgressbar
                                            value={(timeRemaining / (15 * 60)) * 100}
                                            text={formatTime(timeRemaining)}
                                            styles={buildStyles({
                                                textSize: '16px',
                                                pathColor: '#10B981',
                                                textColor: '#374151',
                                                trailColor: '#E5E7EB',
                                            })}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center mb-6">
                                    <FaUnlock className="text-5xl text-green-500 mb-4 mx-auto" />
                                    <p className="text-green-600 font-semibold">
                                        The lockout period has ended. You can now attempt to log in again.
                                    </p>
                                    <Button
                                        onClick={() => {/* Navigate to login page */ }}
                                        className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                                    >
                                        Go to Login
                                    </Button>
                                </div>
                            )}

                            {!unlockRequestSent && (
                                <div className="mt-6">
                                    <h3 className="font-semibold mb-2">Request Account Unlock</h3>
                                    <p className="text-sm text-gray-600 mb-4">
                                        If you believe this lockout is an error, you can request to unlock your account:
                                    </p>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <div className="relative">
                                                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    placeholder="your@email.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="pl-10"
                                                />
                                            </div>
                                        </div>
                                        {error && <p className="text-red-500 text-sm">{error}</p>}
                                        <Button
                                            onClick={handleUnlockRequest}
                                            disabled={isRequestingUnlock}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                        >
                                            {isRequestingUnlock ? 'Sending Request...' : 'Request Unlock'}
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {unlockRequestSent && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700"
                                >
                                    <p className="font-bold">Unlock Request Sent!</p>
                                    <p>Please check your email for further instructions on how to unlock your account.</p>
                                </motion.div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </CardContent>
                <CardFooter className="bg-gray-50 p-4">
                    <p className="text-sm text-gray-600 text-center w-full">
                        If you need immediate assistance, please contact our{' '}
                        <a href="mailto:support@promerchants.com" className="text-blue-600 hover:underline">
                            support team
                        </a>
                        .
                    </p>
                </CardFooter>
            </Card>
    )
}

export default AccountLockoutPage