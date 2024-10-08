import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Truck, Plus, Trash2, Edit2, Save, X } from 'lucide-react'

type ShippingRate = {
    id: string
    name: string
    price: number
}

type ShippingZone = {
    id: string
    name: string
    countries: string[]
    rates: ShippingRate[]
}

type ShippingZoneManagerProps = {
    initialZones: ShippingZone[]
    onSave: (zones: ShippingZone[]) => void
}

export default function ShippingZoneManager({ initialZones, onSave }: ShippingZoneManagerProps) {
    const [zones, setZones] = useState(initialZones)
    const [editingZone, setEditingZone] = useState<ShippingZone | null>(null)
    const [isAddingZone, setIsAddingZone] = useState(false)

    const handleAddZone = () => {
        const newZone: ShippingZone = {
            id: `zone_${Date.now()}`,
            name: '',
            countries: [],
            rates: [],
        }
        setZones([...zones, newZone])
        setEditingZone(newZone)
        setIsAddingZone(true)
    }

    const handleEditZone = (zone: ShippingZone) => {
        setEditingZone(zone)
        setIsAddingZone(false)
    }

    const handleDeleteZone = (zoneId: string) => {
        setZones(zones.filter((zone) => zone.id !== zoneId))
    }

    const handleSaveZone = (updatedZone: ShippingZone) => {
        setZones(zones.map((zone) => (zone.id === updatedZone.id ? updatedZone : zone)))
        setEditingZone(null)
        setIsAddingZone(false)
    }

    const handleCancelEdit = () => {
        if (isAddingZone) {
            setZones(zones.slice(0, -1))
        }
        setEditingZone(null)
        setIsAddingZone(false)
    }

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <Truck className="mr-2" />
                    Shipping Zone Manager
                </h2>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddZone}
                    className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md font-semibold flex items-center"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Shipping Zone
                </motion.button>

                <AnimatePresence>
                    {zones.map((zone) => (
                        <motion.div
                            key={zone.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="mb-4 p-4 border border-gray-200 rounded-md"
                        >
                            {editingZone?.id === zone.id ? (
                                <ZoneEditForm
                                    zone={editingZone}
                                    onSave={handleSaveZone}
                                    onCancel={handleCancelEdit}
                                />
                            ) : (
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-semibold">{zone.name}</h3>
                                        <div>
                                            <button
                                                onClick={() => handleEditZone(zone)}
                                                className="text-blue-500 hover:text-blue-600 mr-2"
                                            >
                                                <Edit2 className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteZone(zone.id)}
                                                className="text-red-500 hover:text-red-600"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">
                                        Countries: {zone.countries.join(', ')}
                                    </p>
                                    <ul className="space-y-1">
                                        {zone.rates.map((rate) => (
                                            <li key={rate.id} className="text-sm">
                                                {rate.name}: ${rate.price.toFixed(2)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSave(zones)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md font-semibold flex items-center"
                >
                    <Save className="w-5 h-5 mr-2" />
                    Save All Changes
                </motion.button>
            </div>
        </div>
    )
}

type ZoneEditFormProps = {
    zone: ShippingZone
    onSave: (zone: ShippingZone) => void
    onCancel: () => void
}

function ZoneEditForm({ zone, onSave, onCancel }: ZoneEditFormProps) {
    const [editedZone, setEditedZone] = useState(zone)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEditedZone({ ...editedZone, [name]: value })
    }

    const handleCountriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const countries = e.target.value.split(',').map((country) => country.trim())
        setEditedZone({ ...editedZone, countries })
    }

    const handleRateChange = (rateId: string, field: 'name' | 'price', value: string) => {
        const updatedRates = editedZone.rates.map((rate) =>
            rate.id === rateId ? { ...rate, [field]: field === 'price' ? Number(value) : value } : rate
        )
        setEditedZone({ ...editedZone, rates: updatedRates })
    }

    const handleAddRate = () => {
        const newRate: ShippingRate = {
            id: `rate_${Date.now()}`,
            name: '',
            price: 0,
        }
        setEditedZone({ ...editedZone, rates: [...editedZone.rates, newRate] })
    }

    const handleRemoveRate = (rateId: string) => {
        setEditedZone({ ...editedZone, rates: editedZone.rates.filter((rate) => rate.id !== rateId) })
    }

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSave(editedZone) }} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Zone Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={editedZone.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                />
            </div>
            <div>
                <label htmlFor="countries" className="block text-sm font-medium text-gray-700">
                    Countries (comma-separated)
                </label>
                <input
                    type="text"
                    id="countries"
                    name="countries"
                    value={editedZone.countries.join(', ')}
                    onChange={handleCountriesChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                    required
                />
            </div>
            <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Shipping Rates</h4>
                {editedZone.rates.map((rate) => (
                    <div key={rate.id} className="flex items-center space-x-2 mb-2">
                        <input
                            type="text"
                            value={rate.name}
                            onChange={(e) => handleRateChange(rate.id, 'name', e.target.value)}
                            className="flex-grow border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
                            placeholder="Rate name"
                            required
                        />
                        <input
                            type="number"
                            value={rate.price}
                            onChange={(e) => handleRateChange(rate.id, 'price', e.target.value)}
                            className="w-24 border border-gray-300 rounded-md shadow-sm py-1 px-2 focus:outline-none focus:ring-green-500 focus:border-green-500"
                            placeholder="Price"
                            required
                            step="0.01"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveRate(rate.id)}
                            className="text-red-500 hover:text-red-600"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddRate}
                    className="text-green-500 hover:text-green-600 font-medium"
                >
                    + Add Rate
                </button>
            </div>
            <div className="flex justify-end space-x-2">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Save Zone
                </button>
            </div>
        </form>
    )
}