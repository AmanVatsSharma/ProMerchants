"use client"
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Save, X } from 'lucide-react'

type Setting = {
    id: string
    label: string
    value: string
    type: 'text' | 'email' | 'number' | 'select'
    options?: string[]
}

type StoreSettingsPanelProps = {
    settings: Setting[]
    onSave: (settings: Setting[]) => void
    onClose: () => void
}

export default function StoreSettingsPanel({ settings: initialSettings, onSave, onClose }: StoreSettingsPanelProps = { settings: [], onSave: () => { }, onClose: () => { } }) {
    const [settings, setSettings] = useState(initialSettings)
    const [expandedSetting, setExpandedSetting] = useState<string | null>(null)

    const handleChange = (id: string, value: string) => {
        setSettings(settings.map(setting => setting.id === id ? { ...setting, value } : setting))
    }

    const handleSave = () => {
        onSave(settings)
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        >
            <motion.div
                className="w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden"
                layoutId="storeSettingsPanel"
            >
                <div className="flex justify-between items-center p-6 bg-green-500 text-white">
                    <h2 className="text-2xl font-bold">Store Settings</h2>
                    <button onClick={onClose} className="text-white hover:text-gray-200 transition-colors">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    {settings.map((setting) => (
                        <motion.div
                            key={setting.id}
                            className="mb-4 last:mb-0 bg-gray-50 rounded-lg overflow-hidden"
                            initial={false}
                            animate={{ height: expandedSetting === setting.id ? 'auto' : '64px' }}
                        >
                            <div
                                className="flex justify-between items-center p-4 cursor-pointer"
                                onClick={() => setExpandedSetting(expandedSetting === setting.id ? null : setting.id)}
                            >
                                <h3 className="text-lg font-semibold text-gray-800">{setting.label}</h3>
                                <motion.div
                                    animate={{ rotate: expandedSetting === setting.id ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown size={20} className="text-gray-600" />
                                </motion.div>
                            </div>
                            <AnimatePresence>
                                {expandedSetting === setting.id && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="p-4 pt-0"
                                    >
                                        {setting.type === 'select' ? (
                                            <select
                                                value={setting.value}
                                                onChange={(e) => handleChange(setting.id, e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            >
                                                {setting.options?.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type={setting.type}
                                                value={setting.value}
                                                onChange={(e) => handleChange(setting.id, e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                            />
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
                <div className="p-6 bg-gray-100 flex justify-end">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSave}
                        className="px-6 py-2 bg-green-500 text-white rounded-md font-semibold flex items-center space-x-2 hover:bg-green-600 transition-colors"
                    >
                        <Save size={20} />
                        <span>Save Changes</span>
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    )
}