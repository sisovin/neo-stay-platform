import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Users,
    Search,
    Filter,
    Plus,
    Edit,
    Trash2,
    Eye,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Star,
    ToggleLeft,
    ToggleRight,
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
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { Customer } from "@/types/admin";

const CustomerManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        address: {
            street: "",
            city: "",
            state: "",
            country: "",
            zipCode: "",
        },
        preferences: {
            roomType: [] as string[],
            amenities: [] as string[],
            dietaryRestrictions: [] as string[],
        },
        loyaltyPoints: 0,
        isActive: true,
    });

    // Mock customers data
    const [customers, setCustomers] = useState<Customer[]>([
        {
            id: "1",
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@email.com",
            phone: "+1-555-0123",
            dateOfBirth: new Date("1985-06-15"),
            address: {
                street: "123 Main St",
                city: "New York",
                state: "NY",
                country: "USA",
                zipCode: "10001",
            },
            preferences: {
                roomType: ["Deluxe", "Suite"],
                amenities: ["WiFi", "Pool", "Gym"],
                dietaryRestrictions: ["Vegetarian"],
            },
            loyaltyPoints: 2500,
            isActive: true,
            createdAt: new Date("2023-01-15"),
            updatedAt: new Date("2024-01-10"),
        },
        {
            id: "2",
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@email.com",
            phone: "+1-555-0456",
            dateOfBirth: new Date("1990-03-22"),
            address: {
                street: "456 Oak Ave",
                city: "Los Angeles",
                state: "CA",
                country: "USA",
                zipCode: "90210",
            },
            preferences: {
                roomType: ["Standard", "Deluxe"],
                amenities: ["WiFi", "Spa"],
                dietaryRestrictions: [],
            },
            loyaltyPoints: 1800,
            isActive: true,
            createdAt: new Date("2023-03-20"),
            updatedAt: new Date("2024-01-05"),
        },
        {
            id: "3",
            firstName: "Mike",
            lastName: "Johnson",
            email: "mike.johnson@email.com",
            phone: "+1-555-0789",
            dateOfBirth: new Date("1978-11-08"),
            address: {
                street: "789 Pine Rd",
                city: "Chicago",
                state: "IL",
                country: "USA",
                zipCode: "60601",
            },
            preferences: {
                roomType: ["Suite", "Presidential"],
                amenities: ["WiFi", "Pool", "Gym", "Spa"],
                dietaryRestrictions: ["Gluten-free"],
            },
            loyaltyPoints: 4200,
            isActive: false,
            createdAt: new Date("2022-08-10"),
            updatedAt: new Date("2023-12-15"),
        },
    ]);

    const filteredCustomers = customers.filter((customer) => {
        const matchesSearch =
            customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
            statusFilter === "all" ||
            (statusFilter === "active" && customer.isActive) ||
            (statusFilter === "inactive" && !customer.isActive);
        return matchesSearch && matchesStatus;
    });

    const handleAddCustomer = () => {
        const newCustomer: Customer = {
            id: Date.now().toString(),
            ...formData,
            dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        setCustomers([...customers, newCustomer]);
        resetForm();
        setIsAddDialogOpen(false);
    };

    const handleEditCustomer = () => {
        if (!editingCustomer) return;
        const updatedCustomers = customers.map((customer) =>
            customer.id === editingCustomer.id
                ? {
                    ...formData,
                    id: editingCustomer.id,
                    dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth) : undefined,
                    createdAt: editingCustomer.createdAt,
                    updatedAt: new Date(),
                }
                : customer
        );
        setCustomers(updatedCustomers);
        resetForm();
        setEditingCustomer(null);
    };

    const handleDeleteCustomer = (id: string) => {
        setCustomers(customers.filter((customer) => customer.id !== id));
    };

    const handleToggleStatus = (id: string) => {
        const updatedCustomers = customers.map((customer) =>
            customer.id === id
                ? { ...customer, isActive: !customer.isActive, updatedAt: new Date() }
                : customer
        );
        setCustomers(updatedCustomers);
    };

    const resetForm = () => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            dateOfBirth: "",
            address: {
                street: "",
                city: "",
                state: "",
                country: "",
                zipCode: "",
            },
            preferences: {
                roomType: [],
                amenities: [],
                dietaryRestrictions: [],
            },
            loyaltyPoints: 0,
            isActive: true,
        });
    };

    const openEditDialog = (customer: Customer) => {
        setEditingCustomer(customer);
        setFormData({
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phone: customer.phone,
            dateOfBirth: customer.dateOfBirth ? customer.dateOfBirth.toISOString().split('T')[0] : "",
            address: customer.address,
            preferences: customer.preferences,
            loyaltyPoints: customer.loyaltyPoints,
            isActive: customer.isActive,
        });
    };

    const stats = {
        total: customers.length,
        active: customers.filter((c) => c.isActive).length,
        inactive: customers.filter((c) => !c.isActive).length,
        totalLoyaltyPoints: customers.reduce((sum, c) => sum + c.loyaltyPoints, 0),
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
                    <h1 className="text-3xl font-bold mb-2">Customer Management</h1>
                    <p className="text-zinc-400">Manage customer accounts and information</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-300">
                                Total Customers
                            </CardTitle>
                            <Users className="h-4 w-4 text-cyan-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{stats.total}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-300">
                                Active Customers
                            </CardTitle>
                            <ToggleRight className="h-4 w-4 text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{stats.active}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-300">
                                Inactive Customers
                            </CardTitle>
                            <ToggleLeft className="h-4 w-4 text-red-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">{stats.inactive}</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-300">
                                Total Loyalty Points
                            </CardTitle>
                            <Star className="h-4 w-4 text-yellow-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">
                                {stats.totalLoyaltyPoints.toLocaleString()}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Controls */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <CardTitle className="text-white">Customer List</CardTitle>
                                <CardDescription className="text-zinc-400">
                                    Manage all customer accounts
                                </CardDescription>
                            </div>
                            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Customer
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle>Add New Customer</DialogTitle>
                                        <DialogDescription className="text-zinc-400">
                                            Create a new customer account
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input
                                                id="firstName"
                                                value={formData.firstName}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, firstName: e.target.value })
                                                }
                                                className="bg-zinc-800 border-zinc-700"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input
                                                id="lastName"
                                                value={formData.lastName}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, lastName: e.target.value })
                                                }
                                                className="bg-zinc-800 border-zinc-700"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, email: e.target.value })
                                                }
                                                className="bg-zinc-800 border-zinc-700"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone</Label>
                                            <Input
                                                id="phone"
                                                value={formData.phone}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, phone: e.target.value })
                                                }
                                                className="bg-zinc-800 border-zinc-700"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                            <Input
                                                id="dateOfBirth"
                                                type="date"
                                                value={formData.dateOfBirth}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, dateOfBirth: e.target.value })
                                                }
                                                className="bg-zinc-800 border-zinc-700"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="loyaltyPoints">Loyalty Points</Label>
                                            <Input
                                                id="loyaltyPoints"
                                                type="number"
                                                value={formData.loyaltyPoints}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, loyaltyPoints: parseInt(e.target.value) || 0 })
                                                }
                                                className="bg-zinc-800 border-zinc-700"
                                            />
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <Label htmlFor="street">Street Address</Label>
                                            <Input
                                                id="street"
                                                value={formData.address.street}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        address: { ...formData.address, street: e.target.value },
                                                    })
                                                }
                                                className="bg-zinc-800 border-zinc-700"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="city">City</Label>
                                            <Input
                                                id="city"
                                                value={formData.address.city}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        address: { ...formData.address, city: e.target.value },
                                                    })
                                                }
                                                className="bg-zinc-800 border-zinc-700"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="state">State</Label>
                                            <Input
                                                id="state"
                                                value={formData.address.state}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        address: { ...formData.address, state: e.target.value },
                                                    })
                                                }
                                                className="bg-zinc-800 border-zinc-700"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="country">Country</Label>
                                            <Input
                                                id="country"
                                                value={formData.address.country}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        address: { ...formData.address, country: e.target.value },
                                                    })
                                                }
                                                className="bg-zinc-800 border-zinc-700"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="zipCode">Zip Code</Label>
                                            <Input
                                                id="zipCode"
                                                value={formData.address.zipCode}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        address: { ...formData.address, zipCode: e.target.value },
                                                    })
                                                }
                                                className="bg-zinc-800 border-zinc-700"
                                            />
                                        </div>
                                        <div className="md:col-span-2 flex items-center space-x-2">
                                            <Switch
                                                id="isActive"
                                                checked={formData.isActive}
                                                onCheckedChange={(checked) =>
                                                    setFormData({ ...formData, isActive: checked })
                                                }
                                            />
                                            <Label htmlFor="isActive">Active Account</Label>
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2 mt-6">
                                        <Button
                                            variant="outline"
                                            onClick={() => {
                                                resetForm();
                                                setIsAddDialogOpen(false);
                                            }}
                                            className="border-zinc-700 hover:bg-zinc-800"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onClick={handleAddCustomer}
                                            className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600"
                                        >
                                            Add Customer
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                                <Input
                                    placeholder="Search customers..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-zinc-800 border-zinc-700"
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full sm:w-48 bg-zinc-800 border-zinc-700">
                                    <Filter className="h-4 w-4 mr-2" />
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-800 border-zinc-700">
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="rounded-md border border-zinc-800">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-zinc-800">
                                        <TableHead className="text-zinc-300">Customer</TableHead>
                                        <TableHead className="text-zinc-300">Contact</TableHead>
                                        <TableHead className="text-zinc-300">Location</TableHead>
                                        <TableHead className="text-zinc-300">Loyalty Points</TableHead>
                                        <TableHead className="text-zinc-300">Status</TableHead>
                                        <TableHead className="text-zinc-300">Joined</TableHead>
                                        <TableHead className="text-zinc-300">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredCustomers.map((customer) => (
                                        <TableRow key={customer.id} className="border-zinc-800">
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                                        {customer.firstName[0]}{customer.lastName[0]}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-white">
                                                            {customer.firstName} {customer.lastName}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                                                        <Mail className="h-3 w-3" />
                                                        {customer.email}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                                                        <Phone className="h-3 w-3" />
                                                        {customer.phone}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2 text-sm text-zinc-300">
                                                    <MapPin className="h-3 w-3" />
                                                    {customer.address.city}, {customer.address.state}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Star className="h-4 w-4 text-yellow-400" />
                                                    <span className="text-white font-medium">
                                                        {customer.loyaltyPoints.toLocaleString()}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={customer.isActive ? "default" : "secondary"}
                                                    className={`${customer.isActive
                                                            ? "bg-green-900/30 text-green-300 border-green-800/50"
                                                            : "bg-red-900/30 text-red-300 border-red-800/50"
                                                        }`}
                                                >
                                                    {customer.isActive ? "Active" : "Inactive"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2 text-sm text-zinc-400">
                                                    <Calendar className="h-3 w-3" />
                                                    {customer.createdAt.toLocaleDateString()}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleToggleStatus(customer.id)}
                                                        className="text-zinc-400 hover:text-white"
                                                    >
                                                        {customer.isActive ? (
                                                            <ToggleRight className="h-4 w-4" />
                                                        ) : (
                                                            <ToggleLeft className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => openEditDialog(customer)}
                                                                className="text-zinc-400 hover:text-white"
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
                                                            <DialogHeader>
                                                                <DialogTitle>Edit Customer</DialogTitle>
                                                                <DialogDescription className="text-zinc-400">
                                                                    Update customer information
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="editFirstName">First Name</Label>
                                                                    <Input
                                                                        id="editFirstName"
                                                                        value={formData.firstName}
                                                                        onChange={(e) =>
                                                                            setFormData({ ...formData, firstName: e.target.value })
                                                                        }
                                                                        className="bg-zinc-800 border-zinc-700"
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="editLastName">Last Name</Label>
                                                                    <Input
                                                                        id="editLastName"
                                                                        value={formData.lastName}
                                                                        onChange={(e) =>
                                                                            setFormData({ ...formData, lastName: e.target.value })
                                                                        }
                                                                        className="bg-zinc-800 border-zinc-700"
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="editEmail">Email</Label>
                                                                    <Input
                                                                        id="editEmail"
                                                                        type="email"
                                                                        value={formData.email}
                                                                        onChange={(e) =>
                                                                            setFormData({ ...formData, email: e.target.value })
                                                                        }
                                                                        className="bg-zinc-800 border-zinc-700"
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="editPhone">Phone</Label>
                                                                    <Input
                                                                        id="editPhone"
                                                                        value={formData.phone}
                                                                        onChange={(e) =>
                                                                            setFormData({ ...formData, phone: e.target.value })
                                                                        }
                                                                        className="bg-zinc-800 border-zinc-700"
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="editDateOfBirth">Date of Birth</Label>
                                                                    <Input
                                                                        id="editDateOfBirth"
                                                                        type="date"
                                                                        value={formData.dateOfBirth}
                                                                        onChange={(e) =>
                                                                            setFormData({ ...formData, dateOfBirth: e.target.value })
                                                                        }
                                                                        className="bg-zinc-800 border-zinc-700"
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="editLoyaltyPoints">Loyalty Points</Label>
                                                                    <Input
                                                                        id="editLoyaltyPoints"
                                                                        type="number"
                                                                        value={formData.loyaltyPoints}
                                                                        onChange={(e) =>
                                                                            setFormData({ ...formData, loyaltyPoints: parseInt(e.target.value) || 0 })
                                                                        }
                                                                        className="bg-zinc-800 border-zinc-700"
                                                                    />
                                                                </div>
                                                                <div className="md:col-span-2 space-y-2">
                                                                    <Label htmlFor="editStreet">Street Address</Label>
                                                                    <Input
                                                                        id="editStreet"
                                                                        value={formData.address.street}
                                                                        onChange={(e) =>
                                                                            setFormData({
                                                                                ...formData,
                                                                                address: { ...formData.address, street: e.target.value },
                                                                            })
                                                                        }
                                                                        className="bg-zinc-800 border-zinc-700"
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="editCity">City</Label>
                                                                    <Input
                                                                        id="editCity"
                                                                        value={formData.address.city}
                                                                        onChange={(e) =>
                                                                            setFormData({
                                                                                ...formData,
                                                                                address: { ...formData.address, city: e.target.value },
                                                                            })
                                                                        }
                                                                        className="bg-zinc-800 border-zinc-700"
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="editState">State</Label>
                                                                    <Input
                                                                        id="editState"
                                                                        value={formData.address.state}
                                                                        onChange={(e) =>
                                                                            setFormData({
                                                                                ...formData,
                                                                                address: { ...formData.address, state: e.target.value },
                                                                            })
                                                                        }
                                                                        className="bg-zinc-800 border-zinc-700"
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="editCountry">Country</Label>
                                                                    <Input
                                                                        id="editCountry"
                                                                        value={formData.address.country}
                                                                        onChange={(e) =>
                                                                            setFormData({
                                                                                ...formData,
                                                                                address: { ...formData.address, country: e.target.value },
                                                                            })
                                                                        }
                                                                        className="bg-zinc-800 border-zinc-700"
                                                                    />
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="editZipCode">Zip Code</Label>
                                                                    <Input
                                                                        id="editZipCode"
                                                                        value={formData.address.zipCode}
                                                                        onChange={(e) =>
                                                                            setFormData({
                                                                                ...formData,
                                                                                address: { ...formData.address, zipCode: e.target.value },
                                                                            })
                                                                        }
                                                                        className="bg-zinc-800 border-zinc-700"
                                                                    />
                                                                </div>
                                                                <div className="md:col-span-2 flex items-center space-x-2">
                                                                    <Switch
                                                                        id="editIsActive"
                                                                        checked={formData.isActive}
                                                                        onCheckedChange={(checked) =>
                                                                            setFormData({ ...formData, isActive: checked })
                                                                        }
                                                                    />
                                                                    <Label htmlFor="editIsActive">Active Account</Label>
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-end gap-2 mt-6">
                                                                <Button
                                                                    variant="outline"
                                                                    onClick={() => {
                                                                        resetForm();
                                                                        setEditingCustomer(null);
                                                                    }}
                                                                    className="border-zinc-700 hover:bg-zinc-800"
                                                                >
                                                                    Cancel
                                                                </Button>
                                                                <Button
                                                                    onClick={handleEditCustomer}
                                                                    className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600"
                                                                >
                                                                    Update Customer
                                                                </Button>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDeleteCustomer(customer.id)}
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
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default CustomerManagement;
