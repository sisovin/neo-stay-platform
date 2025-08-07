import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Save,
    X,
    Settings,
    Wifi,
    Car,
    Coffee,
    Dumbbell,
    Waves,
    Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface HotelFeature {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: "amenity" | "service" | "facility";
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const HotelFeatureManagement = () => {
    const [features, setFeatures] = useState<HotelFeature[]>([
        {
            id: "1",
            name: "High-Speed WiFi",
            description: "Complimentary high-speed internet access throughout the property",
            icon: "wifi",
            category: "amenity",
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "2",
            name: "Valet Parking",
            description: "Professional valet parking service available 24/7",
            icon: "car",
            category: "service",
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "3",
            name: "Fitness Center",
            description: "State-of-the-art fitness center with modern equipment",
            icon: "dumbbell",
            category: "facility",
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "4",
            name: "Swimming Pool",
            description: "Outdoor infinity pool with panoramic city views",
            icon: "waves",
            category: "facility",
            isActive: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingFeature, setEditingFeature] = useState<HotelFeature | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        icon: "",
        category: "amenity" as "amenity" | "service" | "facility",
        isActive: true,
    });

    const iconOptions = [
        { value: "wifi", label: "WiFi", icon: Wifi },
        { value: "car", label: "Parking", icon: Car },
        { value: "coffee", label: "Coffee/Bar", icon: Coffee },
        { value: "dumbbell", label: "Fitness", icon: Dumbbell },
        { value: "waves", label: "Pool/Spa", icon: Waves },
        { value: "utensils", label: "Dining", icon: Utensils },
        { value: "settings", label: "General", icon: Settings },
    ];

    const filteredFeatures = features.filter((feature) =>
        feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feature.category.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const featureData: HotelFeature = {
            id: editingFeature?.id || Date.now().toString(),
            name: formData.name,
            description: formData.description,
            icon: formData.icon,
            category: formData.category,
            isActive: formData.isActive,
            createdAt: editingFeature?.createdAt || new Date(),
            updatedAt: new Date(),
        };

        if (editingFeature) {
            setFeatures(
                features.map((feature) =>
                    feature.id === editingFeature.id ? featureData : feature,
                ),
            );
        } else {
            setFeatures([...features, featureData]);
        }

        resetForm();
    };

    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            icon: "",
            category: "amenity",
            isActive: true,
        });
        setEditingFeature(null);
        setIsDialogOpen(false);
    };

    const handleEdit = (feature: HotelFeature) => {
        setEditingFeature(feature);
        setFormData({
            name: feature.name,
            description: feature.description,
            icon: feature.icon,
            category: feature.category,
            isActive: feature.isActive,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        setFeatures(features.filter((feature) => feature.id !== id));
    };

    const getIconComponent = (iconName: string) => {
        const iconOption = iconOptions.find((option) => option.value === iconName);
        return iconOption ? iconOption.icon : Settings;
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case "amenity":
                return "bg-blue-900/30 text-blue-300 border-blue-800/50";
            case "service":
                return "bg-green-900/30 text-green-300 border-green-800/50";
            case "facility":
                return "bg-violet-900/30 text-violet-300 border-violet-800/50";
            default:
                return "bg-zinc-800 text-zinc-400";
        }
    };

    return (
        <div className="bg-black min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
            >
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Hotel Features Management
                        </h1>
                        <p className="text-zinc-400">
                            Manage hotel features, amenities, services, and facilities
                        </p>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Feature
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingFeature ? "Edit Hotel Feature" : "Add New Hotel Feature"}
                                </DialogTitle>
                                <DialogDescription className="text-zinc-400">
                                    {editingFeature
                                        ? "Update hotel feature information"
                                        : "Create a new hotel feature"}
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Feature Name</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                            className="bg-zinc-800 border-zinc-700 text-white"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category</Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={(value: "amenity" | "service" | "facility") =>
                                                setFormData({ ...formData, category: value })
                                            }
                                        >
                                            <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-800 border-zinc-700">
                                                <SelectItem value="amenity" className="text-white">
                                                    Amenity
                                                </SelectItem>
                                                <SelectItem value="service" className="text-white">
                                                    Service
                                                </SelectItem>
                                                <SelectItem value="facility" className="text-white">
                                                    Facility
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({ ...formData, description: e.target.value })
                                        }
                                        className="bg-zinc-800 border-zinc-700 text-white"
                                        rows={3}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="icon">Icon</Label>
                                    <Select
                                        value={formData.icon}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, icon: value })
                                        }
                                    >
                                        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                                            <SelectValue placeholder="Select icon" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-zinc-800 border-zinc-700">
                                            {iconOptions.map((option) => {
                                                const IconComponent = option.icon;
                                                return (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                        className="text-white"
                                                    >
                                                        <div className="flex items-center">
                                                            <IconComponent className="h-4 w-4 mr-2" />
                                                            {option.label}
                                                        </div>
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="isActive"
                                        checked={formData.isActive}
                                        onCheckedChange={(checked) =>
                                            setFormData({ ...formData, isActive: checked })
                                        }
                                    />
                                    <Label htmlFor="isActive">Feature is active</Label>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={resetForm}>
                                        <X className="h-4 w-4 mr-2" />
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-gradient-to-r from-violet-600 to-cyan-500"
                                    >
                                        <Save className="h-4 w-4 mr-2" />
                                        {editingFeature ? "Update" : "Create"}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Search */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardContent className="p-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
                            <Input
                                placeholder="Search hotel features..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Features Table */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">
                            Hotel Features ({filteredFeatures.length})
                        </CardTitle>
                        <CardDescription className="text-zinc-400">
                            Manage hotel features, amenities, services, and facilities
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="border-zinc-800">
                                    <TableHead className="text-zinc-300">Feature</TableHead>
                                    <TableHead className="text-zinc-300">Category</TableHead>
                                    <TableHead className="text-zinc-300">Description</TableHead>
                                    <TableHead className="text-zinc-300">Status</TableHead>
                                    <TableHead className="text-zinc-300">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredFeatures.map((feature) => {
                                    const IconComponent = getIconComponent(feature.icon);
                                    return (
                                        <TableRow key={feature.id} className="border-zinc-800">
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <IconComponent className="h-5 w-5 mr-3 text-cyan-400" />
                                                    <div>
                                                        <div className="font-medium text-white">
                                                            {feature.name}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs capitalize ${getCategoryColor(feature.category)}`}
                                                >
                                                    {feature.category}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm text-zinc-400 max-w-xs truncate">
                                                    {feature.description}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${feature.isActive
                                                            ? "bg-green-900/30 text-green-400 border border-green-800"
                                                            : "bg-red-900/30 text-red-400 border border-red-800"
                                                        }`}
                                                >
                                                    {feature.isActive ? "Active" : "Inactive"}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleEdit(feature)}
                                                        className="border-zinc-700 hover:bg-zinc-800"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleDelete(feature.id)}
                                                        className="border-red-800 text-red-400 hover:bg-red-900/20"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default HotelFeatureManagement;
