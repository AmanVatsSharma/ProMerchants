"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Smile, Meh, Frown } from 'lucide-react'

type FeedbackType = 'positive' | 'neutral' | 'negative'

type CustomerFeedbackFormProps = {
    onSubmitFeedback: (feedback: { type: FeedbackType; comment: string }) => void
}

export default function CustomerFeedbackForm({ onSubmitFeedback }: CustomerFeedbackFormProps) {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const [comment, setComment] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (feedbackType && comment.trim()) {
            onSubmitFeedback({ type: feedbackType, comment: comment.trim() })
            setFeedbackType(null)
            setComment('')
        }
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Customer Feedback</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">How was your experience?</label>
                    <div className="flex space-x-4">
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setFeedbackType('positive')}
                            className={`p-2 rounded-full ${feedbackType === 'positive' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                                }`}
                        >
                            <Smile className="w-8 h-8" />
                        </motion.button>
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setFeedbackType('neutral')}
                            className={`p-2 rounded-full ${feedbackType === 'neutral' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'
                                }`}
                        >
                            <Meh className="w-8 h-8" />
                        </motion.button>
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setFeedbackType('negative')}
                            className={`p-2 rounded-full ${feedbackType === 'negative' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                                }`}
                        >
                            <Frown className="w-8 h-8" />
                        </motion.button>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                        Your feedback
                    </label>
                    <textarea
                        id="comment"
                        rows={4}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-green-500"
                        placeholder="Please share your thoughts..."
                    ></textarea>
                </div>
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center justify-center"
                    disabled={!feedbackType || !comment.trim()}
                >
                    <Send className="w-5 h-5 mr-2" />
                    Submit Feedback
                </motion.button>
            </form>
        </div>
    )
}