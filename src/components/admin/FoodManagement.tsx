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
    Utensils,
    AlertTriangle,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Food, FoodCategory } from '@/types/admin';

const FoodManagement = () => {
    const [foods, setFoods] = useState<Food[]>([
        {
            id: '1',
            name: 'Cyber Sushi Platter',
            description: 'Premium sushi selection with molecular gastronomy twist',
            price: 45,
            category: 'japanese',
            image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80',
            isAvailable: true,
            ingredients: ['Fresh Salmon', 'Tuna', 'Avocado', 'Nori', 'Sushi Rice'],
            allergens: ['Fish', 'Soy'],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '2',
            name: 'Neo Burger Deluxe',
            description: 'Plant-based burger with synthetic meat technology',
            price: 28,
            category: 'american',
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
            isAvailable: true,
            ingredients: ['Plant Protein', 'Lettuce', 'Tomato', 'Vegan Cheese', 'Brioche Bun'],
            allergens: ['Gluten', 'Soy'],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '3',
            name: 'Quantum Pasta',
            description: 'Holographic pasta with nano-enhanced flavors',
            price: 32,
            category: 'italian',
            image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=800&q=80',
            isAvailable: false,
            ingredients: ['Quantum Wheat', 'Nano Cheese', 'Digital Herbs'],
            allergens: ['Gluten', 'Dairy'],
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);

    const [categories, setCategories] = useState<FoodCategory[]>([
        {
            id: '1',
            name: 'Japanese',
            description: 'Traditional and modern Japanese cuisine',
            image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=80',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '2',
            name: 'American',
            description: 'Classic American dishes with a futuristic twist',
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: '3',
            name: 'Italian',
            description: 'Authentic Italian flavors enhanced with technology',
            image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&q=80',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
    const [editingFood, setEditingFood] = useState<Food | null>(null);
    const [editingCategory, setEditingCategory] = useState<FoodCategory | null>(null);
    const [activeTab, setActiveTab] = useState('foods');

    const [foodFormData, setFoodFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        ingredients: '',
        allergens: '',
        isAvailable: true,
    });

    const [categoryFormData, setCategoryFormData] = useState({
        name: '',
        description: '',
        image: '',
    });

    const filteredFoods = foods.filter(food =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        food.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleFoodSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const foodData: Food = {
            id: editingFood?.id || Date.now().toString(),
            name: foodFormData.name,
            description: foodFormData.description,
            price: parseFloat(foodFormData.price),
            category: foodFormData.category,
            image: foodFormData.image,
            isAvailable: foodFormData.isAvailable,
            ingredients: foodFormData.ingredients.split(',').map(ing => ing.trim()).filter(Boolean),
            allergens: foodFormData.allergens.split(',').map(all => all.trim()).filter(Boolean),
            createdAt: editingFood?.createdAt || new Date(),
            updatedAt: new Date(),
        };

        if (editingFood) {
            setFoods(foods.map(food => food.id === editingFood.id ? foodData : food));
        } else {
            setFoods([...foods, foodData]);
        }

        resetFoodForm();
    };

    const handleCategorySubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const categoryData: FoodCategory = {
            id: editingCategory?.id || Date.now().toString(),
            name: categoryFormData.name,
            description: categoryFormData.description,
            image: categoryFormData.image,
            createdAt: editingCategory?.createdAt || new Date(),
            updatedAt: new Date(),
        };

        if (editingCategory) {
            setCategories(categories.map(cat => cat.id === editingCategory.id ? categoryData : cat));
        } else {
            setCategories([...categories, categoryData]);
        }

        resetCategoryForm();
    };

    const resetFoodForm = () => {
        setFoodFormData({
            name: '',
            description: '',
            price: '',
            category: '',
            image: '',
            ingredients: '',
            allergens: '',
            isAvailable: true,
        });
        setEditingFood(null);
        setIsDialogOpen(false);
    };

    const resetCategoryForm = () => {
        setCategoryFormData({
            name: '',
            description: '',
            image: '',
        });
        setEditingCategory(null);
        setIsCategoryDialogOpen(false);
    };

    const handleEditFood = (food: Food) => {
        setEditingFood(food);
        setFoodFormData({
            name: food.name,
            description: food.description,
            price: food.price.toString(),
            category: food.category,
            image: food.image,
            ingredients: food.ingredients.join(', '),
            allergens: food.allergens.join(', '),
            isAvailable: food.isAvailable,
        });
        setIsDialogOpen(true);
    };

    const handleEditCategory = (category: FoodCategory) => {
        setEditingCategory(category);
        setCategoryFormData({
            name: category.name,
            description: category.description,
            image: category.image,
        });
        setIsCategoryDialogOpen(true);
    };

    const handleDeleteFood = (id: string) => {
        setFoods(foods.filter(food => food.id !== id));
    };

    const handleDeleteCategory = (id: string) => {
        setCategories(categories.filter(cat => cat.id !== id));
    };

    const getCategoryName = (categoryId: string) => {
        return categories.find(cat => cat.name.toLowerCase() === categoryId.toLowerCase())?.name || categoryId;
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
                        <h1 className="text-3xl font-bold text-white mb-2">Food & Dining Management</h1>
                        <p className="text-zinc-400">Manage restaurant menu items and food categories</p>
                    </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-zinc-900 border-zinc-800">
                        <TabsTrigger value="foods" className="data-[state=active]:bg-violet-900/30 data-[state=active]:text-violet-300">
                            <Utensils className="h-4 w-4 mr-2" />
                            Food Items
                        </TabsTrigger>
                        <TabsTrigger value="categories" className="data-[state=active]:bg-violet-900/30 data-[state=active]:text-violet-300">
                            Categories
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="foods" className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div className="flex-1">
                                <Card className="bg-zinc-900/50 border-zinc-800">
                                    <CardContent className="p-4">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
                                            <Input
                                                placeholder="Search food items..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="ml-4 bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Food Item
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl">
                                    <DialogHeader>
                                        <DialogTitle>{editingFood ? 'Edit Food Item' : 'Add New Food Item'}</DialogTitle>
                                        <DialogDescription className="text-zinc-400">
                                            {editingFood ? 'Update food item information' : 'Create a new food item for the menu'}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleFoodSubmit} className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Food Name</Label>
                                                <Input
                                                    id="name"
                                                    value={foodFormData.name}
                                                    onChange={(e) => setFoodFormData({ ...foodFormData, name: e.target.value })}
                                                    className="bg-zinc-800 border-zinc-700 text-white"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="price">Price ($)</Label>
                                                <Input
                                                    id="price"
                                                    type="number"
                                                    step="0.01"
                                                    value={foodFormData.price}
                                                    onChange={(e) => setFoodFormData({ ...foodFormData, price: e.target.value })}
                                                    className="bg-zinc-800 border-zinc-700 text-white"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="description">Description</Label>
                                            <Textarea
                                                id="description"
                                                value={foodFormData.description}
                                                onChange={(e) => setFoodFormData({ ...foodFormData, description: e.target.value })}
                                                className="bg-zinc-800 border-zinc-700 text-white"
                                                rows={3}
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="category">Category</Label>
                                                <Select value={foodFormData.category} onValueChange={(value) => setFoodFormData({ ...foodFormData, category: value })}>
                                                    <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-zinc-800 border-zinc-700">
                                                        {categories.map((category) => (
                                                            <SelectItem key={category.id} value={category.name.toLowerCase()} className="text-white">
                                                                {category.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="image">Image URL</Label>
                                                <Input
                                                    id="image"
                                                    value={foodFormData.image}
                                                    onChange={(e) => setFoodFormData({ ...foodFormData, image: e.target.value })}
                                                    className="bg-zinc-800 border-zinc-700 text-white"
                                                    placeholder="https://example.com/image.jpg"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="ingredients">Ingredients (comma-separated)</Label>
                                            <Textarea
                                                id="ingredients"
                                                value={foodFormData.ingredients}
                                                onChange={(e) => setFoodFormData({ ...foodFormData, ingredients: e.target.value })}
                                                className="bg-zinc-800 border-zinc-700 text-white"
                                                rows={2}
                                                placeholder="Ingredient 1, Ingredient 2, Ingredient 3"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="allergens">Allergens (comma-separated)</Label>
                                            <Textarea
                                                id="allergens"
                                                value={foodFormData.allergens}
                                                onChange={(e) => setFoodFormData({ ...foodFormData, allergens: e.target.value })}
                                                className="bg-zinc-800 border-zinc-700 text-white"
                                                rows={2}
                                                placeholder="Gluten, Dairy, Nuts"
                                            />
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Switch
                                                id="isAvailable"
                                                checked={foodFormData.isAvailable}
                                                onCheckedChange={(checked) => setFoodFormData({ ...foodFormData, isAvailable: checked })}
                                            />
                                            <Label htmlFor="isAvailable">Available for ordering</Label>
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            <Button type="button" variant="outline" onClick={resetFoodForm}>
                                                <X className="h-4 w-4 mr-2" />
                                                Cancel
                                            </Button>
                                            <Button type="submit" className="bg-gradient-to-r from-violet-600 to-cyan-500">
                                                <Save className="h-4 w-4 mr-2" />
                                                {editingFood ? 'Update' : 'Create'}
                                            </Button>
                                        </div>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* Foods Table */}
                        <Card className="bg-zinc-900/50 border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-white">Food Items ({filteredFoods.length})</CardTitle>
                                <CardDescription className="text-zinc-400">
                                    Manage your restaurant menu items
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-zinc-800">
                                            <TableHead className="text-zinc-300">Food Item</TableHead>
                                            <TableHead className="text-zinc-300">Category</TableHead>
                                            <TableHead className="text-zinc-300">Price</TableHead>
                                            <TableHead className="text-zinc-300">Allergens</TableHead>
                                            <TableHead className="text-zinc-300">Status</TableHead>
                                            <TableHead className="text-zinc-300">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredFoods.map((food) => (
                                            <TableRow key={food.id} className="border-zinc-800">
                                                <TableCell>
                                                    <div className="flex items-center space-x-3">
                                                        <img
                                                            src={food.image}
                                                            alt={food.name}
                                                            className="w-12 h-12 rounded-lg object-cover"
                                                        />
                                                        <div>
                                                            <div className="font-medium text-white">{food.name}</div>
                                                            <div className="text-sm text-zinc-400 truncate max-w-xs">
                                                                {food.description}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="px-2 py-1 bg-violet-900/30 text-violet-300 rounded-full text-xs border border-violet-800/50 capitalize">
                                                        {getCategoryName(food.category)}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center text-zinc-300">
                                                        <DollarSign className="h-4 w-4 mr-1" />
                                                        {food.price}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-wrap gap-1">
                                                        {food.allergens.length > 0 ? (
                                                            food.allergens.slice(0, 2).map((allergen, index) => (
                                                                <span
                                                                    key={index}
                                                                    className="px-2 py-1 bg-red-900/30 text-red-300 rounded-full text-xs border border-red-800/50 flex items-center"
                                                                >
                                                                    <AlertTriangle className="h-3 w-3 mr-1" />
                                                                    {allergen}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span className="text-zinc-500 text-xs">None</span>
                                                        )}
                                                        {food.allergens.length > 2 && (
                                                            <span className="px-2 py-1 bg-zinc-800 text-zinc-400 rounded-full text-xs">
                                                                +{food.allergens.length - 2} more
                                                            </span>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <span className={`px-2 py-1 rounded-full text-xs ${food.isAvailable
                                                            ? 'bg-green-900/30 text-green-400 border border-green-800'
                                                            : 'bg-red-900/30 text-red-400 border border-red-800'
                                                        }`}>
                                                        {food.isAvailable ? 'Available' : 'Unavailable'}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleEditFood(food)}
                                                            className="border-zinc-700 hover:bg-zinc-800"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleDeleteFood(food.id)}
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
                    </TabsContent>

                    <TabsContent value="categories" className="space-y-6">
                        <div className="flex justify-end">
                            <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
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
                                            {editingCategory ? 'Update category information' : 'Create a new food category'}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleCategorySubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="categoryName">Category Name</Label>
                                            <Input
                                                id="categoryName"
                                                value={categoryFormData.name}
                                                onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })}
                                                className="bg-zinc-800 border-zinc-700 text-white"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="categoryDescription">Description</Label>
                                            <Textarea
                                                id="categoryDescription"
                                                value={categoryFormData.description}
                                                onChange={(e) => setCategoryFormData({ ...categoryFormData, description: e.target.value })}
                                                className="bg-zinc-800 border-zinc-700 text-white"
                                                rows={3}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="categoryImage">Image URL</Label>
                                            <Input
                                                id="categoryImage"
                                                value={categoryFormData.image}
                                                onChange={(e) => setCategoryFormData({ ...categoryFormData, image: e.target.value })}
                                                className="bg-zinc-800 border-zinc-700 text-white"
                                                placeholder="https://example.com/image.jpg"
                                            />
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            <Button type="button" variant="outline" onClick={resetCategoryForm}>
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

                        {/* Categories Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categories.map((category) => (
                                <Card key={category.id} className="bg-zinc-900/50 border-zinc-800 overflow-hidden">
                                    <div className="aspect-video relative">
                                        <img
                                            src={category.image}
                                            alt={category.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    </div>
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                                            <div className="flex gap-1">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleEditCategory(category)}
                                                    className="border-zinc-700 hover:bg-zinc-800 h-8 w-8 p-0"
                                                >
                                                    <Edit className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => handleDeleteCategory(category.id)}
                                                    className="border-red-800 text-red-400 hover:bg-red-900/20 h-8 w-8 p-0"
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                        <p className="text-zinc-400 text-sm">{category.description}</p>
                                        <div className="mt-3 text-xs text-zinc-500">
                                            {foods.filter(food => food.category === category.name.toLowerCase()).length} items
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </motion.div>
        </div>
    );
};

export default FoodManagement;