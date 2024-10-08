import React from 'react'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
    label: string
    href: string
}

interface BreadcrumbNavProps {
    items: BreadcrumbItem[]
    className?: string
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ items, className = '' }) => {
    return (
        <nav className={`flex ${className}`} aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-green-600">
                        <Home className="w-4 h-4 mr-2" />
                        Home
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index}>
                        <div className="flex items-center">
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                            <Link
                                href={item.href}
                                className="ml-1 text-sm font-medium text-gray-700 hover:text-green-600 md:ml-2"
                            >
                                {item.label}
                            </Link>
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    )
}

export default BreadcrumbNav