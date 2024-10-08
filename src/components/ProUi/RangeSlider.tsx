"use client"
import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface RangeSliderProps {
  min: number
  max: number
  step?: number
  onChange: (values: [number, number]) => void
  className?: string
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step = 1,
  onChange,
  className = '',
}) => {
  const [values, setValues] = useState<[number, number]>([min, max])
  const [isDragging, setIsDragging] = useState<'min' | 'max' | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(null)
    document.addEventListener('mouseup', handleMouseUp)
    return () => document.removeEventListener('mouseup', handleMouseUp)
  }, [])

  useEffect(() => {
    onChange(values)
  }, [values, onChange])

  const handleMouseDown = (handle: 'min' | 'max') => (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(handle)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return

    const rect = sliderRef.current.getBoundingClientRect()
    const position = (e.clientX - rect.left) / rect.width
    const newValue = Math.round((position * (max - min) + min) / step) * step

    setValues((prevValues) => {
      const newValues: [number, number] = [...prevValues]
      if (isDragging === 'min') {
        newValues[0] = Math.min(Math.max(newValue, min), values[1] - step)
      } else {
        newValues[1] = Math.max(Math.min(newValue, max), values[0] + step)
      }
      return newValues
    })
  }

  const getLeftPosition = (value: number) => {
    return ((value - min) / (max - min)) * 100
  }

  return (
    <div className={`relative h-6 ${className}`} ref={sliderRef} onMouseMove={handleMouseMove}>
      <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 rounded-full transform -translate-y-1/2">
        <motion.div
          className="absolute top-0 left-0 right-0 h-full bg-green-500 rounded-full"
          style={{
            left: `${getLeftPosition(values[0])}%`,
            right: `${100 - getLeftPosition(values[1])}%`,
          }}
        />
      </div>
      {['min', 'max'].map((handle, index) => (
        <motion.div
          key={handle}
          className="absolute top-1/2 w-6 h-6 bg-white border-2 border-green-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          style={{ left: `${getLeftPosition(values[index])}%` }}
          onMouseDown={handleMouseDown(handle as 'min' | 'max')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />
      ))}
      <div className="absolute top-full left-0 right-0 mt-2 flex justify-between">
        <span className="text-sm text-gray-600">{values[0]}</span>
        <span className="text-sm text-gray-600">{values[1]}</span>
      </div>
    </div>
  )
}

export default RangeSlider