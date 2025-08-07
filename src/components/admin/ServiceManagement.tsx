import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Wrench,
    Clock,
    DollarSign,
    Users,
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
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Service {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    duration: string;
    availability: string;
    maxCapacity: number;
    isActive: boolean;
}

const ServiceManagement = () => {
    const [services, setServices] = useState<Service[]>([
        {
            id: "1",
            name: "Spa Treatment",
            description: "Relaxing full-body massage and wellness treatment",
            category: "Wellness",
            price: 150,
            duration: "90 minutes",
            availability: "Daily 9AM-8PM",
            maxCapacity: 4,
            isActive: true,
        },
        {
            id: "2",
            name: "Airport Transfer",
            description: "Luxury vehicle transfer to/from airport",
            category: "Transportation",
            price: 75,
            duration: "60 minutes",
            availability: "24/7",
            maxCapacity: 8,
            isActive: true,
        },
        {
            id: "3",
            name: "Room Service",
            description: "24-hour in-room dining service",
            category: "Dining",
            price: 25,
            duration: "30 minutes",
            availability: "24/7",
            maxCapacity: 1,
            isActive: true,
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        price: 0,
        duration: "",
        availability: "",
        maxCapacity: 1,
    });

    const categories = ["Wellness", "Transportation", "Dining", "Entertainment", "Business", "Concierge"];

    const filteredServices = services.filter((service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingService) {
            setServices(services.map(service =>
                service.id === editingService.id
                    ? { ...service, ...formData }
                    : service
            ));
        } else {
            const newService: Service = {
                id: Date.now().toString(),
                ...formData,
                isActive: true,
            };
            setServices([...services, newService]);
        }
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            category: "",
            price: 0,
            duration: "",
            availability: "",
            maxCapacity: 1,
        });
        setEditingService(null);
        setIsDialogOpen(false);
    };

    const handleEdit = (service: Service) => {
        setEditingService(service);
        setFormData({
            name: service.name,
            description: service.description,
            category: service.category,
            price: service.price,
            duration: service.duration,
            availability: service.availability,
            maxCapacity: service.maxCapacity,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        setServices(services.filter(service => service.id !== id));
    };

    const toggleStatus = (id: string) => {
        setServices(services.map(service =>
            service.id === id
                ? { ...service, isActive: !service.isActive }
                : service
        ));
    };

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Service Management</h1>
                        <p className="text-zinc-400">Manage hotel services and offerings</p>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Service
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingService ? "Edit Service" : "Add New Service"}
                                </DialogTitle>
                                <DialogDescription className="text-zinc-400">
                                    {editingService ? "Update service details" : "Create a new service offering"}
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="name">Service Name</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="bg-zinc-800 border-zinc-700"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="category">Category</Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={(value) => setFormData({ ...formData, category: value })}
                                        >
                                            <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-800 border-zinc-700">
                                                {categories.map((category) => (
                                                    <SelectItem key={category} value={category}>
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="bg-zinc-800 border-zinc-700"
                                        rows={3}
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="price">Price ($)</Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                            className="bg-zinc-800 border-zinc-700"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="duration">Duration</Label>
                                        <Input
                                            id="duration"
                                            value={formData.duration}
                                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                            className="bg-zinc-800 border-zinc-700"
                                            placeholder="e.g., 60 minutes"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="maxCapacity">Max Capacity</Label>
                                        <Input
                                            id="maxCapacity"
                                            type="number"
                                            value={formData.maxCapacity}
                                            onChange={(e) => setFormData({ ...formData, maxCapacity: Number(e.target.value) })}
                                            className="bg-zinc-800 border-zinc-700"
                                            min="1"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="availability">Availability</Label>
                                    <Input
                                        id="availability"
                                        value={formData.availability}
                                        onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                                        className="bg-zinc-800 border-zinc-700"
                                        placeholder="e.g., Daily 9AM-6PM"
                                    />
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={resetForm}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="bg-gradient-to-r from-violet-600 to-cyan-500">
                                        {editingService ? "Update" : "Create"} Service
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
                                placeholder="Search services..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-zinc-800 border-zinc-700"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Services Table */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Wrench className="h-5 w-5" />
                            Services ({filteredServices.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="border-zinc-800">
                                    <TableHead className="text-zinc-300">Service</TableHead>
                                    <TableHead className="text-zinc-300">Category</TableHead>
                                    <TableHead className="text-zinc-300">Price</TableHead>
                                    <TableHead className="text-zinc-300">Duration</TableHead>
                                    <TableHead className="text-zinc-300">Capacity</TableHead>
                                    <TableHead className="text-zinc-300">Status</TableHead>
                                    <TableHead className="text-zinc-300">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredServices.map((service) => (
                                    <TableRow key={service.id} className="border-zinc-800">
                                        <TableCell>
                                            <div>
                                                <div className="font-medium text-white">{service.name}</div>
                                                <div className="text-sm text-zinc-400 truncate max-w-xs">
                                                    {service.description}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="border-zinc-600 text-zinc-300">
                                                {service.category}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-white">
                                            <div className="flex items-center gap-1">
                                                <DollarSign className="h-3 w-3" />
                                                {service.price}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-zinc-300">
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {service.duration}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-zinc-300">
                                            <div className="flex items-center gap-1">
                                                <Users className="h-3 w-3" />
                                                {service.maxCapacity}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={service.isActive ? "default" : "secondary"}
                                                className={service.isActive ? "bg-green-600" : "bg-zinc-600"}
                                            >
                                                {service.isActive ? "Active" : "Inactive"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleEdit(service)}
                                                    className="text-zinc-400 hover:text-white"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => toggleStatus(service.id)}
                                                    className="text-zinc-400 hover:text-white"
                                                >
                                                    {service.isActive ? "Deactivate" : "Activate"}
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleDelete(service.id)}
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
            </motion.div>
        </div>
    );
};

export default ServiceManagement;