import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Save,
    X,
    Star,
    Wifi,
    Car,
    Coffee,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { Amenity } from '@/types/admin';

const AmenityManagement = () => {
    const [amenities, setAmenities] = useState<Amenity[]>([
        {
            id: '1',
            name: 'Free WiFi',
            description: 'High-speed internet access throughout the property',
            icon: 'wifi',
            category: 'both',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '2',
            name: 'Swimming Pool',
            description: 'Outdoor swimming pool with city views',
            icon: 'waves',
            category: 'hotel',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '3',
            name: 'Mini Bar',
            description: 'In-room mini bar with premium beverages',
            icon: 'coffee',
            category: 'room',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingAmenity, setEditingAmenity] = useState<Amenity | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        icon: '',
        category: 'both' as 'room' | 'hotel' | 'both',
    });

    const iconOptions = [
        { value: 'wifi', label: 'WiFi', icon: Wifi },
        { value: 'car', label: 'Parking', icon: Car },
        { value: 'coffee', label: 'Coffee/Bar', icon: Coffee },
        { value: 'star', label: 'Premium', icon: Star },
    ];

    const filteredAmenities = amenities.filter(amenity =>
        amenity.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const amenityData: Amenity = {
            id: editingAmenity?.id || Date.now().toString(),
            name: formData.name,
            description: formData.description,
            icon: formData.icon,
            category: formData.category,
            createdAt: editingAmenity?.createdAt || new Date(),
            updatedAt: new Date(),
        };

        if (editingAmenity) {
            setAmenities(amenities.map(amenity => amenity.id === editingAmenity.id ? amenityData : amenity));
        } else {
            setAmenities([...amenities, amenityData]);
        }

        resetForm();
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            icon: '',
            category: 'both',
        });
        setEditingAmenity(null);
        setIsDialogOpen(false);
    };

    const handleEdit = (amenity: Amenity) => {
        setEditingAmenity(amenity);
        setFormData({
            name: amenity.name,
            description: amenity.description,
            icon: amenity.icon,
            category: amenity.category,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        setAmenities(amenities.filter(amenity => amenity.id !== id));
    };

    const getIconComponent = (iconName: string) => {
        const iconOption = iconOptions.find(option => option.value === iconName);
        return iconOption ? iconOption.icon : Star;
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'room': return 'bg-blue-900/30 text-blue-300 border-blue-800/50';
            case 'hotel': return 'bg-green-900/30 text-green-300 border-green-800/50';
            case 'both': return 'bg-violet-900/30 text-violet-300 border-violet-800/50';
            default: return 'bg-zinc-800 text-zinc-400';
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
                        <h1 className="text-3xl font-bold text-white mb-2">Amenity Management</h1>
                        <p className="text-zinc-400">Manage amenities available for rooms and hotels</p>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Amenity
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>{editingAmenity ? 'Edit Amenity' : 'Add New Amenity'}</DialogTitle>
                                <DialogDescription className="text-zinc-400">
                                    {editingAmenity ? 'Update amenity information' : 'Create a new amenity'}
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Amenity Name</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="bg-zinc-800 border-zinc-700 text-white"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category</Label>
                                        <Select value={formData.category} onValueChange={(value: 'room' | 'hotel' | 'both') => setFormData({ ...formData, category: value })}>
                                            <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-800 border-zinc-700">
                                                <SelectItem value="room" className="text-white">Room Only</SelectItem>
                                                <SelectItem value="hotel" className="text-white">Hotel Only</SelectItem>
                                                <SelectItem value="both" className="text-white">Both Room & Hotel</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="bg-zinc-800 border-zinc-700 text-white"
                                        rows={3}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="icon">Icon</Label>
                                    <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                                        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                                            <SelectValue placeholder="Select icon" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-zinc-800 border-zinc-700">
                                            {iconOptions.map((option) => {
                                                const IconComponent = option.icon;
                                                return (
                                                    <SelectItem key={option.value} value={option.value} className="text-white">
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
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={resetForm}>
                                        <X className="h-4 w-4 mr-2" />
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="bg-gradient-to-r from-violet-600 to-cyan-500">
                                        <Save className="h-4 w-4 mr-2" />
                                        {editingAmenity ? 'Update' : 'Create'}
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
                                placeholder="Search amenities..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Amenities Table */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">Amenities ({filteredAmenities.length})</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Manage amenities for rooms and hotels
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="border-zinc-800">
                                    <TableHead className="text-zinc-300">Amenity</TableHead>
                                    <TableHead className="text-zinc-300">Category</TableHead>
                                    <TableHead className="text-zinc-300">Description</TableHead>
                                    <TableHead className="text-zinc-300">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredAmenities.map((amenity) => {
                                    const IconComponent = getIconComponent(amenity.icon);
                                    return (
                                        <TableRow key={amenity.id} className="border-zinc-800">
                                            <TableCell>
                                                <div className="flex items-center">
                                                    <IconComponent className="h-5 w-5 mr-3 text-cyan-400" />
                                                    <div>
                                                        <div className="font-medium text-white">{amenity.name}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs capitalize ${getCategoryColor(amenity.category)}`}>
                                                    {amenity.category}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm text-zinc-400 max-w-xs truncate">
                                                    {amenity.description}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleEdit(amenity)}
                                                        className="border-zinc-700 hover:bg-zinc-800"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleDelete(amenity.id)}
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

export default AmenityManagement;
