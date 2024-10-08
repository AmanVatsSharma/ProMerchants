"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

interface RatingStarsProps {
    initialRating?: number
    onChange?: (rating: number) => void
    readOnly?: boolean
    className?: string
}

const RatingStars: React.FC<RatingStarsProps> = ({
    initialRating = 0,
    onChange,
    readOnly = false,
    className = '',
}) => {
    const [rating, setRating] = useState(initialRating)
    const [hoverRating, setHoverRating] = useState(0)

    const handleClick = (value: number) => {
        if (!readOnly) {
            setRating(value)
            if (onChange) {
                onChange(value)
            }
        }
    }

    const handleMouseEnter = (value: number) => {
        if (!readOnly) {
            setHoverRating(value)
        }
    }

    const handleMouseLeave = () => {
        if (!readOnly) {
            setHoverRating(0)
        }
    }

    return (
        <div className={`flex ${className}`}>
            {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                    key={star}
                    className={`focus:outline-none ${readOnly ? 'cursor-default' : 'cursor-pointer'}`}
                    onClick={() => handleClick(star)}
                    onMouseEnter={() => handleMouseEnter(star)}
                    onMouseLeave={handleMouseLeave}
                    whileHover={!readOnly ? { scale: 1.1 } : {}}
                    whileTap={!readOnly ? { scale: 0.9 } : {}}
                >
                    <Star
                        className={`w-6 h-6 ${star <= (hoverRating || rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                    />
                </motion.button>
            ))}
        </div>
    )
}

export default RatingStars