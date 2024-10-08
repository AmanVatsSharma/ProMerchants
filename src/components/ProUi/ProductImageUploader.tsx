"use client"
import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Image as ImageIcon, X, Check } from 'lucide-react'

type ProductImageUploaderProps = {
    productId: string
    initialImages: string[]
    onUpload: (productId: string, file: File) => Promise<string>
    onRemove: (productId: string, imageUrl: string) => Promise<void>
}

export default function ProductImageUploader({
    productId,
    initialImages,
    onUpload,
    onRemove,
}: ProductImageUploaderProps) {
    const [images, setImages] = useState<string[]>(initialImages)
    const [isDragging, setIsDragging] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        const droppedFiles = Array.from(e.dataTransfer.files)
        handleFiles(droppedFiles)
    }

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || [])
        handleFiles(selectedFiles)
    }

    const handleFiles = async (files: File[]) => {
        const imageFiles = files.filter((file) => file.type.startsWith('image/'))
        if (imageFiles.length === 0) return

        setIsUploading(true)

        try {
            const uploadPromises = imageFiles.map((file) => onUpload(productId, file))
            const newImageUrls = await Promise.all(uploadPromises)
            setImages([...images, ...newImageUrls])
        } catch (error) {
            console.error('Upload failed:', error)
        } finally {
            setIsUploading(false)
        }
    }

    const handleRemoveImage = async (imageUrl: string) => {
        try {
            await onRemove(productId, imageUrl)
            setImages(images.filter((img) => img !== imageUrl))
        } catch (error) {
            console.error('Failed to remove image:', error)
        }
    }

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <ImageIcon className="mr-2" />
                    Product Image Uploader
                </h2>

                <div
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300'
                        }`}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileInput}
                        accept="image/*"
                        multiple
                        className="hidden"
                    />
                    <ImageIcon size={48} className="mx-auto mb-4 text-gray-400" />
                    <p className="mb-2">Drag and drop your images here, or</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-green-500 text-white rounded-md font-semibold"
                    >
                        Select Images
                    </motion.button>
                </div>

                <AnimatePresence>
                    {isUploading && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mt-4 p-4 bg-blue-100 text-blue-700 rounded-md flex items-center justify-center"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                className="w-5 h-5 border-t-2 border-b-2 border-blue-700 rounded-full mr-2"
                            />
                            Uploading images...
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    <AnimatePresence>
                        {images.map((imageUrl) => (
                            <motion.div
                                key={imageUrl}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="relative group"
                            >
                                <img
                                    src={imageUrl}
                                    alt="Product"
                                    className="w-full h-32 object-cover rounded-md"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => handleRemoveImage(imageUrl)}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={16} />
                                </motion.button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}