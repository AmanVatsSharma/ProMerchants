"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface Size {
    label: string
    value: string
}

interface SizePickerProps {
    sizes: Size[]
    onChange: (size: Size) => void
    className?: string
}

const SizePicker: React.FC<SizePickerProps> = ({ sizes, onChange, className = '' }) => {
    const [selectedSize, setSelectedSize] = useState<Size | null>(null)

    const handleSizeClick = (size: Size) => {
        setSelectedSize(size)
        onChange(size)
    }

    return (
        <div className={`flex flex-wrap gap-2 ${className}`}>
            {sizes.map((size) => (
                <motion.button
                    key={size.value}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${selectedSize?.value === size.value
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                        }`}
                    onClick={() => handleSizeClick(size)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {size.label}
                </motion.button>
            ))}
        </div>
    )
}

export default SizePicker