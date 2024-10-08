"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'

interface QuantitySelectorProps {
    initialQuantity?: number
    min?: number
    max?: number
    onChange?: (quantity: number) => void
    className?: string
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
    initialQuantity = 1,
    min = 1,
    max = 99,
    onChange,
    className = '',
}) => {
    const [quantity, setQuantity] = useState(initialQuantity)

    const handleIncrement = () => {
        if (quantity < max) {
            const newQuantity = quantity + 1
            setQuantity(newQuantity)
            if (onChange) {
                onChange(newQuantity)
            }
        }
    }

    const handleDecrement = () => {
        if (quantity > min) {
            const newQuantity = quantity - 1
            setQuantity(newQuantity)
            if (onChange) {
                onChange(newQuantity)
            }
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10)
        if (!isNaN(value) && value >= min && value <= max) {
            setQuantity(value)
            if (onChange) {
                onChange(value)
            }
        }
    }

    return (
        <div className={`flex items-center ${className}`}>
            <motion.button
                className="p-2 rounded-l-md bg-gray-100 text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={handleDecrement}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={quantity <= min}
            >
                <Minus className="w-4 h-4" />
            </motion.button>
            <input
                type="number"
                min={min}
                max={max}
                value={quantity}
                onChange={handleInputChange}
                className="w-12 text-center border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <motion.button
                className="p-2 rounded-r-md bg-gray-100 text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                onClick={handleIncrement}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={quantity >= max}
            >
                <Plus className="w-4 h-4" />
            </motion.button>
        </div>
    )
}

export default QuantitySelector