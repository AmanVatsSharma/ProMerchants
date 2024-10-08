"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Save, AlertCircle, Check } from 'lucide-react'

type SEOSettings = {
    title: string
    description: string
    keywords: string[]
    canonicalUrl: string
    robotsTxt: string
    structuredData: string
}

type SEOSettingsFormProps = {
    initialSettings: SEOSettings
    onSave: (settings: SEOSettings) => Promise<void>
}

export default function SEOSettingsForm({ initialSettings, onSave }: SEOSettingsFormProps) {
    const [settings, setSettings] = useState<SEOSettings>(initialSettings)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setSettings(prev => ({ ...prev, [name]: value }))
    }

    const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const keywords = e.target.value.split(',').map(keyword => keyword.trim())
        setSettings(prev => ({ ...prev, keywords }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        setSuccess(false)

        try {
            await onSave(settings)
            setSuccess(true)
        } catch (err) {
            setError('Failed to save SEO settings. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto text-black">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white shadow-lg rounded-lg p-6"
            >
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <Search className="mr-2" />
                    SEO Settings
                </h2>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Page Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={settings.title}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                            maxLength={60}
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            {settings.title.length}/60 characters
                        </p>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Meta Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={settings.description}
                            onChange={handleChange}
                            rows={3}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                            maxLength={160}
                        />
                        <p className="mt-1 text-sm text-gray-500">
                            {settings.description.length}/160 characters
                        </p>
                    </div>

                    <div>
                        <label htmlFor="keywords" className="block text-sm font-medium text-gray-700">
                            Keywords (comma-separated)
                        </label>
                        <input
                            type="text"
                            id="keywords"
                            name="keywords"
                            value={settings.keywords.join(', ')}
                            onChange={handleKeywordsChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="canonicalUrl" className="block text-sm font-medium text-gray-700">
                            Canonical URL
                        </label>
                        <input
                            type="url"
                            id="canonicalUrl"
                            name="canonicalUrl"
                            value={settings.canonicalUrl}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="robotsTxt" className="block text-sm font-medium text-gray-700">
                            Robots.txt Content
                        </label>
                        <textarea
                            id="robotsTxt"
                            name="robotsTxt"
                            value={settings.robotsTxt}
                            onChange={handleChange}
                            rows={4}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 font-mono text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="structuredData" className="block text-sm font-medium text-gray-700">
                            Structured Data (JSON-LD)
                        </label>
                        <textarea
                            id="structuredData"
                            name="structuredData"
                            value={settings.structuredData}
                            onChange={handleChange}
                            rows={6}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 font-mono text-sm"
                        />
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={isLoading}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full mr-2"
                                />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5 mr-2" />
                                Save SEO Settings
                            </>
                        )}
                    </motion.button>
                </div>
            </motion.div>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-center"
                    >
                        <AlertCircle className="w-5 h-5 mr-2" />
                        {error}
                    </motion.div>
                )}
                {success && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md flex items-center"
                    >
                        <Check className="w-5 h-5 mr-2" />
                        SEO settings saved successfully!
                    </motion.div>
                )}
            </AnimatePresence>
        </form>
    )
}