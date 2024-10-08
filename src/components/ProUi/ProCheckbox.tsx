"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  className?: string
}

const ProCheckbox: React.FC<CheckboxProps> = ({ checked, onChange, label, className = '' }) => {
  return (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <motion.div
          className={`w-6 h-6 border-2 rounded ${
            checked ? 'border-green-500 bg-green-500' : 'border-gray-400'
          }`}
          animate={{ backgroundColor: checked ? '#10B981' : '#FFFFFF' }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: checked ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <Check className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </motion.div>
        </motion.div>
      </div>
      {label && <span className="ml-2 text-gray-700">{label}</span>}
    </label>
  )
}

export default ProCheckbox