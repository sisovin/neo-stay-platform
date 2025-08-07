import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Users,
    DollarSign,
    Image as ImageIcon,
    Save,
    X,
    Bed,
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
import { Switch } from '@/components/ui/switch';
import type { Room } from '@/types/admin';

const RoomManagement = () => {
    const [rooms, setRooms] = useState<Room[]>([
        {
            id: '1',
            hotelId: '1',
            title: 'Deluxe Cyber Suite',
            description: 'Spacious suite with holographic entertainment system',
            categoryId: 'deluxe',
            price: 299,
            maxGuests: 2,
            size: 45,
            images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80'],
            amenities: ['wifi', 'minibar', 'smart-tv'],
            isAvailable: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '2',
            hotelId: '1',
            title: 'Standard Neo Room',
            description: 'Comfortable room with modern amenities',
            categoryId: 'standard',
            price: 149,
            maxGuests: 2,
            size: 25,
            images: ['https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80'],
            amenities: ['wifi', 'ac'],
            isAvailable: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingRoom, setEditingRoom] = useState<Room | null>(null);
    const [formData, setFormData] = useState({
        hotelId: '',
        title: '',
        description: '',
        categoryId: '',
        price: '',
        maxGuests: '',
        size: '',
        images: '',
        isAvailable: true,
    });

    const hotels = [
        { id: '1', name: 'Neo Tokyo Grand' },
        { id: '2', name: 'Cyber Shanghai Tower' },
    ];

    const categories = [
        { id: 'standard', name: 'Standard' },
        { id: 'deluxe', name: 'Deluxe' },
        { id: 'suite', name: 'Suite' },
        { id: 'presidential', name: 'Presidential' },
    ];

    const filteredRooms = rooms.filter(room =>
        room.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const roomData: Room = {
            id: editingRoom?.id || Date.now().toString(),
            hotelId: formData.hotelId,
            title: formData.title,
            description: formData.description,
            categoryId: formData.categoryId,
            price: parseFloat(formData.price),
            maxGuests: parseInt(formData.maxGuests),
            size: parseFloat(formData.size),
            images: formData.images.split(',').map(img => img.trim()).filter(Boolean),
            amenities: editingRoom?.amenities || [],
            isAvailable: formData.isAvailable,
            createdAt: editingRoom?.createdAt || new Date(),
            updatedAt: new Date(),
        };

        if (editingRoom) {
            setRooms(rooms.map(room => room.id === editingRoom.id ? roomData : room));
        } else {
            setRooms([...rooms, roomData]);
        }

        resetForm();
    };

    const resetForm = () => {
        setFormData({
            hotelId: '',
            title: '',
            description: '',
            categoryId: '',
            price: '',
            maxGuests: '',
            size: '',
            images: '',
            isAvailable: true,
        });
        setEditingRoom(null);
        setIsDialogOpen(false);
    };

    const handleEdit = (room: Room) => {
        setEditingRoom(room);
        setFormData({
            hotelId: room.hotelId,
            title: room.title,
            description: room.description,
            categoryId: room.categoryId,
            price: room.price.toString(),
            maxGuests: room.maxGuests.toString(),
            size: room.size.toString(),
            images: room.images.join(', '),
            isAvailable: room.isAvailable,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        setRooms(rooms.filter(room => room.id !== id));
    };

    const getHotelName = (hotelId: string) => {
        return hotels.find(hotel => hotel.id === hotelId)?.name || 'Unknown Hotel';
    };

    const getCategoryName = (categoryId: string) => {
        return categories.find(cat => cat.id === categoryId)?.name || 'Unknown Category';
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
                        <h1 className="text-3xl font-bold text-white mb-2">Room Management</h1>
                        <p className="text-zinc-400">Manage hotel rooms and their configurations</p>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Room
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>{editingRoom ? 'Edit Room' : 'Add New Room'}</DialogTitle>
                                <DialogDescription className="text-zinc-400">
                                    {editingRoom ? 'Update room information' : 'Create a new room'}
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="hotelId">Hotel</Label>
                                        <Select value={formData.hotelId} onValueChange={(value) => setFormData({ ...formData, hotelId: value })}>
                                            <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                                                <SelectValue placeholder="Select hotel" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-800 border-zinc-700">
                                                {hotels.map((hotel) => (
                                                    <SelectItem key={hotel.id} value={hotel.id} className="text-white">
                                                        {hotel.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="categoryId">Category</Label>
                                        <Select value={formData.categoryId} onValueChange={(value) => setFormData({ ...formData, categoryId: value })}>
                                            <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-800 border-zinc-700">
                                                {categories.map((category) => (
                                                    <SelectItem key={category.id} value={category.id} className="text-white">
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="title">Room Title</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="bg-zinc-800 border-zinc-700 text-white"
                                        required
                                    />
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
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="price">Price per Night ($)</Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                            className="bg-zinc-800 border-zinc-700 text-white"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="maxGuests">Max Guests</Label>
                                        <Input
                                            id="maxGuests"
                                            type="number"
                                            value={formData.maxGuests}
                                            onChange={(e) => setFormData({ ...formData, maxGuests: e.target.value })}
                                            className="bg-zinc-800 border-zinc-700 text-white"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="size">Size (sqm)</Label>
                                        <Input
                                            id="size"
                                            type="number"
                                            value={formData.size}
                                            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
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
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="isAvailable"
                                        checked={formData.isAvailable}
                                        onCheckedChange={(checked) => setFormData({ ...formData, isAvailable: checked })}
                                    />
                                    <Label htmlFor="isAvailable">Available for booking</Label>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={resetForm}>
                                        <X className="h-4 w-4 mr-2" />
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="bg-gradient-to-r from-violet-600 to-cyan-500">
                                        <Save className="h-4 w-4 mr-2" />
                                        {editingRoom ? 'Update' : 'Create'}
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
                                placeholder="Search rooms by title..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Rooms Table */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">Rooms ({filteredRooms.length})</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Manage your hotel rooms
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="border-zinc-800">
                                    <TableHead className="text-zinc-300">Room</TableHead>
                                    <TableHead className="text-zinc-300">Hotel</TableHead>
                                    <TableHead className="text-zinc-300">Category</TableHead>
                                    <TableHead className="text-zinc-300">Price</TableHead>
                                    <TableHead className="text-zinc-300">Capacity</TableHead>
                                    <TableHead className="text-zinc-300">Status</TableHead>
                                    <TableHead className="text-zinc-300">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredRooms.map((room) => (
                                    <TableRow key={room.id} className="border-zinc-800">
                                        <TableCell>
                                            <div>
                                                <div className="font-medium text-white">{room.title}</div>
                                                <div className="text-sm text-zinc-400 truncate max-w-xs">
                                                    {room.description}
                                                </div>
                                                <div className="text-xs text-zinc-500 mt-1">
                                                    {room.size} sqm
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-zinc-300">
                                            {getHotelName(room.hotelId)}
                                        </TableCell>
                                        <TableCell className="text-zinc-300">
                                            {getCategoryName(room.categoryId)}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center text-zinc-300">
                                                <DollarSign className="h-4 w-4 mr-1" />
                                                {room.price}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center text-zinc-300">
                                                <Users className="h-4 w-4 mr-1" />
                                                {room.maxGuests}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs ${room.isAvailable
                                                    ? 'bg-green-900/30 text-green-400 border border-green-800'
                                                    : 'bg-red-900/30 text-red-400 border border-red-800'
                                                }`}>
                                                {room.isAvailable ? 'Available' : 'Unavailable'}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleEdit(room)}
                                                    className="border-zinc-700 hover:bg-zinc-800"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleDelete(room.id)}
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

export default RoomManagement;
