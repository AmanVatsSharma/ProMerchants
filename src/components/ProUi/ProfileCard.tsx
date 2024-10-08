"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'

interface ProfileCardProps {
    name: string
    email: string
    phone: string
    location: string
    avatar: string
    role: string
    className?: string
}

const ProfileCard: React.FC<ProfileCardProps> = ({
    name,
    email,
    phone,
    location,
    avatar,
    role,
    className = '',
}) => {
    return (
        <motion.div
            className={`bg-white shadow-lg rounded-lg overflow-hidden ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="relative h-40 bg-gradient-to-r from-green-400 to-blue-500">
                <img
                    src={avatar}
                    alt={name}
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-white"
                />
            </div>
            <div className="pt-16 pb-6 px-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
                <p className="text-sm text-gray-600 mt-1">{role}</p>
                <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {email}
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        {phone}
                    </div>
                    <div className="flex items-center justify-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {location}
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ProfileCard