"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

type ProductRatingWidgetProps = {
    productId: string
    initialRating?: number
    onRatingSubmit: (productId: string, rating: number) => void
}

export default function ProductRatingWidget({
    productId,
    initialRating = 0,
    onRatingSubmit
}: ProductRatingWidgetProps) {
    const [rating, setRating] = useState(initialRating)
    const [hoveredRating, setHoveredRating] = useState(0)

    const handleRatingClick = (selectedRating: number) => {
        setRating(selectedRating)
        onRatingSubmit(productId, selectedRating)
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                        key={star}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRatingClick(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="focus:outline-none"
                    >
                        <Star
                            className={`w-8 h-8 ${star <= (hoveredRating || rating)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                        />
                    </motion.button>
                ))}
            </div>
            <p className="mt-2 text-sm text-gray-600">
                {rating > 0 ? `You rated this product ${rating} stars` : 'Rate this product'}
            </p>
        </div>
    )
}