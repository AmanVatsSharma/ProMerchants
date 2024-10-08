"use client"
import React, { useState, useRef, KeyboardEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface ChipInputProps {
    label: string
    placeholder?: string
    chips: string[]
    onChange: (chips: string[]) => void
    maxChips?: number
    className?: string
}

const ProChipInput: React.FC<ChipInputProps> = ({
    label,
    placeholder = 'Type and press Enter',
    chips,
    onChange,
    maxChips = Infinity,
    className = '',
}) => {
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue.trim() !== '') {
            e.preventDefault()
            if (chips.length < maxChips && !chips.includes(inputValue.trim())) {
                onChange([...chips, inputValue.trim()])
                setInputValue('')
            }
        } else if (e.key === 'Backspace' && inputValue === '' && chips.length > 0) {
            onChange(chips.slice(0, -1))
        }
    }

    const removeChip = (chipToRemove: string) => {
        onChange(chips.filter(chip => chip !== chipToRemove))
    }

    return (
        <div className={`relative ${className}`}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500">
                <AnimatePresence>
                    {chips.map(chip => (
                        <motion.div
                            key={chip}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm"
                        >
                            {chip}
                            <button
                                type="button"
                                onClick={() => removeChip(chip)}
                                className="ml-1 text-green-600 hover:text-green-800 focus:outline-none"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <input
                    ref={inputRef}
                    type="text"
                    className="flex-grow outline-none bg-transparent"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    placeholder={chips.length === 0 ? placeholder : ''}
                    disabled={chips.length >= maxChips}
                />
            </div>
            {maxChips < Infinity && (
                <p className="mt-1 text-sm text-gray-500">
                    {chips.length} / {maxChips} chips
                </p>
            )}
        </div>
    )
}

export default ProChipInput