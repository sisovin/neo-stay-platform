import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Star,
    MapPin,
    Image as ImageIcon,
    Save,
    X,
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
import { Label } from '@/components/ui/label';
import type { Hotel } from '@/types/admin';

const HotelManagement = () => {
    const [hotels, setHotels] = useState<Hotel[]>([
        {
            id: '1',
            name: 'Neo Tokyo Grand',
            description: 'Luxury cyberpunk hotel in the heart of Neo Tokyo',
            address: '123 Neon Street',
            city: 'Neo Tokyo',
            country: 'Japan',
            rating: 4.8,
            images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80'],
            amenities: ['wifi', 'pool', 'spa'],
            features: ['smart-rooms', 'ai-concierge'],
            services: ['room-service', 'laundry'],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '2',
            name: 'Cyber Shanghai Tower',
            description: 'High-tech accommodation with stunning city views',
            address: '456 Digital Avenue',
            city: 'Shanghai',
            country: 'China',
            rating: 4.7,
            images: ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80'],
            amenities: ['wifi', 'gym', 'restaurant'],
            features: ['holographic-displays', 'smart-lighting'],
            services: ['concierge', 'valet'],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        address: '',
        city: '',
        country: '',
        images: '',
    });

    const filteredHotels = hotels.filter(hotel =>
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const hotelData: Hotel = {
            id: editingHotel?.id || Date.now().toString(),
            name: formData.name,
            description: formData.description,
            address: formData.address,
            city: formData.city,
            country: formData.country,
            rating: editingHotel?.rating || 0,
            images: formData.images.split(',').map(img => img.trim()).filter(Boolean),
            amenities: editingHotel?.amenities || [],
            features: editingHotel?.features || [],
            services: editingHotel?.services || [],
            createdAt: editingHotel?.createdAt || new Date(),
            updatedAt: new Date(),
        };

        if (editingHotel) {
            setHotels(hotels.map(hotel => hotel.id === editingHotel.id ? hotelData : hotel));
        } else {
            setHotels([...hotels, hotelData]);
        }

        resetForm();
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            address: '',
            city: '',
            country: '',
            images: '',
        });
        setEditingHotel(null);
        setIsDialogOpen(false);
    };

    const handleEdit = (hotel: Hotel) => {
        setEditingHotel(hotel);
        setFormData({
            name: hotel.name,
            description: hotel.description,
            address: hotel.address,
            city: hotel.city,
            country: hotel.country,
            images: hotel.images.join(', '),
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        setHotels(hotels.filter(hotel => hotel.id !== id));
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
                        <h1 className="text-3xl font-bold text-white mb-2">Hotel Management</h1>
                        <p className="text-zinc-400">Manage your hotel properties and their details</p>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Hotel
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>{editingHotel ? 'Edit Hotel' : 'Add New Hotel'}</DialogTitle>
                                <DialogDescription className="text-zinc-400">
                                    {editingHotel ? 'Update hotel information' : 'Create a new hotel property'}
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Hotel Name</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="bg-zinc-800 border-zinc-700 text-white"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            className="bg-zinc-800 border-zinc-700 text-white"
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
                                        className="bg-zinc-800 border-zinc-700 text-white"
                                        rows={3}
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            className="bg-zinc-800 border-zinc-700 text-white"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="country">Country</Label>
                                        <Input
                                            id="country"
                                            value={formData.country}
                                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                            className="bg-zinc-800 border-zinc-700 text-white"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="images">Images (comma-separated URLs)</Label>
                                    <Textarea
                                        id="images"
                                        value={formData.images}
                                        onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                                        className="bg-zinc-800 border-zinc-700 text-white"
                                        rows={2}
                                        placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                                    />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={resetForm}>
                                        <X className="h-4 w-4 mr-2" />
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="bg-gradient-to-r from-violet-600 to-cyan-500">
                                        <Save className="h-4 w-4 mr-2" />
                                        {editingHotel ? 'Update' : 'Create'}
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
                                placeholder="Search hotels by name or city..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Hotels Table */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">Hotels ({filteredHotels.length})</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Manage your hotel properties
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="border-zinc-800">
                                    <TableHead className="text-zinc-300">Hotel</TableHead>
                                    <TableHead className="text-zinc-300">Location</TableHead>
                                    <TableHead className="text-zinc-300">Rating</TableHead>
                                    <TableHead className="text-zinc-300">Images</TableHead>
                                    <TableHead className="text-zinc-300">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredHotels.map((hotel) => (
                                    <TableRow key={hotel.id} className="border-zinc-800">
                                        <TableCell>
                                            <div>
                                                <div className="font-medium text-white">{hotel.name}</div>
                                                <div className="text-sm text-zinc-400 truncate max-w-xs">
                                                    {hotel.description}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center text-zinc-300">
                                                <MapPin className="h-4 w-4 mr-1" />
                                                {hotel.city}, {hotel.country}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center text-zinc-300">
                                                <Star className="h-4 w-4 mr-1 text-yellow-500" fill="currentColor" />
                                                {hotel.rating}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center text-zinc-300">
                                                <ImageIcon className="h-4 w-4 mr-1" />
                                                {hotel.images.length}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleEdit(hotel)}
                                                    className="border-zinc-700 hover:bg-zinc-800"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleDelete(hotel.id)}
                                                    className="border-red-800 text-red-400 hover:bg-red-900/20"
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

export default HotelManagement;
