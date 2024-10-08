"use client"
import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, Check, AlertCircle } from 'lucide-react'

type BulkProductUploaderProps = {
    onUpload: (file: File) => Promise<void>
}

export default function BulkProductUploader({ onUpload }: BulkProductUploaderProps) {
    const [isDragging, setIsDragging] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadStatus, setUploadStatus] = useState<'success' | 'error' | null>(null)
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

        const droppedFile = e.dataTransfer.files[0]
        if (droppedFile && droppedFile.type === 'text/csv') {
            setFile(droppedFile)
        }
    }

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile && selectedFile.type === 'text/csv') {
            setFile(selectedFile)
        }
    }

    const handleUpload = async () => {
        if (!file) return

        setIsUploading(true)
        setUploadStatus(null)

        try {
            await onUpload(file)
            setUploadStatus('success')
        } catch (error) {
            console.error('Upload failed:', error)
            setUploadStatus('error')
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                    <Upload className="mr-2" />
                    Bulk Product Uploader
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
                        accept=".csv"
                        className="hidden"
                    />
                    <FileText size={48} className="mx-auto mb-4 text-gray-400" />
                    <p className="mb-2">Drag and drop your CSV file here, or</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 bg-green-500 text-white rounded-md font-semibold"
                    >
                        Select File
                    </motion.button>
                </div>

                {file && (
                    <div className="mt-4">
                        <p className="font-medium">Selected file: {file.name}</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleUpload}
                            disabled={isUploading}
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md font-semibold flex items-center justify-center w-full"
                        >
                            {isUploading ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                        className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full mr-2"
                                    />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Upload className="mr-2" />
                                    Upload Products
                                </>
                            )}
                        </motion.button>
                    </div>
                )}

                <AnimatePresence>
                    {uploadStatus && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`mt-4 p-4 rounded-md ${uploadStatus === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}
                        >
                            {uploadStatus === 'success' ? (
                                <div className="flex items-center">
                                    <Check className="mr-2" />
                                    Products uploaded successfully!
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <AlertCircle className="mr-2" />
                                    Upload failed. Please try again.
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}