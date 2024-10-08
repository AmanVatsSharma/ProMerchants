"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

type EngagementData = {
    labels: string[]
    pageViews: number[]
    timeSpent: number[]
    interactions: number[]
}

type EngagementChartProps = {
    data: EngagementData
}

export default function EngagementChart({ data }: EngagementChartProps) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Customer Engagement Metrics',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Count',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
        },
    }

    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: 'Page Views',
                data: data.pageViews,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Time Spent (minutes)',
                data: data.timeSpent,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Interactions',
                data: data.interactions,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
        ],
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-lg"
        >
            <h2 className="text-xl font-semibold mb-4">Customer Engagement</h2>
            <div className="h-80">
                <Bar options={options} data={chartData} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="text-center">
                    <p className="text-sm text-gray-600">Avg. Page Views</p>
                    <p className="text-xl font-semibold text-pink-500">
                        {(data.pageViews.reduce((a, b) => a + b, 0) / data.pageViews.length).toFixed(2)}
                    </p>
                </div>
                <div className="text-center">
                    <p className="text-sm text-gray-600">Avg. Time Spent</p>
                    <p className="text-xl font-semibold text-blue-500">
                        {(data.timeSpent.reduce((a, b) => a + b, 0) / data.timeSpent.length).toFixed(2)} min
                    </p>
                </div>
                <div className="text-center">
                    <p className="text-sm text-gray-600">Avg. Interactions</p>
                    <p className="text-xl font-semibold text-teal-500">
                        {(data.interactions.reduce((a, b) => a + b, 0) / data.interactions.length).toFixed(2)}
                    </p>
                </div>
            </div>
        </motion.div>
    )
}