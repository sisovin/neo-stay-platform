import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    CreditCard,
    Search,
    Filter,
    Edit,
    Eye,
    RefreshCw,
    Download,
    Calendar,
    DollarSign,
    CheckCircle,
    XCircle,
    Clock,
    AlertCircle,
    RotateCcw,
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
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { PaymentTransaction } from "@/types/admin";

const PaymentTransactions = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [paymentMethodFilter, setPaymentMethodFilter] = useState("all");
    const [selectedTransaction, setSelectedTransaction] = useState<PaymentTransaction | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

    // Mock data
    const [transactions, setTransactions] = useState<PaymentTransaction[]>([
        {
            id: "txn_001",
            bookingId: "book_001",
            customerId: "cust_001",
            customerName: "John Doe",
            amount: 299.99,
            currency: "USD",
            paymentMethod: "credit_card",
            status: "completed",
            transactionType: "payment",
            paymentGateway: "Stripe",
            transactionId: "pi_1234567890",
            description: "Hotel booking payment - Deluxe Suite",
            fees: 8.99,
            netAmount: 291.00,
            processedAt: new Date("2024-01-15T10:30:00Z"),
            createdAt: new Date("2024-01-15T10:25:00Z"),
            updatedAt: new Date("2024-01-15T10:30:00Z"),
        },
        {
            id: "txn_002",
            bookingId: "book_002",
            customerId: "cust_002",
            customerName: "Jane Smith",
            amount: 450.00,
            currency: "USD",
            paymentMethod: "paypal",
            status: "pending",
            transactionType: "payment",
            paymentGateway: "PayPal",
            transactionId: "pp_9876543210",
            description: "Hotel booking payment - Presidential Suite",
            fees: 13.50,
            netAmount: 436.50,
            createdAt: new Date("2024-01-16T14:20:00Z"),
            updatedAt: new Date("2024-01-16T14:20:00Z"),
        },
        {
            id: "txn_003",
            bookingId: "book_003",
            customerId: "cust_003",
            customerName: "Mike Johnson",
            amount: 180.00,
            currency: "USD",
            paymentMethod: "debit_card",
            status: "failed",
            transactionType: "payment",
            paymentGateway: "Stripe",
            transactionId: "pi_0987654321",
            description: "Hotel booking payment - Standard Room",
            fees: 5.40,
            netAmount: 174.60,
            failureReason: "Insufficient funds",
            createdAt: new Date("2024-01-17T09:15:00Z"),
            updatedAt: new Date("2024-01-17T09:16:00Z"),
        },
        {
            id: "txn_004",
            bookingId: "book_004",
            customerId: "cust_004",
            customerName: "Sarah Wilson",
            amount: 75.00,
            currency: "USD",
            paymentMethod: "credit_card",
            status: "refunded",
            transactionType: "refund",
            paymentGateway: "Stripe",
            transactionId: "re_1122334455",
            description: "Refund for cancelled booking",
            fees: 0,
            netAmount: 75.00,
            refundedAt: new Date("2024-01-18T16:45:00Z"),
            createdAt: new Date("2024-01-18T16:40:00Z"),
            updatedAt: new Date("2024-01-18T16:45:00Z"),
        },
    ]);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "completed":
                return <CheckCircle className="h-4 w-4 text-green-400" />;
            case "pending":
                return <Clock className="h-4 w-4 text-yellow-400" />;
            case "failed":
                return <XCircle className="h-4 w-4 text-red-400" />;
            case "refunded":
                return <RotateCcw className="h-4 w-4 text-blue-400" />;
            case "cancelled":
                return <AlertCircle className="h-4 w-4 text-gray-400" />;
            default:
                return <Clock className="h-4 w-4 text-gray-400" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "bg-green-900/30 text-green-300 border-green-800/50";
            case "pending":
                return "bg-yellow-900/30 text-yellow-300 border-yellow-800/50";
            case "failed":
                return "bg-red-900/30 text-red-300 border-red-800/50";
            case "refunded":
                return "bg-blue-900/30 text-blue-300 border-blue-800/50";
            case "cancelled":
                return "bg-gray-900/30 text-gray-300 border-gray-800/50";
            default:
                return "bg-gray-900/30 text-gray-300 border-gray-800/50";
        }
    };

    const filteredTransactions = transactions.filter((transaction) => {
        const matchesSearch =
            transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.bookingId.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
        const matchesPaymentMethod = paymentMethodFilter === "all" || transaction.paymentMethod === paymentMethodFilter;

        return matchesSearch && matchesStatus && matchesPaymentMethod;
    });

    const handleStatusChange = (transactionId: string, newStatus: string) => {
        setTransactions(prev =>
            prev.map(transaction =>
                transaction.id === transactionId
                    ? { ...transaction, status: newStatus as any, updatedAt: new Date() }
                    : transaction
            )
        );
    };

    const handleEditTransaction = (transaction: PaymentTransaction) => {
        setSelectedTransaction(transaction);
        setIsEditDialogOpen(true);
    };

    const handleViewTransaction = (transaction: PaymentTransaction) => {
        setSelectedTransaction(transaction);
        setIsViewDialogOpen(true);
    };

    const totalTransactions = transactions.length;
    const completedTransactions = transactions.filter(t => t.status === "completed").length;
    const pendingTransactions = transactions.filter(t => t.status === "pending").length;
    const totalRevenue = transactions
        .filter(t => t.status === "completed" && t.transactionType === "payment")
        .reduce((sum, t) => sum + t.netAmount, 0);

    return (
        <div className="bg-black text-white min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Payment Transactions</h1>
                        <p className="text-zinc-400">
                            Manage all payment transactions and their status
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            className="border-zinc-700 hover:bg-zinc-800"
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                        <Button className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refresh
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-300">
                                Total Transactions
                            </CardTitle>
                            <CreditCard className="h-4 w-4 text-cyan-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{totalTransactions}</div>
                            <p className="text-xs text-zinc-500">All time</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-300">
                                Completed
                            </CardTitle>
                            <CheckCircle className="h-4 w-4 text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{completedTransactions}</div>
                            <p className="text-xs text-zinc-500">Successful payments</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-300">
                                Pending
                            </CardTitle>
                            <Clock className="h-4 w-4 text-yellow-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{pendingTransactions}</div>
                            <p className="text-xs text-zinc-500">Awaiting processing</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-300">
                                Total Revenue
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">${totalRevenue.toFixed(2)}</div>
                            <p className="text-xs text-zinc-500">Net amount</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Filters
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                                    <Input
                                        placeholder="Search by customer, transaction ID, or booking ID..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                                    />
                                </div>
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-48 bg-zinc-800 border-zinc-700">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-800 border-zinc-700">
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="failed">Failed</SelectItem>
                                    <SelectItem value="refunded">Refunded</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
                                <SelectTrigger className="w-48 bg-zinc-800 border-zinc-700">
                                    <SelectValue placeholder="Filter by method" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-800 border-zinc-700">
                                    <SelectItem value="all">All Methods</SelectItem>
                                    <SelectItem value="credit_card">Credit Card</SelectItem>
                                    <SelectItem value="debit_card">Debit Card</SelectItem>
                                    <SelectItem value="paypal">PayPal</SelectItem>
                                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                    <SelectItem value="cash">Cash</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Transactions Table */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">Transactions</CardTitle>
                        <CardDescription className="text-zinc-400">
                            {filteredTransactions.length} transactions found
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-zinc-800">
                                        <TableHead className="text-zinc-300">Transaction ID</TableHead>
                                        <TableHead className="text-zinc-300">Customer</TableHead>
                                        <TableHead className="text-zinc-300">Amount</TableHead>
                                        <TableHead className="text-zinc-300">Method</TableHead>
                                        <TableHead className="text-zinc-300">Status</TableHead>
                                        <TableHead className="text-zinc-300">Date</TableHead>
                                        <TableHead className="text-zinc-300">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredTransactions.map((transaction) => (
                                        <TableRow key={transaction.id} className="border-zinc-800">
                                            <TableCell className="text-white font-mono text-sm">
                                                {transaction.transactionId}
                                            </TableCell>
                                            <TableCell className="text-white">
                                                <div>
                                                    <div className="font-medium">{transaction.customerName}</div>
                                                    <div className="text-sm text-zinc-400">{transaction.bookingId}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-white">
                                                <div>
                                                    <div className="font-medium">${transaction.amount.toFixed(2)}</div>
                                                    <div className="text-sm text-zinc-400">Net: ${transaction.netAmount.toFixed(2)}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-white">
                                                <div className="capitalize">
                                                    {transaction.paymentMethod.replace('_', ' ')}
                                                </div>
                                                <div className="text-sm text-zinc-400">{transaction.paymentGateway}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={`${getStatusColor(transaction.status)} flex items-center gap-1 w-fit`}>
                                                    {getStatusIcon(transaction.status)}
                                                    <span className="capitalize">{transaction.status}</span>
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-zinc-300">
                                                {transaction.createdAt.toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleViewTransaction(transaction)}
                                                        className="text-zinc-400 hover:text-white"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEditTransaction(transaction)}
                                                        className="text-zinc-400 hover:text-white"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* View Transaction Dialog */}
                <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
                    <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Transaction Details</DialogTitle>
                            <DialogDescription className="text-zinc-400">
                                View complete transaction information
                            </DialogDescription>
                        </DialogHeader>
                        {selectedTransaction && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-zinc-300">Transaction ID</Label>
                                        <p className="font-mono text-sm">{selectedTransaction.transactionId}</p>
                                    </div>
                                    <div>
                                        <Label className="text-zinc-300">Booking ID</Label>
                                        <p className="font-mono text-sm">{selectedTransaction.bookingId}</p>
                                    </div>
                                    <div>
                                        <Label className="text-zinc-300">Customer</Label>
                                        <p>{selectedTransaction.customerName}</p>
                                    </div>
                                    <div>
                                        <Label className="text-zinc-300">Status</Label>
                                        <Badge className={`${getStatusColor(selectedTransaction.status)} flex items-center gap-1 w-fit mt-1`}>
                                            {getStatusIcon(selectedTransaction.status)}
                                            <span className="capitalize">{selectedTransaction.status}</span>
                                        </Badge>
                                    </div>
                                    <div>
                                        <Label className="text-zinc-300">Amount</Label>
                                        <p>${selectedTransaction.amount.toFixed(2)} {selectedTransaction.currency}</p>
                                    </div>
                                    <div>
                                        <Label className="text-zinc-300">Fees</Label>
                                        <p>${selectedTransaction.fees.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <Label className="text-zinc-300">Net Amount</Label>
                                        <p className="font-semibold">${selectedTransaction.netAmount.toFixed(2)}</p>
                                    </div>
                                    <div>
                                        <Label className="text-zinc-300">Payment Method</Label>
                                        <p className="capitalize">{selectedTransaction.paymentMethod.replace('_', ' ')}</p>
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-zinc-300">Description</Label>
                                    <p className="text-sm">{selectedTransaction.description}</p>
                                </div>
                                {selectedTransaction.failureReason && (
                                    <div>
                                        <Label className="text-zinc-300">Failure Reason</Label>
                                        <p className="text-sm text-red-400">{selectedTransaction.failureReason}</p>
                                    </div>
                                )}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label className="text-zinc-300">Created At</Label>
                                        <p className="text-sm">{selectedTransaction.createdAt.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <Label className="text-zinc-300">Updated At</Label>
                                        <p className="text-sm">{selectedTransaction.updatedAt.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>

                {/* Edit Transaction Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
                        <DialogHeader>
                            <DialogTitle>Edit Transaction</DialogTitle>
                            <DialogDescription className="text-zinc-400">
                                Update transaction status and details
                            </DialogDescription>
                        </DialogHeader>
                        {selectedTransaction && (
                            <div className="space-y-4">
                                <div>
                                    <Label className="text-zinc-300">Transaction ID</Label>
                                    <p className="font-mono text-sm text-zinc-400">{selectedTransaction.transactionId}</p>
                                </div>
                                <div>
                                    <Label className="text-zinc-300">Customer</Label>
                                    <p className="text-zinc-400">{selectedTransaction.customerName}</p>
                                </div>
                                <div>
                                    <Label htmlFor="status" className="text-zinc-300">Status</Label>
                                    <Select
                                        value={selectedTransaction.status}
                                        onValueChange={(value) => {
                                            setSelectedTransaction(prev => prev ? { ...prev, status: value as any } : null);
                                        }}
                                    >
                                        <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-zinc-800 border-zinc-700">
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                            <SelectItem value="failed">Failed</SelectItem>
                                            <SelectItem value="refunded">Refunded</SelectItem>
                                            <SelectItem value="cancelled">Cancelled</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="description" className="text-zinc-300">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={selectedTransaction.description}
                                        onChange={(e) => {
                                            setSelectedTransaction(prev => prev ? { ...prev, description: e.target.value } : null);
                                        }}
                                        className="bg-zinc-800 border-zinc-700 text-white"
                                        rows={3}
                                    />
                                </div>
                                {selectedTransaction.status === "failed" && (
                                    <div>
                                        <Label htmlFor="failureReason" className="text-zinc-300">Failure Reason</Label>
                                        <Input
                                            id="failureReason"
                                            value={selectedTransaction.failureReason || ""}
                                            onChange={(e) => {
                                                setSelectedTransaction(prev => prev ? { ...prev, failureReason: e.target.value } : null);
                                            }}
                                            className="bg-zinc-800 border-zinc-700 text-white"
                                            placeholder="Enter failure reason..."
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsEditDialogOpen(false)}
                                className="border-zinc-700 hover:bg-zinc-800"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    if (selectedTransaction) {
                                        handleStatusChange(selectedTransaction.id, selectedTransaction.status);
                                        setIsEditDialogOpen(false);
                                    }
                                }}
                                className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600"
                            >
                                Save Changes
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </motion.div>
        </div>
    );
};

export default PaymentTransactions;