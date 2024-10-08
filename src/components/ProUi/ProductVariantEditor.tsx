"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, Plus, X, Save } from 'lucide-react'

type Variant = {
    id: string
    name: string
    options: string[]
}

type ProductVariant = {
    id: string
    combination: Record<string, string>
    price: number
    inventory: number
    sku: string
}

type ProductVariantEditorProps = {
    productId: string
    initialVariants: Variant[]
    initialProductVariants: ProductVariant[]
    onSave: (variants: Variant[], productVariants: ProductVariant[]) => Promise<void>
}

export default function ProductVariantEditor({
    productId,
    initialVariants,
    initialProductVariants,
    onSave,
}: ProductVariantEditorProps) {
    const [variants, setVariants] = useState<Variant[]>(initialVariants)
    const [productVariants, setProductVariants] = useState<ProductVariant[]>(initialProductVariants)
    const [isLoading, setIsLoading] = useState(false)

    const handleAddVariant = () => {
        const newVariant: Variant =
        {
            id: `variant_${Date.now()}`,
            name: '',
            options: [''],
        }
        setVariants([...variants, newVariant])
    }

    const handleRemoveVariant = (variantId: string) => {
        setVariants(variants.filter((v) => v.id !== variantId))
        setProductVariants(
            productVariants.filter((pv) => !pv.combination.hasOwnProperty(variantId))
        )
    }

    const handleVariantNameChange = (variantId: string, name: string) => {
        setVariants(
            variants.map((v) => (v.id === variantId ? { ...v, name } : v))
        )
    }

    const handleAddOption = (variantId: string) => {
        setVariants(
            variants.map((v) =>
                v.id === variantId ? { ...v, options: [...v.options, ''] } : v
            )
        )
    }

    const handleRemoveOption = (variantId: string, index: number) => {
        setVariants(
            variants.map((v) =>
                v.id === variantId
                    ? { ...v, options: v.options.filter((_, i) => i !== index) }
                    : v
            )
        )
    }

    const handleOptionChange = (variantId: string, index: number, value: string) => {
        setVariants(
            variants.map((v) =>
                v.id === variantId
                    ? { ...v, options: v.options.map((o, i) => (i === index ? value : o)) }
                    : v
            )
        )
    }

    const generateCombinations = (
        variants: Variant[],
        current: Record<string, string> = {},
        index: number = 0
    ): Record<string, string>[] => {
        if (index === variants.length) {
            return [current]
        }

        const variant = variants[index]
        const combinations: Record<string, string>[] = []

        for (const option of variant.options) {
            combinations.push(
                ...generateCombinations(variants, { ...current, [variant.id]: option }, index + 1)
            )
        }

        return combinations
    }

    const handleGenerateVariants = () => {
        const combinations = generateCombinations(variants)
        const newProductVariants = combinations.map((combination) => {
            const existingVariant = productVariants.find(
                (pv) =>
                    JSON.stringify(pv.combination) === JSON.stringify(combination)
            )
            return existingVariant || {
                id: `pv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                combination,
                price: 0,
                inventory: 0,
                sku: '',
            }
        })
        setProductVariants(newProductVariants)
    }

    const handleProductVariantChange = (
        variantId: string,
        field: keyof ProductVariant,
        value: string | number
    ) => {
        setProductVariants(
            productVariants.map((pv) =>
                pv.id === variantId ? { ...pv, [field]: value } : pv
            )
        )
    }

    const handleSave = async () => {
        setIsLoading(true)
        try {
            await onSave(variants, productVariants)
        } catch (error) {
            console.error('Failed to save variants:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <Layers className="mr-2" />
                    Product Variant Editor
                </h2>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Variant Types</h3>
                    {variants.map((variant) => (
                        <div key={variant.id} className="mb-4 p-4 border border-gray-200 rounded-md">
                            <div className="flex items-center justify-between mb-2">
                                <input
                                    type="text"
                                    value={variant.name}
                                    onChange={(e) => handleVariantNameChange(variant.id, e.target.value)}
                                    placeholder="Variant name (e.g., Color, Size)"
                                    className="flex-grow mr-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <button
                                    onClick={() => handleRemoveVariant(variant.id)}
                                    className="text-red-500 hover:text-red-600"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="space-y-2">
                                {variant.options.map((option, index) => (
                                    <div key={index} className="flex items-center">
                                        <input
                                            type="text"
                                            value={option}
                                            onChange={(e) => handleOptionChange(variant.id, index, e.target.value)}
                                            placeholder="Option value"
                                            className="flex-grow mr-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                        <button
                                            onClick={() => handleRemoveOption(variant.id, index)}
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => handleAddOption(variant.id)}
                                className="mt-2 text-green-500 hover:text-green-600 font-medium"
                            >
                                + Add Option
                            </button>
                        </div>
                    ))}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddVariant}
                        className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md font-semibold flex items-center"
                    >
                        <Plus className="mr-2" />
                        Add Variant Type
                    </motion.button>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Generate Variants</h3>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleGenerateVariants}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md font-semibold"
                    >
                        Generate Product Variants
                    </motion.button>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Product Variants</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-100">
                                    {variants.map((variant) => (
                                        <th key={variant.id} className="px-4 py-2 text-left">
                                            {variant.name}
                                        </th>
                                    ))}
                                    <th className="px-4 py-2 text-left">Price</th>
                                    <th className="px-4 py-2 text-left">Inventory</th>
                                    <th className="px-4 py-2 text-left">SKU</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productVariants.map((pv) => (
                                    <tr key={pv.id} className="border-b border-gray-200">
                                        {variants.map((variant) => (
                                            <td key={variant.id} className="px-4 py-2">
                                                {pv.combination[variant.id]}
                                            </td>
                                        ))}
                                        <td className="px-4 py-2">
                                            <input
                                                type="number"
                                                value={pv.price}
                                                onChange={(e) =>
                                                    handleProductVariantChange(pv.id, 'price', parseFloat(e.target.value))
                                                }
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="number"
                                                value={pv.inventory}
                                                onChange={(e) =>
                                                    handleProductVariantChange(pv.id, 'inventory', parseInt(e.target.value))
                                                }
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="text"
                                                value={pv.sku}
                                                onChange={(e) =>
                                                    handleProductVariantChange(pv.id, 'sku', e.target.value)
                                                }
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    disabled={isLoading}
                    className="px-4 py-2 bg-green-500 text-white rounded-md font-semibold flex items-center"
                >
                    {isLoading ? (
                        <>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full mr-2"
                            />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save className="mr-2" />
                            Save Variants
                        </>
                    )}
                </motion.button>
            </div>
        </div>
    )
}