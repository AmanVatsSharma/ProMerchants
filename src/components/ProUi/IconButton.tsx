"use client"
import React from 'react'
import { motion } from 'framer-motion'

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: React.ReactNode
    size?: 'sm' | 'md' | 'lg'
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    className?: string
}

const IconButton: React.FC<IconButtonProps> = ({
    icon,
    size = 'md',
    variant = 'primary',
    className = '',
    ...props
}) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
    }

    const variantClasses = {
        primary: 'bg-green-500 text-white hover:bg-green-600',
        secondary: 'bg-blue-500 text-white hover:bg-blue-600',
        outline: 'bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-50',
        ghost: 'bg-transparent text-green-500 hover:bg-green-50',
    }

    return (
        <motion.button
            className={`rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            {...props}
        >
            {icon}
        </motion.button>
    )
}

export default IconButton