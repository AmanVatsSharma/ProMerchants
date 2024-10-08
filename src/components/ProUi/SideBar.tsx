"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    Home,
    ShoppingCart,
    Tag,
    Users,
    FileText,
    BarChart2,
    Target,
    Percent,
    Store,
    MessageSquare,
    Facebook,
    Megaphone,
    Star,
    Settings,
    Package,
    Truck,
    Plus,
    Search,
    PieChart,
    FileSpreadsheet,
    ChevronRight,
    ChevronDown,
} from "lucide-react"

type SidebarLink = {
    label: string
    href: string
    icon: React.ReactNode
    subLinks?: SidebarLink[]
}

const sidebarLinks: SidebarLink[] = [
    { label: "Home", href: "/dashboard/home", icon: <Home size={20} /> },
    {
        label: "Orders",
        href: "/dashboard/orders",
        icon: <ShoppingCart size={20} />,
        subLinks: [
            { label: "Recent Orders", href: "/dashboard/orders/recent-orders", icon: <ChevronRight size={16} /> },
            { label: "All Orders", href: "/dashboard/orders", icon: <ChevronRight size={16} /> },
        ],
    },
    {
        label: "Products",
        href: "/dashboard/products",
        icon: <Tag size={20} />,
        subLinks: [
            { label: "All Products", href: "/dashboard/products", icon: <ChevronRight size={16} /> },
            { label: "Categories", href: "/dashboard/products/categories", icon: <ChevronRight size={16} /> },
            { label: "Collections", href: "/dashboard/products/collections", icon: <ChevronRight size={16} /> },
        ],
    },
    { label: "Inventory", href: "/dashboard/inventory", icon: <Package size={20} /> },
    { label: "Customers", href: "/dashboard/customers", icon: <Users size={20} /> },
    { label: "Content", href: "/dashboard/content", icon: <FileText size={20} /> },
    { label: "Analytics", href: "/dashboard/analytics", icon: <BarChart2 size={20} /> },
    { label: "Marketing", href: "/dashboard/marketing", icon: <Target size={20} /> },
    { label: "Discounts", href: "/dashboard/discounts", icon: <Percent size={20} /> },
]

const salesChannelsLinks: SidebarLink[] = [
    { label: "Online Store", href: "/dashboard/store", icon: <Store size={20} /> },
    { label: "Inbox", href: "/dashboard/inbox", icon: <MessageSquare size={20} /> },
    { label: "Meta Manager", href: "/dashboard/meta-manager", icon: <Facebook size={20} /> },
    { label: "Campaign Manager", href: "/dashboard/campaign-manager", icon: <Megaphone size={20} /> },
]

const appsLinks: SidebarLink[] = [
    { label: "Reviews", href: "/dashboard/reviews", icon: <Star size={20} /> },
    {
        label: "Shipments",
        href: "/dashboard/shipments",
        icon: <Truck size={20} />,
        subLinks: [
            { label: "Create Shipment", href: "/dashboard/shipments/create", icon: <Plus size={16} /> },
            { label: "Track Shipment", href: "/dashboard/shipments/track", icon: <Truck size={16} /> },
            { label: "Calculate Rates", href: "/dashboard/shipments/rates", icon: <FileSpreadsheet size={16} /> },
            { label: "Search Orders", href: "/dashboard/shipments/search", icon: <Search size={16} /> },
            { label: "Analytics", href: "/dashboard/shipments/analytics", icon: <PieChart size={16} /> },
            { label: "Billings", href: "/dashboard/shipments/billings", icon: <FileSpreadsheet size={16} /> },
        ],
    },
]

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(true)
    const [activeSection, setActiveSection] = useState<string | null>(null)
    const pathname = usePathname()

    const toggleSidebar = () => setIsExpanded(!isExpanded)

    const SidebarSection = ({ title, links }: { title: string; links: SidebarLink[] }) => {
        const [isOpen, setIsOpen] = useState(true)

        return (
            <div className="mb-6">
                <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 40 }}
                    className="overflow-hidden"
                >
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center justify-between w-full px-4 py-2 text-left text-gray-500 hover:bg-gray-100 rounded-md transition-colors duration-200"
                    >
                        <span className="font-semibold">{title}</span>
                        <ChevronDown
                            size={20}
                            className={`transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                                }`}
                        />
                    </button>
                    <AnimatePresence initial={false}>
                        {isOpen && (
                            <motion.div
                                initial="collapsed"
                                animate="open"
                                exit="collapsed"
                                variants={{
                                    open: { opacity: 1, height: "auto" },
                                    collapsed: { opacity: 0, height: 0 }
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                {links.map((link) => (
                                    <SidebarLink key={link.href} link={link} isExpanded={isExpanded} />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        )
    }

    const SidebarLink = ({ link, isExpanded }: { link: SidebarLink; isExpanded: boolean }) => {
        const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
        const isActive = pathname === link.href

        return (
            <div>
                <Link
                    href={link.href}
                    className={cn(
                        "flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-200",
                        isActive && "bg-gray-100 text-blue-600",
                        !isExpanded && "justify-center"
                    )}
                    onClick={() => link.subLinks && setIsSubMenuOpen(!isSubMenuOpen)}
                >
                    <span className="mr-3">{link.icon}</span>
                    {isExpanded && (
                        <span className="flex-grow">{link.label}</span>
                    )}
                    {isExpanded && link.subLinks && (
                        <ChevronRight
                            size={16}
                            className={`transform transition-transform duration-200 ${isSubMenuOpen ? "rotate-90" : ""
                                }`}
                        />
                    )}
                </Link>
                {isExpanded && link.subLinks && isSubMenuOpen && (
                    <div className="ml-6 mt-2">
                        {link.subLinks.map((subLink) => (
                            <Link
                                key={subLink.href}
                                href={subLink.href}
                                className="flex items-center px-4 py-2 text-sm text-gray-600 rounded-md hover:bg-gray-100 transition-colors duration-200"
                            >
                                <span className="mr-3">{subLink.icon}</span>
                                <span>{subLink.label}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        )
    }

    return (
        <motion.div
            className="fixed left-0 top-0 h-screen bg-white shadow-lg overflow-hidden z-50"
            animate={{ width: isExpanded ? 280 : 80 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        >
            <div className="flex flex-col h-full">
                <div className="p-4 flex items-center justify-between">
                    {isExpanded && (
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-2xl font-bold text-gray-800"
                        >
                            ProMerchants
                        </motion.h1>
                    )}
                    <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-100">
                        <ChevronRight
                            size={24}
                            className={`transform transition-transform duration-200 ${isExpanded ? "rotate-180" : ""
                                }`}
                        />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <SidebarSection title="Main" links={sidebarLinks} />
                    <SidebarSection title="Sales Channels" links={salesChannelsLinks} />
                    <SidebarSection title="Apps" links={appsLinks} />
                </div>
                <div className="p-4">
                    <Link
                        href="/dashboard/settings"
                        className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors duration-200"
                    >
                        <Settings size={20} className="mr-3" />
                        {isExpanded && <span>Settings</span>}
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}

export default Sidebar