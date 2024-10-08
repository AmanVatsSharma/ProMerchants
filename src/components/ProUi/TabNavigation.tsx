"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface Tab {
    id: string
    label: string
    content: React.ReactNode
}

interface TabNavigationProps {
    tabs: Tab[]
    defaultTab?: string
    className?: string
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, defaultTab, className = '' }) => {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id)

    return (
        <div className={className}>
            <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`${activeTab === tab.id
                                    ? 'border-green-500 text-green-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
            <div className="mt-4">
                {tabs.map((tab) => (
                    <motion.div
                        key={tab.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: activeTab === tab.id ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                        className={activeTab === tab.id ? 'block' : 'hidden'}
                    >
                        {tab.content}
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default TabNavigation