"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

interface Image {
    src: string
    alt: string
    width: number
    height: number
}

interface GalleryProps {
    images: Image[]
    className?: string
}

const Gallery: React.FC<GalleryProps> = ({ images, className = '' }) => {
    const [selectedImage, setSelectedImage] = useState<Image | null>(null)

    const openLightbox = (image: Image) => {
        setSelectedImage(image)
    }

    const closeLightbox = () => {
        setSelectedImage(null)
    }

    return (
        <div className={className}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <motion.div
                        key={index}
                        className="relative overflow-hidden rounded-lg cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openLightbox(image)}
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                            style={{
                                aspectRatio: `${image.width} / ${image.height}`,
                            }}
                        />
                    </motion.div>
                ))}
            </div>
            {selectedImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={closeLightbox}
                >
                    <div className="relative max-w-4xl max-h-full">
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            className="max-w-full max-h-[90vh] object-contain"
                        />
                        <button
                            className="absolute top-4 right-4 text-white hover:text-gray-300"
                            onClick={closeLightbox}
                        >
                            <X size={24} />
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    )
}

export default Gallery