"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Percent, Check, X } from 'lucide-react'

type Product = {
    id: string
    name: string
    price: number
}

type PriceAdjusterProps = {
    products: Product[]
    onAdjustPrices: (adjustedProducts: Product[]) => void
}

export default function PriceAdjuster({ products, onAdjustPrices }: PriceAdjusterProps) {
    const [adjustmentType, setAdjustmentType] = useState<'fixed' | 'percentage'>('fixed')
    const [adjustmentValue, setAdjustmentValue] = useState<string>('')
    const [adjustedProducts, setAdjustedProducts] = useState<Product[]>(products)

    const handleAdjustment = () => {
        const newProducts = products.map(product => ({
            ...product,
            price:
                adjustmentType === 'fixed'
                    ? product.price + Number(adjustmentValue)
                    : product.price * (1 + Number(adjustmentValue) / 100)
        }))
        setAdjustedProducts(newProducts)
    }

    const handleConfirm = () => {
        onAdjustPrices(adjustedProducts)
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Price Adjuster</h2>
            <div className="flex space-x-4 mb-4">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full ${adjustmentType === 'fixed'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                    onClick={() => setAdjustmentType('fixed')}
                >
                    <DollarSign className="inline-block mr-2" />
                    Fixed Amount
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full ${adjustmentType === 'percentage'
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                    onClick={() => setAdjustmentType('percentage')}
                >
                    <Percent className="inline-block mr-2" />
                    Percentage
                </motion.button>
            </div>
            <div className="flex space-x-4 mb-4">
                <input
                    type="number"
                    value={adjustmentValue}
                    onChange={(e) => setAdjustmentValue(e.target.value)}
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder={adjustmentType === 'fixed' ? 'Enter amount' : 'Enter percentage'}
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg"
                    onClick={handleAdjustment}
                >
                    Adjust
                </motion.button>
            </div>
            <div className="max-h-64 overflow-y-auto mb-4">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 text-left">Product</th>
                            <th className="p-2 text-right">Original Price</th>
                            <th className="p-2 text-right">Adjusted Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {adjustedProducts.map((product) => (
                            <tr key={product.id} className="border-b">
                                <td className="p-2">{product.name}</td>
                                <td className="p-2 text-right">${products.find(p => p.id === product.id)?.price.toFixed(2)}</td>
                                <td className="p-2 text-right">${product.price.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end space-x-4">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg"
                    onClick={() => setAdjustedProducts(products)}
                >
                    <X className="inline-block mr-2" />
                    Cancel
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg"
                    onClick={handleConfirm}
                >
                    <Check className="inline-block mr-2" />
                    Confirm
                </motion.button>
            </div>
        </div>
    )
}