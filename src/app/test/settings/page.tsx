"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, ChevronDown, Bell, DollarSign, ShoppingBag, Truck, Users } from 'lucide-react'
import StoreSettingsPanel from '@/components/ProUi/StoreSettingPanel'

type Setting = {
    id: string
    label: string
    value: string
    type: 'text' | 'email' | 'number' | 'select'
    options?: string[]
    category: 'general' | 'notifications' | 'payments' | 'shipping' | 'inventory' | 'customers'
}

const initialSettings: Setting[] = [
    { id: 'storeName', label: 'Store Name', value: '', type: 'text', category: 'general' },
    { id: 'storeEmail', label: 'Store Email', value: '', type: 'email', category: 'general' },
    { id: 'currency', label: 'Currency', value: 'USD', type: 'select', options: ['USD', 'EUR', 'GBP'], category: 'general' },
    { id: 'orderNotifications', label: 'Order Notifications', value: 'true', type: 'select', options: ['true', 'false'], category: 'notifications' },
    { id: 'lowStockNotifications', label: 'Low Stock Notifications', value: 'true', type: 'select', options: ['true', 'false'], category: 'notifications' },
    { id: 'paymentGateway', label: 'Payment Gateway', value: 'Stripe', type: 'select', options: ['Stripe', 'PayPal', 'Square'], category: 'payments' },
    { id: 'shippingMethod', label: 'Default Shipping Method', value: 'Standard', type: 'select', options: ['Standard', 'Express', 'Free'], category: 'shipping' },
    { id: 'lowStockThreshold', label: 'Low Stock Threshold', value: '10', type: 'number', category: 'inventory' },
    { id: 'customerGrouping', label: 'Customer Grouping', value: 'false', type: 'select', options: ['true', 'false'], category: 'customers' },
]

export default function StoreSettingsPage() {
    const [settings, setSettings] = useState(initialSettings)
    const [expandedCategory, setExpandedCategory] = useState<string | null>('general')

    const handleChange = (id: string, value: string) => {
        setSettings(settings.map(setting => setting.id === id ? { ...setting, value } : setting))
    }

    const handleSave = () => {
        console.log('Saving settings:', settings)
        // Here you would typically send the settings to your backend
    }

    const categories = [
        { id: 'general', label: 'General', icon: ShoppingBag },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'payments', label: 'Payments', icon: DollarSign },
        { id: 'shipping', label: 'Shipping', icon: Truck },
        { id: 'inventory', label: 'Inventory', icon: ShoppingBag },
        { id: 'customers', label: 'Customers', icon: Users },
    ]

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 text-black">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Store Settings</h1>
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-4">
                        <nav className="bg-gray-50 p-6 space-y-2">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setExpandedCategory(category.id)}
                                    className={`w-full text-left px-4 py-2 rounded-md flex items-center space-x-2 transition-colors ${expandedCategory === category.id ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    <category.icon size={20} />
                                    <span>{category.label}</span>
                                </button>
                            ))}
                        </nav>
                        <div className="col-span-3 p-6">
                            {categories.map((category) => (
                                <motion.div
                                    key={category.id}
                                    initial={false}
                                    animate={{ height: expandedCategory === category.id ? 'auto' : 0, opacity: expandedCategory === category.id ? 1 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <h2 className="text-2xl font-semibold mb-4">{category.label}</h2>
                                    {settings
                                        .filter((setting) => setting.category === category.id)
                                        .map((setting) => (
                                            <div key={setting.id} className="mb-4">
                                                <label htmlFor={setting.id} className="block text-sm font-medium text-gray-700 mb-1">
                                                    {setting.label}
                                                </label>
                                                {setting.type === 'select' ? (
                                                    <select
                                                        id={setting.id}
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
                                                        id={setting.id}
                                                        value={setting.value}
                                                        onChange={(e) => handleChange(setting.id, e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-4 flex justify-end">
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
                </div>
            </div>
            <StoreSettingsPanel
            settings={initialSettings}
            onSave={()=>{}}
            />
        </div>
    )
}