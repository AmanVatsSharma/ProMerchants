"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface UserAvatarProps {
    src?: string
    alt: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
    status?: 'online' | 'offline' | 'away' | 'busy'
    className?: string
}

const UserAvatar: React.FC<UserAvatarProps> = ({
    src,
    alt,
    size = 'md',
    status,
    className = '',
}) => {
    const [imageError, setImageError] = useState(false)

    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-24 h-24',
    }

    const statusColors = {
        online: 'bg-green-500',
        offline: 'bg-gray-500',
        away: 'bg-yellow-500',
        busy: 'bg-red-500',
    }

    const initials = alt
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)

    return (
        <motion.div
            className={`relative rounded-full overflow-hidden ${sizeClasses[size]} ${className}`}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
        >
            {src && !imageError ? (
                <Image
                    src={src}
                    alt={alt}
                    layout="fill"
                    objectFit="cover"
                    onError={() => setImageError(true)}
                />
            ) : (
                <div className={`${sizeClasses[size]} bg-gray-300 flex items-center justify-center text-gray-600 font-bold`}>
                    {initials}
                </div>
            )}
            {status && (
                <div className={`absolute z-10 bottom-0 right-0 w-1/4 h-1/4 ${statusColors[status]} border-2 border-white rounded-full`} />
            )}
        </motion.div>
    )
}

export default UserAvatar