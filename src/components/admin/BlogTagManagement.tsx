import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Tag,
    FileText,
    MoreHorizontal,
    Eye,
    EyeOff,
    Hash,
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
import type { BlogTag } from "@/types/admin";

const BlogTagManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState<"cloud" | "table">("cloud");

    // Mock blog tags data
    const blogTags: BlogTag[] = [
        {
            id: "ai",
            name: "AI",
            slug: "ai",
            description: "Artificial Intelligence in hospitality",
            color: "#3B82F6",
            postCount: 15,
            isActive: true,
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-15"),
        },
        {
            id: "iot",
            name: "IoT",
            slug: "iot",
            description: "Internet of Things applications",
            color: "#10B981",
            postCount: 12,
            isActive: true,
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-12"),
        },
        {
            id: "luxury",
            name: "Luxury",
            slug: "luxury",
            description: "Premium hospitality experiences",
            color: "#7C3AED",
            postCount: 18,
            isActive: true,
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-10"),
        },
        {
            id: "eco-friendly",
            name: "Eco-friendly",
            slug: "eco-friendly",
            description: "Environmentally conscious practices",
            color: "#059669",
            postCount: 8,
            isActive: true,
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-08"),
        },
        {
            id: "innovation",
            name: "Innovation",
            slug: "innovation",
            description: "Latest innovations in hospitality",
            color: "#DC2626",
            postCount: 22,
            isActive: true,
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-20"),
        },
        {
            id: "trends",
            name: "Trends",
            slug: "trends",
            description: "Current industry trends",
            color: "#EA580C",
            postCount: 14,
            isActive: true,
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-18"),
        },
        {
            id: "customer-service",
            name: "Customer Service",
            slug: "customer-service",
            description: "Excellence in guest service",
            color: "#7C2D12",
            postCount: 6,
            isActive: false,
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-05"),
        },
        {
            id: "digital-transformation",
            name: "Digital Transformation",
            slug: "digital-transformation",
            description: "Digitizing hospitality operations",
            color: "#1E40AF",
            postCount: 10,
            isActive: true,
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-16"),
        },
    ];

    const filteredTags = blogTags.filter((tag) =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (tag.description && tag.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const getTagSize = (postCount: number) => {
        if (postCount >= 20) return "text-2xl";
        if (postCount >= 15) return "text-xl";
        if (postCount >= 10) return "text-lg";
        if (postCount >= 5) return "text-base";
        return "text-sm";
    };

    const TagCloud = () => (
        <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader>
                <CardTitle className="text-white">Tag Cloud</CardTitle>
                <CardDescription className="text-zinc-400">
                    Tags sized by usage frequency
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-3 p-4">
                    {filteredTags.map((tag) => (
                        <motion.div
                            key={tag.id}
                            whileHover={{ scale: 1.05 }}
                            className="relative group"
                        >
                            <Badge
                                className={`${getTagSize(tag.postCount)} px-3 py-2 cursor-pointer transition-all ${tag.isActive
                                        ? "hover:shadow-lg"
                                        : "opacity-50"
                                    }`}
                                style={{
                                    backgroundColor: `${tag.color}20`,
                                    borderColor: tag.color,
                                    color: tag.color,
                                }}
                            >
                                <Hash className="h-3 w-3 mr-1" />
                                {tag.name}
                                <span className="ml-2 text-xs opacity-70">({tag.postCount})</span>
                            </Badge>

                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-zinc-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                {tag.description || tag.name}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-zinc-800"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
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
                    <h2 className="text-2xl font-bold text-white">Blog Tags</h2>
                    <p className="text-zinc-400">Manage content tags and labels</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <Button
                            variant={viewMode === "cloud" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setViewMode("cloud")}
                            className={viewMode === "cloud" ? "bg-violet-600" : "border-zinc-700"}
                        >
                            Cloud
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
                        Add Tag
                    </Button>
                </div>
            </div>

            {/* Search */}
            <Card className="bg-zinc-900/50 border-zinc-800">
                <CardContent className="pt-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                        <Input
                            placeholder="Search tags..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Tags */}
            {viewMode === "cloud" ? (
                <TagCloud />
            ) : (
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">Tags ({filteredTags.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-zinc-800">
                                        <TableHead className="text-zinc-300">Tag</TableHead>
                                        <TableHead className="text-zinc-300">Description</TableHead>
                                        <TableHead className="text-zinc-300">Posts</TableHead>
                                        <TableHead className="text-zinc-300">Status</TableHead>
                                        <TableHead className="text-zinc-300">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredTags.map((tag) => (
                                        <TableRow key={tag.id} className="border-zinc-800">
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="w-4 h-4 rounded-full"
                                                        style={{ backgroundColor: tag.color }}
                                                    />
                                                    <div>
                                                        <div className="font-medium text-white flex items-center gap-1">
                                                            <Hash className="h-3 w-3" />
                                                            {tag.name}
                                                        </div>
                                                        <div className="text-sm text-zinc-400">{tag.slug}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-zinc-300 max-w-xs truncate">
                                                    {tag.description || "No description"}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <FileText className="h-4 w-4 text-zinc-400" />
                                                    <span className="text-zinc-300">{tag.postCount}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Switch
                                                        checked={tag.isActive}
                                                        className="data-[state=checked]:bg-green-600"
                                                    />
                                                    <span className="text-sm text-zinc-400">
                                                        {tag.isActive ? "Active" : "Inactive"}
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
                                                        <DropdownMenuItem className="text-zinc-300 hover:bg-zinc-700">
                                                            {tag.isActive ? (
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

export default BlogTagManagement;
