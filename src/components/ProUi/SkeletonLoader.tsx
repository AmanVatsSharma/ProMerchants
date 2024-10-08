"use client"
import React from 'react'
import { motion } from 'framer-motion'

interface SkeletonLoaderProps {
    width?: string | number
    height?: string | number
    shape?: 'rectangle' | 'circle'
    className?: string
}

const ProSkeletonLoader: React.FC<SkeletonLoaderProps> = ({
    width = '100%',
    height = '1rem',
    shape = 'rectangle',
    className = '',
}) => {
    const shapeClass = shape === 'circle' ? 'rounded-full' : 'rounded-md'

    return (
        <div
            className={`overflow-hidden ${shapeClass} ${className}`}
            style={{ width, height }}
        >
            <motion.div
                className="w-full h-full bg-gray-200"
                animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear',
                }}
                style={{
                    backgroundImage: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
                    backgroundSize: '200% 100%',
                }}
            />
        </div>
    )
}

export default ProSkeletonLoader