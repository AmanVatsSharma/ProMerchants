"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { UserMinus, Users, ArrowDown, ArrowUp } from 'lucide-react'

type ChurnData = {
    rate: number
    previousRate: number
    totalCustomers: number
    churnedCustomers: number
    timeFrame: string
}

type CustomerChurnRateDisplayProps = {
    churnData: ChurnData
}

export default function CustomerChurnRateDisplay({ churnData }: CustomerChurnRateDisplayProps) {
    const isDecreasing = churnData.rate < churnData.previousRate
    const percentageChange = Math.abs(
        ((churnData.rate - churnData.previousRate) / churnData.previousRate) * 100
    ).toFixed(2)

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-lg"
        >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
                <UserMinus className="w-6 h-6 mr-2 text-red-500" />
                Customer Churn Rate
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <p className="text-sm text-gray-600">Current Churn Rate</p>
                    <p className="text-3xl font-bold">{(churnData.rate * 100).toFixed(2)}%</p>
                </div>
                <div className={`text-right ${isDecreasing ? 'text-green-500' : 'text-red-500'}`}>
                    <p className="text-sm">vs Previous {churnData.timeFrame}</p>
                    <p className="text-xl font-semibold flex items-center justify-end">
                        {isDecreasing ? <ArrowDown className="w-5 h-5 mr-1" /> : <ArrowUp className="w-5 h-5 mr-1" />}
                        {percentageChange}%
                    </p>
                </div>
            </div>
            <div className="mb-4">
                <div className="bg-gray-200 h-2 rounded-full">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${churnData.rate * 100}%` }}
                        transition={{ duration: 0.5 }}
                        className="bg-red-500 h-2 rounded-full"
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-500" />
                    <div>
                        <p className="text-sm text-gray-600">Total Customers</p>
                        <p className="font-semibold">{churnData.totalCustomers.toLocaleString()}</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <UserMinus className="w-5 h-5 mr-2 text-red-500" />
                    <div>
                        <p className="text-sm text-gray-600">Churned Customers</p>
                        <p className="font-semibold">{churnData.churnedCustomers.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}