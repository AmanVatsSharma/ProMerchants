"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, AlertCircle } from 'lucide-react'

interface InputFieldProps {
    label: string
    name: string
    type?: 'text' | 'email' | 'password' | 'number'
    placeholder?: string
    value: string
    onChange: (value: string) => void
    onBlur?: () => void
    validate?: (value: string) => string | null
    required?: boolean
    className?: string
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    name,
    type = 'text',
    placeholder,
    value,
    onChange,
    onBlur,
    validate,
    required = false,
    className = '',
}) => {
    const [error, setError] = useState<string | null>(null)
    const [isTouched, setIsTouched] = useState(false)
    const [isValid, setIsValid] = useState(false)

    useEffect(() => {
        if (isTouched && validate) {
            const validationError = validate(value)
            setError(validationError)
            setIsValid(!validationError)
        }
    }, [value, isTouched, validate])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
        setIsTouched(true)
    }

    const handleBlur = () => {
        setIsTouched(true)
        if (onBlur) onBlur()
    }

    return (
        <div className={`relative ${className}`}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
                <input
                    type={type}
                    id={name}
                    name={name}
                    className={`block w-full px-4 py-2 text-gray-900 border rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 ${error ? 'border-red-300' : isValid ? 'border-green-300' : 'border-gray-300'
                        }`}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required={required}
                />
                <AnimatePresence>
                    {isValid && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                            <Check className="w-5 h-5 text-green-500" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 -bottom-6 flex items-center text-sm text-red-500"
                    >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default InputField