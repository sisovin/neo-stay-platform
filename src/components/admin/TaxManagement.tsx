import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    EyeOff,
    Receipt,
    MapPin,
    Globe,
    Percent,
    DollarSign,
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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import type { Tax } from "@/types/admin";

const TaxManagement = () => {
    const [taxes, setTaxes] = useState<Tax[]>([
        {
            id: "1",
            name: "VAT",
            description: "Value Added Tax",
            rate: 18,
            type: "percentage",
            applicableOn: "all",
            country: "India",
            state: "Maharashtra",
            city: "Mumbai",
            isActive: true,
            createdAt: new Date("2024-01-15"),
            updatedAt: new Date("2024-01-15"),
        },
        {
            id: "2",
            name: "Service Tax",
            description: "Tax on services",
            rate: 12,
            type: "percentage",
            applicableOn: "service",
            country: "India",
            isActive: true,
            createdAt: new Date("2024-01-10"),
            updatedAt: new Date("2024-01-10"),
        },
        {
            id: "3",
            name: "City Tax",
            description: "Municipal tax for accommodation",
            rate: 50,
            type: "fixed",
            applicableOn: "room",
            country: "India",
            state: "Karnataka",
            city: "Bangalore",
            isActive: true,
            createdAt: new Date("2024-01-05"),
            updatedAt: new Date("2024-01-05"),
        },
        {
            id: "4",
            name: "Food Tax",
            description: "Tax on food and beverages",
            rate: 5,
            type: "percentage",
            applicableOn: "food",
            country: "India",
            isActive: false,
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-01"),
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingTax, setEditingTax] = useState<Tax | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        rate: 0,
        type: "percentage" as "percentage" | "fixed",
        applicableOn: "all" as "room" | "service" | "food" | "all",
        country: "",
        state: "",
        city: "",
        isActive: true,
    });

    const filteredTaxes = taxes.filter(
        (tax) =>
            tax.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tax.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tax.country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddTax = () => {
        setEditingTax(null);
        setFormData({
            name: "",
            description: "",
            rate: 0,
            type: "percentage",
            applicableOn: "all",
            country: "",
            state: "",
            city: "",
            isActive: true,
        });
        setIsDialogOpen(true);
    };

    const handleEditTax = (tax: Tax) => {
        setEditingTax(tax);
        setFormData({
            name: tax.name,
            description: tax.description,
            rate: tax.rate,
            type: tax.type,
            applicableOn: tax.applicableOn,
            country: tax.country,
            state: tax.state || "",
            city: tax.city || "",
            isActive: tax.isActive,
        });
        setIsDialogOpen(true);
    };

    const handleSaveTax = () => {
        if (editingTax) {
            setTaxes(
                taxes.map((tax) =>
                    tax.id === editingTax.id
                        ? {
                            ...tax,
                            ...formData,
                            updatedAt: new Date(),
                        }
                        : tax
                )
            );
        } else {
            const newTax: Tax = {
                id: Date.now().toString(),
                ...formData,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            setTaxes([...taxes, newTax]);
        }
        setIsDialogOpen(false);
    };

    const handleDeleteTax = (id: string) => {
        setTaxes(taxes.filter((tax) => tax.id !== id));
    };

    const toggleTaxStatus = (id: string) => {
        setTaxes(
            taxes.map((tax) =>
                tax.id === id
                    ? { ...tax, isActive: !tax.isActive, updatedAt: new Date() }
                    : tax
            )
        );
    };

    const getApplicableOnIcon = (applicableOn: string) => {
        switch (applicableOn) {
            case "room":
                return <Receipt className="h-4 w-4" />;
            case "service":
                return <Receipt className="h-4 w-4" />;
            case "food":
                return <Receipt className="h-4 w-4" />;
            default:
                return <Receipt className="h-4 w-4" />;
        }
    };

    const getApplicableOnColor = (applicableOn: string) => {
        switch (applicableOn) {
            case "room":
                return "bg-blue-900/30 text-blue-300 border-blue-800";
            case "service":
                return "bg-green-900/30 text-green-300 border-green-800";
            case "food":
                return "bg-orange-900/30 text-orange-300 border-orange-800";
            default:
                return "bg-purple-900/30 text-purple-300 border-purple-800";
        }
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
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Tax Management</h1>
                        <p className="text-zinc-400">
                            Manage tax rates and configurations for different regions and services
                        </p>
                    </div>
                    <Button
                        onClick={handleAddTax}
                        className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Tax
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-300">
                                Total Taxes
                            </CardTitle>
                            <Receipt className="h-4 w-4 text-cyan-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{taxes.length}</div>
                            <p className="text-xs text-zinc-500">Configured tax rates</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-300">
                                Active Taxes
                            </CardTitle>
                            <Eye className="h-4 w-4 text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">
                                {taxes.filter((tax) => tax.isActive).length}
                            </div>
                            <p className="text-xs text-zinc-500">Currently active</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-300">
                                Percentage Taxes
                            </CardTitle>
                            <Percent className="h-4 w-4 text-violet-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">
                                {taxes.filter((tax) => tax.type === "percentage").length}
                            </div>
                            <p className="text-xs text-zinc-500">Rate-based taxes</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-300">
                                Fixed Taxes
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-yellow-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">
                                {taxes.filter((tax) => tax.type === "fixed").length}
                            </div>
                            <p className="text-xs text-zinc-500">Fixed amount taxes</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Search and Filters */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">Search & Filter</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                                <Input
                                    placeholder="Search taxes by name, description, or country..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Taxes Table */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">Tax Configurations</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Manage tax rates for different regions and services
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="border-zinc-800">
                                    <TableHead className="text-zinc-300">Name</TableHead>
                                    <TableHead className="text-zinc-300">Rate</TableHead>
                                    <TableHead className="text-zinc-300">Type</TableHead>
                                    <TableHead className="text-zinc-300">Applicable On</TableHead>
                                    <TableHead className="text-zinc-300">Location</TableHead>
                                    <TableHead className="text-zinc-300">Status</TableHead>
                                    <TableHead className="text-zinc-300">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredTaxes.map((tax) => (
                                    <TableRow key={tax.id} className="border-zinc-800">
                                        <TableCell>
                                            <div>
                                                <div className="font-medium text-white">{tax.name}</div>
                                                <div className="text-sm text-zinc-400">
                                                    {tax.description}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-white">
                                            {tax.type === "percentage" ? `${tax.rate}%` : `$${tax.rate}`}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={`${tax.type === "percentage"
                                                        ? "bg-violet-900/30 text-violet-300 border-violet-800"
                                                        : "bg-yellow-900/30 text-yellow-300 border-yellow-800"
                                                    }`}
                                            >
                                                {tax.type === "percentage" ? (
                                                    <Percent className="h-3 w-3 mr-1" />
                                                ) : (
                                                    <DollarSign className="h-3 w-3 mr-1" />
                                                )}
                                                {tax.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className={getApplicableOnColor(tax.applicableOn)}
                                            >
                                                {getApplicableOnIcon(tax.applicableOn)}
                                                <span className="ml-1 capitalize">{tax.applicableOn}</span>
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-white">
                                                <div className="flex items-center gap-1">
                                                    <Globe className="h-3 w-3 text-zinc-400" />
                                                    {tax.country}
                                                </div>
                                                {tax.state && (
                                                    <div className="flex items-center gap-1 text-sm text-zinc-400">
                                                        <MapPin className="h-3 w-3" />
                                                        {tax.state}
                                                        {tax.city && `, ${tax.city}`}
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Switch
                                                    checked={tax.isActive}
                                                    onCheckedChange={() => toggleTaxStatus(tax.id)}
                                                />
                                                <span
                                                    className={`text-sm ${tax.isActive ? "text-green-400" : "text-red-400"
                                                        }`}
                                                >
                                                    {tax.isActive ? "Active" : "Inactive"}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEditTax(tax)}
                                                    className="text-zinc-400 hover:text-white"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDeleteTax(tax.id)}
                                                    className="text-zinc-400 hover:text-red-400"
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

                {/* Add/Edit Tax Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>
                                {editingTax ? "Edit Tax" : "Add New Tax"}
                            </DialogTitle>
                            <DialogDescription className="text-zinc-400">
                                {editingTax
                                    ? "Update tax configuration"
                                    : "Create a new tax configuration"}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-zinc-300">
                                    Tax Name
                                </Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    className="bg-zinc-800 border-zinc-700 text-white"
                                    placeholder="e.g., VAT, Service Tax"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="rate" className="text-zinc-300">
                                    Tax Rate
                                </Label>
                                <Input
                                    id="rate"
                                    type="number"
                                    value={formData.rate}
                                    onChange={(e) =>
                                        setFormData({ ...formData, rate: Number(e.target.value) })
                                    }
                                    className="bg-zinc-800 border-zinc-700 text-white"
                                    placeholder="e.g., 18 or 50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="type" className="text-zinc-300">
                                    Tax Type
                                </Label>
                                <Select
                                    value={formData.type}
                                    onValueChange={(value: "percentage" | "fixed") =>
                                        setFormData({ ...formData, type: value })
                                    }
                                >
                                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-800 border-zinc-700">
                                        <SelectItem value="percentage">Percentage</SelectItem>
                                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="applicableOn" className="text-zinc-300">
                                    Applicable On
                                </Label>
                                <Select
                                    value={formData.applicableOn}
                                    onValueChange={(value: "room" | "service" | "food" | "all") =>
                                        setFormData({ ...formData, applicableOn: value })
                                    }
                                >
                                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent className="bg-zinc-800 border-zinc-700">
                                        <SelectItem value="all">All Services</SelectItem>
                                        <SelectItem value="room">Room Bookings</SelectItem>
                                        <SelectItem value="service">Services</SelectItem>
                                        <SelectItem value="food">Food & Beverages</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="country" className="text-zinc-300">
                                    Country
                                </Label>
                                <Input
                                    id="country"
                                    value={formData.country}
                                    onChange={(e) =>
                                        setFormData({ ...formData, country: e.target.value })
                                    }
                                    className="bg-zinc-800 border-zinc-700 text-white"
                                    placeholder="e.g., India, USA"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="state" className="text-zinc-300">
                                    State (Optional)
                                </Label>
                                <Input
                                    id="state"
                                    value={formData.state}
                                    onChange={(e) =>
                                        setFormData({ ...formData, state: e.target.value })
                                    }
                                    className="bg-zinc-800 border-zinc-700 text-white"
                                    placeholder="e.g., Maharashtra, California"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="city" className="text-zinc-300">
                                    City (Optional)
                                </Label>
                                <Input
                                    id="city"
                                    value={formData.city}
                                    onChange={(e) =>
                                        setFormData({ ...formData, city: e.target.value })
                                    }
                                    className="bg-zinc-800 border-zinc-700 text-white"
                                    placeholder="e.g., Mumbai, Los Angeles"
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="isActive"
                                    checked={formData.isActive}
                                    onCheckedChange={(checked) =>
                                        setFormData({ ...formData, isActive: checked })
                                    }
                                />
                                <Label htmlFor="isActive" className="text-zinc-300">
                                    Active
                                </Label>
                            </div>
                        </div>

                        <div className="col-span-2 space-y-2">
                            <Label htmlFor="description" className="text-zinc-300">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                className="bg-zinc-800 border-zinc-700 text-white"
                                placeholder="Describe the tax and its purpose..."
                                rows={3}
                            />
                        </div>

                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                                className="border-zinc-700 hover:bg-zinc-800"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSaveTax}
                                className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600"
                            >
                                {editingTax ? "Update Tax" : "Add Tax"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </motion.div>
        </div>
    );
};

export default TaxManagement;