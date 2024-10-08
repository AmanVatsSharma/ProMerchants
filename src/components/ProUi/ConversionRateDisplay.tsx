"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

type ConversionRateDisplayProps = {
    productId: string
    conversionRate: number
    previousRate: number
    timeFrame: string
}

export default function ConversionRateDisplay({
    productId,
    conversionRate,
    previousRate,
    timeFrame
}: ConversionRateDisplayProps) {
    const percentageChange = ((conversionRate - previousRate) / previousRate) * 100
    const isPositive = percentageChange >= 0

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-lg"
        >
            <h2 className="text-xl font-semibold mb-4">Conversion Rate</h2>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-3xl font-bold">{(conversionRate * 100).toFixed(2)}%</p>
                    <p className="text-sm text-gray-500">for {timeFrame}</p>
                </div>
                <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? <TrendingUp className="w-6 h-6 mr-2" /> : <TrendingDown className="w-6 h-6 mr-2" />}
                    <span className="text-lg font-semibold">{Math.abs(percentageChange).toFixed(2)}%</span>
                </div>
            </div>
            <div className="mt-4">
                <div className="bg-gray-200 h-2 rounded-full">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${conversionRate * 100}%` }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-green-500 h-2 rounded-full"
                    />
                </div>
            </div>
            <p className="mt-2 text-sm text-gray-600">
                Product ID: {productId}
            </p>
        </motion.div>
    )
}