"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'

type Product = {
    id: string
    name: string
    isVisible: boolean
}

type ProductVisibilityToggleProps = {
    products: Product[]
    onToggleVisibility: (productId: string) => void
}

export default function ProductVisibilityToggle({
    products,
    onToggleVisibility
}: ProductVisibilityToggleProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Visibility</h2>
            <div className="space-y-4">
                {products.map((product) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center justify-between p-4 border rounded-lg"
                    >
                        <span className="text-lg font-medium text-gray-700">{product.name}</span>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onToggleVisibility(product.id)}
                            className={`p-2 rounded-full ${product.isVisible
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-300 text-gray-600'
                                }`}
                        >
                            {product.isVisible ? (
                                <Eye className="w-6 h-6" />
                            ) : (
                                <EyeOff className="w-6 h-6" />
                            )}
                        </motion.button>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}