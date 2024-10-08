"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, ThumbsUp, ThumbsDown, Trash2 } from 'lucide-react'

type Review = {
    id: string
    productId: string
    rating: number
    comment: string
    helpful: number
    notHelpful: number
}

type ProductReviewManagerProps = {
    reviews: Review[]
    onDeleteReview: (reviewId: string) => void
    onUpdateHelpfulness: (reviewId: string, isHelpful: boolean) => void
}

export default function ProductReviewManager({
    reviews,
    onDeleteReview,
    onUpdateHelpfulness
}: ProductReviewManagerProps) {
    const [sortBy, setSortBy] = useState<'rating' | 'helpful'>('rating')

    const sortedReviews = [...reviews].sort((a, b) => {
        if (sortBy === 'rating') {
            return b.rating - a.rating
        } else {
            return (b.helpful - b.notHelpful) - (a.helpful - a.notHelpful)
        }
    })

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Reviews</h2>
            <div className="flex justify-end mb-4">
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'rating' | 'helpful')}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value="rating">Sort by Rating</option>
                    <option value="helpful">Sort by Helpfulness</option>
                </select>
            </div>
            <div className="space-y-4">
                {sortedReviews.map((review) => (
                    <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="border p-4 rounded-lg"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                            }`}
                                        fill="currentColor"
                                    />
                                ))}
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onDeleteReview(review.id)}
                                className="text-red-500"
                            >
                                <Trash2 className="w-5 h-5" />
                            </motion.button>
                        </div>
                        <p className="text-gray-700 mb-2">{review.comment}</p>
                        <div className="flex items-center space-x-4">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onUpdateHelpfulness(review.id, true)}
                                className="flex items-center space-x-1 text-green-500"
                            >
                                <ThumbsUp className="w-4 h-4" />
                                <span>{review.helpful}</span>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onUpdateHelpfulness(review.id, false)}
                                className="flex items-center space-x-1 text-red-500"
                            >
                                <ThumbsDown className="w-4 h-4" />
                                <span>{review.notHelpful}</span>
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}