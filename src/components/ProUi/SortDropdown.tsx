"use client"
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check } from 'lucide-react'

interface SortOption {
    value: string
    label: string
}

interface SortDropdownProps {
    options: SortOption[]
    onSort: (value: string) => void
    defaultOption?: string
    className?: string
}

const SortDropdown: React.FC<SortDropdownProps> = ({
    options,
    onSort,
    defaultOption,
    className = '',
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(defaultOption || options[0].value)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleSelect = (value: string) => {
        setSelectedOption(value)
        onSort(value)
        setIsOpen(false)
    }

    return (
        <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
            <div>
                <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {options.find(option => option.value === selectedOption)?.label}
                    <ChevronDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.1 }}
                    >
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    className={`${selectedOption === option.value ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                        } group flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900`}
                                    role="menuitem"
                                    onClick={() => handleSelect(option.value)}
                                >
                                    {selectedOption === option.value && (
                                        <Check className="mr-3 h-5 w-5 text-green-500" aria-hidden="true" />
                                    )}
                                    <span className={selectedOption === option.value ? 'font-medium' : ''}>{option.label}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default SortDropdown