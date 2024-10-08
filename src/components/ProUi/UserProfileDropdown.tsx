"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Settings, HelpCircle, LogOut, ChevronDown } from 'lucide-react'

type UserProfileDropdownProps = {
    user: {
        name: string
        email: string
        avatar: string
    }
    onLogout: () => void
    onSettingsClick: () => void
    onHelpClick: () => void
}

export default function UserProfileDropdown({
    user,
    onLogout,
    onSettingsClick,
    onHelpClick
}: UserProfileDropdownProps) {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDropdown = () => setIsOpen(!isOpen)

    const dropdownVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
    }

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="flex items-center space-x-3 focus:outline-none"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-green-500"
                />
                <span className="font-medium text-gray-700">{user.name}</span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={dropdownVariants}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                    >
                        <a
                            href="#profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                            <User className="w-4 h-4 mr-3" />
                            Profile
                        </a>
                        <button
                            onClick={onSettingsClick}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                            <Settings className="w-4 h-4 mr-3" />
                            Settings
                        </button>
                        <button
                            onClick={onHelpClick}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        >
                            <HelpCircle className="w-4 h-4 mr-3" />
                            Help
                        </button>
                        <button
                            onClick={onLogout}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                        >
                            <LogOut className="w-4 h-4 mr-3" />
                            Logout
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}