"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DollarSign, ChevronDown, Check, X } from 'lucide-react'

type Currency = {
    code: string
    name: string
    symbol: string
}

type CurrencySelectorProps = {
    availableCurrencies: Currency[]
    selectedCurrency: Currency
    onCurrencyChange: (currency: Currency) => void
}

export default function CurrencySelector({
    availableCurrencies,
    selectedCurrency,
    onCurrencyChange,
}: CurrencySelectorProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredCurrencies, setFilteredCurrencies] = useState(availableCurrencies)

    useEffect(() => {
        const filtered = availableCurrencies.filter(
            (currency) =>
                currency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                currency.code.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredCurrencies(filtered)
    }, [searchTerm, availableCurrencies])

    const handleCurrencySelect = (currency: Currency) => {
        onCurrencyChange(currency)
        setIsOpen(false)
        setSearchTerm('')
    }

    return (
        <div className="relative w-64">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
                <span className="flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-gray-400" />
                    {selectedCurrency.code} - {selectedCurrency.name}
                </span>
                <ChevronDown className="w-5 h-5 ml-2 text-gray-400" />
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg"
                    >
                        <div className="p-2">
                            <input
                                type="text"
                                placeholder="Search currencies..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <ul className="max-h-60 overflow-auto py-1">
                            {filteredCurrencies.map((currency) => (
                                <motion.li
                                    key={currency.code}
                                    whileHover={{ backgroundColor: '#f3f4f6' }}
                                >
                                    <button
                                        onClick={() => handleCurrencySelect(currency)}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                                    >
                                        <span>
                                            {currency.code} - {currency.name}
                                        </span>
                                        {currency.code === selectedCurrency.code && (
                                            <Check className="w-5 h-5 text-green-500" />
                                        )}
                                    </button>
                                </motion.li>
                            ))}
                            {filteredCurrencies.length === 0 && (
                                <li className="px-4 py-2 text-sm text-gray-500">No currencies found</li>
                            )}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}