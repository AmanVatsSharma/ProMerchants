"use client"
import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

interface MetricDisplayProps {
    label: string
    value: number
    prefix?: string
    suffix?: string
    trend?: 'up' | 'down' | 'neutral'
    trendValue?: number
    animationDuration?: number
    className?: string
}

const MetricDisplay: React.FC<MetricDisplayProps> = ({
    label,
    value,
    prefix = '',
    suffix = '',
    trend,
    trendValue,
    animationDuration = 1,
    className = '',
}) => {
    const [displayValue, setDisplayValue] = useState(0)
    const controls = useAnimation()

    useEffect(() => {
        let startValue = 0
        const stepValue = value / (animationDuration * 60) // 60 fps
        const interval = setInterval(() => {
            startValue += stepValue
            if (startValue >= value) {
                clearInterval(interval)
                setDisplayValue(value)
            } else {
                setDisplayValue(Math.floor(startValue))
            }
        }, 1000 / 60)

        return () => clearInterval(interval)
    }, [value, animationDuration])

    useEffect(() => {
        controls.start({
            scale: [1, 1.1, 1],
            transition: { duration: 0.3 },
        })
    }, [value, controls])

    const trendColors = {
        up: 'text-green-500',
        down: 'text-red-500',
        neutral: 'text-gray-500',
    }

    const trendIcons = {
        up: '↑',
        down: '↓',
        neutral: '→',
    }

    return (
        <motion.div
            className={`bg-white rounded-lg shadow-md p-4 ${className} text-black`}
            animate={controls}
        >
            <h3 className="text-sm font-medium text-gray-500 mb-1">{label}</h3>
            <div className="flex items-end space-x-2">
                <motion.div
                    className="text-3xl font-bold"
                    key={value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {prefix}
                    {displayValue.toLocaleString()}
                    {suffix}
                </motion.div>
                {trend && trendValue && (
                    <div className={`text-sm ${trendColors[trend]} flex items-center`}>
                        {trendIcons[trend]}
                        <span className="ml-1">{trendValue}%</span>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default MetricDisplay