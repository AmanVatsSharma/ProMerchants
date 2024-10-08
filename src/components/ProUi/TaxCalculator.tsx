"use client"
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Plus, Minus, Percent } from 'lucide-react'

type TaxRule = {
    id: string
    name: string
    rate: number
    appliesTo: string[]
}

type Product = {
    id: string
    name: string
    price: number
    category: string
}

type TaxCalculatorProps = {
    taxRules: TaxRule[]
    products: Product[]
}

export default function TaxCalculator({ taxRules, products }: TaxCalculatorProps) {
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
    const [customAmount, setCustomAmount] = useState<number | ''>('')
    const [totalBeforeTax, setTotalBeforeTax] = useState(0)
    const [totalTax, setTotalTax] = useState(0)
    const [totalAfterTax, setTotalAfterTax] = useState(0)

    useEffect(() => {
        calculateTotals()
    }, [selectedProducts, customAmount])

    const calculateTotals = () => {
        let subtotal = selectedProducts.reduce((sum, product) => sum + product.price, 0)
        if (customAmount) {
            subtotal += Number(customAmount)
        }
        setTotalBeforeTax(subtotal)

        let taxTotal = 0
        selectedProducts.forEach((product) => {
            const applicableRules = taxRules.filter((rule) =>
                rule.appliesTo.includes(product.category)
            )
            const productTax = applicableR
            ules.reduce((sum, rule) => sum + product.price * (rule.rate / 100), 0)
            taxTotal += productTax
        })

        if (customAmount) {
            const customTax = taxRules.reduce((sum, rule) => sum + Number(customAmount) * (rule.rate / 100), 0)
            taxTotal += customTax
        }

        setTotalTax(taxTotal)
        setTotalAfterTax(subtotal + taxTotal)
    }

    const handleProductToggle = (product: Product) => {
        setSelectedProducts((prev) =>
            prev.some((p) => p.id === product.id)
                ? prev.filter((p) => p.id !== product.id)
                : [...prev, product]
        )
    }

    const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setCustomAmount(value === '' ? '' : Number(value))
    }

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <Calculator className="mr-2" />
                    Tax Calculator
                </h2>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Select Products</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {products.map((product) => (
                            <motion.button
                                key={product.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleProductToggle(product)}
                                className={`p-2 rounded-md text-left ${selectedProducts.some((p) => p.id === product.id)
                                        ? 'bg-green-100 border-green-500'
                                        : 'bg-gray-100 border-gray-300'
                                    } border`}
                            >
                                <div className="font-medium">{product.name}</div>
                                <div className="text-sm text-gray-500">${product.price.toFixed(2)}</div>
                            </motion.button>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Custom Amount</h3>
                    <div className="flex items-center">
                        <span className="mr-2">$</span>
                        <input
                            type="number"
                            value={customAmount}
                            onChange={handleCustomAmountChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter custom amount"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="font-medium">Subtotal:</span>
                        <span>${totalBeforeTax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-medium">Tax:</span>
                        <span>${totalTax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total:</span>
                        <span>${totalAfterTax.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 px-6 py-4">
                <h3 className="text-lg font-semibold mb-2">Applied Tax Rules</h3>
                <ul className="space-y-2">
                    {taxRules.map((rule) => (
                        <li key={rule.id} className="flex items-center">
                            <Percent className="w-4 h-4 mr-2 text-gray-400" />
                            <span>
                                {rule.name}: {rule.rate}% on {rule.appliesTo.join(', ')}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}