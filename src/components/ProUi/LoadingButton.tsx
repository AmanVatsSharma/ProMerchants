"use client"
import React from 'react'
import { motion } from 'framer-motion'

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean
    loadingText?: string
    size?: 'sm' | 'md' | 'lg'
    variant?: 'primary' | 'secondary' | 'outline'
    className?: string
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
    children,
    loading = false,
    loadingText = 'Loading...',
    size = 'md',
    variant = 'primary',
    className = '',
    ...props
}) => {
    const sizeClasses = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    }

    const variantClasses = {
        primary: 'bg-green-500 text-white hover:bg-green-600',
        secondary: 'bg-blue-500 text-white hover:bg-blue-600',
        outline: 'bg-transparent border-2 border-green-500 text-green-500 hover:bg-green-50',
    }

    return (
        <motion.button
            className={`rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            {...props}
        >
            {loading ? (
                <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {loadingText}
                </div>
            ) : (
                children
            )}
        </motion.button>
    )
}

export default LoadingButton