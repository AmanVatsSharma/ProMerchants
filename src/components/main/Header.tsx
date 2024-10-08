"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch, FaUserCircle, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import Image from 'next/image'

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/shop' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ]

    return (
        <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <Link href="/">
                        <motion.div
                            className="text-2xl font-bold text-green-600"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Image
                                src="https://firebasestorage.googleapis.com/v0/b/theaweshop.appspot.com/o/uploads%2Flogo.png?alt=media&token=248632f8-8183-4ba0-b999-3046c165ab09"
                                alt="ProMerchants logo"
                                className='w-auto h-[27px] aspect-auto'
                                width={500}
                                height={200}
                            />
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <Link key={item.name} href={item.href}>
                                <motion.span
                                    className={`text-lg font-medium ${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-green-600 transition-colors duration-200`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item.name}
                                </motion.span>
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsSearchOpen(true)}
                                className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-green-600`}
                            >
                                <FaSearch className="h-5 w-5" />
                            </Button>
                        </motion.div>

                        <Dialog>
                            <DialogTrigger asChild>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-green-600`}
                                    >
                                        <FaUserCircle className="h-5 w-5" />
                                    </Button>
                                </motion.div>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Account</DialogTitle>
                                </DialogHeader>
                                <div className="flex flex-col items-center space-y-4 py-6">
                                    <Avatar className="h-24 w-24">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <h2 className="text-xl font-semibold">John Doe</h2>
                                    <Button className="w-full">View Profile</Button>
                                    <Button variant="outline" className="w-full">Log Out</Button>
                                </div>
                            </DialogContent>
                        </Dialog>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative"
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-green-600`}
                            >
                                <FaShoppingCart className="h-5 w-5" />
                            </Button>
                            <Badge className="absolute -top-2 -right-2 bg-green-600 text-white">3</Badge>
                        </motion.div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-green-600`}
                        >
                            {isMobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-white shadow-lg"
                    >
                        <nav className="flex flex-col p-4 space-y-4">
                            {navItems.map((item) => (
                                <Link key={item.name} href={item.href}>
                                    <motion.span
                                        className="text-lg font-medium text-gray-800 hover:text-green-600 transition-colors duration-200"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {item.name}
                                    </motion.span>
                                </Link>
                            ))}
                            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsSearchOpen(true)}
                                    className="text-gray-800 hover:text-green-600"
                                >
                                    <FaSearch className="h-5 w-5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-800 hover:text-green-600"
                                >
                                    <FaUserCircle className="h-5 w-5" />
                                </Button>
                                <div className="relative">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-gray-800 hover:text-green-600"
                                    >
                                        <FaShoppingCart className="h-5 w-5" />
                                    </Button>
                                    <Badge className="absolute -top-2 -right-2 bg-green-600 text-white">3</Badge>
                                </div>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-lg p-6 w-full max-w-2xl"
                        >
                            <div className="flex items-center mb-4">
                                <Input
                                    type="text"
                                    placeholder="Search products..."
                                    className="flex-grow mr-4"
                                />
                                <Button onClick={() => setIsSearchOpen(false)}>
                                    <FaTimes className="h-5 w-5" />
                                </Button>
                            </div>
                            <div className="text-sm text-gray-600">
                                Popular searches: T-shirts, Jeans, Sneakers, Accessories
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}

export default Header