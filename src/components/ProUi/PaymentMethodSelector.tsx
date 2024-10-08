import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CreditCard, Banknote, Wallet, Check, X } from 'lucide-react'

type PaymentMethod = {
    id: string
    name: string
    type: 'card' | 'bank' | 'wallet'
    isEnabled: boolean
}

type PaymentMethodSelectorProps = {
    availableMethods: PaymentMethod[]
    onMethodToggle: (methodId: string) => void
    onMethodOrderChange: (methods: PaymentMethod[]) => void
}

export default function PaymentMethodSelector({
    availableMethods,
    onMethodToggle,
    onMethodOrderChange,
}: PaymentMethodSelectorProps) {
    const [methods, setMethods] = useState(availableMethods)
    const [draggedMethod, setDraggedMethod] = useState<PaymentMethod | null>(null)

    const getMethodIcon = (type: PaymentMethod['type']) => {
        switch (type) {
            case 'card':
                return <CreditCard className="w-6 h-6" />
            case 'bank':
                return <Banknote className="w-6 h-6" />
            case 'wallet':
                return <Wallet className="w-6 h-6" />
        }
    }

    const handleDragStart = (method: PaymentMethod) => {
        setDraggedMethod(method)
    }

    const handleDragOver = (e: React.DragEvent, targetMethod: PaymentMethod) => {
        e.preventDefault()
        if (!draggedMethod || draggedMethod.id === targetMethod.id) return

        const updatedMethods = methods.filter((m) => m.id !== draggedMethod.id)
        const targetIndex = updatedMethods.findIndex((m) => m.id === targetMethod.id)
        updatedMethods.splice(targetIndex, 0, draggedMethod)

        setMethods(updatedMethods)
        onMethodOrderChange(updatedMethods)
    }

    const handleDragEnd = () => {
        setDraggedMethod(null)
    }

    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Payment Methods</h2>
                <ul className="space-y-4">
                    <AnimatePresence>
                        {methods.map((method) => (
                            <motion.li
                                key={method.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                                draggable
                                onDragStart={() => handleDragStart(method)}
                                onDragOver={(e) => handleDragOver(e, method)}
                                onDragEnd={handleDragEnd}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-md cursor-move"
                            >
                                <div className="flex items-center space-x-4">
                                    {getMethodIcon(method.type)}
                                    <span className="font-medium">{method.name}</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => onMethodToggle(method.id)}
                                        className={`w-12 h-6 flex items-center rounded-full p-1 ${method.isEnabled ? 'bg-green-500' : 'bg-gray-300'
                                            }`}
                                    >
                                        <motion.div
                                            className={`w-4 h-4 rounded-full bg-white shadow-md`}
                                            layout
                                            transition={{ type: 'spring', stiffness: 700, damping: 30 }}
                                            style={{ x: method.isEnabled ? 24 : 0 }}
                                        />
                                    </motion.button>
                                    {method.isEnabled ? (
                                        <Check className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <X className="w-5 h-5 text-red-500" />
                                    )}
                                </div>
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </ul>
            </div>
        </div>
    )
}