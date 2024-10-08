"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FaLock, FaQrcode, FaKey, FaCheck, FaCopy } from 'react-icons/fa'
import {QRCodeCanvas} from 'qrcode.react'

const TwoFactorSetupPage = () => {
    const [step, setStep] = useState(1)
    const [secret, setSecret] = useState('')
    const [qrCodeUrl, setQrCodeUrl] = useState('')
    const [verificationCode, setVerificationCode] = useState('')
    const [backupCodes, setBackupCodes] = useState<string[]>([])
    const [isVerifying, setIsVerifying] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        // Simulating API call to get 2FA secret and QR code URL
        const fetchSecretAndQR = async () => {
            // In a real application, this would be an API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            setSecret('JBSWY3DPEHPK3PXP')
            setQrCodeUrl('otpauth://totp/ProMerchants:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=ProMerchants')
        }
        fetchSecretAndQR()
    }, [])

    const generateBackupCodes = () => {
        // In a real application, this would be generated securely on the server
        const codes = Array.from({ length: 8 }, () =>
            Math.random().toString(36).substring(2, 8).toUpperCase()
        )
        setBackupCodes(codes)
    }

    const verifyCode = async () => {
        setIsVerifying(true)
        setError('')
        // Simulating API call to verify the code
        await new Promise(resolve => setTimeout(resolve, 1500))
        // For demonstration, we'll consider the code valid if it's 6 digits
        if (verificationCode.length === 6 && !isNaN(Number(verificationCode))) {
            setStep(3)
            generateBackupCodes()
        } else {
            setError('Invalid verification code. Please try again.')
        }
        setIsVerifying(false)
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-xl font-semibold mb-4">Step 1: Scan QR Code</h2>
                        <p className="mb-4 text-gray-600">
                            Scan this QR code with your authenticator app (e.g., Google Authenticator, Authy).
                        </p>
                        <div className="flex justify-center mb-4">
                            <QRCodeCanvas value={qrCodeUrl} size={200} level="H" />
                        </div>
                        <p className="mb-2 text-sm text-gray-600">
                            If you can&apos;t scan the QR code, enter this secret key manually:
                        </p>
                        <div className="flex items-center justify-between bg-gray-100 p-2 rounded">
                            <code className="text-sm">{secret}</code>
                            <Button
                                onClick={() => copyToClipboard(secret)}
                                variant="ghost"
                                size="sm"
                            >
                                <FaCopy className="mr-2" />
                                Copy
                            </Button>
                        </div>
                        <Button
                            onClick={() => setStep(2)}
                            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white"
                        >
                            Next: Verify Code
                        </Button>
                    </motion.div>
                )
            case 2:
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-xl font-semibold mb-4">Step 2: Verify Code</h2>
                        <p className="mb-4 text-gray-600">
                            Enter the 6-digit code from your authenticator app to verify the setup.
                        </p>
                        <div className="space-y-2">
                            <Label htmlFor="verificationCode">Verification Code</Label>
                            <Input
                                id="verificationCode"
                                type="text"
                                placeholder="000000"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                maxLength={6}
                                className="text-center text-2xl tracking-widest"
                            />
                        </div>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                        <Button
                            onClick={verifyCode}
                            disabled={isVerifying}
                            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white"
                        >
                            {isVerifying ? 'Verifying...' : 'Verify and Enable 2FA'}
                        </Button>
                    </motion.div>
                )
            case 3:
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-xl font-semibold mb-4">Two-Factor Authentication Enabled!</h2>
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                            <p className="font-bold">Success!</p>
                            <p>Two-factor authentication has been successfully enabled for your account.</p>
                        </div>
                        <h3 className="font-semibold mb-2">Backup Codes</h3>
                        <p className="mb-4 text-gray-600">
                            Store these backup codes in a safe place. You can use these to log in if you lose access to your authenticator app.
                        </p>
                        <div className="grid grid-cols-2 gap-2 mb-4">
                            {backupCodes.map((code, index) => (
                                <div key={index} className="bg-gray-100 p-2 rounded flex justify-between items-center">
                                    <code>{code}</code>
                                    <Button
                                        onClick={() => copyToClipboard(code)}
                                        variant="ghost"
                                        size="sm"
                                    >
                                        <FaCopy />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <Button
                            onClick={() => {/* Navigate to account settings or dashboard */ }}
                            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white"
                        >
                            Return to Account Settings
                        </Button>
                    </motion.div>
                )
            default:
                return null
        }
    }

    return (
            <Card className="w-full max-w-md m-10 p-1">
                <CardHeader className="bg-green-600 text-white rounded-md">
                    <CardTitle className="text-2xl font-bold flex items-center justify-center">
                        <FaLock className="mr-2" />
                        Set Up Two-Factor Authentication
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <AnimatePresence mode="wait">
                        {renderStep()}
                    </AnimatePresence>
                </CardContent>
                <CardFooter className="bg-gray-50 p-4">
                    <p className="text-sm text-gray-600 text-center w-full">
                        Enhance your account security with two-factor authentication.
                    </p>
                </CardFooter>
            </Card>
    )
}

export default TwoFactorSetupPage