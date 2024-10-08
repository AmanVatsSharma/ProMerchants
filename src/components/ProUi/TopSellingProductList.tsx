"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, Package } from 'lucide-react'

type Product = {
    id: string
    name: string
    salesCount: number
    revenue: number
    image: string
}

type TopSellingProductListProps = {
    products: Product[]
}

export default function TopSellingProductList({ products }: TopSellingProductListProps) {
    const sortedProducts = [...products].sort((a, b) => b.salesCount - a.salesCount)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-lg"
        >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-green-500" />
                Top Selling Products
            </h2>
            <div className="space-y-4">
                {sortedProducts.map((product, index) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-grow">
                            <h3 className="font-semibold">{product.name}</h3>
                            <div className="flex items-center text-sm text-gray-600">
                                <Package className="w-4 h-4 mr-1" />
                                <span>{product.salesCount} sold</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="font-semibold flex items-center justify-end">
                                <DollarSign className="w-4 h-4" />
                                {product.revenue.toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-600">Revenue</div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}