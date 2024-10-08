"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'

type Product = {
    id: string
    name: string
    stock: number
}

type LowStockAlertProps = {
    products: Product[]
    threshold: number
}

export default function LowStockAlert({ products, threshold }: LowStockAlertProps) {
    const lowStockProducts = products.filter(product => product.stock <= threshold)

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Low Stock Alert</h2>
            {lowStockProducts.length > 0 ? (
                <div className="space-y-4">
                    {lowStockProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex items-center justify-between p-4 border rounded-lg bg-red-50"
                        >
                            <div className="flex items-center">
                                <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
                                <span className="text-lg font-medium text-gray-700">{product.name}</span>
                            </div>
                            <span className="text-red-500 font-semibold">Stock: {product.stock}</span>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <p className="text-green-500 font-medium">All products are well-stocked!</p>
            )}
        </div>
    )
}