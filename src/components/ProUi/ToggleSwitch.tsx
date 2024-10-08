import React from 'react'
import { motion } from 'framer-motion'

interface ToggleSwitchProps {
    isOn: boolean
    onToggle: () => void
    label?: string
    disabled?: boolean
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
    isOn,
    onToggle,
    label,
    disabled = false,
    size = 'md',
    className = '',
}) => {
    const sizeClasses = {
        sm: 'w-8 h-4',
        md: 'w-12 h-6',
        lg: 'w-16 h-8',
    }

    const toggleClasses = {
        sm: 'w-3 h-3',
        md: 'w-5 h-5',
        lg: 'w-7 h-7',
    }

    return (
        <div className={`flex items-center ${className}`}>
            <button
                className={`${sizeClasses[size]} flex items-center rounded-full p-1 ${isOn ? 'bg-green-500' : 'bg-gray-300'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                onClick={onToggle}
                disabled={disabled}
                aria-checked={isOn}
                role="switch"
            >
                <motion.div
                    className={`${toggleClasses[size]} bg-white rounded-full shadow-md`}
                    animate={{
                        x: isOn ? '100%' : '0%',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
            </button>
            {label && (
                <span className={`ml-2 text-${size} text-gray-700`}>{label}</span>
            )}
        </div>
    )
}

export default ToggleSwitch