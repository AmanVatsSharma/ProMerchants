"use client"
import React from 'react'
import { motion } from 'framer-motion'

interface RadioButtonProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  className?: string
}

const RadioButton: React.FC<RadioButtonProps> = ({ checked, onChange, label, className = '' }) => {
  return (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      <div className="relative">
        <input
          type="radio"
          className="hidden"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <motion.div
          className={`w-6 h-6 border-2 rounded-full ${
            checked ? 'border-green-500' : 'border-gray-400'
          }`}
          animate={{ borderColor: checked ? '#10B981' : '#9CA3AF' }}
        >
          <motion.div
            className="w-3 h-3 bg-green-500 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0 }}
            animate={{ scale: checked ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </motion.div>
      </div>
      {label && <span className="ml-2 text-gray-700">{label}</span>}
    </label>
  )
}

export default RadioButton