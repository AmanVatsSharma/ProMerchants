"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

interface MenuItem {
    label: string
    href: string
}

interface Category {
    name: string
    items: MenuItem[]
}

interface MegaMenuProps {
    categories: Category[]
    className?: string
}

const MegaMenu: React.FC<MegaMenuProps> = ({ categories, className = '' }) => {
    const [activeCategory, setActiveCategory] = useState<string | null>(null)

    return (
        <nav className={`relative ${className}`}>
            <ul className="flex space-x-4">
                {categories.map((category) => (
                    <li
                        key={category.name}
                        className="relative"
                        onMouseEnter={() => setActiveCategory(category.name)}
                        onMouseLeave={() => setActiveCategory(null)}
                    >
                        <button className="flex items-center space-x-1 text-gray-700 hover:text-green-600">
                            <span>{category.name}</span>
                            <ChevronDown className="w-4 h-4" />
                        </button>
                        <AnimatePresence>
                            {activeCategory === category.name && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                                >
                                    <div className="py-1" role="menu" aria-orientation="vertical">
                                        {category.items.map((item) => (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                                role="menuitem"
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default MegaMenu