"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Folder, Plus, Edit2, Trash2, ChevronRight, ChevronDown } from 'lucide-react'

type Category = {
    id: string
    name: string
    parentId: string | null
    children: Category[]
}

type ProductCategoriesManagerProps = {
    initialCategories: Category[]
    onAddCategory: (category: Omit<Category, 'id' | 'children'>) => Promise<Category>
    onUpdateCategory: (category: Category) => Promise<void>
    onDeleteCategory: (id: string) => Promise<void>
}

export default function ProductCategoriesManager({
    initialCategories,
    onAddCategory,
    onUpdateCategory,
    onDeleteCategory,
}: ProductCategoriesManagerProps) {
    const [categories, setCategories] = useState<Category[]>(initialCategories)
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
    const [editingCategory, setEditingCategory] = useState<string | null>(null)

    const toggleExpand = (categoryId: string) => {
        setExpandedCategories((prev) => {
            const newSet = new Set(prev)
            if (newSet.has(categoryId)) {
                newSet.delete(categoryId)
            } else {
                newSet.add(categoryId)
            }
            return newSet
        })
    }

    const handleAddCategory = async (parentId: string | null) => {
        const newCategory = await onAddCategory({ name: 'New Category', parentId })
        setCategories((prev) => {
            if (parentId === null) {
                return [...prev, { ...newCategory, children: [] }]
            }
            return prev.map((category) =>
                category.id === parentId
                    ? { ...category, children: [...category.children, { ...newCategory, children: [] }] }
                    : category
            )
        })
        setEditingCategory(newCategory.id)
    }

    const handleUpdateCategory = async (category: Category) => {
        await onUpdateCategory(category)
        setCategories((prev) =>
            prev.map((c) => (c.id === category.id ? { ...c, name: category.name } : c))
        )
        setEditingCategory(null)
    }

    const handleDeleteCategory = async (categoryId: string) => {
        await onDeleteCategory(categoryId)
        setCategories((prev) => {
            const deleteRecursive = (categories: Category[]): Category[] =>
                categories.filter((c) => c.id !== categoryId).map((c) => ({
                    ...c,
                    children: deleteRecursive(c.children),
                }))
            return deleteRecursive(prev)
        })
    }

    const renderCategory = (category: Category, depth = 0) => (
        <div key={category.id} className="mb-2">
            <div className="flex items-center">
                <button
                    onClick={() => toggleExpand(category.id)}
                    className="mr-2 focus:outline-none"
                >
                    {category.children.length > 0 && (
                        expandedCategories.has(category.id) ? (
                            <ChevronDown size={16} />
                        ) : (
                            <ChevronRight size={16} />
                        )
                    )}
                </button>
                <Folder className="mr-2 text-yellow-500" size={20} />
                {editingCategory === category.id ? (
                    <input
                        type="text"
                        value={category.name}
                        onChange={(e) => handleUpdateCategory({ ...category, name: e.target.value })}
                        onBlur={() => setEditingCategory(null)}
                        autoFocus
                        className="flex-grow px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                ) : (
                    <span className="flex-grow">{category.name}</span>
                )}
                <div className="ml-auto space-x-2">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setEditingCategory(category.id)}
                        className="text-blue-500 hover:text-blue-600"
                    >
                        <Edit2 size={16} />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-red-500 hover:text-red-600"
                    >
                        <Trash2 size={16} />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleAddCategory(category.id)}
                        className="text-green-500 hover:text-green-600"
                    >
                        <Plus size={16} />
                    </motion.button>
                </div>
            </div>
            <AnimatePresence>
                {expandedCategories.has(category.id) && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-6 mt-2"
                    >
                        {category.children.map((child) => renderCategory(child, depth + 1))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <Folder className="mr-2" />
                    Product Categories
                </h2>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAddCategory(null)}
                    className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md font-semibold flex items-center"
                >
                    <Plus className="mr-2" />
                    Add Root Category
                </motion.button>

                <div className="space-y-2">
                    {categories.map((category) => renderCategory(category))}
                </div>
            </div>
        </div>
    )
}