"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell } from 'lucide-react'

interface NotificationBellProps {
    count?: number
    onClick?: () => void
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

const NotificationBell: React.FC<NotificationBellProps> = ({
    count = 0,
    onClick,
    size = 'md',
    className = '',
}) => {
    const [isHovered, setIsHovered] = useState(false)

    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
    }

    const badgeSizeClasses = {
        sm: 'w-4 h-4 text-xs',
        md: 'w-5 h-5 text-sm',
        lg: 'w-6 h-6 text-base',
    }

    return (
        <motion.button
            className={`relative ${sizeClasses[size]} ${className}`}
            onClick={onClick}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <Bell className="w-full h-full text-gray-600" />
            <AnimatePresence>
                {count > 0 && (
                    <motion.div
                        className={`absolute -top-1 -right-1 ${badgeSizeClasses[size]} bg-red-500 text-white rounded-full flex items-center justify-center font-bold`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                    >
                        {count}
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                    >
                        Notifications
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    )
}

export default NotificationBell