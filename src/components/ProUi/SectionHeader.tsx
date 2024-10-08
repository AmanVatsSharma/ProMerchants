"use client"
import React from 'react'
import { motion } from 'framer-motion'

interface SectionHeaderProps {
    title: string
    subtitle?: string
    align?: 'left' | 'center' | 'right'
    underline?: boolean
    icon?: React.ReactNode
    className?: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitle,
    align = 'left',
    underline = false,
    icon,
    className = '',
}) => {
    const alignmentClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    }

    const headerVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <motion.div
            className={`mb-6 ${alignmentClasses[align]} ${className}`}
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center">
                {icon && <span className="mr-2">{icon}</span>}
                {title}
            </h2>
            {subtitle && (
                <p className="mt-2 text-gray-600">{subtitle}</p>
            )}
            {underline && (
                <motion.div
                    className="mt-2 h-1 bg-green-500 rounded"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                />
            )}
        </motion.div>
    )
}

export default SectionHeader