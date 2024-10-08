"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FaDesktop, FaMobileAlt, FaTabletAlt, FaGlobe, FaTrash, FaCheck } from 'react-icons/fa'
import { Tooltip, TooltipProvider } from '@/components/ui/tooltip'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { format, formatDistanceToNow } from 'date-fns'

interface Session {
    id: string
    deviceType: 'desktop' | 'mobile' | 'tablet' | 'unknown'
    browser: string
    location: string
    ipAddress: string
    lastActive: Date
    isCurrent: boolean
}

const SessionManagementPage = () => {
    const [sessions, setSessions] = useState<Session[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [confirmLogout, setConfirmLogout] = useState<string | null>(null)
    const [logoutAllConfirm, setLogoutAllConfirm] = useState(false)

    useEffect(() => {
        fetchSessions()
    }, [])

    const fetchSessions = async () => {
        setIsLoading(true)
        setError('')
        try {
            // Simulating API call to fetch sessions
            await new Promise(resolve => setTimeout(resolve, 1500))
            const mockSessions: Session[] = [
                {
                    id: '1',
                    deviceType: 'desktop',
                    browser: 'Chrome',
                    location: 'New York, USA',
                    ipAddress: '192.168.1.1',
                    lastActive: new Date(),
                    isCurrent: true
                },
                {
                    id: '2',
                    deviceType: 'mobile',
                    browser: 'Safari',
                    location: 'London, UK',
                    ipAddress: '192.168.1.2',
                    lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
                    isCurrent: false
                },
                {
                    id: '3',
                    deviceType: 'tablet',
                    browser: 'Firefox',
                    location: 'Tokyo, Japan',
                    ipAddress: '192.168.1.3',
                    lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                    isCurrent: false
                },
                {
                    id: '4',
                    deviceType: 'unknown',
                    browser: 'Edge',
                    location: 'Sydney, Australia',
                    ipAddress: '192.168.1.4',
                    lastActive: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
                    isCurrent: false
                }
            ]
            setSessions(mockSessions)
        } catch (err) {
            setError('Failed to fetch sessions. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }

    const handleLogout = async (sessionId: string) => {
        try {
            // Simulating API call to log out session
            await new Promise(resolve => setTimeout(resolve, 1000))
            setSessions(prevSessions => prevSessions.filter(session => session.id !== sessionId))
            setConfirmLogout(null)
        } catch (err) {
            setError('Failed to log out session. Please try again.')
        }
    }

    const handleLogoutAll = async () => {
        try {
            // Simulating API call to log out all sessions
            await new Promise(resolve => setTimeout(resolve, 1500))
            setSessions(prevSessions => prevSessions.filter(session => session.isCurrent))
            setLogoutAllConfirm(false)
        } catch (err) {
            setError('Failed to log out all sessions. Please try again.')
        }
    }

    const getDeviceIcon = (deviceType: Session['deviceType']) => {
        switch (deviceType) {
            case 'desktop':
                return <FaDesktop className="text-blue-500" />
            case 'mobile':
                return <FaMobileAlt className="text-green-500" />
            case 'tablet':
                return <FaTabletAlt className="text-purple-500" />
            default:
                return <FaGlobe className="text-gray-500" />
        }
    }

    return (
        <>
            <Card className="w-full max-w-4xl p-2 ">
                <CardHeader className="bg-green-600 text-white rounded-md">
                    <CardTitle className="text-2xl font-bold flex items-center justify-between">
                        <span>Active Sessions</span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setLogoutAllConfirm(true)}
                            className="text-white border-white hover:bg-green-700"
                        >
                            Log out all other sessions
                        </Button>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-600"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-600">{error}</div>
                    ) : (
                        <AnimatePresence>
                            {sessions.map((session) => (
                                <motion.div
                                    key={session.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="bg-white p-4 rounded-lg shadow-md mb-4 flex items-center justify-between"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="text-2xl">
                                            {getDeviceIcon(session.deviceType)}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">
                                                {session.browser} on {session.deviceType}
                                                {session.isCurrent && (
                                                    <Badge variant="success" className="ml-2">
                                                        Current
                                                    </Badge>
                                                )}
                                            </h3>
                                            <p className="text-sm text-gray-600">{session.location} • {session.ipAddress}</p>
                                            <p className="text-xs text-gray-500">
                                                Last active: {formatDistanceToNow(session.lastActive, { addSuffix: true })}
                                            </p>
                                        </div>
                                    </div>
                                    {!session.isCurrent && (
                                        <TooltipProvider>
                                            <Tooltip content="Log out this session">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setConfirmLogout(session.id)}
                                                    className="text-red-600 hover:text-red-800 hover:bg-red-100"
                                                >
                                                    <FaTrash />
                                                </Button>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </CardContent>
                <CardFooter className="bg-gray-50 p-4">
                    <p className="text-sm text-gray-600 text-center w-full">
                        Manage your active sessions to keep your account secure. If you see any suspicious activity, log out of that session and change your password immediately.
                    </p>
                </CardFooter>
            </Card>

            <Dialog open={confirmLogout !== null} onOpenChange={() => setConfirmLogout(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Logout</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to log out this session? You will need to log in again on that device.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setConfirmLogout(null)}>Cancel</Button>
                        <Button variant="destructive" onClick={() => confirmLogout && handleLogout(confirmLogout)}>
                            Log Out Session
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={logoutAllConfirm} onOpenChange={setLogoutAllConfirm}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Log Out All Other Sessions</DialogTitle>
                        <DialogDescription>
                            This will log you out of all sessions except the current one. You will need to log in again on other devices.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setLogoutAllConfirm(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleLogoutAll}>
                            Log Out All Other Sessions
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default SessionManagementPage