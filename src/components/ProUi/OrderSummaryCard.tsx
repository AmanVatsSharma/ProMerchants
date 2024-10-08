"use client"
import React from 'react'
import { motion } from 'framer-motion'

interface OrderItem {
    name: string
    quantity: number
    price: number
}

interface OrderSummaryCardProps {
    orderNumber: string
    date: string
    items: OrderItem[]
    total: number
    status: 'pending' | 'processing' | 'shipped' | 'delivered'
    className?: string
}

const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
    orderNumber,
    date,
    items,
    total,
    status,
    className = '',
}) => {
    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        processing: 'bg-blue-100 text-blue-800',
        shipped: 'bg-purple-100 text-purple-800',
        delivered: 'bg-green-100 text-green-800',
    }

    return (
        <motion.div
            className={`bg-white shadow-lg text-black rounded-lg overflow-hidden ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Order #{orderNumber}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">Ordered on {date}</p>
                <div className="space-y-2">
                    {items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                            <span>{item.name} x{item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default OrderSummaryCard