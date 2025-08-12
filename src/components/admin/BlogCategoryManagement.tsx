import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    FolderOpen,
    FileText,
    MoreHorizontal,
    Eye,
    EyeOff,
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import type { BlogCategory } from "@/types/admin";

const BlogCategoryManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

    // Mock blog categories data
    const blogCategories: BlogCategory[] = [
        {
            id: "tech",
            name: "Technology",
            slug: "technology",
            description: "Latest trends and innovations in hotel technology",
            color: "#3B82F6",
            image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&q=80",
            postCount: 24,
            isActive: true,
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-15"),
        },
        {
            id: "travel",
            name: "Travel",
            slug: "travel",
            description: "Travel guides, tips, and destination insights",
            color: "#10B981",
            image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&q=80",
            postCount: 18,
            isActive: true,
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-12"),
        },
        {
            id: "sustainability",
            name: "Sustainability",
            slug: "sustainability",
            description: "Eco-friendly practices and sustainable tourism",
            color: "#059669",
            image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80",
            postCount: 12,
            isActive: true,
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-10"),
        },
        {
            id: "luxury",
            name: "Luxury",
            slug: "luxury",
            description: "Premium experiences and luxury hospitality",
            color: "#7C3AED",
            image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80",
            postCount: 8,
            isActive: false,
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-08"),
        },
    ];

    const filteredCategories = blogCategories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const CategoryCard = ({ category }: { category: BlogCategory }) => (
        <Card className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 transition-colors">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: category.color }}
                        />
                        <div>
                            <CardTitle className="text-white text-lg">{category.name}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge
                                    variant="outline"
                                    className={`text-xs ${category.isActive
                                            ? "border-green-800 text-green-300"
                                            : "border-zinc-700 text-zinc-400"
                                        }`}
                                >
                                    {category.isActive ? "Active" : "Inactive"}
                                </Badge>
                                <span className="text-sm text-zinc-400">
                                    {category.postCount} posts
                                </span>
                            </div>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-zinc-800 border-zinc-700">
                            <DropdownMenuItem className="text-zinc-300 hover:bg-zinc-700">
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-zinc-300 hover:bg-zinc-700">
                                {category.isActive ? (
                                    <>
                                        <EyeOff className="h-4 w-4 mr-2" />
                                        Deactivate
                                    </>
                                ) : (
                                    <>
                                        <Eye className="h-4 w-4 mr-2" />
                                        Activate
                                    </>
                                )}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-400 hover:bg-red-900/20">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent>
                {category.image && (
                    <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                )}
                <CardDescription className="text-zinc-400">
                    {category.description}
                </CardDescription>
            </CardContent>
        </Card>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">Blog Categories</h2>
                    <p className="text-zinc-400">Organize your content with categories</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <Button
                            variant={viewMode === "grid" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setViewMode("grid")}
                            className={viewMode === "grid" ? "bg-violet-600" : "border-zinc-700"}
                        >
                            Grid
                        </Button>
                        <Button
                            variant={viewMode === "table" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setViewMode("table")}
                            className={viewMode === "table" ? "bg-violet-600" : "border-zinc-700"}
                        >
                            Table
                        </Button>
                    </div>
                    <Button className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Category
                    </Button>
                </div>
            </div>

            {/* Search */}
            <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="pt-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                        <Input
                            placeholder="Search categories..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Categories */}
            {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCategories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            ) : (
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">Categories ({filteredCategories.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-zinc-800">
                                        <TableHead className="text-zinc-300">Category</TableHead>
                                        <TableHead className="text-zinc-300">Description</TableHead>
                                        <TableHead className="text-zinc-300">Posts</TableHead>
                                        <TableHead className="text-zinc-300">Status</TableHead>
                                        <TableHead className="text-zinc-300">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredCategories.map((category) => (
                                        <TableRow key={category.id} className="border-zinc-800">
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="w-4 h-4 rounded-full"
                                                        style={{ backgroundColor: category.color }}
                                                    />
                                                    <div>
                                                        <div className="font-medium text-white">{category.name}</div>
                                                        <div className="text-sm text-zinc-400">{category.slug}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-zinc-300 max-w-xs truncate">
                                                    {category.description}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <FileText className="h-4 w-4 text-zinc-400" />
                                                    <span className="text-zinc-300">{category.postCount}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Switch
                                                        checked={category.isActive}
                                                        className="data-[state=checked]:bg-green-600"
                                                    />
                                                    <span className="text-sm text-zinc-400">
                                                        {category.isActive ? "Active" : "Inactive"}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent className="bg-zinc-800 border-zinc-700">
                                                        <DropdownMenuItem className="text-zinc-300 hover:bg-zinc-700">
                                                            <Edit className="h-4 w-4 mr-2" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-400 hover:bg-red-900/20">
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            )}
        </motion.div>
    );
};

export default BlogCategoryManagement;
