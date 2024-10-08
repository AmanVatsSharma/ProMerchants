"use client"
import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TextAreaProps {
    label: string
    name: string
    placeholder?: string
    value: string
    onChange: (value: string) => void
    onBlur?: () => void
    minRows?: number
    maxRows?: number
    required?: boolean
    className?: string
}

const TextArea: React.FC<TextAreaProps> = ({
    label,
    name,
    placeholder,
    value,
    onChange,
    onBlur,
    minRows = 3,
    maxRows = 10,
    required = false,
    className = '',
}) => {
    const [rows, setRows] = useState(minRows)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        adjustHeight()
    }, [value])

    const adjustHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            const scrollHeight = textareaRef.current.scrollHeight
            const lineHeight = parseInt(getComputedStyle(textareaRef.current).lineHeight)
            const newRows = Math.min(Math.max(minRows, Math.floor(scrollHeight / lineHeight)), maxRows)
            setRows(newRows)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value)
    }

    return (
        <div className={`relative ${className}`}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <motion.div
                initial={false}
                animate={{ height: `${rows * 1.5}rem` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="relative"
            >
                <textarea
                    ref={textareaRef}
                    id={name}
                    name={name}
                    rows={rows}
                    className="block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    onBlur={onBlur}
                    required={required}
                />
            </motion.div>
            <div className="absolute right-2 bottom-2 text-xs text-gray-400">
                {value.length} characters
            </div>
        </div>
    )
}

export default TextArea