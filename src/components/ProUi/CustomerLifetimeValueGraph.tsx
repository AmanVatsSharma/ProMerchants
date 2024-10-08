"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

type CustomerData = {
    id: string
    name: string
    lifetimeValue: number[]
    labels: string[]
}

type CustomerLifetimeValueGraphProps = {
    customers: CustomerData[]
}

export default function CustomerLifetimeValueGraph({ customers }: CustomerLifetimeValueGraphProps) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Customer Lifetime Value Over Time',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Lifetime Value ($)',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Time Period',
                },
            },
        },
    }

    const data = {
        labels: customers[0].labels,
        datasets: customers.map((customer, index) => ({
            label: customer.name,
            data: customer.lifetimeValue,
            borderColor: `hsl(${index * 137.5}, 70%, 50%)`,
            backgroundColor: `hsla(${index * 137.5}, 70%, 50%, 0.5)`,
        })),
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-lg"
        >
            <h2 className="text-xl font-semibold mb-4">Customer Lifetime Value</h2>
            <div className="h-80">
                <Line options={options} data={data} />
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {customers.map((customer, index) => (
                    <motion.div
                        key={customer.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center"
                    >
                        <div
                            className="w-4 h-4 rounded-full mr-2"
                            style={{ backgroundColor: `hsl(${index * 137.5}, 70%, 50%)` }}
                        />
                        <span className="text-sm truncate">{customer.name}</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}