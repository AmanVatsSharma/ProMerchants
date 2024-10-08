"use client"
import React, { ButtonHTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface ProButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    isLoading?: boolean
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    fullWidth?: boolean
    animated?: boolean
}

const ProButton: React.FC<ProButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    animated = true,
    className = '',
    ...props
}) => {
    const baseStyle = 'font-semibold rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variantStyles = {
        primary: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
        secondary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        outline: 'bg-transparent text-green-600 border-2 border-green-600 hover:bg-green-50 focus:ring-green-500',
        ghost: 'bg-transparent text-green-600 hover:bg-green-50 focus:ring-green-500',
    }

    const sizeStyles = {
        sm: 'px-3 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    }

    const buttonStyle = `${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? 'w-full' : ''} ${className}`

    const buttonVariants = {
        hover: { scale: animated ? 1.05 : 1 },
        tap: { scale: animated ? 0.95 : 1 },
    }

    return (
        <motion.button
            className={buttonStyle}
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            transition={{ duration: 0.2 }}
            disabled={isLoading || props.disabled}
            {...props}
        >
            <span className="flex items-center justify-center">
                {isLoading && (
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                )}
                {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
                {children}
                {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
            </span>
        </motion.button>
    )
}

export default ProButton