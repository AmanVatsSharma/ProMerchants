"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Plus } from 'lucide-react'

type ProductTagsInputProps = {
    initialTags: string[]
    onTagsChange: (tags: string[]) => void
}

export default function ProductTagsInput({ initialTags, onTagsChange }: ProductTagsInputProps) {
    const [tags, setTags] = useState<string[]>(initialTags)
    const [inputValue, setInputValue] = useState<string>('')

    const handleAddTag = () => {
        if (inputValue.trim() && !tags.includes(inputValue.trim())) {
            const newTags = [...tags, inputValue.trim()]
            setTags(newTags)
            onTagsChange(newTags)
            setInputValue('')
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        const newTags = tags.filter(tag => tag !== tagToRemove)
        setTags(newTags)
        onTagsChange(newTags)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleAddTag()
        }
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Tags</h2>
            <div className="flex flex-wrap gap-2 mb-4">
                {tags.map(tag => (
                    <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                        {tag}
                        <button
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-2 focus:outline-none"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </motion.span>
                ))}
            </div>
            <div className="flex space-x-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Add a tag"
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                    <Plus className="w-5 h-5" />
                </motion.button>
            </div>
        </div>
    )
}