"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Search, Download } from 'lucide-react'

type Order = {
    id: string
    customerName: string
    date: string
    total: number
    status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled'
    items: { name: string; quantity: number; price: number }[]
}

type OrderHistoryTableProps = {
    orders: Order[]
    onExportCSV: () => void
}

export default function OrderHistoryTable({ orders, onExportCSV }: OrderHistoryTableProps) {
    const [sortColumn, setSortColumn] = useState<keyof Order>('date')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
    const [searchTerm, setSearchTerm] = useState('')
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

    const handleSort = (column: keyof Order) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(column)
            setSortDirection('asc')
        }
    }

    const filteredOrders = orders.filter(
        order =>
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const sortedOrders = [...filteredOrders].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
        return 0
    })

    const toggleOrderExpansion = (orderId: string) => {
        setExpandedOrder(expandedOrder === orderId ? null : orderId)
    }

    const getStatusColor = (status: Order['status']) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800'
            case 'Shipped': return 'bg-blue-100 text-blue-800'
            case 'Delivered': return 'bg-green-100 text-green-800'
            case 'Cancelled': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 flex justify-between items-center border-b">
                <h2 className="text-xl font-semibold">Order History</h2>
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onExportCSV}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                    </motion.button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => handleSort('id')}
                            >
                                Order ID
                                {sortColumn === 'id' && (
                                    sortDirection === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />
                                )}
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => handleSort('customerName')}
                            >
                                Customer
                                {sortColumn === 'customerName' && (
                                    sortDirection === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />
                                )}
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => handleSort('date')}
                            >
                                Date
                                {sortColumn === 'date' && (
                                    sortDirection === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />
                                )}
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => handleSort('total')}
                            >
                                Total
                                {sortColumn === 'total' && (
                                    sortDirection === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />
                                )}
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => handleSort('status')}
                            >
                                Status
                                {sortColumn === 'status' && (
                                    sortDirection === 'asc' ? <ChevronUp className="inline ml-1" /> : <ChevronDown className="inline ml-1" />
                                )}
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedOrders.map((order) => (
                            <React.Fragment key={order.id}>
                                <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleOrderExpansion(order.id)}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customerName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${order.total.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                                {expandedOrder === order.id && (
                                    <tr>
                                        <td colSpan={5}>
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="px-6 py-4 bg-gray-50"
                                            >
                                                <h4 className="text-sm font-semibold mb-2">Order Items:</h4>
                                                <ul className="list-disc list-inside">
                                                    {order.items.map((item, index) => (
                                                        <li key={index} className="text-sm text-gray-600">
                                                            {item.name} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}