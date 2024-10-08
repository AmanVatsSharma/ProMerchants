"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Send, Search, Star } from 'lucide-react'

type Message = {
    id: string
    customerId: string
    customerName: string
    subject: string
    content: string
    date: string
    isRead: boolean
    isStarred: boolean
}

type CustomerMessageCenterProps = {
    messages: Message[]
    onReply: (messageId: string, reply: string) => void
    onMarkAsRead: (messageId: string) => void
    onToggleStar: (messageId: string) => void
}

export default function CustomerMessageCenter({
    messages,
    onReply,
    onMarkAsRead,
    onToggleStar
}: CustomerMessageCenterProps) {
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
    const [reply, setReply] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    const filteredMessages = messages.filter(
        message =>
            message.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            message.content.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSelectMessage = (message: Message) => {
        setSelectedMessage(message)
        if (!message.isRead) {
            onMarkAsRead(message.id)
        }
    }

    const handleReply = () => {
        if (selectedMessage && reply.trim()) {
            onReply(selectedMessage.id, reply)
            setReply('')
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex h-[600px]">
                <div className="w-1/3 border-r">
                    <div className="p-4 border-b">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search messages..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <Search className="absolute left-3 top-2.5 text-gray-400" />
                        </div>
                    </div>
                    <div className="overflow-y-auto h-[calc(100%-73px)]">
                        {filteredMessages.map(message => (
                            <motion.div
                                key={message.id}
                                whileHover={{ backgroundColor: '#f3f4f6' }}
                                onClick={() => handleSelectMessage(message)}
                                className={`p-4 border-b cursor-pointer ${selectedMessage?.id === message.id ? 'bg-green-50' : ''
                                    } ${!message.isRead ? 'font-semibold' : ''}`}
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-600">{message.customerName}</span>
                                    <span className="text-xs text-gray-400">{new Date(message.date).toLocaleDateString()}</span>
                                </div>
                                <div className="text-sm font-medium mb-1">{message.subject}</div>
                                <div className="text-sm text-gray-600 truncate">{message.content}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className="w-2/3 p-4">
                    {selectedMessage ? (
                        <>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">{selectedMessage.subject}</h2>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => onToggleStar(selectedMessage.id)}
                                    className={`focus:outline-none ${selectedMessage.isStarred ? 'text-yellow-400' : 'text-gray-400'
                                        }`}
                                >
                                    <Star className="w-6 h-6" />
                                </motion.button>
                            </div>
                            <div className="mb-4">
                                <span className="text-sm text-gray-600">From: {selectedMessage.customerName}</span>
                                <p className="mt-2">{selectedMessage.content}</p>
                            </div>
                            <div className="mt-4">
                                <textarea
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                    placeholder="Type your reply here..."
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    rows={4}
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleReply}
                                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg flex items-center"
                                    disabled={!reply.trim()}
                                >
                                    <Send className="w-4 h-4 mr-2" />
                                    Send Reply
                                </motion.button>
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex items-center justify-center text-gray-500">
                            <MessageCircle className="w-16 h-16 mr-4" />
                            <span className="text-xl">Select a message to view</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}