"use client"
import React from 'react'
import { motion } from 'framer-motion'

interface ProgressBarProps {
    progress: number
    color?: string
    height?: number
    showPercentage?: boolean
    animated?: boolean
    className?: string
}

const ProProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    color = 'bg-green-500',
    height = 6,
    showPercentage = false,
    animated = true,
    className = '',
}) => {
    const clampedProgress = Math.min(Math.max(progress, 0), 100)

    return (
        <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`} style={{ height }}>
            <motion.div
                className={`h-full ${color}`}
                initial={{ width: 0 }}
                animate={{ width: `${clampedProgress}%` }}
                transition={animated ? { duration: 0.5, ease: 'easeInOut' } : { duration: 0 }}
            >
                {showPercentage && (
                    <div className="h-full flex items-center justify-end pr-2">
                        <span className="text-xs font-bold text-white">{`${Math.round(clampedProgress)}%`}</span>
                    </div>
                )}
            </motion.div>
        </div>
    )
}

export default ProProgressBar