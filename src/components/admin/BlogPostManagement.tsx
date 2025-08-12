import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Plus,
    Search,
    Filter,
    Edit,
    Trash2,
    Eye,
    Heart,
    MessageCircle,
    Calendar,
    User,
    Tag,
    FolderOpen,
    MoreHorizontal,
    ExternalLink,
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { BlogPost } from "@/types/admin";

const BlogPostManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");

    // Mock blog posts data
    const blogPosts: BlogPost[] = [
        {
            id: "1",
            title: "The Future of Hotel Technology",
            slug: "future-hotel-technology",
            content: "Lorem ipsum dolor sit amet...",
            excerpt: "Exploring how AI and IoT are transforming the hospitality industry.",
            featuredImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            authorId: "author1",
            authorName: "John Smith",
            categoryId: "tech",
            categoryName: "Technology",
            tags: ["AI", "IoT", "Innovation"],
            status: "published",
            publishedAt: new Date("2024-01-15"),
            views: 1250,
            likes: 89,
            comments: 23,
            createdAt: new Date("2024-01-10"),
            updatedAt: new Date("2024-01-15"),
        },
        {
            id: "2",
            title: "Sustainable Tourism Practices",
            slug: "sustainable-tourism-practices",
            content: "Lorem ipsum dolor sit amet...",
            excerpt: "How hotels are adopting eco-friendly practices for a better future.",
            featuredImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80",
            authorId: "author2",
            authorName: "Sarah Johnson",
            categoryId: "sustainability",
            categoryName: "Sustainability",
            tags: ["Eco-friendly", "Green", "Environment"],
            status: "published",
            publishedAt: new Date("2024-01-12"),
            views: 890,
            likes: 67,
            comments: 15,
            createdAt: new Date("2024-01-08"),
            updatedAt: new Date("2024-01-12"),
        },
        {
            id: "3",
            title: "Luxury Travel Trends 2024",
            slug: "luxury-travel-trends-2024",
            content: "Lorem ipsum dolor sit amet...",
            excerpt: "Discover the latest trends shaping luxury travel experiences.",
            featuredImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80",
            authorId: "author1",
            authorName: "John Smith",
            categoryId: "travel",
            categoryName: "Travel",
            tags: ["Luxury", "Trends", "2024"],
            status: "draft",
            views: 0,
            likes: 0,
            comments: 0,
            createdAt: new Date("2024-01-20"),
            updatedAt: new Date("2024-01-20"),
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case "published":
                return "bg-green-900/30 text-green-300 border-green-800";
            case "draft":
                return "bg-yellow-900/30 text-yellow-300 border-yellow-800";
            case "archived":
                return "bg-zinc-900/30 text-zinc-300 border-zinc-800";
            default:
                return "bg-zinc-900/30 text-zinc-300 border-zinc-800";
        }
    };

    const filteredPosts = blogPosts.filter((post) => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.authorName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || post.status === statusFilter;
        const matchesCategory = categoryFilter === "all" || post.categoryId === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
    });

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
                    <h2 className="text-2xl font-bold text-white">Blog Posts</h2>
                    <p className="text-zinc-400">Manage your blog content</p>
                </div>
                <Button className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Post
                </Button>
            </div>

            {/* Filters */}
            <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                                <Input
                                    placeholder="Search posts..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                                />
                            </div>
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px] bg-zinc-800 border-zinc-700">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="published">Published</SelectItem>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="archived">Archived</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-[180px] bg-zinc-800 border-zinc-700">
                                <SelectValue placeholder="Filter by category" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="tech">Technology</SelectItem>
                                <SelectItem value="travel">Travel</SelectItem>
                                <SelectItem value="sustainability">Sustainability</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Posts Table */}
            <Card className="bg-zinc-900/50 border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-white">Posts ({filteredPosts.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-zinc-800">
                                    <TableHead className="text-zinc-300">Post</TableHead>
                                    <TableHead className="text-zinc-300">Author</TableHead>
                                    <TableHead className="text-zinc-300">Category</TableHead>
                                    <TableHead className="text-zinc-300">Status</TableHead>
                                    <TableHead className="text-zinc-300">Stats</TableHead>
                                    <TableHead className="text-zinc-300">Date</TableHead>
                                    <TableHead className="text-zinc-300">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredPosts.map((post) => (
                                    <TableRow key={post.id} className="border-zinc-800">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={post.featuredImage}
                                                    alt={post.title}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                                <div>
                                                    <div className="font-medium text-white">{post.title}</div>
                                                    <div className="text-sm text-zinc-400 line-clamp-1">
                                                        {post.excerpt}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <User className="h-4 w-4 text-zinc-400" />
                                                <span className="text-zinc-300">{post.authorName}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <FolderOpen className="h-4 w-4 text-zinc-400" />
                                                <span className="text-zinc-300">{post.categoryName}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={getStatusColor(post.status)}>
                                                {post.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-4 text-sm text-zinc-400">
                                                <div className="flex items-center gap-1">
                                                    <Eye className="h-3 w-3" />
                                                    {post.views}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Heart className="h-3 w-3" />
                                                    {post.likes}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MessageCircle className="h-3 w-3" />
                                                    {post.comments}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm text-zinc-400">
                                                {post.publishedAt
                                                    ? post.publishedAt.toLocaleDateString()
                                                    : "Not published"}
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
                                                    <DropdownMenuItem className="text-zinc-300 hover:bg-zinc-700">
                                                        <ExternalLink className="h-4 w-4 mr-2" />
                                                        View
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
        </motion.div>
    );
};

export default BlogPostManagement;
