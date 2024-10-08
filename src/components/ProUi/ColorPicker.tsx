"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface Color {
    name: string
    hex: string
}

interface ColorPickerProps {
    colors: Color[]
    initialColor?: string
    onChange?: (color: Color) => void
    className?: string
}

const ColorPicker: React.FC<ColorPickerProps> = ({
    colors,
    initialColor,
    onChange,
    className = '',
}) => {
    const [selectedColor, setSelectedColor] = useState(
        initialColor ? colors.find((c) => c.hex === initialColor) : colors[0]
    )

    const handleColorChange = (color: Color) => {
        setSelectedColor(color)
        if (onChange) {
            onChange(color)
        }
    }

    return (
        <div className={`flex items-center space-x-2 ${className}`}>
            {colors.map((color) => (
                <motion.button
                    key={color.hex}
                    className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${selectedColor?.hex === color.hex ? 'ring-2 ring-green-500' : ''
                        }`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => handleColorChange(color)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <span className="sr-only">{color.name}</span>
                </motion.button>
            ))}
        </div>
    )
}

export default ColorPicker