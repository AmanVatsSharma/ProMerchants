"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion, useAnimation, useMotionValue } from 'framer-motion'
import { FaExpand, FaCompress } from 'react-icons/fa'

interface ProductShowcaseProps {
    productName: string
    productImage: string
    productDescription: string
    price: number
    discount?: number
    rotationSpeed?: number
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({
    productName,
    productImage,
    productDescription,
    price,
    discount = 0,
    rotationSpeed = 0.5,
}) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isRotating, setIsRotating] = useState(true)
    const constraintsRef = useRef(null)
    const x = useMotionValue(0)
    const controls = useAnimation()

    useEffect(() => {
        let interval: NodeJS.Timeout

        if (isRotating) {
            interval = setInterval(() => {
                controls.start({
                    rotateY: [0, 360],
                    transition: { duration: 20 / rotationSpeed, ease: "linear", repeat: Infinity }
                })
            }, 0)
        } else {
            controls.stop()
        }

        return () => clearInterval(interval)
    }, [isRotating, rotationSpeed, controls])

    const handleDragEnd = () => {
        setIsRotating(false)
    }

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
        setIsRotating(!isExpanded)
    }

    const discountedPrice = price - (price * discount/100)

    return (
        <div className={`bg-gradient-to-br from-green-50 to-green-100 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'fixed inset-0 z-50' : 'w-full max-w-md'}`}>
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-green-800">{productName}</h2>
                    <button
                        onClick={toggleExpand}
                        className="text-green-600 hover:text-green-800 transition-colors"
                    >
                        {isExpanded ? <FaCompress size={24} /> : <FaExpand size={24} />}
                    </button>
                </div>
                <div
                    ref={constraintsRef}
                    className={`relative ${isExpanded ? 'h-[60vh]' : 'h-64'} mb-4`}
                >
                    <motion.div
                        drag={!isRotating}
                        dragConstraints={constraintsRef}
                        onDragEnd={handleDragEnd}
                        animate={controls}
                        style={{ x }}
                        className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                    >
                        <img
                            src={productImage}
                            alt={productName}
                            className="max-w-full max-h-full object-contain"
                        />
                    </motion.div>
                </div>
                <p className="text-green-700 mb-4">{productDescription}</p>
                <div className="flex justify-between items-center">
                    <div>
                        <span className="text-2xl font-bold text-green-800">${discountedPrice.toFixed(2)}</span>
                        {discount > 0 && (
                            <span className="ml-2 text-sm line-through text-green-600">${price.toFixed(2)}</span>
                        )}
                    </div>
                    {discount > 0 && (
                        <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                            {(discount * 100).toFixed(0)}% OFF
                        </span>
                    )}
                </div>
            </div>
            {!isExpanded && (
                <div className="bg-green-600 text-white p-4 text-center">
                    <button className="font-bold hover:underline">Add to Cart</button>
                </div>
            )}
        </div>
    )
}

export default ProductShowcase