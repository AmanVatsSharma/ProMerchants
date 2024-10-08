"use client"
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, Plus, Edit2, Trash2, Search, ChevronDown, ChevronUp } from 'lucide-react'

type Product = {
    id: string
    name: string
    description: string
    price: number
    category: string
    sku: string
    inventory: number
}

type ProductManagerProps = {
    initialProducts: Product[]
    onAddProduct: (product: Omit<Product, 'id'>) => Promise<Product>
    onUpdateProduct: (product: Product) => Promise<Product>
    onDeleteProduct: (id: string) => Promise<void>
}

export default function ProductManager({
    initialProducts,
    onAddProduct,
    onUpdateProduct,
    onDeleteProduct,
}: ProductManagerProps) {
    const [products, setProducts] = useState<Product[]>(initialProducts)
    const [searchTerm, setSearchTerm] = useState('')
    const [sortField, setSortField] = useState<keyof Product>('name')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [isAddingProduct, setIsAddingProduct] = useState(false)

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
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

    const handleAddProduct = async (product: Omit<Product, 'id'>) => {
        try {
            const newProduct = await onAddProduct(product)
            setProducts([...products, newProduct])
            setIsAddingProduct(false)
        } catch (error) {
            console.error('Failed to add product:', error)
        }
    }

    const handleUpdateProduct = async (product: Product) => {
        try {
            const updatedProduct = await onUpdateProduct(product)
            setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)))
            setEditingProduct(null)
        } catch (error) {
            console.error('Failed to update product:', error)
        }
    }

    const handleDeleteProduct = async (id: string) => {
        try {
            await onDeleteProduct(id)
            setProducts(products.filter((p) => p.id !== id))
        } catch (error) {
            console.error('Failed to delete product:', error)
        }
    }

    return (
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <Package className="mr-2" />
                    Product Manager
                </h2>

                <div className="flex justify-between items-center mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsAddingProduct(true)}
                        className="px-4 py-2 bg-green-500 text-white rounded-md font-semibold flex items-center"
                    >
                        <Plus className="mr-2" />
                        Add Product
                    </motion.button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-100">
                                {['Name', 'Price', 'Category', 'SKU', 'Inventory', 'Actions'].map((header) => (
                                    <th
                                        key={header}
                                        className="px-4 py-2 text-left cursor-pointer"
                                        onClick={() => handleSort(header.toLowerCase() as keyof Product)}
                                    >
                                        <div className="flex items-center">
                                            {header}
                                            {sortField === header.toLowerCase() && (
                                                <span className="ml-1">
                                                    {sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence>
                                {filteredProducts.map((product) => (
                                    <motion.tr
                                        key={product.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="border-b border-gray-200 hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-2">{product.name}</td>
                                        <td className="px-4 py-2">${product.price.toFixed(2)}</td>
                                        <td className="px-4 py-2">{product.category}</td>
                                        <td className="px-4 py-2">{product.sku}</td>
                                        <td className="px-4 py-2">{product.inventory}</td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => setEditingProduct(product)}
                                                className="text-blue-500 hover:text-blue-600 mr-2"
                                            >
                                                <Edit2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className="text-red-500 hover:text-red-600"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            <AnimatePresence>
                {(isAddingProduct || editingProduct) && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    >
                        <ProductForm
                            product={editingProduct || undefined}
                            onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
                            onCancel={() => {
                                setIsAddingProduct(false)
                                setEditingProduct(null)
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

type ProductFormProps = {
    product?: Product
    onSubmit: (product: Product | Omit<Product, 'id'>) => void
    onCancel: () => void
}

function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
    const [formData, setFormData] = useState<Omit<Product, 'id'>>({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || 0,
        category: product?.category || '',
        sku: product?.sku || '',
        inventory: product?.inventory || 0,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: name === 'price' || name === 'inventory' ? Number(value) : value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(product ? { ...formData, id: product.id } : formData)
    }

    return (
        <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full"
        >
            <h3 className="text-xl font-bold mb-4">{product ? 'Edit Product' : 'Add Product'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                <div>
                    <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
                        SKU
                    </label>
                    <input
                        type="text"
                        id="sku"
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                <div>
                    <label htmlFor="inventory" className="block text-sm font-medium text-gray-700">
                        Inventory
                    </label>
                    <input
                        type="number"
                        id="inventory"
                        name="inventory"
                        value={formData.inventory}
                        onChange={handleChange}
                        required
                        min="0"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        {product ? 'Update' : 'Add'} Product
                    </button>
                </div>
            </form>
        </motion.div>
    )
}