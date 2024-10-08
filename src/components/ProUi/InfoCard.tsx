"use client"
import React from 'react'
import { motion } from 'framer-motion'

interface InfoCardProps {
    title: string
    content: string
    icon?: React.ReactNode
    variant?: 'default' | 'success' | 'warning' | 'error'
    hoverEffect?: boolean
    className?: string
}

const InfoCard: React.FC<InfoCardProps> = ({
    title,
    content,
    icon,
    variant = 'default',
    hoverEffect = true,
    className = '',
}) => {
    const variantClasses = {
        default: 'bg-white border-gray-200 text-gray-800',
        success: 'bg-green-50 border-green-200 text-green-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        error: 'bg-red-50 border-red-200 text-red-800',
    }

    const cardVariants = {
        hover: {
            scale: hoverEffect ? 1.05 : 1,
            boxShadow: hoverEffect ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : 'none',
        },
    }

    return (
        <motion.div
            className={`rounded-lg border p-4 ${variantClasses[variant]} ${className}`}
            whileHover="hover"
            variants={cardVariants}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center space-x-3 mb-2">
                {icon && <div className="text-2xl">{icon}</div>}
                <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <p className="text-sm">{content}</p>
        </motion.div>
    )
}

export default InfoCard