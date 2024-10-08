"use client"
import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, File, CheckCircle } from 'lucide-react'

interface FileUploaderProps {
    onFileSelect: (file: File) => void
    acceptedFileTypes?: string[]
    maxFileSize?: number // in bytes
    className?: string
}

const ProFileUploader: React.FC<FileUploaderProps> = ({
    onFileSelect,
    acceptedFileTypes = ['image/*', 'application/pdf'],
    maxFileSize = 5 * 1024 * 1024, // 5MB
    className = '',
}) => {
    const [dragActive, setDragActive] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [error, setError] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files[0])
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files[0])
        }
    }

    const handleFiles = (file: File) => {
        setError(null)
        if (!acceptedFileTypes.some(type => file.type.match(type))) {
            setError('Invalid file type')
            return
        }
        if (file.size > maxFileSize) {
            setError('File size exceeds limit')
            return
        }
        setFile(file)
        onFileSelect(file)
    }

    const removeFile = () => {
        setFile(null)
        setError(null)
        if (inputRef.current) inputRef.current.value = ''
    }

    return (
        <div className={`relative ${className}`}>
            <div
                className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer ${dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300'
                    }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
            >
                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    onChange={handleChange}
                    accept={acceptedFileTypes.join(',')}
                />
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-600 text-center">
                    Drag and drop your file here, or click to select a file
                </p>
                <p className="text-sm text-gray-400 mt-2">
                    Accepted file types: {acceptedFileTypes.join(', ')}
                </p>
                <p className="text-sm text-gray-400">
                    Max file size: {maxFileSize / 1024 / 1024}MB
                </p>
            </div>
            <AnimatePresence>
                {file && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-4 p-4 bg-green-50 rounded-lg flex items-center justify-between"
                    >
                        <div className="flex items-center">
                            <File className="w-6 h-6 text-green-500 mr-2" />
                            <span className="text-green-700">{file.name}</span>
                        </div>
                        <div className="flex items-center">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                            <button onClick={removeFile} className="text-red-500 hover:text-red-700">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-2 text-red-500 text-sm"
                    >
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ProFileUploader