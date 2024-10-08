"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

type FeaturedProductBadgeProps = {
    isFeatured: boolean
}

export default function FeaturedProductBadge({ isFeatured }: FeaturedProductBadgeProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${isFeatured
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
        >
            <Star className={`w-4 h-4 mr-1 ${isFeatured ? 'text-yellow-500' : 'text-gray-500'}`} />
            {isFeatured ? 'Featured' : 'Not Featured'}
        </motion.div>
    )
}