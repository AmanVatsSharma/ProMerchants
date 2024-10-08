"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Check, X } from 'lucide-react'

type Product = {
    id: string
    name: string
    stock: number
    backorderAvailable: boolean
    backorderLimit?: number
}

type BackorderManagerProps = {
    products: Product[]
    onUpdateBackorder: (productId: string, backorderAvailable: boolean, backorderLimit?: number) => void
}

export default function BackorderManager({ products, onUpdateBackorder }: BackorderManagerProps) {
    const [editingProduct, setEditingProduct] = useState<string | null>(null)
    const [backorderLimit, setBackorderLimit] = useState<string>('')

    const handleSave = (product: Product) => {
        onUpdateBackorder(product.id, true, Number(backorderLimit) || undefined)
        setEditingProduct(null)
        setBackorderLimit('')
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Backorder Manager</h2>
            <div className="space-y-4">
                {products.map((product) => (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center justify-between p-4 border rounded-lg"
                    >
                        <div>
                            <span className="text-lg font-medium text-gray-700">{product.name}</span>
                            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                        </div>
                        {editingProduct === product.id ? (
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    value={backorderLimit}
                                    onChange={(e) => setBackorderLimit(e.target.value)}
                                    className="w-20 px-2 py-1 border border-gray-300 rounded"
                                    placeholder="Limit"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleSave(product)}
                                    className="p-2 bg-green-500 text-white rounded-full"
                                >
                                    <Check className="w-5 h-5" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setEditingProduct(null)}
                                    className="p-2 bg-red-500 text-white rounded-full"
                                >
                                    <X className="w-5 h-5" />
                                </motion.button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                {product.backorderAvailable ? (
                                    <span className="text-green-500 font-medium">
                                        Backorder: {product.backorderLimit || 'Unlimited'}
                                    </span>
                                ) : (
                                    <span className="text-red-500 font-medium">No Backorder</span>
                                )}
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setEditingProduct(product.id)}
                                    className="p-2 bg-blue-500 text-white rounded-full"
                                >
                                    <Clock className="w-5 h-5" />
                                </motion.button>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    )
}