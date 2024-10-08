"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Check, X } from 'lucide-react'

type Product = {
    id: string
    name: string
    preorderAvailable: boolean
    preorderReleaseDate?: string
}

type PreorderTogglerProps = {
    products: Product[]
    onUpdatePreorder: (productId: string, preorderAvailable: boolean, releaseDate?: string) => void
}

export default function PreorderToggler({ products, onUpdatePreorder }: PreorderTogglerProps) {
    const [editingProduct, setEditingProduct] = useState<string | null>(null)
    const [releaseDate, setReleaseDate] = useState<string>('')

    const handleSave = (product: Product) => {