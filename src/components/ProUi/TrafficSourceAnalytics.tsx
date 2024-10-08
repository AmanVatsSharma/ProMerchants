"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

type TrafficSource = {
    source: string
    visits: number
    color: string
}

type TrafficSourceAnalyticsProps = {
    trafficSources: TrafficSource[]
    totalVisits: number
}

export default function TrafficSourceAnalytics({
    trafficSources,
    totalVisits
}: TrafficSourceAnalyticsProps) {
    const data = {
        labels: trafficSources.map(source => source.source),
        datasets: [
            {
                data: trafficSources.map(source => source.visits),
                backgroundColor: trafficSources.map(source => source.color),
                borderColor: trafficSources.map(source => source.color),
                borderWidth: 1,
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const label = context.label || ''
                        const value = context.raw || 0
                        const percentage = ((value / totalVisits) * 100).toFixed(2)
                        return `${label}: ${value} (${percentage}%)`
                    }
                }
            }
        },
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-lg"
        >
            <h2 className="text-xl font-semibold mb-4">Traffic Source Analytics</h2>
            <div className="h-64">
                <Pie data={data} options={options} />
            </div>
            <div className="mt-6 space-y-2">
                {trafficSources.map((source, index) => (
                    <motion.div
                        key={source.source}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center justify-between"
                    >
                        <div className="flex items-center">
                            <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: source.color }} />
                            <span>{source.source}</span>
                        </div>
                        <span className="font-semibold">{((source.visits / totalVisits) * 100).toFixed(2)}%</span>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}