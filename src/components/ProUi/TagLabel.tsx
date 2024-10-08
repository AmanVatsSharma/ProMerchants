"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

interface TagLabelProps {
    text: string
    color?: string
    onRemove?: () => void
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

const TagLabel: React.FC<TagLabelProps> = ({
    text,
    color = 'bg-blue-100 text-blue-800',
    onRemove,
    size = 'md',
    className = '',
}) => {
    const sizeClasses = {
        sm: 'text-xs px-2 py-1',
        md: 'text-sm px-3 py-1',
        lg: 'text-base px-4 py-2',
    }

    return (
        <motion.div
            className={`inline-flex items-center rounded-full ${color} ${sizeClasses[size]} ${className}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <span className="font-medium">{text}</span>
            {onRemove && (
                <button
                    onClick={onRemove}
                    className="ml-2 focus:outline-none"
                    aria-label={`Remove ${text} tag`}
                >
                    <X size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} />
                </button>
            )}
        </motion.div>
    )
}

export default TagLabel