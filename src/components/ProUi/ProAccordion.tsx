import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface AccordionItem {
    title: string
    content: React.ReactNode
}

interface AccordionProps {
    items: AccordionItem[]
    className?: string
}

const ProAccordion: React.FC<AccordionProps> = ({ items, className = '' }) => {
    const [openItems, setOpenItems] = useState<number[]>([])

    const toggleItem = (index: number) => {
        setOpenItems((prevOpenItems) =>
            prevOpenItems.includes(index)
                ? prevOpenItems.filter((item) => item !== index)
                : [...prevOpenItems, index]
        )
    }

    return (
        <div className={`space-y-2 ${className}`}>
            {items.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-md">
                    <button
                        className="flex justify-between items-center w-full px-4 py-2 text-left"
                        onClick={() => toggleItem(index)}
                    >
                        <span className="font-medium text-gray-900">{item.title}</span>
                        <ChevronDown
                            className={`w-5 h-5 text-gray-500 transition-transform ${openItems.includes(index) ? 'transform rotate-180' : ''
                                }`}
                        />
                    </button>
                    <AnimatePresence>
                        {openItems.includes(index) && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="px-4 py-2 text-gray-700">{item.content}</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    )
}

export default ProAccordion