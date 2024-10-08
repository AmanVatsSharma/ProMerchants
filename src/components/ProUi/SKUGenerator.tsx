"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Hash, RefreshCw, Copy, Check } from 'lucide-react'

type SKUGeneratorProps = {
    onGenerate: (sku: string) => void
}

export default function SKUGenerator({ onGenerate }: SKUGeneratorProps) {
    const [sku, setSku] = useState('')
    const [copied, setCopied] = useState(false)

    const generateSKU = () => {
        const prefix = 'PRD'
        const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase()
        const newSKU = `${prefix}-${randomPart}`
        setSku(newSKU)
        onGenerate(newSKU)
    }

    const copySKU = () => {
        navigator.clipboard.writeText(sku)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <Hash className="mr-2" />
                    SKU Generator
                </h2>

                <div className="mb-4">
                    <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">
                        Generated SKU
                    </label>
                    <div className="flex items-center">
                        <input
                            type="text"
                            id="sku"
                            value={sku}
                            readOnly
                            className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={copySKU}
                            className="px-3 py-2 bg-blue-500 text-white rounded-r-md"
                        >
                            {copied ? <Check size={20} /> : <Copy size={20} />}
                        </motion.button>
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={generateSKU}
                    className="w-full px-4 py-2 bg-green-500 text-white rounded-md font-semibold flex items-center justify-center"
                >
                    <RefreshCw className="mr-2" />
                    Generate New SKU
                </motion.button>
            </div>
        </div>
    )
}