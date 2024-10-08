"use client"
import React from 'react'
import { motion } from 'framer-motion'

interface LogoBadgeProps {
    text?: string
    size?: 'small' | 'medium' | 'large'
    variant?: 'light' | 'dark'
    animated?: boolean
    className?: string
}

const LogoBadge: React.FC<LogoBadgeProps> = ({
    text,
    size = 'medium',
    variant = 'light',
    animated = true,
    className = '',
}) => {
    const sizeClasses = {
        small: 'h-8 w-8 text-xs',
        medium: 'h-12 w-12 text-sm',
        large: 'h-16 w-16 text-lg',
    }

    const variantClasses = {
        light: 'bg-white text-green-600',
        dark: 'bg-green-600 text-white',
    }

    const logoAnimation = {
        rotate: animated ? [0, 360] : 0,
        transition: {
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
        },
    }

    return (
        <div className={`flex items-center space-x-2 ${className}`}>
            <motion.div
                className={`rounded-full flex items-center justify-center ${sizeClasses[size]} ${variantClasses[variant]}`}
                animate={logoAnimation}
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-2/3 h-2/3">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
            </motion.div>
            {text && (
                <span className={`font-semibold ${variant === 'light' ? 'text-green-600' : 'text-white'}`}>
                    {text}
                </span>
            )}
        </div>
    )
}

export default LogoBadge