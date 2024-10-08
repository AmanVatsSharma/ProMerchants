"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    className?: string
}

const ProPagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    className = '',
}) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

    const renderPageButton = (page: number) => (
        <motion.button
            key={page}
            className={`px-3 py-1 rounded-md ${currentPage === page
                    ? 'bg-green-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
            onClick={() => onPageChange(page)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            {page}
        </motion.button>
    )

    const renderEllipsis = (key: string) => (
        <span key={key} className="px-3 py-1">
            ...
        </span>
    )

    const renderPageButtons = () => {
        const buttons = []
        const maxVisiblePages = 5

        if (totalPages <= maxVisiblePages) {
            return pageNumbers.map(renderPageButton)
        }

        buttons.push(renderPageButton(1))

        if (currentPage > 3) {
            buttons.push(renderEllipsis('start-ellipsis'))
        }

        const start = Math.max(2, currentPage - 1)
        const end = Math.min(totalPages - 1, currentPage + 1)

        for (let i = start; i <= end; i++) {
            buttons.push(renderPageButton(i))
        }

        if (currentPage < totalPages - 2) {
            buttons.push(renderEllipsis('end-ellipsis'))
        }

        buttons.push(renderPageButton(totalPages))

        return buttons
    }

    return (
        <div className={`flex items-center justify-center space-x-2 ${className}`}>
            <motion.button
                className="p-1 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <ChevronLeft className="w-5 h-5" />
            </motion.button>
            {renderPageButtons()}
            <motion.button
                className="p-1 rounded-md text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <ChevronRight className="w-5 h-5" />
            </motion.button>
        </div>
    )
}

export default ProPagination