"use client"
import React from 'react'
import { motion } from 'framer-motion'

interface PriceTagProps {
    price: number
    currency?: string
    discountPercentage?: number
    className?: string
}

const PriceTag: React.FC<PriceTagProps> = ({
    price,
    currency = '$',
    discountPercentage,
    className = '',
}) => {
    const formattedPrice = price.toFixed(2)
    const originalPrice = discountPercentage
        ? (price / (1 - discountPercentage / 100)).toFixed(2)
        : null

    return (
        <div className={`inline-flex items-center ${className}`}>
            <motion.span
                className="text-2xl font-bold text-gray-900"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {currency}
                {formattedPrice}
            </motion.span>
            {discountPercentage && originalPrice && (
                <div className="ml-2 flex items-center">
                    <motion.span
                        className="text-sm text-gray-500 line-through"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        {currency}
                        {originalPrice}
                    </motion.span>
                    <motion.span
                        className="ml-1 text-sm font-medium text-green-600"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        ({discountPercentage}% off)
                    </motion.span>
                </div>
            )}
        </div>
    )
}

export default PriceTag