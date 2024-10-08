"use client"
import React from 'react'
import { motion } from 'framer-motion'

interface ToggleButtonProps {
    options: string[]
    selectedOption: string
    onChange: (option: string) => void
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
    options,
    selectedOption,
    onChange,
    size = 'md',
    className = '',
}) => {
    const sizeClasses = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
    }

    return (
        <div className={`inline-flex rounded-md shadow-sm ${className}`}>
            {options.map((option, index) => (
                <motion.button
                    key={option}
                    className={`${sizeClasses[size]} px-4 py-2 font-medium ${selectedOption === option
                            ? 'bg-green-500 text-white'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        } ${index === 0 ? 'rounded-l-md' : ''} ${index === options.length - 1 ? 'rounded-r-md' : ''
                        } focus:outline-none focus:ring-2 focus:ring-green-500 focus:z-10`}
                    onClick={() => onChange(option)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {option}
                </motion.button>
            ))}
        </div>
    )
}

export default ToggleButton