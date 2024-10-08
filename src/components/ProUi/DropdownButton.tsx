"use client"
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface DropdownButtonProps {
    label: string
    options: { label: string; value: string }[]
    onSelect: (value: string) => void
    size?: 'sm' | 'md' | 'lg'
    variant?: 'primary' | 'secondary' | 'outline'
    className?: string
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
    label,
    options,
    onSelect,
    size = 'md',
    variant = 'primary',
    className = '',
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className={`relative inline-block ${className}`} ref={dropdownRef}>
            <motion.button
                className={`rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ${sizeClasses[size]} ${variantClasses[variant]} flex items-center justify-between`}
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {label}
                <ChevronDown className="ml-2 h-4 w-4" />
            </motion.button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <div className="py-1">
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    onClick={() => {
                                        onSelect(option.value)
                                        setIsOpen(false)
                                    }}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default DropdownButton