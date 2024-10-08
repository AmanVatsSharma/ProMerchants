"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, DollarSign, AlertCircle, CheckCircle, XCircle } from 'lucide-react'

type Subscription = {
    id: string
    name: string
    price: number
    billingCycle: 'Monthly' | 'Quarterly' | 'Annually'
    status: 'Active' | 'Paused' | 'Cancelled'
    nextBillingDate: string
    customerId: string
    customerName: string
}

type SubscriptionManagerProps = {
    subscriptions: Subscription[]
    onUpdateStatus: (subscriptionId: string, newStatus: Subscription['status']) => void
    onRenew: (subscriptionId: string) => void
}

export default function SubscriptionManager({
    subscriptions,
    onUpdateStatus,
    onRenew
}: SubscriptionManagerProps) {
    const [searchTerm, setSearchTerm] = useState('')
    const [filter, setFilter] = useState<Subscription['status'] | 'All'>('All')

    const filteredSubscriptions = subscriptions.filter(
        sub =>
            (sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sub.customerName.toLowerCase().includes(searchTerm.toLowerCase())) &&
            (filter === 'All' || sub.status === filter)
    )

    const getStatusColor = (status: Subscription['status']) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800'
            case 'Paused': return 'bg-yellow-100 text-yellow-800'
            case 'Cancelled': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    const getBillingCycleIcon = (cycle: Subscription['billingCycle']) => {
        switch (cycle) {
            case 'Monthly': return <Calendar className="w-5 h-5 text-blue-500" />
            case 'Quarterly': return <Calendar className="w-5 h-5 text-purple-500" />
            case 'Annually': return <Calendar className="w-5 h-5 text-green-500" />
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 border-b">
                <h2 className="text-xl font-semibold mb-4">Subscription Manager</h2>
                <div className="flex flex-wrap gap-4">
                    <input
                        type="text"
                        placeholder="Search subscriptions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as Subscription['status'] | 'All')}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Active">Active</option>
                        <option value="Paused">Paused</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Billing Cycle</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Billing</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredSubscriptions.map((subscription) => (
                            <tr key={subscription.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{subscription.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subscription.customerName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex items-center">
                                        <DollarSign className="w-4 h-4 mr-1 text-green-500" />
                                        {subscription.price.toFixed(2)}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex items-center">
                                        {getBillingCycleIcon(subscription.billingCycle)}
                                        <span className="ml-2">{subscription.billingCycle}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(subscription.nextBillingDate).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(subscription.status)}`}>
                                        {subscription.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex space-x-2">
                                        {subscription.status !== 'Cancelled' && (
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => onUpdateStatus(subscription.id, subscription.status === 'Active' ? 'Paused' : 'Active')}
                                                className={`p-1 rounded-full ${subscription.status === 'Active' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}
                                            >
                                                {subscription.status === 'Active' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                                            </motion.button>
                                        )}
                                        {subscription.status !== 'Cancelled' && (
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => onUpdateStatus(subscription.id, 'Cancelled')}
                                                className="p-1 rounded-full bg-red-100 text-red-600"
                                            >
                                                <XCircle className="w-5 h-5" />
                                            </motion.button>
                                        )}
                                        {subscription.status === 'Cancelled' && (
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => onRenew(subscription.id)}
                                                className="p-1 rounded-full bg-blue-100 text-blue-600"
                                            >
                                                <Calendar className="w-5 h-5" />
                                            </motion.button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}