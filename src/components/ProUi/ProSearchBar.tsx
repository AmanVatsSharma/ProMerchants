"use client"
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'

interface SearchBarProps {
    onSearch: (query: string) => void
    suggestions?: string[]
    placeholder?: string
    className?: string
}

const ProSearchBar: React.FC<SearchBarProps> = ({
    onSearch,
    suggestions = [],
    placeholder = 'Search...',
    className = '',
}) => {
    const [query, setQuery] = useState('')
    const [showSuggestions, setShowSuggestions] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const suggestionsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
                setShowSuggestions(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSearch(query)
        setShowSuggestions(false)
    }

    const handleSuggestionClick = (suggestion: string) => {
        setQuery(suggestion)
        onSearch(suggestion)
        setShowSuggestions(false)
    }

    return (
        <div className={`relative ${className}`}>
            <form onSubmit={handleSubmit} className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                        setShowSuggestions(true)
                    }}
                    placeholder={placeholder}
                    className="w-full px-4 py-2 pl-10 pr-10 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                {query && (
                    <button
                        type="button"
                        onClick={() => {
                            setQuery('')
                            inputRef.current?.focus()
                        }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                )}
            </form>
            <AnimatePresence>
                {showSuggestions && suggestions.length > 0 && (
                    <motion.div
                        ref={suggestionsRef}
                        className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        {suggestions
                            .filter((suggestion) => suggestion.toLowerCase().includes(query.toLowerCase()))
                            .map((suggestion, index) => (
                                <button
                                    key={index}
                                    className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion}
                                </button>
                            ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ProSearchBar