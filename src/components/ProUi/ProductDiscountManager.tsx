"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Percent, Tag, Check, X } from 'lucide-react'

type Product = {
    id: string
    name: string
    price: number
    discount?: number
}

type ProductDiscountManagerProps = {
    products: Product[]
    onApplyDiscounts: (discountedProducts: Product[]) => void
}

export default function ProductDiscountManager({ products, onApplyDiscounts }: ProductDiscountManagerProps) {
    const [discountPercentage, setDiscountPercentage] = useState<string>('')
    const [selectedProducts, setSelectedProducts] = useState<string[]>([])

    const handleSelectProduct = (productId: string) => {
        setSelectedProducts(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        )
    }

    const handleApplyDiscount = () => {
        const discountedProducts = products.map(product => ({
            ...product,
            discount: selectedProducts.includes(product.id)
                ? Number(discountPercentage)
                : product.discount
        }))
        onApplyDiscounts(discountedProducts)
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Discount Manager</h2>
            <div className="flex space-x-4 mb-4">
                <input
                    type="number"
                    value={discountPercentage}
                    onChange={(e) => setDiscountPercentage(e.target.value)}
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter discount percentage"
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg"
                    onClick={handleApplyDiscount}
                >
                    <Percent className="inline-block mr-2" />
                    Apply Discount
                </motion.button>
            </div>
            <div className="max-h-96 overflow-y-auto mb-4">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 text-left">Product</th>
                            <th className="p-2 text-right">Price</th>
                            <th className="p-2 text-right">Current Discount</th>
                            <th className="p-2 text-center">Select</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border-b">
                                <td className="p-2">{product.name}</td>
                                <td className="p-2 text-right">${product.price.toFixed(2)}</td>
                                <td className="p-2 text-right">
                                    {product.discount ? `${product.discount}%` : '-'}
                                </td>
                                <td className="p-2 text-center">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handleSelectProduct(product.id)}
                                        className={`p-2 rounded-full ${selectedProducts.includes(product.id)
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gray-200 text-gray-600'
                                            }`}
                                    >
                                        <Tag className="w-5 h-5" />
                                    </motion.button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}