import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    Calendar,
    Percent,
    DollarSign,
    Tag,
    Copy,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import type { Coupon } from "@/types/admin";

const CouponManagement = () => {
    const [coupons, setCoupons] = useState<Coupon[]>([
        {
            id: "1",
            code: "WELCOME20",
            name: "Welcome Discount",
            description: "20% off for new customers",
            discountType: "percentage",
            discountValue: 20,
            minOrderValue: 100,
            maxDiscountAmount: 50,
            usageLimit: 1000,
            usedCount: 245,
            validFrom: new Date("2024-01-01"),
            validUntil: new Date("2024-12-31"),
            applicableOn: "all",
            isActive: true,
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-15"),
        },
        {
            id: "2",
            code: "SUMMER50",
            name: "Summer Special",
            description: "$50 off on bookings above $300",
            discountType: "fixed",
            discountValue: 50,
            minOrderValue: 300,
            usageLimit: 500,
            usedCount: 123,
            validFrom: new Date("2024-06-01"),
            validUntil: new Date("2024-08-31"),
            applicableOn: "room",
            isActive: true,
            createdAt: new Date("2024-05-15"),
            updatedAt: new Date("2024-06-01"),
        },
        {
            id: "3",
            code: "FOOD15",
            name: "Food & Dining",
            description: "15% off on food orders",
            discountType: "percentage",
            discountValue: 15,
            minOrderValue: 50,
            maxDiscountAmount: 25,
            usageLimit: 200,
            usedCount: 89,
            validFrom: new Date("2024-03-01"),
            validUntil: new Date("2024-05-31"),
            applicableOn: "food",
            isActive: false,
            createdAt: new Date("2024-02-15"),
            updatedAt: new Date("2024-03-01"),
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
    const [formData, setFormData] = useState({
        code: "",
        name: "",
        description: "",
        discountType: "percentage" as "percentage" | "fixed",
        discountValue: 0,
        minOrderValue: 0,
        maxDiscountAmount: 0,
        usageLimit: 0,
        validFrom: "",
        validUntil: "",
        applicableOn: "all" as "room" | "service" | "food" | "all",
        isActive: true,
    });

    const filteredCoupons = coupons.filter(
        (coupon) =>
            coupon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coupon.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingCoupon) {
            setCoupons(coupons.map(coupon =>
                coupon.id === editingCoupon.id
                    ? {
                        ...coupon,
                        ...formData,
                        validFrom: new Date(formData.validFrom),
                        validUntil: new Date(formData.validUntil),
                        updatedAt: new Date(),
                    }
                    : coupon
            ));
        } else {
            const newCoupon: Coupon = {
                id: Date.now().toString(),
                ...formData,
                usedCount: 0,
                validFrom: new Date(formData.validFrom),
                validUntil: new Date(formData.validUntil),
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            setCoupons([...coupons, newCoupon]);
        }

        resetForm();
    };

    const resetForm = () => {
        setFormData({
            code: "",
            name: "",
            description: "",
            discountType: "percentage",
            discountValue: 0,
            minOrderValue: 0,
            maxDiscountAmount: 0,
            usageLimit: 0,
            validFrom: "",
            validUntil: "",
            applicableOn: "all",
            isActive: true,
        });
        setEditingCoupon(null);
        setIsDialogOpen(false);
    };

    const handleEdit = (coupon: Coupon) => {
        setEditingCoupon(coupon);
        setFormData({
            code: coupon.code,
            name: coupon.name,
            description: coupon.description,
            discountType: coupon.discountType,
            discountValue: coupon.discountValue,
            minOrderValue: coupon.minOrderValue,
            maxDiscountAmount: coupon.maxDiscountAmount || 0,
            usageLimit: coupon.usageLimit,
            validFrom: coupon.validFrom.toISOString().split('T')[0],
            validUntil: coupon.validUntil.toISOString().split('T')[0],
            applicableOn: coupon.applicableOn,
            isActive: coupon.isActive,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        setCoupons(coupons.filter(coupon => coupon.id !== id));
    };

    const toggleStatus = (id: string) => {
        setCoupons(coupons.map(coupon =>
            coupon.id === id
                ? { ...coupon, isActive: !coupon.isActive, updatedAt: new Date() }
                : coupon
        ));
    };

    const copyCode = (code: string) => {
        navigator.clipboard.writeText(code);
    };

    const getStatusBadge = (coupon: Coupon) => {
        const now = new Date();
        if (!coupon.isActive) {
            return <Badge variant="secondary">Inactive</Badge>;
        }
        if (now < coupon.validFrom) {
            return <Badge variant="outline">Scheduled</Badge>;
        }
        if (now > coupon.validUntil) {
            return <Badge variant="destructive">Expired</Badge>;
        }
        if (coupon.usedCount >= coupon.usageLimit) {
            return <Badge variant="destructive">Limit Reached</Badge>;
        }
        return <Badge variant="default" className="bg-green-600">Active</Badge>;
    };

    const getUsagePercentage = (used: number, limit: number) => {
        return Math.round((used / limit) * 100);
    };

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
            >
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Coupon Management</h1>
                        <p className="text-zinc-400">
                            Create and manage discount coupons for your hotel
                        </p>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Coupon
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingCoupon ? "Edit Coupon" : "Add New Coupon"}
                                </DialogTitle>
                                <DialogDescription className="text-zinc-400">
                                    {editingCoupon
                                        ? "Update the coupon details below."
                                        : "Create a new discount coupon for your customers."}
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="code">Coupon Code</Label>
                                        <Input
                                            id="code"
                                            value={formData.code}
                                            onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                            placeholder="WELCOME20"
                                            className="bg-zinc-800 border-zinc-700"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Coupon Name</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Welcome Discount"
                                            className="bg-zinc-800 border-zinc-700"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Describe the coupon offer..."
                                        className="bg-zinc-800 border-zinc-700"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="discountType">Discount Type</Label>
                                        <Select
                                            value={formData.discountType}
                                            onValueChange={(value: "percentage" | "fixed") =>
                                                setFormData({ ...formData, discountType: value })
                                            }
                                        >
                                            <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-800 border-zinc-700">
                                                <SelectItem value="percentage">Percentage (%)</SelectItem>
                                                <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="discountValue">
                                            Discount Value {formData.discountType === "percentage" ? "(%)" : "($)"}
                                        </Label>
                                        <Input
                                            id="discountValue"
                                            type="number"
                                            value={formData.discountValue}
                                            onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                                            placeholder={formData.discountType === "percentage" ? "20" : "50"}
                                            className="bg-zinc-800 border-zinc-700"
                                            required
                                            min="0"
                                            max={formData.discountType === "percentage" ? "100" : undefined}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="minOrderValue">Minimum Order Value ($)</Label>
                                        <Input
                                            id="minOrderValue"
                                            type="number"
                                            value={formData.minOrderValue}
                                            onChange={(e) => setFormData({ ...formData, minOrderValue: Number(e.target.value) })}
                                            placeholder="100"
                                            className="bg-zinc-800 border-zinc-700"
                                            required
                                            min="0"
                                        />
                                    </div>
                                    {formData.discountType === "percentage" && (
                                        <div className="space-y-2">
                                            <Label htmlFor="maxDiscountAmount">Max Discount Amount ($)</Label>
                                            <Input
                                                id="maxDiscountAmount"
                                                type="number"
                                                value={formData.maxDiscountAmount}
                                                onChange={(e) => setFormData({ ...formData, maxDiscountAmount: Number(e.target.value) })}
                                                placeholder="50"
                                                className="bg-zinc-800 border-zinc-700"
                                                min="0"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="usageLimit">Usage Limit</Label>
                                        <Input
                                            id="usageLimit"
                                            type="number"
                                            value={formData.usageLimit}
                                            onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                                            placeholder="1000"
                                            className="bg-zinc-800 border-zinc-700"
                                            required
                                            min="1"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="applicableOn">Applicable On</Label>
                                        <Select
                                            value={formData.applicableOn}
                                            onValueChange={(value: "room" | "service" | "food" | "all") =>
                                                setFormData({ ...formData, applicableOn: value })
                                            }
                                        >
                                            <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-800 border-zinc-700">
                                                <SelectItem value="all">All Services</SelectItem>
                                                <SelectItem value="room">Room Bookings</SelectItem>
                                                <SelectItem value="service">Services</SelectItem>
                                                <SelectItem value="food">Food & Dining</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="validFrom">Valid From</Label>
                                        <Input
                                            id="validFrom"
                                            type="date"
                                            value={formData.validFrom}
                                            onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                                            className="bg-zinc-800 border-zinc-700"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="validUntil">Valid Until</Label>
                                        <Input
                                            id="validUntil"
                                            type="date"
                                            value={formData.validUntil}
                                            onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                                            className="bg-zinc-800 border-zinc-700"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="isActive"
                                        checked={formData.isActive}
                                        onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                                    />
                                    <Label htmlFor="isActive">Active</Label>
                                </div>

                                <DialogFooter>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={resetForm}
                                        className="border-zinc-700 hover:bg-zinc-800"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600"
                                    >
                                        {editingCoupon ? "Update Coupon" : "Create Coupon"}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Search */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardContent className="p-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                            <Input
                                placeholder="Search coupons by name, code, or description..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-zinc-800 border-zinc-700"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Coupons Table */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">Coupons ({filteredCoupons.length})</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Manage your discount coupons and promotional offers
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="border-zinc-800">
                                    <TableHead className="text-zinc-300">Code</TableHead>
                                    <TableHead className="text-zinc-300">Name</TableHead>
                                    <TableHead className="text-zinc-300">Discount</TableHead>
                                    <TableHead className="text-zinc-300">Usage</TableHead>
                                    <TableHead className="text-zinc-300">Valid Period</TableHead>
                                    <TableHead className="text-zinc-300">Status</TableHead>
                                    <TableHead className="text-zinc-300">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredCoupons.map((coupon) => (
                                    <TableRow key={coupon.id} className="border-zinc-800">
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <code className="bg-zinc-800 px-2 py-1 rounded text-cyan-400 font-mono text-sm">
                                                    {coupon.code}
                                                </code>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => copyCode(coupon.code)}
                                                    className="h-6 w-6 p-0 text-zinc-400 hover:text-white"
                                                >
                                                    <Copy className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium text-white">{coupon.name}</div>
                                                <div className="text-sm text-zinc-400 truncate max-w-xs">
                                                    {coupon.description}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                {coupon.discountType === "percentage" ? (
                                                    <Percent className="h-3 w-3 text-green-400" />
                                                ) : (
                                                    <DollarSign className="h-3 w-3 text-green-400" />
                                                )}
                                                <span className="text-green-400 font-medium">
                                                    {coupon.discountValue}{coupon.discountType === "percentage" ? "%" : ""}
                                                </span>
                                            </div>
                                            <div className="text-xs text-zinc-500">
                                                Min: ${coupon.minOrderValue}
                                                {coupon.maxDiscountAmount && (
                                                    <>, Max: ${coupon.maxDiscountAmount}</>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <div className="text-sm">
                                                    {coupon.usedCount} / {coupon.usageLimit}
                                                </div>
                                                <div className="w-full bg-zinc-800 rounded-full h-1.5">
                                                    <div
                                                        className="bg-gradient-to-r from-violet-500 to-cyan-500 h-1.5 rounded-full"
                                                        style={{
                                                            width: `${Math.min(getUsagePercentage(coupon.usedCount, coupon.usageLimit), 100)}%`,
                                                        }}
                                                    />
                                                </div>
                                                <div className="text-xs text-zinc-500">
                                                    {getUsagePercentage(coupon.usedCount, coupon.usageLimit)}% used
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                <div className="flex items-center gap-1 text-zinc-300">
                                                    <Calendar className="h-3 w-3" />
                                                    {coupon.validFrom.toLocaleDateString()}
                                                </div>
                                                <div className="text-zinc-500">to</div>
                                                <div className="flex items-center gap-1 text-zinc-300">
                                                    <Calendar className="h-3 w-3" />
                                                    {coupon.validUntil.toLocaleDateString()}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-2">
                                                {getStatusBadge(coupon)}
                                                <div className="flex items-center gap-1">
                                                    <Tag className="h-3 w-3 text-zinc-500" />
                                                    <span className="text-xs text-zinc-500 capitalize">
                                                        {coupon.applicableOn}
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => toggleStatus(coupon.id)}
                                                    className="h-8 w-8 p-0 text-zinc-400 hover:text-white"
                                                >
                                                    {coupon.isActive ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEdit(coupon)}
                                                    className="h-8 w-8 p-0 text-zinc-400 hover:text-white"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(coupon.id)}
                                                    className="h-8 w-8 p-0 text-zinc-400 hover:text-red-400"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default CouponManagement;