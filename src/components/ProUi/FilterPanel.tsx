"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FilterOption {
    id: string
    label: string
}

interface FilterGroup {
    id: string
    name: string
    options: FilterOption[]
}

interface FilterPanelProps {
    groups: FilterGroup[]
    onFilterChange: (filters: { [key: string]: string[] }) => void
    className?: string
}

const FilterPanel: React.FC<FilterPanelProps> = ({
    groups,
    onFilterChange,
    className = '',
}) => {
    const [expandedGroups, setExpandedGroups] = useState<string[]>(groups.map(group => group.id))
    const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({})

    const toggleGroup = (groupId: string) => {
        setExpandedGroups(prev =>
            prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
        )
    }

    const toggleFilter = (groupId: string, optionId: string) => {
        setSelectedFilters(prev => {
            const updatedFilters = { ...prev }
            if (!updatedFilters[groupId]) {
                updatedFilters[groupId] = []
            }
            if (updatedFilters[groupId].includes(optionId)) {
                updatedFilters[groupId] = updatedFilters[groupId].filter(id => id !== optionId)
            } else {
                updatedFilters[groupId] = [...updatedFilters[groupId], optionId]
            }
            onFilterChange(updatedFilters)
            return updatedFilters
        })
    }

    return (
        <div className={`bg-white rounded-lg shadow-md ${className}`}>
            {groups.map((group) => (
                <div key={group.id} className="border-b border-gray-200 last:border-b-0">
                    <button
                        className="w-full px-4 py-3 flex justify-between items-center focus:outline-none"
                        onClick={() => toggleGroup(group.id)}
                    >
                        <span className="font-medium text-gray-700">{group.name}</span>
                        {expandedGroups.includes(group.id) ? (
                            <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                    </button>
                    <AnimatePresence>
                        {expandedGroups.includes(group.id) && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="px-4 py-2 space-y-2">
                                    {group.options.map((option) => (
                                        <label key={option.id} className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                checked={selectedFilters[group.id]?.includes(option.id) || false}
                                                onChange={() => toggleFilter(group.id, option.id)}
                                                className="form-checkbox h-4 w-4 text-green-500 rounded focus:ring-green-500"
                                            />
                                            <span className="text-sm text-gray-600">{option.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    )
}

export default FilterPanel