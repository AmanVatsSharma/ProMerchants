import React from 'react'
import { motion } from 'framer-motion'

interface StatusIndicatorProps {
    status: 'success' | 'warning' | 'error' | 'info' | 'neutral'
    pulse?: boolean
    size?: 'sm' | 'md' | 'lg'
    label?: string
    className?: string
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
    status,
    pulse = false,
    size = 'md',
    label,
    className = '',
}) => {
    const statusColors = {
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
        neutral: 'bg-gray-500',
    }

    const sizeClasses = {
        sm: 'w-2 h-2',
        md: 'w-3 h-3',
        lg: 'w-4 h-4',
    }

    const pulseAnimation = pulse ? {
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    } : {}

    return (
        <div className={`flex items-center ${className}`}>
            <motion.div
                className={`rounded-full ${statusColors[status]} ${sizeClasses[size]}`}
                animate={pulseAnimation}
            />
            {label && (
                <span className={`ml-2 text-${size} font-medium text-gray-700`}>
                    {label}
                </span>
            )}
        </div>
    )
}

export default StatusIndicator