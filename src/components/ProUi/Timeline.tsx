"use client"
import React from 'react'
import { motion } from 'framer-motion'

interface TimelineEvent {
    title: string
    description: string
    date: string
    icon?: React.ReactNode
}

interface TimelineProps {
    events: TimelineEvent[]
    className?: string
}

const Timeline: React.FC<TimelineProps> = ({ events, className = '' }) => {
    return (
        <div className={`flow-root ${className}`}>
            <ul className="-mb-8">
                {events.map((event, eventIdx) => (
                    <li key={eventIdx}>
                        <div className="relative pb-8">
                            {eventIdx !== events.length - 1 ? (
                                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                            ) : null}
                            <div className="relative flex space-x-3">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center ring-8 ring-white"
                                >
                                    {event.icon ? (
                                        event.icon
                                    ) : (
                                        <span className="h-2.5 w-2.5 rounded-full bg-white" />
                                    )}
                                </motion.div>
                                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            {event.title}{' '}
                                            <span className="font-medium text-gray-900">{event.description}</span>
                                        </p>
                                    </div>
                                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                        <time dateTime={event.date}>{event.date}</time>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Timeline