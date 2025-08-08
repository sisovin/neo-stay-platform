import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Filter,
    Calendar,
    Eye,
    Edit,
    Trash2,
    Download,
    Mail,
    Phone,
    MapPin,
    Clock,
    CreditCard,
    CheckCircle,
    XCircle,
    AlertCircle,
    MoreHorizontal,
    Users,
    DollarSign,
    TrendingUp,
    CalendarDays,
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
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

interface Booking {
    id: string;
    bookingNumber: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    hotelName: string;
    roomType: string;
    checkIn: Date;
    checkOut: Date;
    guests: number;
    totalAmount: number;
    paidAmount: number;
    paymentStatus: "pending" | "partial" | "paid" | "refunded";
    bookingStatus: "confirmed" | "pending" | "cancelled" | "completed" | "no-show";
    createdAt: Date;
    specialRequests?: string;
    paymentMethod: string;
}

const BookingsManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [paymentFilter, setPaymentFilter] = useState("all");
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    // Mock bookings data
    const bookings: Booking[] = [
        {
            id: "1",
            bookingNumber: "BK001",
            customerName: "John Doe",
            customerEmail: "john.doe@email.com",
            customerPhone: "+1 234 567 8900",
            hotelName: "Cyber Plaza Hotel",
            roomType: "Deluxe Suite",
            checkIn: new Date("2024-02-15"),
            checkOut: new Date("2024-02-18"),
            guests: 2,
            totalAmount: 1200,
            paidAmount: 1200,
            paymentStatus: "paid",
            bookingStatus: "confirmed",
            createdAt: new Date("2024-01-15"),
            specialRequests: "Late check-in requested",
            paymentMethod: "Credit Card",
        },
        {
            id: "2",
            bookingNumber: "BK002",
            customerName: "Jane Smith",
            customerEmail: "jane.smith@email.com",
            customerPhone: "+1 234 567 8901",
            hotelName: "Neon Heights Resort",
            roomType: "Standard Room",
            checkIn: new Date("2024-02-20"),
            checkOut: new Date("2024-02-22"),
            guests: 1,
            totalAmount: 400,
            paidAmount: 200,
            paymentStatus: "partial",
            bookingStatus: "pending",
            createdAt: new Date("2024-01-20"),
            paymentMethod: "PayPal",
        },
        {
            id: "3",
            bookingNumber: "BK003",
            customerName: "Mike Johnson",
            customerEmail: "mike.johnson@email.com",
            customerPhone: "+1 234 567 8902",
            hotelName: "Digital Dreams Hotel",
            roomType: "Premium Suite",
            checkIn: new Date("2024-02-10"),
            checkOut: new Date("2024-02-14"),
            guests: 4,
            totalAmount: 1800,
            paidAmount: 0,
            paymentStatus: "pending",
            bookingStatus: "cancelled",
            createdAt: new Date("2024-01-10"),
            paymentMethod: "Bank Transfer",
        },
    ];

    // Statistics
    const stats = {
        totalBookings: bookings.length,
        confirmedBookings: bookings.filter(b => b.bookingStatus === "confirmed").length,
        totalRevenue: bookings.reduce((sum, b) => sum + b.paidAmount, 0),
        pendingPayments: bookings.filter(b => b.paymentStatus === "pending" || b.paymentStatus === "partial").length,
    };

    const getStatusBadge = (status: string, type: "booking" | "payment") => {
        const variants = {
            booking: {
                confirmed: "bg-green-900/30 text-green-300 border-green-800/50",
                pending: "bg-yellow-900/30 text-yellow-300 border-yellow-800/50",
                cancelled: "bg-red-900/30 text-red-300 border-red-800/50",
                completed: "bg-blue-900/30 text-blue-300 border-blue-800/50",
                "no-show": "bg-gray-900/30 text-gray-300 border-gray-800/50",
            },
            payment: {
                paid: "bg-green-900/30 text-green-300 border-green-800/50",
                partial: "bg-orange-900/30 text-orange-300 border-orange-800/50",
                pending: "bg-yellow-900/30 text-yellow-300 border-yellow-800/50",
                refunded: "bg-purple-900/30 text-purple-300 border-purple-800/50",
            },
        };

        return (
            <Badge className={`${variants[type][status as keyof typeof variants[typeof type]]} border`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    const filteredBookings = bookings.filter(booking => {
        const matchesSearch =
            booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.bookingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.hotelName.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "all" || booking.bookingStatus === statusFilter;
        const matchesPayment = paymentFilter === "all" || booking.paymentStatus === paymentFilter;

        return matchesSearch && matchesStatus && matchesPayment;
    });

    const StatCard = ({ title, value, description, icon: Icon, color }: {
        title: string;
        value: string | number;
        description: string;
        icon: any;
        color: string;
    }) => (
        <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-300">{title}</CardTitle>
                <Icon className={`h-4 w-4 ${color}`} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-white">{value}</div>
                <p className="text-xs text-zinc-500">{description}</p>
            </CardContent>
        </Card>
    );

    const handleViewDetails = (booking: Booking) => {
        setSelectedBooking(booking);
        setIsDetailsOpen(true);
    };

    return (
        <div className="bg-black text-white min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
            >
                <div>
                    <h1 className="text-3xl font-bold mb-2">Bookings Management</h1>
                    <p className="text-zinc-400">Manage all hotel bookings and reservations</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Bookings"
                        value={stats.totalBookings}
                        description="All time bookings"
                        icon={CalendarDays}
                        color="text-cyan-400"
                    />
                    <StatCard
                        title="Confirmed Bookings"
                        value={stats.confirmedBookings}
                        description="Active reservations"
                        icon={CheckCircle}
                        color="text-green-400"
                    />
                    <StatCard
                        title="Total Revenue"
                        value={`$${stats.totalRevenue.toLocaleString()}`}
                        description="Payments received"
                        icon={DollarSign}
                        color="text-yellow-400"
                    />
                    <StatCard
                        title="Pending Payments"
                        value={stats.pendingPayments}
                        description="Awaiting payment"
                        icon={AlertCircle}
                        color="text-orange-400"
                    />
                </div>

                {/* Filters and Search */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">Search & Filter</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="search" className="text-zinc-300">Search</Label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                                    <Input
                                        id="search"
                                        placeholder="Search bookings..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-zinc-300">Booking Status</Label>
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-800 border-zinc-700">
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="confirmed">Confirmed</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="no-show">No Show</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-zinc-300">Payment Status</Label>
                                <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-800 border-zinc-700">
                                        <SelectItem value="all">All Payments</SelectItem>
                                        <SelectItem value="paid">Paid</SelectItem>
                                        <SelectItem value="partial">Partial</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="refunded">Refunded</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-zinc-300">Actions</Label>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="border-zinc-700 hover:bg-zinc-800">
                                        <Download className="h-4 w-4 mr-2" />
                                        Export
                                    </Button>
                                    <Button variant="outline" size="sm" className="border-zinc-700 hover:bg-zinc-800">
                                        <Filter className="h-4 w-4 mr-2" />
                                        More Filters
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Bookings Table */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">Bookings ({filteredBookings.length})</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Manage and track all hotel reservations
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border border-zinc-800">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-zinc-800">
                                        <TableHead className="text-zinc-300">Booking #</TableHead>
                                        <TableHead className="text-zinc-300">Customer</TableHead>
                                        <TableHead className="text-zinc-300">Hotel & Room</TableHead>
                                        <TableHead className="text-zinc-300">Dates</TableHead>
                                        <TableHead className="text-zinc-300">Guests</TableHead>
                                        <TableHead className="text-zinc-300">Amount</TableHead>
                                        <TableHead className="text-zinc-300">Payment</TableHead>
                                        <TableHead className="text-zinc-300">Status</TableHead>
                                        <TableHead className="text-zinc-300">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredBookings.map((booking) => (
                                        <TableRow key={booking.id} className="border-zinc-800">
                                            <TableCell className="font-medium text-white">
                                                {booking.bookingNumber}
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="font-medium text-white">{booking.customerName}</div>
                                                    <div className="text-sm text-zinc-400">{booking.customerEmail}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="font-medium text-white">{booking.hotelName}</div>
                                                    <div className="text-sm text-zinc-400">{booking.roomType}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="text-sm text-white">
                                                        {booking.checkIn.toLocaleDateString()}
                                                    </div>
                                                    <div className="text-sm text-zinc-400">
                                                        to {booking.checkOut.toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-white">{booking.guests}</TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="font-medium text-white">
                                                        ${booking.totalAmount.toLocaleString()}
                                                    </div>
                                                    <div className="text-sm text-zinc-400">
                                                        Paid: ${booking.paidAmount.toLocaleString()}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(booking.paymentStatus, "payment")}
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(booking.bookingStatus, "booking")}
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="bg-zinc-800 border-zinc-700">
                                                        <DropdownMenuLabel className="text-zinc-300">Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem
                                                            onClick={() => handleViewDetails(booking)}
                                                            className="text-zinc-300 hover:bg-zinc-700"
                                                        >
                                                            <Eye className="mr-2 h-4 w-4" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-zinc-300 hover:bg-zinc-700">
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Edit Booking
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator className="bg-zinc-700" />
                                                        <DropdownMenuItem className="text-zinc-300 hover:bg-zinc-700">
                                                            <Mail className="mr-2 h-4 w-4" />
                                                            Send Email
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-zinc-300 hover:bg-zinc-700">
                                                            <Download className="mr-2 h-4 w-4" />
                                                            Download Invoice
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator className="bg-zinc-700" />
                                                        <DropdownMenuItem className="text-red-400 hover:bg-red-900/20">
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Cancel Booking
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Booking Details Dialog */}
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">
                            Booking Details - {selectedBooking?.bookingNumber}
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Complete information about this reservation
                        </DialogDescription>
                    </DialogHeader>

                    {selectedBooking && (
                        <Tabs defaultValue="details" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 bg-zinc-800">
                                <TabsTrigger value="details" className="data-[state=active]:bg-zinc-700">Details</TabsTrigger>
                                <TabsTrigger value="payment" className="data-[state=active]:bg-zinc-700">Payment</TabsTrigger>
                                <TabsTrigger value="history" className="data-[state=active]:bg-zinc-700">History</TabsTrigger>
                            </TabsList>

                            <TabsContent value="details" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Customer Information */}
                                    <Card className="bg-zinc-800/50 border-zinc-700">
                                        <CardHeader>
                                            <CardTitle className="text-lg text-white flex items-center gap-2">
                                                <Users className="h-5 w-5" />
                                                Customer Information
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div>
                                                <Label className="text-zinc-300">Name</Label>
                                                <p className="text-white font-medium">{selectedBooking.customerName}</p>
                                            </div>
                                            <div>
                                                <Label className="text-zinc-300">Email</Label>
                                                <p className="text-white">{selectedBooking.customerEmail}</p>
                                            </div>
                                            <div>
                                                <Label className="text-zinc-300">Phone</Label>
                                                <p className="text-white">{selectedBooking.customerPhone}</p>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Booking Information */}
                                    <Card className="bg-zinc-800/50 border-zinc-700">
                                        <CardHeader>
                                            <CardTitle className="text-lg text-white flex items-center gap-2">
                                                <Calendar className="h-5 w-5" />
                                                Booking Information
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div>
                                                <Label className="text-zinc-300">Hotel</Label>
                                                <p className="text-white font-medium">{selectedBooking.hotelName}</p>
                                            </div>
                                            <div>
                                                <Label className="text-zinc-300">Room Type</Label>
                                                <p className="text-white">{selectedBooking.roomType}</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <Label className="text-zinc-300">Check-in</Label>
                                                    <p className="text-white">{selectedBooking.checkIn.toLocaleDateString()}</p>
                                                </div>
                                                <div>
                                                    <Label className="text-zinc-300">Check-out</Label>
                                                    <p className="text-white">{selectedBooking.checkOut.toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <Label className="text-zinc-300">Guests</Label>
                                                <p className="text-white">{selectedBooking.guests} guests</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Special Requests */}
                                {selectedBooking.specialRequests && (
                                    <Card className="bg-zinc-800/50 border-zinc-700">
                                        <CardHeader>
                                            <CardTitle className="text-lg text-white">Special Requests</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-zinc-300">{selectedBooking.specialRequests}</p>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Status Information */}
                                <Card className="bg-zinc-800/50 border-zinc-700">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-white">Status Information</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label className="text-zinc-300">Booking Status</Label>
                                                <div className="mt-2">
                                                    {getStatusBadge(selectedBooking.bookingStatus, "booking")}
                                                </div>
                                            </div>
                                            <div>
                                                <Label className="text-zinc-300">Payment Status</Label>
                                                <div className="mt-2">
                                                    {getStatusBadge(selectedBooking.paymentStatus, "payment")}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="payment" className="space-y-6">
                                <Card className="bg-zinc-800/50 border-zinc-700">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-white flex items-center gap-2">
                                            <CreditCard className="h-5 w-5" />
                                            Payment Details
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label className="text-zinc-300">Total Amount</Label>
                                                <p className="text-2xl font-bold text-white">
                                                    ${selectedBooking.totalAmount.toLocaleString()}
                                                </p>
                                            </div>
                                            <div>
                                                <Label className="text-zinc-300">Paid Amount</Label>
                                                <p className="text-2xl font-bold text-green-400">
                                                    ${selectedBooking.paidAmount.toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <Label className="text-zinc-300">Outstanding Balance</Label>
                                            <p className="text-xl font-semibold text-orange-400">
                                                ${(selectedBooking.totalAmount - selectedBooking.paidAmount).toLocaleString()}
                                            </p>
                                        </div>
                                        <div>
                                            <Label className="text-zinc-300">Payment Method</Label>
                                            <p className="text-white">{selectedBooking.paymentMethod}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="history" className="space-y-6">
                                <Card className="bg-zinc-800/50 border-zinc-700">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-white flex items-center gap-2">
                                            <Clock className="h-5 w-5" />
                                            Booking History
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 p-3 bg-zinc-700/50 rounded-lg">
                                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                                <div className="flex-1">
                                                    <p className="text-white font-medium">Booking Created</p>
                                                    <p className="text-sm text-zinc-400">
                                                        {selectedBooking.createdAt.toLocaleDateString()} - Booking was successfully created
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-zinc-700/50 rounded-lg">
                                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                                <div className="flex-1">
                                                    <p className="text-white font-medium">Payment Received</p>
                                                    <p className="text-sm text-zinc-400">
                                                        Payment of ${selectedBooking.paidAmount.toLocaleString()} received
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default BookingsManagement;
