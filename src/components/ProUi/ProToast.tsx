import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

interface ToastProps {
    message: string
    type?: 'success' | 'error' | 'info'
    duration?: number
    onClose: () => void
}

const ProToast: React.FC<ToastProps> = ({ message, type = 'info', duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
        }, duration)

        return () => clearTimeout(timer)
    }, [duration])

    const handleClose = () => {
        setIsVisible(false)
        onClose()
    }

    const icons = {
        success: <CheckCircle className="w-5 h-5 text-green-400" />,
        error: <AlertCircle className="w-5 h-5 text-red-400" />,
        info: <Info className="w-5 h-5 text-blue-400" />,
    }

    const colors = {
        success: 'bg-green-50 text-green-800 border-green-200',
        error: 'bg-red-50 text-red-800 border-red-200',
        info: 'bg-blue-50 text-blue-800 border-blue-200',
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-4 right-4 z-50"
                >
                    <div className={`rounded-md border p-4 ${colors[type]}`}>
                        <div className="flex">
                            <div className="flex-shrink-0">{icons[type]}</div>
                            <div className="ml-3">
                                <p className="text-sm font-medium">{message}</p>
                            </div>
                            <div className="ml-auto pl-3">
                                <div className="-mx-1.5 -my-1.5">
                                    <button
                                        className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${type === 'success'
                                                ? 'text-green-500 hover:bg-green-100 focus:ring-green-600'
                                                : type === 'error'
                                                    ? 'text-red-500 hover:bg-red-100 focus:ring-red-600'
                                                    : 'text-blue-500 hover:bg-blue-100 focus:ring-blue-600'
                                            }`}
                                        onClick={handleClose}
                                    >
                                        <span className="sr-only">Close</span>
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ProToast