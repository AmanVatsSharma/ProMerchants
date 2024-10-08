"use client"
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock } from 'lucide-react'

interface TimePickerProps {
  onChange: (time: string) => void
  format?: '12h' | '24h'
  className?: string
}

const TimePicker: React.FC<TimePickerProps> = ({ onChange, format = '12h', className = '' }) => {
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  const hours = format === '12h' ? Array.from({ length: 12 }, (_, i) => i + 1) : Array.from({ length: 24 }, (_, i) => i)
  const minutes = Array.from({ length: 60 }, (_, i) => i)

  const handleTimeClick = (hour: number, minute: number) => {
    let timeString = ''
    if (format === '12h') {
      const period = hour < 12 ? 'AM' : 'PM'
      const formattedHour = hour % 12 || 12
      timeString = `${formattedHour}:${minute.toString().padStart(2, '0')} ${period}`
    } else {
      timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
    }
    setSelectedTime(timeString)
    onChange(timeString)
    setIsOpen(false)
  }

  return (
    <div className={`relative ${className}`}>
      <button
        className="flex items-center justify-between w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedTime || 'Select a time'}
        <Clock className="w-5 h-5 text-gray-400" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-64 mt-1 bg-white border border-gray-300 rounded-md shadow-lg"
          >
            <div className="grid grid-cols-4 gap-1 p-2 max-h-60 overflow-y-auto">
              {hours.map((hour) =>
                minutes.map((minute) => (
                  <motion.button
                    key={`${hour}:${minute}`}
                    className="px-2 py-1 text-sm rounded hover:bg-gray-100"
                    onClick={() => handleTimeClick(hour, minute)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {format === '12h'
                      ? `${hour % 12 || 12}:${minute.toString().padStart(2, '0')} ${hour < 12 ? 'AM' : 'PM'}`
                      : `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`}
                  </motion.button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TimePicker