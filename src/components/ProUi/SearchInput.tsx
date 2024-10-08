"use state"
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'

interface SearchInputProps {
    placeholder?: string
    onSearch: (query: string) => void
    className?: string
}

const SearchInput: React.FC<SearchInputProps> = ({
    placeholder = 'Search...',
    onSearch,
    className = '',
}) => {
    const [query, setQuery] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
                setIsFocused(false)
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
    }

    const clearSearch = () => {
        setQuery('')
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }

    return (
        <form onSubmit={handleSubmit} className={`relative ${className}`}>
            <motion.div
                animate={isFocused ? { scale: 1.05 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
            >
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-2 pl-10 pr-10 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    onFocus={() => setIsFocused(true)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <AnimatePresence>
                    {query && (
                        <motion.button
                            type="button"
                            onClick={clearSearch}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X size={20} />
                        </motion.button>
                    )}
                </AnimatePresence>
            </motion.div>
        </form>
    )
}

export default SearchInput