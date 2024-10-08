"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, Percent } from 'lucide-react'

type Product = {
    id: string
    name: string
    costPrice: number
    sellingPrice: number
}

type ProfitMarginCalculatorProps = {
    products: Product[]
}

export default function ProfitMarginCalculator({ products }: ProfitMarginCalculatorProps) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [profitMargin, setProfitMargin] = useState<number>(0)

    useEffect(() => {
        if (selectedProduct) {
            const margin = ((selectedProduct.sellingPrice - selectedProduct.costPrice) / selectedProduct.sellingPrice) * 100
            setProfitMargin(margin)
        }
    }, [selectedProduct])

    const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const product = products.find(p => p.id === e.target.value)
        setSelectedProduct(product || null)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-lg"
        >
            <h2 className="text-xl font-semibold mb-4">Profit Margin Calculator</h2>
            <div className="mb-4">
                <label htmlFor="product-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Select a product
                </label>
                <select
                    id="product-select"
                    onChange={handleProductChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value="">Choose a product</option>
                    {products.map(product => (
                        <option key={product.id} value={product.id}>
                            {product.name}
                        </option>
                    ))}
                </select>
            </div>
            {selectedProduct && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <p className="text-sm text-gray-600">Cost Price</p>
                            <p className="text-lg font-semibold flex items-center">
                                <DollarSign className="w-5 h-5 mr-1 text-gray-400" />
                                {selectedProduct.costPrice.toFixed(2)}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Selling Price</p>
                            <p className="text-lg font-semibold flex items-center">
                                <DollarSign className="w-5 h-5 mr-1 text-gray-400" />
                                {selectedProduct.sellingPrice.toFixed(2)}
                            </p>
                        </div>
                    </div>
                    <div className="mb-4">
                        <p className="text-sm text-gray-600">Profit Margin</p>
                        <p className="text-3xl font-bold flex items-center text-green-500">
                            {profitMargin.toFixed(2)}
                            <Percent className="w-6 h-6 ml-1" />
                        </p>
                    </div>
                    <div className="bg-gray-200 h-4 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${profitMargin}%` }}
                            transition={{ duration: 0.5 }}
                            className="bg-green-500 h-full"
                        />
                    </div>
                </motion.div>
            )}
        </motion.div>
    )
}