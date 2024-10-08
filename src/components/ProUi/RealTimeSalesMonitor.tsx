"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
    Filler
} from 'chart.js'
import { FaDollarSign, FaChartLine, FaShoppingCart } from 'react-icons/fa'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

interface Sale {
    id: string
    amount: number
    product: string
    timestamp: Date
}

const RealTimeSalesMonitor: React.FC = () => {
    const [sales, setSales] = useState<Sale[]>([])
    const [totalRevenue, setTotalRevenue] = useState(0)
    const [salesVelocity, setSalesVelocity] = useState(0)

    useEffect(() => {
        // Simulating real-time sales data
        const interval = setInterval(() => {
            const newSale: Sale = {
                id: Math.random().toString(36).substr(2, 9),
                amount: Math.floor(Math.random() * 500) + 10,
                product: `Product ${Math.floor(Math.random() * 10) + 1}`,
                timestamp: new Date()
            }
            setSales(prevSales => [...prevSales.slice(-19), newSale])
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (sales.length > 0) {
            const newTotalRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0)
            setTotalRevenue(newTotalRevenue)

            const recentSales = sales.slice(-5)
            const velocity = recentSales.reduce((sum, sale) => sum + sale.amount, 0) / recentSales.length
            setSalesVelocity(velocity)
        }
    }, [sales])

    const chartData = {
        labels: sales.map(sale => sale.timestamp.toLocaleTimeString()),
        datasets: [
            {
                label: 'Sales',
                data: sales.map(sale => sale.amount),
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.4
            }
        ]
    }

    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                display: false
            },
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Real-Time Sales Monitor</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-100 rounded-lg p-4 flex items-center">
                    <FaDollarSign className="text-blue-500 text-4xl mr-4" />
                    <div>
                        <p className="text-sm text-blue-500">Total Revenue</p>
                        <p className="text-2xl font-bold text-blue-700">${totalRevenue.toFixed(2)}</p>
                    </div>
                </div>
                <div className="bg-green-100 rounded-lg p-4 flex items-center">
                    <FaChartLine className="text-green-500 text-4xl mr-4" />
                    <div>
                        <p className="text-sm text-green-500">Sales Velocity</p>
                        <p className="text-2xl font-bold text-green-700">${salesVelocity.toFixed(2)}/sale</p>
                    </div>
                </div>
                <div className="bg-purple-100 rounded-lg p-4 flex items-center">
                    <FaShoppingCart className="text-purple-500 text-4xl mr-4" />
                    <div>
                        <p className="text-sm text-purple-500">Total Orders</p>
                        <p className="text-2xl font-bold text-purple-700">{sales.length}</p>
                    </div>
                </div>
            </div>
            <div className="h-64 mb-6">
                <Line data={chartData} options={chartOptions} />
            </div>
            <div className="overflow-hidden">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Recent Sales</h3>
                <AnimatePresence initial={false}>
                    {sales.slice(-5).reverse().map((sale) => (
                        <motion.div
                            key={sale.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gray-50 rounded p-3 mb-2 flex justify-between items-center"
                        >
                            <span className="font-medium text-gray-800">{sale.product}</span>
                            <span className="text-green-600 font-bold">${sale.amount.toFixed(2)}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default RealTimeSalesMonitor