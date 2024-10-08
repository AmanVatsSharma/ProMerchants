"use client"
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Plus, Trash2, Check, X, RefreshCw, ExternalLink } from 'lucide-react'

type Domain = {
    id: string
    name: string
    status: 'active' | 'pending' | 'error'
    ssl: boolean
    expiresAt: string
}

const initialDomains: Domain[] = [
    { id: '1', name: 'example.com', status: 'active', ssl: true, expiresAt: '2024-06-01' },
    { id: '2', name: 'mystore.shop', status: 'pending', ssl: false, expiresAt: '2024-07-15' },
]

export default function DomainManagementPage() {
    const [domains, setDomains] = useState(initialDomains)
    const [newDomain, setNewDomain] = useState('')
    const [isAdding, setIsAdding] = useState(false)
    const [error, setError] = useState('')

    const handleAddDomain = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsAdding(true)
        setError('')
        try {
            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            const newDomainObj: Domain = {
                id: String(domains.length + 1),
                name: newDomain,
                status: 'pending',
                ssl: false,
                expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            }
            setDomains([...domains, newDomainObj])
            setNewDomain('')
        } catch (err) {
            setError('Failed to add domain. Please try again.')
        } finally {
            setIsAdding(false)
        }
    }

    const handleRemoveDomain = async (id: string) => {
        try {
            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 500))
            setDomains(domains.filter(domain => domain.id !== id))
        } catch (err) {
            setError('Failed to remove domain. Please try again.')
        }
    }

    const handleRefreshSSL = async (id: string) => {
        try {
            // Simulating API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            setDomains(domains.map(domain =>
                domain.id === id ? { ...domain, ssl: true } : domain
            ))
        } catch (err) {
            setError('Failed to refresh SSL. Please try again.')
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 text-black">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                    <Globe className="mr-2" />
                    Domain Management
                </h1>
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="p-6">
                        <form onSubmit={handleAddDomain} className="mb-6">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={newDomain}
                                    onChange={(e) => setNewDomain(e.target.value)}
                                    placeholder="Enter new domain"
                                    className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    disabled={isAdding || !newDomain}
                                    className="px-4 py-2 bg-green-500 text-white rounded-md font-semibold inline-flex items-center space-x-2 hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Plus size={20} />
                                    <span>Add Domain</span>
                                </motion.button>
                            </div>
                            {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
                        </form>
                        <div className="space-y-4">
                            <AnimatePresence>
                                {domains.map((domain) => (
                                    <motion.div
                                        key={domain.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <span className="font-medium">{domain.name}</span>
                                            {domain.status === 'active' && (
                                                <span className="text-green-500 flex items-center">
                                                    <Check size={16} className="mr-1" />
                                                    Active
                                                </span>
                                            )}
                                            {domain.status === 'pending' && (
                                                <span className="text-yellow-500 flex items-center">
                                                    <RefreshCw size={16} className="mr-1" />
                                                    Pending
                                                </span>
                                            )}
                                            {domain.status === 'error' && (
                                                <span className="text-red-500 flex items-center">
                                                    <X size={16} className="mr-1" />
                                                    Error
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <span className={`text-sm ${domain.ssl ? 'text-green-500' : 'text-red-500'}`}>
                                                {domain.ssl ? 'SSL Active' : 'SSL Inactive'}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                Expires: {domain.expiresAt}
                                            </span>
                                            <button
                                                onClick={() => handleRefreshSSL(domain.id)}
                                                className="text-blue-500 hover:text-blue-600 transition-colors"
                                            >
                                                <RefreshCw size={20} />
                                            </button>
                                            <a
                                                href={`https://${domain.name}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:text-blue-600 transition-colors"
                                            >
                                                <ExternalLink size={20} />
                                            </a>
                                            <button
                                                onClick={() => handleRemoveDomain(domain.id)}
                                                className="text-red-500 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}