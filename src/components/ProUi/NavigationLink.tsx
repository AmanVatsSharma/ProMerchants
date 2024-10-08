"use client"
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface NavigationLinkProps {
    href: string
    label: string
    icon?: React.ReactNode
    activeClassName?: string
    className?: string
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
    href,
    label,
    icon,
    activeClassName = 'text-green-600',
    className = '',
}) => {
    const router = useRouter()
    const isActive = router.pathname === href

    const linkVariants = {
        hover: { scale: 1.05 },
        tap: { scale: 0.95 },
    }

    return (
        <Link href={href} passHref>
            <motion.a
                className={`inline-flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${isActive ? activeClassName : 'text-gray-600 hover:text-green-600'
                    } ${className}`}
                whileHover="hover"
                whileTap="tap"
                variants={linkVariants}
            >
                {icon && <span className="mr-2">{icon}</span>}
                {label}
            </motion.a>
        </Link>
    )
}

export default NavigationLink