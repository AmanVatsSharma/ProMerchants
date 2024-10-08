"use client"

import { useState, useEffect } from 'react'
import { Line, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Bell, ChevronDown, DollarSign, TrendingUp, Volume2, Calendar, BarChart2, Maximize2, Grid, BookOpen, Users, Zap, Settings, LogOut } from 'lucide-react'
import Image from 'next/image'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler)

export default function EnhancedSharePage() {
    const [timeRange, setTimeRange] = useState('1D')
    const [showVolume, setShowVolume] = useState(false)
    const [selectedTab, setSelectedTab] = useState('chart')

    // Sample data
    const shareData = {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        price: 150.25,
        change: 2.75,
        changePercent: 1.86,
        marketCap: '2.5T',
        volume: '62.34M',
        peRatio: 28.5,
        dividend: 0.88,
        yield: 0.59,
        eps: 5.28,
        beta: 1.2,
        sharesOutstanding: '16.53B',
        nextEarningsDate: '2023-07-25',
    }

    const chartData = {
        labels: ['9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'],
        datasets: [
            {
                label: 'Stock Price',
                data: [148.5, 149.2, 149.8, 150.1, 150.5, 150.2, 150.8, 151.2, 151.5, 151.3, 151.0, 150.7, 150.4, 150.25],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                tension: 0.4,
            },
            {
                label: 'Volume',
                data: [2.5, 3.2, 2.8, 3.5, 4.1, 3.8, 4.3, 4.8, 5.2, 4.9, 4.5, 4.2, 3.9, 3.7],
                type: 'bar',
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                yAxisID: 'y1',
            },
        ],
    }

    const newsItems = [
        { title: 'Apple Announces New iPhone', source: 'TechCrunch', time: '2 hours ago', sentiment: 'positive' },
        { title: 'AAPL Stock Hits All-Time High', source: 'CNBC', time: '4 hours ago', sentiment: 'positive' },
        { title: "Apple's Services Revenue Grows", source: 'Bloomberg', time: '6 hours ago', sentiment: 'neutral' },
        { title: "Concerns Over Apple's China Exposure", source: 'WSJ', time: '1 day ago', sentiment: 'negative' },
    ];


    const analystRatings = [
        { firm: 'Morgan Stanley', rating: 'Overweight', targetPrice: 180 },
        { firm: 'Goldman Sachs', rating: 'Buy', targetPrice: 175 },
        { firm: 'JP Morgan', rating: 'Outperform', targetPrice: 190 },
        { firm: 'Bank of America', rating: 'Neutral', targetPrice: 160 },
        { firm: 'Wedbush', rating: 'Outperform', targetPrice: 185 },
    ]

    const optionChain = [
        { strike: 145, callBid: 6.20, callAsk: 6.25, putBid: 0.95, putAsk: 1.00 },
        { strike: 150, callBid: 2.80, callAsk: 2.85, putBid: 2.55, putAsk: 2.60 },
        { strike: 155, callBid: 0.85, callAsk: 0.90, putBid: 5.60, putAsk: 5.65 },
    ]

    const peerComparison = [
        { symbol: 'MSFT', name: 'Microsoft', price: 305.75, change: 1.2 },
        { symbol: 'GOOGL', name: 'Alphabet', price: 2450.20, change: -0.8 },
        { symbol: 'AMZN', name: 'Amazon', price: 3305.50, change: 2.1 },
    ]

    const technicalIndicators = [
        { name: 'RSI', value: 58.5, signal: 'Neutral' },
        { name: 'MACD', value: 0.75, signal: 'Buy' },
        { name: 'Bollinger Bands', value: 'Middle', signal: 'Hold' },
    ]

    const sentimentData = {
        labels: ['Very Negative', 'Negative', 'Neutral', 'Positive', 'Very Positive'],
        datasets: [
            {
                data: [5, 10, 30, 40, 15],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 205, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                ],
            },
        ],
    }

    useEffect(() => {
        // Simulating real-time data updates
        const interval = setInterval(() => {
            const lastPrice = chartData.datasets[0].data[chartData.datasets[0].data.length - 1]
            const newPrice = lastPrice + (Math.random() - 0.5) * 0.5
            setChartData(prevData => ({
                ...prevData,
                datasets: [
                    {
                        ...prevData.datasets[0],
                        data: [...prevData.datasets[0].data.slice(1), newPrice],
                    },
                    prevData.datasets[1],
                ],
            }))
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <Image src="/logo.png" alt="TradeZEN Logo" width={120} height={40} />
                        <nav className="hidden md:flex space-x-4">
                            <Button variant="ghost">Dashboard</Button>
                            <Button variant="ghost">Watchlist</Button>
                            <Button variant="ghost">Portfolio</Button>
                            <Button variant="ghost">News</Button>
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button variant="outline" size="icon">
                            <Bell className="h-4 w-4" />
                        </Button>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>

            <main className="container mx-auto p-4 space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-4xl font-bold text-gradient bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                            {shareData.name} ({shareData.symbol})
                        </h1>
                        <p className="text-2xl">
                            ${shareData.price.toFixed(2)}
                            <span className={`ml-2 ${shareData.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {shareData.change > 0 ? '+' : ''}{shareData.change.toFixed(2)} ({shareData.changePercent.toFixed(2)}%)
                            </span>
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="outline"><Bell className="mr-2 h-4 w-4" /> Set Alert</Button>
                        <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">Buy</Button>
                        <Button variant="secondary">Sell</Button>
                    </div>
                </div>

                <Card className="bg-white shadow-lg">
                    <CardContent className="p-6">
                        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-5 rounded-xl bg-blue-100 p-1">
                                <TabsTrigger value="chart">Chart</TabsTrigger>
                                <TabsTrigger value="news">News</TabsTrigger>
                                <TabsTrigger value="financials">Financials</TabsTrigger>
                                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                                <TabsTrigger value="options">Options</TabsTrigger>
                            </TabsList>
                            <TabsContent value="chart" className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="space-x-2">
                                        {['1D', '1W', '1M', '3M', '1Y', '5Y'].map((range) => (
                                            <Button
                                                key={range}
                                                variant={timeRange === range ? 'default' : 'outline'}
                                                onClick={() => setTimeRange(range)}
                                                className={timeRange === range ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white' : ''}
                                            >
                                                {range}
                                            </Button>
                                        ))}
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="show-volume"
                                                checked={showVolume}
                                                onCheckedChange={setShowVolume}
                                            />
                                            <label htmlFor="show-volume">Show Volume</label>
                                        </div>
                                        <Select>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select indicator" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="sma">Simple Moving Average</SelectItem>
                                                <SelectItem value="ema">Exponential Moving Average</SelectItem>
                                                <SelectItem value="bollinger">Bollinger Bands</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="h-[400px]">
                                    <Line
                                        data={chartData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            interaction: {
                                                mode: 'index',
                                                intersect: false,
                                            },
                                            scales: {
                                                y: {
                                                    type: 'linear',
                                                    display: true,
                                                    position: 'left',
                                                },
                                                y1: {
                                                    type: 'linear',
                                                    display: showVolume,
                                                    position: 'right',
                                                    grid: {
                                                        drawOnChartArea: false,
                                                    },
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </TabsContent>
                            <TabsContent value="news">
                                <div className="space-y-4">
                                    {newsItems.map((item, index) => (
                                        <Card key={index}>
                                            <CardHeader>
                                                <CardTitle>{item.title}</CardTitle>
                                                <CardDescription>{item.source} - {item.time}</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className={`inline-block px-2 py-1 rounded-full text-sm ${item.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                                                    item.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                                                        'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {item.sentiment}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="financials">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {Object.entries(shareData).map(([key, value]) => (
                                        <Card key={key}>
                                            <CardHeader>
                                                <CardTitle className="text-sm font-medium">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-2xl font-bold">{value}</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="analysis">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Analyst Ratings</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Firm</TableHead>
                                                        <TableHead>Rating</TableHead>
                                                        <TableHead>Target Price</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {analystRatings.map((rating, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell>{rating.firm}</TableCell>
                                                            <TableCell>{rating.rating}</TableCell>
                                                            <TableCell>${rating.targetPrice}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Technical Indicators</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Indicator</TableHead>
                                                        <TableHead>Value</TableHead>
                                                        <TableHead>Signal</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {technicalIndicators.map((indicator, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell>{indicator.name}</TableCell>
                                                            <TableCell>{indicator.value}</TableCell>
                                                            <TableCell>{indicator.signal}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                            <TabsContent value="options">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Option Chain</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Strike</TableHead>
                                                    <TableHead>Call Bid</TableHead>
                                                    <TableHead>Call Ask</TableHead>
                                                    <TableHead>Put Bid</TableHead>
                                                    <TableHead>Put Ask</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {optionChain.map((option, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{option.strike}</TableCell>
                                                        <TableCell>{option.callBid}</TableCell>
                                                        <TableCell>{option.callAsk}</TableCell>
                                                        <TableCell>{option.putBid}</TableCell>
                                                        <TableCell>{option.putAsk}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Social Sentiment</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Bar
                                data={sentimentData}
                                options={{
                                    indexAxis: 'y',
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                    },
                                }}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Peer Comparison</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Symbol</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Change %</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {peerComparison.map((peer, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{peer.symbol}</TableCell>
                                            <TableCell>${peer.price}</TableCell>
                                            <TableCell className={peer.change > 0 ? 'text-green-600' : 'text-red-600'}>
                                                {peer.change > 0 ? '+' : ''}{peer.change}%
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Upcoming Events</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    <span>Earnings Call: {shareData.nextEarningsDate}</span>
                                </div>
                                <div className="flex items-center">
                                    <BarChart2 className="mr-2 h-4 w-4" />
                                    <span>Q2 Results Release: 2023-07-27</span>
                                </div>
                                <div className="flex items-center">
                                    <Users className="mr-2 h-4 w-4" />
                                    <span>Annual Shareholder Meeting: 2024-02-15</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <footer className="bg-gray-100 mt-12">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="w-full md:w-1/3 mb-6 md:mb-0">
                            <Image src="/logo.png" alt="TradeZEN Logo" width={100} height={32} />
                            <p className="mt-2 text-sm text-gray-600">Empowering traders with advanced analytics and insights.</p>
                        </div>
                        <div className="w-full md:w-1/3 mb-6 md:mb-0">
                            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-blue-600 hover:underline">About Us</a></li>
                                <li><a href="#" className="text-blue-600 hover:underline">Contact</a></li>
                                <li><a href="#" className="text-blue-600 hover:underline">Privacy Policy</a></li>
                                <li><a href="#" className="text-blue-600 hover:underline">Terms of Service</a></li>
                            </ul>
                        </div>
                        <div className="w-full md:w-1/3">
                            <h3 className="text-lg font-semibold mb-2">Stay Connected</h3>
                            <div className="flex space-x-4">
                                <a href="#" className="text-blue-600 hover:text-blue-800"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg></a>
                                <a href="#" className="text-blue-400 hover:text-blue-600"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg></a>
                                <a href="#" className="text-blue-500 hover:text-blue-700"><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg></a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 text-center text-sm text-gray-600">
                        © 2023 TradeZEN. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    )
}