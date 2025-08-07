import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    DollarSign,
    Save,
    X,
    Tags,
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
import type { RoomCategory } from '@/types/admin';

const RoomCategoryManagement = () => {
    const [categories, setCategories] = useState<RoomCategory[]>([
        {
            id: '1',
            name: 'Standard',
            description: 'Comfortable rooms with essential amenities',
            basePrice: 120,
            features: ['Free WiFi', 'Air Conditioning', 'Private Bathroom'],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '2',
            name: 'Deluxe',
            description: 'Spacious rooms with premium amenities',
            basePrice: 200,
            features: ['Free WiFi', 'Mini Bar', 'City View', 'Premium Bedding'],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '3',
            name: 'Suite',
            description: 'Luxury suites with separate living area',
            basePrice: 350,
            features: ['Free WiFi', 'Living Room', 'Kitchenette', 'Balcony'],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<RoomCategory | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        basePrice: '',
        features: '',
    });

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const categoryData: RoomCategory = {
            id: editingCategory?.id || Date.now().toString(),
            name: formData.name,
            description: formData.description,
            basePrice: parseFloat(formData.basePrice),
            features: formData.features.split(',').map(feature => feature.trim()).filter(Boolean),
            createdAt: editingCategory?.createdAt || new Date(),
            updatedAt: new Date(),
        };

        if (editingCategory) {
            setCategories(categories.map(cat => cat.id === editingCategory.id ? categoryData : cat));
        } else {
            setCategories([...categories, categoryData]);
        }

        resetForm();
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            basePrice: '',
            features: '',
        });
        setEditingCategory(null);
        setIsDialogOpen(false);
    };

    const handleEdit = (category: RoomCategory) => {
        setEditingCategory(category);
        setFormData({
            name: category.name,
            description: category.description,
            basePrice: category.basePrice.toString(),
            features: category.features.join(', '),
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        setCategories(categories.filter(cat => cat.id !== id));
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
                        <h1 className="text-3xl font-bold text-white mb-2">Room Categories</h1>
                        <p className="text-zinc-400">Manage room categories and their base configurations</p>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Category
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>{editingCategory ? 'Edit Category' : 'Add New Category'}</DialogTitle>
                                <DialogDescription className="text-zinc-400">
                                    {editingCategory ? 'Update category information' : 'Create a new room category'}
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Category Name</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="bg-zinc-800 border-zinc-700 text-white"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="basePrice">Base Price ($)</Label>
                                        <Input
                                            id="basePrice"
                                            type="number"
                                            value={formData.basePrice}
                                            onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
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
                                <div className="space-y-2">
                                    <Label htmlFor="features">Features (comma-separated)</Label>
                                    <Textarea
                                        id="features"
                                        value={formData.features}
                                        onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                                        className="bg-zinc-800 border-zinc-700 text-white"
                                        rows={3}
                                        placeholder="Free WiFi, Air Conditioning, Mini Bar"
                                    />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="outline" onClick={resetForm}>
                                        <X className="h-4 w-4 mr-2" />
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="bg-gradient-to-r from-violet-600 to-cyan-500">
                                        <Save className="h-4 w-4 mr-2" />
                                        {editingCategory ? 'Update' : 'Create'}
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
                                placeholder="Search categories..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Categories Table */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">Categories ({filteredCategories.length})</CardTitle>
                        <CardDescription className="text-zinc-400">
                            Manage room categories and their features
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="border-zinc-800">
                                    <TableHead className="text-zinc-300">Category</TableHead>
                                    <TableHead className="text-zinc-300">Base Price</TableHead>
                                    <TableHead className="text-zinc-300">Features</TableHead>
                                    <TableHead className="text-zinc-300">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredCategories.map((category) => (
                                    <TableRow key={category.id} className="border-zinc-800">
                                        <TableCell>
                                            <div>
                                                <div className="font-medium text-white flex items-center">
                                                    <Tags className="h-4 w-4 mr-2 text-violet-400" />
                                                    {category.name}
                                                </div>
                                                <div className="text-sm text-zinc-400 mt-1">
                                                    {category.description}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center text-zinc-300">
                                                <DollarSign className="h-4 w-4 mr-1" />
                                                {category.basePrice}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {category.features.slice(0, 3).map((feature, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 bg-violet-900/30 text-violet-300 rounded-full text-xs border border-violet-800/50"
                                                    >
                                                        {feature}
                                                    </span>
                                                ))}
                                                {category.features.length > 3 && (
                                                    <span className="px-2 py-1 bg-zinc-800 text-zinc-400 rounded-full text-xs">
                                                        +{category.features.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleEdit(category)}
                                                    className="border-zinc-700 hover:bg-zinc-800"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleDelete(category.id)}
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

export default RoomCategoryManagement;
