import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Filter,
    Search,
    Eye,
    Edit,
    Trash2,
    Plus,
    Users,
    Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface BookingEvent {
    id: string;
    title: string;
    customerName: string;
    hotelName: string;
    roomType: string;
    checkIn: Date;
    checkOut: Date;
    guests: number;
    status: "confirmed" | "pending" | "cancelled" | "checked-in" | "checked-out";
    totalAmount: number;
}

const BookingCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedBooking, setSelectedBooking] = useState<BookingEvent | null>(null);
    const [filterStatus, setFilterStatus] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    // Mock booking data
    const bookings: BookingEvent[] = [
        {
            id: "1",
            title: "Standard Room Booking",
            customerName: "John Doe",
            hotelName: "Neo Tokyo Tower",
            roomType: "Standard",
            checkIn: new Date(2024, 11, 15),
            checkOut: new Date(2024, 11, 18),
            guests: 2,
            status: "confirmed",
            totalAmount: 450,
        },
        {
            id: "2",
            title: "Deluxe Suite Booking",
            customerName: "Jane Smith",
            hotelName: "Cyber Plaza Hotel",
            roomType: "Deluxe Suite",
            checkIn: new Date(2024, 11, 20),
            checkOut: new Date(2024, 11, 23),
            guests: 4,
            status: "pending",
            totalAmount: 890,
        },
        {
            id: "3",
            title: "Presidential Suite",
            customerName: "Mike Johnson",
            hotelName: "Digital Dreams Resort",
            roomType: "Presidential Suite",
            checkIn: new Date(2024, 11, 25),
            checkOut: new Date(2024, 11, 28),
            guests: 6,
            status: "confirmed",
            totalAmount: 1200,
        },
    ];

    const getDaysInMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date: Date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const getBookingsForDate = (date: Date) => {
        return bookings.filter((booking) => {
            const bookingDate = new Date(booking.checkIn);
            return (
                bookingDate.getDate() === date.getDate() &&
                bookingDate.getMonth() === date.getMonth() &&
                bookingDate.getFullYear() === date.getFullYear()
            );
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "confirmed":
                return "bg-green-900/30 text-green-400 border-green-800/50";
            case "pending":
                return "bg-yellow-900/30 text-yellow-400 border-yellow-800/50";
            case "cancelled":
                return "bg-red-900/30 text-red-400 border-red-800/50";
            case "checked-in":
                return "bg-blue-900/30 text-blue-400 border-blue-800/50";
            case "checked-out":
                return "bg-gray-900/30 text-gray-400 border-gray-800/50";
            default:
                return "bg-zinc-900/30 text-zinc-400 border-zinc-800/50";
        }
    };

    const navigateMonth = (direction: "prev" | "next") => {
        setCurrentDate((prev) => {
            const newDate = new Date(prev);
            if (direction === "prev") {
                newDate.setMonth(prev.getMonth() - 1);
            } else {
                newDate.setMonth(prev.getMonth() + 1);
            }
            return newDate;
        });
    };

    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const days = [];

        // Empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-24" />);
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const dayBookings = getBookingsForDate(date);
            const isToday = new Date().toDateString() === date.toDateString();

            days.push(
                <div
                    key={day}
                    className={`h-24 border border-zinc-800 p-1 relative ${isToday ? "bg-violet-900/20 border-violet-700" : "bg-zinc-900/30"
                        }`}
                >
                    <div className="text-sm text-zinc-300 font-medium mb-1">{day}</div>
                    <div className="space-y-1">
                        {dayBookings.slice(0, 2).map((booking) => (
                            <div
                                key={booking.id}
                                className="text-xs p-1 rounded bg-violet-900/30 text-violet-300 cursor-pointer hover:bg-violet-900/50 transition-colors"
                                onClick={() => setSelectedBooking(booking)}
                            >
                                <div className="truncate">{booking.customerName}</div>
                                <div className="truncate text-violet-400">{booking.hotelName}</div>
                            </div>
                        ))}
                        {dayBookings.length > 2 && (
                            <div className="text-xs text-zinc-500 text-center">
                                +{dayBookings.length - 2} more
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        return days;
    };

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
                            Booking Calendar
                        </h1>
                        <p className="text-zinc-400">
                            View and manage bookings organized by date
                        </p>
                    </div>
                    <Button className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600">
                        <Plus className="h-4 w-4 mr-2" />
                        New Booking
                    </Button>
                </div>

                {/* Filters */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardContent className="pt-6">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex-1 min-w-[200px]">
                                <Input
                                    placeholder="Search bookings..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-zinc-800 border-zinc-700"
                                />
                            </div>
                            <Select value={filterStatus} onValueChange={setFilterStatus}>
                                <SelectTrigger className="w-[180px] bg-zinc-800 border-zinc-700">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-800 border-zinc-700">
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="confirmed">Confirmed</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                    <SelectItem value="checked-in">Checked In</SelectItem>
                                    <SelectItem value="checked-out">Checked Out</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Calendar */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-white flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                {currentDate.toLocaleDateString("en-US", {
                                    month: "long",
                                    year: "numeric",
                                })}
                            </CardTitle>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigateMonth("prev")}
                                    className="border-zinc-700 hover:bg-zinc-800"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setCurrentDate(new Date())}
                                    className="border-zinc-700 hover:bg-zinc-800"
                                >
                                    Today
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => navigateMonth("next")}
                                    className="border-zinc-700 hover:bg-zinc-800"
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {/* Calendar Header */}
                        <div className="grid grid-cols-7 gap-0 mb-2">
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                <div
                                    key={day}
                                    className="h-10 flex items-center justify-center text-sm font-medium text-zinc-400 border-b border-zinc-800"
                                >
                                    {day}
                                </div>
                            ))}
                        </div>
                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-0">{renderCalendarDays()}</div>
                    </CardContent>
                </Card>

                {/* Booking Details Dialog */}
                <Dialog
                    open={!!selectedBooking}
                    onOpenChange={() => setSelectedBooking(null)}
                >
                    <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
                        <DialogHeader>
                            <DialogTitle>Booking Details</DialogTitle>
                            <DialogDescription className="text-zinc-400">
                                View and manage booking information
                            </DialogDescription>
                        </DialogHeader>
                        {selectedBooking && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm text-zinc-400">Customer</label>
                                        <p className="text-white font-medium">
                                            {selectedBooking.customerName}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-zinc-400">Hotel</label>
                                        <p className="text-white font-medium">
                                            {selectedBooking.hotelName}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-zinc-400">Room Type</label>
                                        <p className="text-white font-medium">
                                            {selectedBooking.roomType}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-zinc-400">Guests</label>
                                        <p className="text-white font-medium flex items-center gap-1">
                                            <Users className="h-4 w-4" />
                                            {selectedBooking.guests}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-zinc-400">Check-in</label>
                                        <p className="text-white font-medium">
                                            {selectedBooking.checkIn.toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-zinc-400">Check-out</label>
                                        <p className="text-white font-medium">
                                            {selectedBooking.checkOut.toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm text-zinc-400">Status</label>
                                        <Badge
                                            variant="secondary"
                                            className={getStatusColor(selectedBooking.status)}
                                        >
                                            {selectedBooking.status}
                                        </Badge>
                                    </div>
                                    <div>
                                        <label className="text-sm text-zinc-400">Total Amount</label>
                                        <p className="text-white font-bold text-lg">
                                            ${selectedBooking.totalAmount}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2 pt-4">
                                    <Button
                                        variant="outline"
                                        className="border-zinc-700 hover:bg-zinc-800"
                                    >
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Details
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="border-zinc-700 hover:bg-zinc-800"
                                    >
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </motion.div>
        </div>
    );
};

export default BookingCalendar;