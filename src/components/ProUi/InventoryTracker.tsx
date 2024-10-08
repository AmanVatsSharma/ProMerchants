"use client"
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Package, AlertTriangle, ArrowUp, ArrowDown, Search } from 'lucide-react'

type Product = {
    id: string
    name: string
    sku: string
    inventory: number
    lowStockThreshold: number
}

type InventoryTrackerProps = {
    products: Product[]
    onUpdateInventory: (productId: string, newInventory: number) => Promise<void>
}

export default function InventoryTracker({ products: initialProducts, onUpdateInventory }: InventoryTrackerProps) {
    const [products, setProducts] = useState<Product[]>(initialProducts)
    const [searchTerm, setSearchTerm] = useState('')
    const [sortField, setSortField] = useState<keyof Product>('name')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

    useEffect(() => {
        const sortedProducts = [...products].sort((a, b) => {
            if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1
            if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1
            return 0
        })
        setProducts(sortedProducts)
    }, [sortField, sortDirection])

    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSort = (field: keyof Product) => {
        if (field === sortField) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortField(field)
            setSortDirection('asc')
        }
    }

    const handleInventoryChange = async (productId: string, change: number) => {
        const product = products.find((p) => p.id === productId)
        if (!product) return

        const newInventory = Math.max(0, product.inventory + change)
        try {
            await onUpdateInventory(productId, newInventory)
            setProducts(
                products.map((p) =>
                    p.id === productId ? { ...p, inventory: newInventory } : p
                )
            )
        } catch (error) {
            console.error('Failed to update inventory:', error)
        }
    }

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <Package className="mr-2" />
                    Inventory Tracker
                </h2>

                <div className="mb-4 flex items-center">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-100">
                                <th
                                    className="px-4 py-2 text-left cursor-pointer"
                                    onClick={() => handleSort('name')}
                                >
                                    Product Name
                                    {sortField === 'name' && (
                                        <span className="ml-1">
                                            {sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                                        </span>
                                    )}
                                </th>
                                <th
                                    className="px-4 py-2 text-left cursor-pointer"
                                    onClick={() => handleSort('sku')}
                                >
                                    SKU
                                    {sortField === 'sku' && (
                                        <span className="ml-1">
                                            {sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                                        </span>
                                    )}
                                </th>
                                <th
                                    className="px-4 py-2 text-left cursor-pointer"
                                    onClick={() => handleSort('inventory')}
                                >
                                    Inventory
                                    {sortField === 'inventory' && (
                                        <span className="ml-1">
                                            {sortDirection === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                                        </span>
                                    )}
                                </th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="border-b border-gray-200">
                                    <td className="px-4 py-2">{product.name}</td>
                                    <td className="px-4 py-2">{product.sku}</td>
                                    <td className="px-4 py-2">
                                        <span
                                            className={`font-semibold ${product.inventory <= product.lowStockThreshold
                                                    ? 'text-red-500'
                                                    : 'text-green-500'
                                                }`}
                                        >
                                            {product.inventory}
                                        </span>
                                        {product.inventory <= product.lowStockThreshold && (
                                            <AlertTriangle className="inline-block ml-2 text-yellow-500" size={16} />
                                        )}
                                    </td>
                                    <td className="px-4 py-2">
                                        <div className="flex items-center space-x-2">
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleInventoryChange(product.id, -1)}
                                                className="p-1 bg-red-100 text-red-600 rounded-md"
                                            >
                                                <ArrowDown size={16} />
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => handleInventoryChange(product.id, 1)}
                                                className="p-1 bg-green-100 text-green-600 rounded-md"
                                            >
                                                <ArrowUp size={16} />
                                            </motion.button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}