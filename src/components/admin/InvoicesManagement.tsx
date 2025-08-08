import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Filter,
    Download,
    Mail,
    Printer,
    Eye,
    Edit,
    Trash2,
    Plus,
    MoreHorizontal,
    Calendar,
    DollarSign,
    FileText,
    AlertCircle,
    CheckCircle,
    Clock,
    X,
    Send,
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import type { Invoice, InvoiceItem } from "@/types/admin";

const InvoicesManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    // Mock invoice data
    const mockInvoices: Invoice[] = [
        {
            id: "inv-001",
            invoiceNumber: "INV-2024-001",
            customerId: "cust-001",
            customerName: "John Smith",
            customerEmail: "john.smith@email.com",
            hotelId: "hotel-001",
            hotelName: "NeoCity Grand Hotel",
            bookingId: "book-001",
            issueDate: new Date("2024-01-15"),
            dueDate: new Date("2024-02-15"),
            items: [
                {
                    id: "item-001",
                    description: "Deluxe Room - 3 nights",
                    quantity: 3,
                    unitPrice: 250,
                    totalPrice: 750,
                    type: "room",
                },
                {
                    id: "item-002",
                    description: "Room Service",
                    quantity: 2,
                    unitPrice: 45,
                    totalPrice: 90,
                    type: "service",
                },
                {
                    id: "item-003",
                    description: "Tax (12%)",
                    quantity: 1,
                    unitPrice: 100.8,
                    totalPrice: 100.8,
                    type: "tax",
                },
            ],
            subtotal: 840,
            taxAmount: 100.8,
            discountAmount: 0,
            totalAmount: 940.8,
            paidAmount: 940.8,
            balanceAmount: 0,
            status: "paid",
            paymentStatus: "paid",
            paymentMethod: "Credit Card",
            paymentDate: new Date("2024-01-16"),
            createdAt: new Date("2024-01-15"),
            updatedAt: new Date("2024-01-16"),
        },
        {
            id: "inv-002",
            invoiceNumber: "INV-2024-002",
            customerId: "cust-002",
            customerName: "Sarah Johnson",
            customerEmail: "sarah.johnson@email.com",
            hotelId: "hotel-002",
            hotelName: "Cyber Plaza Hotel",
            bookingId: "book-002",
            issueDate: new Date("2024-01-20"),
            dueDate: new Date("2024-02-20"),
            items: [
                {
                    id: "item-004",
                    description: "Premium Suite - 2 nights",
                    quantity: 2,
                    unitPrice: 450,
                    totalPrice: 900,
                    type: "room",
                },
                {
                    id: "item-005",
                    description: "Spa Service",
                    quantity: 1,
                    unitPrice: 120,
                    totalPrice: 120,
                    type: "service",
                },
            ],
            subtotal: 1020,
            taxAmount: 122.4,
            discountAmount: 50,
            totalAmount: 1092.4,
            paidAmount: 500,
            balanceAmount: 592.4,
            status: "sent",
            paymentStatus: "partial",
            createdAt: new Date("2024-01-20"),
            updatedAt: new Date("2024-01-22"),
        },
        {
            id: "inv-003",
            invoiceNumber: "INV-2024-003",
            customerId: "cust-003",
            customerName: "Mike Wilson",
            customerEmail: "mike.wilson@email.com",
            hotelId: "hotel-001",
            hotelName: "NeoCity Grand Hotel",
            bookingId: "book-003",
            issueDate: new Date("2024-01-25"),
            dueDate: new Date("2024-01-20"),
            items: [
                {
                    id: "item-006",
                    description: "Standard Room - 1 night",
                    quantity: 1,
                    unitPrice: 180,
                    totalPrice: 180,
                    type: "room",
                },
            ],
            subtotal: 180,
            taxAmount: 21.6,
            discountAmount: 0,
            totalAmount: 201.6,
            paidAmount: 0,
            balanceAmount: 201.6,
            status: "overdue",
            paymentStatus: "pending",
            createdAt: new Date("2024-01-25"),
            updatedAt: new Date("2024-01-25"),
        },
    ];

    const [invoices] = useState<Invoice[]>(mockInvoices);

    // Filter invoices based on search and status
    const filteredInvoices = invoices.filter((invoice) => {
        const matchesSearch =
            invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            invoice.hotelName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Calculate financial overview
    const totalInvoices = invoices.length;
    const totalAmount = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);
    const paidAmount = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
    const pendingAmount = invoices.reduce((sum, inv) => sum + inv.balanceAmount, 0);
    const overdueInvoices = invoices.filter((inv) => inv.status === "overdue").length;

    const getStatusBadge = (status: Invoice["status"]) => {
        const statusConfig = {
            draft: { color: "bg-gray-500", icon: FileText },
            sent: { color: "bg-blue-500", icon: Send },
            paid: { color: "bg-green-500", icon: CheckCircle },
            overdue: { color: "bg-red-500", icon: AlertCircle },
            cancelled: { color: "bg-gray-500", icon: X },
        };

        const config = statusConfig[status];
        const Icon = config.icon;

        return (
            <Badge className={`${config.color} text-white`}>
                <Icon className="h-3 w-3 mr-1" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    const getPaymentStatusBadge = (status: Invoice["paymentStatus"]) => {
        const statusConfig = {
            pending: { color: "bg-yellow-500", icon: Clock },
            partial: { color: "bg-orange-500", icon: AlertCircle },
            paid: { color: "bg-green-500", icon: CheckCircle },
            failed: { color: "bg-red-500", icon: X },
        };

        const config = statusConfig[status];
        const Icon = config.icon;

        return (
            <Badge className={`${config.color} text-white`}>
                <Icon className="h-3 w-3 mr-1" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    const handleViewInvoice = (invoice: Invoice) => {
        setSelectedInvoice(invoice);
        setIsViewDialogOpen(true);
    };

    const handleEditInvoice = (invoice: Invoice) => {
        setSelectedInvoice(invoice);
        setIsEditDialogOpen(true);
    };

    const handleExportInvoice = (invoice: Invoice, format: "pdf" | "excel") => {
        console.log(`Exporting invoice ${invoice.invoiceNumber} as ${format}`);
        // Implementation for export functionality
    };

    const handlePrintInvoice = (invoice: Invoice) => {
        console.log(`Printing invoice ${invoice.invoiceNumber}`);
        // Implementation for print functionality
    };

    const handleEmailInvoice = (invoice: Invoice) => {
        console.log(`Emailing invoice ${invoice.invoiceNumber}`);
        // Implementation for email functionality
    };

    const StatCard = ({
        title,
        value,
        description,
        icon: Icon,
        color,
    }: {
        title: string;
        value: string | number;
        description: string;
        icon: any;
        color: string;
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
                <p className="text-xs text-zinc-500">{description}</p>
            </CardContent>
        </Card>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 bg-black text-white"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Invoice Management</h1>
                    <p className="text-zinc-400">
                        Manage invoices, payments, and financial records
                    </p>
                </div>
                <Button className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Invoice
                </Button>
            </div>

            {/* Financial Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Invoices"
                    value={totalInvoices}
                    description="All time invoices"
                    icon={FileText}
                    color="text-cyan-400"
                />
                <StatCard
                    title="Total Amount"
                    value={`$${totalAmount.toLocaleString()}`}
                    description="Total invoiced amount"
                    icon={DollarSign}
                    color="text-green-400"
                />
                <StatCard
                    title="Paid Amount"
                    value={`$${paidAmount.toLocaleString()}`}
                    description="Successfully collected"
                    icon={CheckCircle}
                    color="text-blue-400"
                />
                <StatCard
                    title="Pending Amount"
                    value={`$${pendingAmount.toLocaleString()}`}
                    description={`${overdueInvoices} overdue invoices`}
                    icon={AlertCircle}
                    color="text-red-400"
                />
            </div>

            {/* Filters and Search */}
            <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-white">Invoice Management</CardTitle>
                    <CardDescription className="text-zinc-400">
                        Search, filter, and manage all invoices
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                                <Input
                                    placeholder="Search by invoice number, customer, or hotel..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                                />
                            </div>
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-48 bg-zinc-800 border-zinc-700 text-white">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="sent">Sent</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="overdue">Overdue</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Invoice Table */}
                    <div className="rounded-md border border-zinc-800">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-zinc-800">
                                    <TableHead className="text-zinc-300">Invoice #</TableHead>
                                    <TableHead className="text-zinc-300">Customer</TableHead>
                                    <TableHead className="text-zinc-300">Hotel</TableHead>
                                    <TableHead className="text-zinc-300">Issue Date</TableHead>
                                    <TableHead className="text-zinc-300">Due Date</TableHead>
                                    <TableHead className="text-zinc-300">Amount</TableHead>
                                    <TableHead className="text-zinc-300">Status</TableHead>
                                    <TableHead className="text-zinc-300">Payment</TableHead>
                                    <TableHead className="text-zinc-300">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredInvoices.map((invoice) => (
                                    <TableRow key={invoice.id} className="border-zinc-800">
                                        <TableCell className="font-medium text-white">
                                            {invoice.invoiceNumber}
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="text-white">{invoice.customerName}</div>
                                                <div className="text-sm text-zinc-400">
                                                    {invoice.customerEmail}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-zinc-300">
                                            {invoice.hotelName}
                                        </TableCell>
                                        <TableCell className="text-zinc-300">
                                            {invoice.issueDate.toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-zinc-300">
                                            {invoice.dueDate.toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="text-white font-medium">
                                                    ${invoice.totalAmount.toLocaleString()}
                                                </div>
                                                {invoice.balanceAmount > 0 && (
                                                    <div className="text-sm text-red-400">
                                                        Due: ${invoice.balanceAmount.toLocaleString()}
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                                        <TableCell>{getPaymentStatusBadge(invoice.paymentStatus)}</TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0 text-zinc-400 hover:text-white"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    align="end"
                                                    className="bg-zinc-800 border-zinc-700"
                                                >
                                                    <DropdownMenuLabel className="text-zinc-300">
                                                        Actions
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuItem
                                                        onClick={() => handleViewInvoice(invoice)}
                                                        className="text-zinc-300 hover:bg-zinc-700"
                                                    >
                                                        <Eye className="h-4 w-4 mr-2" />
                                                        View Invoice
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleEditInvoice(invoice)}
                                                        className="text-zinc-300 hover:bg-zinc-700"
                                                    >
                                                        <Edit className="h-4 w-4 mr-2" />
                                                        Edit Invoice
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="bg-zinc-700" />
                                                    <DropdownMenuItem
                                                        onClick={() => handlePrintInvoice(invoice)}
                                                        className="text-zinc-300 hover:bg-zinc-700"
                                                    >
                                                        <Printer className="h-4 w-4 mr-2" />
                                                        Print
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleEmailInvoice(invoice)}
                                                        className="text-zinc-300 hover:bg-zinc-700"
                                                    >
                                                        <Mail className="h-4 w-4 mr-2" />
                                                        Email
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleExportInvoice(invoice, "pdf")}
                                                        className="text-zinc-300 hover:bg-zinc-700"
                                                    >
                                                        <Download className="h-4 w-4 mr-2" />
                                                        Export PDF
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleExportInvoice(invoice, "excel")}
                                                        className="text-zinc-300 hover:bg-zinc-700"
                                                    >
                                                        <Download className="h-4 w-4 mr-2" />
                                                        Export Excel
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="bg-zinc-700" />
                                                    <DropdownMenuItem className="text-red-400 hover:bg-red-900/20">
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Delete
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

            {/* Invoice Viewer Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                <DialogContent className="max-w-4xl bg-zinc-900 border-zinc-800 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">
                            Invoice Details - {selectedInvoice?.invoiceNumber}
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Professional invoice layout with all details
                        </DialogDescription>
                    </DialogHeader>
                    {selectedInvoice && (
                        <div className="space-y-6">
                            {/* Invoice Header */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500">
                                        NEOCITY<span className="text-violet-500">STAYS</span>
                                    </h2>
                                    <p className="text-zinc-400 mt-1">Hotel Booking Platform</p>
                                </div>
                                <div className="text-right">
                                    <h3 className="text-xl font-bold text-white">
                                        {selectedInvoice.invoiceNumber}
                                    </h3>
                                    <p className="text-zinc-400">
                                        Issue Date: {selectedInvoice.issueDate.toLocaleDateString()}
                                    </p>
                                    <p className="text-zinc-400">
                                        Due Date: {selectedInvoice.dueDate.toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <Separator className="bg-zinc-700" />

                            {/* Customer and Hotel Info */}
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-semibold text-white mb-2">Bill To:</h4>
                                    <div className="text-zinc-300">
                                        <p className="font-medium">{selectedInvoice.customerName}</p>
                                        <p>{selectedInvoice.customerEmail}</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-white mb-2">Hotel:</h4>
                                    <div className="text-zinc-300">
                                        <p className="font-medium">{selectedInvoice.hotelName}</p>
                                        <p>Booking ID: {selectedInvoice.bookingId}</p>
                                    </div>
                                </div>
                            </div>

                            <Separator className="bg-zinc-700" />

                            {/* Invoice Items */}
                            <div>
                                <h4 className="font-semibold text-white mb-4">Invoice Items</h4>
                                <div className="rounded-md border border-zinc-700">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-zinc-700">
                                                <TableHead className="text-zinc-300">Description</TableHead>
                                                <TableHead className="text-zinc-300">Qty</TableHead>
                                                <TableHead className="text-zinc-300">Unit Price</TableHead>
                                                <TableHead className="text-zinc-300">Total</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {selectedInvoice.items.map((item) => (
                                                <TableRow key={item.id} className="border-zinc-700">
                                                    <TableCell className="text-white">
                                                        {item.description}
                                                    </TableCell>
                                                    <TableCell className="text-zinc-300">
                                                        {item.quantity}
                                                    </TableCell>
                                                    <TableCell className="text-zinc-300">
                                                        ${item.unitPrice.toFixed(2)}
                                                    </TableCell>
                                                    <TableCell className="text-white font-medium">
                                                        ${item.totalPrice.toFixed(2)}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>

                            {/* Invoice Totals */}
                            <div className="flex justify-end">
                                <div className="w-80 space-y-2">
                                    <div className="flex justify-between text-zinc-300">
                                        <span>Subtotal:</span>
                                        <span>${selectedInvoice.subtotal.toFixed(2)}</span>
                                    </div>
                                    {selectedInvoice.discountAmount > 0 && (
                                        <div className="flex justify-between text-green-400">
                                            <span>Discount:</span>
                                            <span>-${selectedInvoice.discountAmount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-zinc-300">
                                        <span>Tax:</span>
                                        <span>${selectedInvoice.taxAmount.toFixed(2)}</span>
                                    </div>
                                    <Separator className="bg-zinc-700" />
                                    <div className="flex justify-between text-white font-bold text-lg">
                                        <span>Total:</span>
                                        <span>${selectedInvoice.totalAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-green-400">
                                        <span>Paid:</span>
                                        <span>${selectedInvoice.paidAmount.toFixed(2)}</span>
                                    </div>
                                    {selectedInvoice.balanceAmount > 0 && (
                                        <div className="flex justify-between text-red-400 font-medium">
                                            <span>Balance Due:</span>
                                            <span>${selectedInvoice.balanceAmount.toFixed(2)}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Payment Information */}
                            {selectedInvoice.paymentMethod && (
                                <div>
                                    <h4 className="font-semibold text-white mb-2">Payment Information</h4>
                                    <div className="bg-zinc-800/50 p-4 rounded-lg">
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-zinc-400">Payment Method:</span>
                                                <span className="text-white ml-2">{selectedInvoice.paymentMethod}</span>
                                            </div>
                                            {selectedInvoice.paymentDate && (
                                                <div>
                                                    <span className="text-zinc-400">Payment Date:</span>
                                                    <span className="text-white ml-2">
                                                        {selectedInvoice.paymentDate.toLocaleDateString()}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Notes */}
                            {selectedInvoice.notes && (
                                <div>
                                    <h4 className="font-semibold text-white mb-2">Notes</h4>
                                    <div className="bg-zinc-800/50 p-4 rounded-lg">
                                        <p className="text-zinc-300">{selectedInvoice.notes}</p>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 pt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => handlePrintInvoice(selectedInvoice)}
                                    className="border-zinc-700 hover:bg-zinc-800"
                                >
                                    <Printer className="h-4 w-4 mr-2" />
                                    Print
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => handleEmailInvoice(selectedInvoice)}
                                    className="border-zinc-700 hover:bg-zinc-800"
                                >
                                    <Mail className="h-4 w-4 mr-2" />
                                    Email
                                </Button>
                                <Button
                                    onClick={() => handleExportInvoice(selectedInvoice, "pdf")}
                                    className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600"
                                >
                                    <Download className="h-4 w-4 mr-2" />
                                    Export PDF
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Edit Invoice Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="max-w-2xl bg-zinc-900 border-zinc-800 text-white">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">
                            Edit Invoice - {selectedInvoice?.invoiceNumber}
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Update invoice details and payment information
                        </DialogDescription>
                    </DialogHeader>
                    {selectedInvoice && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-zinc-300 mb-2 block">
                                        Status
                                    </label>
                                    <Select defaultValue={selectedInvoice.status}>
                                        <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-zinc-800 border-zinc-700">
                                            <SelectItem value="draft">Draft</SelectItem>
                                            <SelectItem value="sent">Sent</SelectItem>
                                            <SelectItem value="paid">Paid</SelectItem>
                                            <SelectItem value="overdue">Overdue</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-zinc-300 mb-2 block">
                                        Payment Status
                                    </label>
                                    <Select defaultValue={selectedInvoice.paymentStatus}>
                                        <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-zinc-800 border-zinc-700">
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="partial">Partial</SelectItem>
                                            <SelectItem value="paid">Paid</SelectItem>
                                            <SelectItem value="failed">Failed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-zinc-300 mb-2 block">
                                    Notes
                                </label>
                                <Textarea
                                    placeholder="Add notes about this invoice..."
                                    defaultValue={selectedInvoice.notes}
                                    className="bg-zinc-800 border-zinc-700 text-white"
                                    rows={3}
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsEditDialogOpen(false)}
                                    className="border-zinc-700 hover:bg-zinc-800"
                                >
                                    Cancel
                                </Button>
                                <Button className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600">
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </motion.div>
    );
};

export default InvoicesManagement;
