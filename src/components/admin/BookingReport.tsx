import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Calendar,
    TrendingUp,
    Users,
    Building2,
    DollarSign,
    Bed,
    BarChart3,
    PieChart,
    Download,
    Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import DatePickerWithRange from "@/components/ui/date-picker-with-range";
import { Badge } from "@/components/ui/badge";
import type { DateRange } from "react-day-picker";
import "./BookingReport.css";

const BookingReport = () => {
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    const [reportType, setReportType] = useState("overview");

    // Mock data for reports
    const reportData = {
        totalRevenue: 245680,
        totalBookings: 892,
        totalCustomers: 1247,
        occupancyRate: 78.5,
        averageBookingValue: 275.5,
        topPerformingHotels: [
            { name: "Neo Tokyo Tower", revenue: 45680, bookings: 156 },
            { name: "Cyber Plaza Hotel", revenue: 38920, bookings: 142 },
            { name: "Digital Dreams Resort", revenue: 32450, bookings: 128 },
        ],
        monthlyTrends: [
            { month: "Jan", revenue: 18500, bookings: 65 },
            { month: "Feb", revenue: 22300, bookings: 78 },
            { month: "Mar", revenue: 28900, bookings: 95 },
            { month: "Apr", revenue: 31200, bookings: 108 },
            { month: "May", revenue: 35600, bookings: 125 },
            { month: "Jun", revenue: 42100, bookings: 148 },
        ],
    };

    const StatCard = ({
        title,
        value,
        description,
        icon: Icon,
        color,
        trend,
    }: {
        title: string;
        value: string | number;
        description: string;
        icon: any;
        color: string;
        trend?: string;
    }) => (
        <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-300">
                    {title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${color}`} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="flex items-center gap-2">
                    <p className="text-xs text-zinc-500">{description}</p>
                    {trend && (
                        <Badge
                            variant="secondary"
                            className="bg-green-900/30 text-green-400 border-green-800/50"
                        >
                            {trend}
                        </Badge>
                    )}
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="bg-black min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Booking Reports
                        </h1>
                        <p className="text-zinc-400">
                            Comprehensive analytics and insights for your bookings
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            className="border-zinc-700 hover:bg-zinc-800"
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Export Report
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Report Filters
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex-1 min-w-[200px]">
                                <DatePickerWithRange
                                    value={dateRange}
                                    onChange={(range) => setDateRange(range)}
                                />
                            </div>
                            <Select value={reportType} onValueChange={setReportType}>
                                <SelectTrigger className="w-[180px] bg-zinc-800 border-zinc-700">
                                    <SelectValue placeholder="Report Type" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-800 border-zinc-700">
                                    <SelectItem value="overview">Overview</SelectItem>
                                    <SelectItem value="revenue">Revenue</SelectItem>
                                    <SelectItem value="occupancy">Occupancy</SelectItem>
                                    <SelectItem value="customer">Customer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    <StatCard
                        title="Total Revenue"
                        value={`$${reportData.totalRevenue.toLocaleString()}`}
                        description="This period"
                        icon={DollarSign}
                        color="text-green-400"
                        trend="+12.5%"
                    />
                    <StatCard
                        title="Total Bookings"
                        value={reportData.totalBookings}
                        description="Confirmed reservations"
                        icon={Calendar}
                        color="text-blue-400"
                        trend="+8.3%"
                    />
                    <StatCard
                        title="Unique Customers"
                        value={reportData.totalCustomers.toLocaleString()}
                        description="Active users"
                        icon={Users}
                        color="text-purple-400"
                        trend="+15.2%"
                    />
                    <StatCard
                        title="Occupancy Rate"
                        value={`${reportData.occupancyRate}%`}
                        description="Average occupancy"
                        icon={Bed}
                        color="text-cyan-400"
                        trend="+5.7%"
                    />
                    <StatCard
                        title="Avg Booking Value"
                        value={`$${reportData.averageBookingValue}`}
                        description="Per reservation"
                        icon={TrendingUp}
                        color="text-yellow-400"
                        trend="+3.1%"
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Revenue Trend Chart */}
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <BarChart3 className="h-5 w-5" />
                                Revenue Trends
                            </CardTitle>
                            <CardDescription className="text-zinc-400">
                                Monthly revenue and booking trends
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-64 flex items-end justify-between gap-2">
                                {reportData.monthlyTrends.map((data, index) => (
                                    <div key={index} className="flex flex-col items-center">
                                        <div
                                            className="bar-gradient rounded-t"
                                            style={{    
                                                // Set CSS variables for bar height and width
                                                // These will be used in the external CSS
                                                ['--bar-height' as any]: `${(data.revenue / 45000) * 200}px`,
                                                ['--bar-width' as any]: "40px",
                                            }}
                                        />
                                        <span className="text-xs text-zinc-400">{data.month}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Top Performing Hotels */}
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader>
                            <CardTitle className="text-white flex items-center gap-2">
                                <Building2 className="h-5 w-5" />
                                Top Performing Hotels
                            </CardTitle>
                            <CardDescription className="text-zinc-400">
                                Hotels with highest revenue this period
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {reportData.topPerformingHotels.map((hotel, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50"
                                    >
                                        <div>
                                            <h4 className="text-white font-medium">{hotel.name}</h4>
                                            <p className="text-sm text-zinc-400">
                                                {hotel.bookings} bookings
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white font-bold">
                                                ${hotel.revenue.toLocaleString()}
                                            </p>
                                            <Badge
                                                variant="secondary"
                                                className="bg-green-900/30 text-green-400 border-green-800/50"
                                            >
                                                #{index + 1}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Detailed Analytics */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <PieChart className="h-5 w-5" />
                            Booking Analytics
                        </CardTitle>
                        <CardDescription className="text-zinc-400">
                            Detailed breakdown of booking patterns and customer behavior
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <h4 className="text-white font-medium">Booking Sources</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-zinc-400">Direct Website</span>
                                        <span className="text-white">45%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-zinc-400">Online Travel Agencies</span>
                                        <span className="text-white">35%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-zinc-400">Mobile App</span>
                                        <span className="text-white">20%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-white font-medium">Room Types</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-zinc-400">Standard</span>
                                        <span className="text-white">40%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-zinc-400">Deluxe</span>
                                        <span className="text-white">35%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-zinc-400">Suite</span>
                                        <span className="text-white">25%</span>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-white font-medium">Booking Lead Time</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-zinc-400">0-7 days</span>
                                        <span className="text-white">25%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-zinc-400">8-30 days</span>
                                        <span className="text-white">45%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-zinc-400">30+ days</span>
                                        <span className="text-white">30%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default BookingReport;
