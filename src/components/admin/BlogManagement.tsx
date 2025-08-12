import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    FileText,
    FolderOpen,
    Tag,
    Plus,
    Eye,
    Heart,
    MessageCircle,
    TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlogPostManagement from "./BlogPostManagement";
import BlogCategoryManagement from "./BlogCategoryManagement";
import BlogTagManagement from "./BlogTagManagement";

const BlogManagement = () => {
    const [activeTab, setActiveTab] = useState("overview");

    // Mock blog stats
    const blogStats = {
        totalPosts: 156,
        publishedPosts: 142,
        draftPosts: 14,
        totalCategories: 12,
        totalTags: 48,
        totalViews: 45680,
        totalLikes: 3420,
        totalComments: 892,
    };

    const StatCard = ({
        title,
        value,
        description,
        icon: Icon,
        color,
    }: {
        title: string;
        value: string | number;
        description: string;
        icon: any;
        color: string;
    }) => (
        <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-300">
                    {title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${color}`} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-white">{value}</div>
                <p className="text-xs text-zinc-500">{description}</p>
            </CardContent>
        </Card>
    );

    return (
        <div className="bg-black min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
            >
                <div>
                    <h1 className="text-3xl font-bold mb-2 text-white">Blog Management</h1>
                    <p className="text-zinc-400">
                        Manage your blog content, categories, and tags
                    </p>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="bg-zinc-900/50 border border-zinc-800">
                        <TabsTrigger
                            value="overview"
                            className="data-[state=active]:bg-violet-900/30 data-[state=active]:text-violet-300"
                        >
                            Overview
                        </TabsTrigger>
                        <TabsTrigger
                            value="posts"
                            className="data-[state=active]:bg-violet-900/30 data-[state=active]:text-violet-300"
                        >
                            Posts
                        </TabsTrigger>
                        <TabsTrigger
                            value="categories"
                            className="data-[state=active]:bg-violet-900/30 data-[state=active]:text-violet-300"
                        >
                            Categories
                        </TabsTrigger>
                        <TabsTrigger
                            value="tags"
                            className="data-[state=active]:bg-violet-900/30 data-[state=active]:text-violet-300"
                        >
                            Tags
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        {/* Blog Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard
                                title="Total Posts"
                                value={blogStats.totalPosts}
                                description="All blog posts"
                                icon={FileText}
                                color="text-cyan-400"
                            />
                            <StatCard
                                title="Published Posts"
                                value={blogStats.publishedPosts}
                                description="Live on website"
                                icon={Eye}
                                color="text-green-400"
                            />
                            <StatCard
                                title="Categories"
                                value={blogStats.totalCategories}
                                description="Content categories"
                                icon={FolderOpen}
                                color="text-violet-400"
                            />
                            <StatCard
                                title="Tags"
                                value={blogStats.totalTags}
                                description="Content tags"
                                icon={Tag}
                                color="text-yellow-400"
                            />
                            <StatCard
                                title="Total Views"
                                value={blogStats.totalViews.toLocaleString()}
                                description="All time views"
                                icon={TrendingUp}
                                color="text-blue-400"
                            />
                            <StatCard
                                title="Total Likes"
                                value={blogStats.totalLikes.toLocaleString()}
                                description="Reader engagement"
                                icon={Heart}
                                color="text-pink-400"
                            />
                            <StatCard
                                title="Comments"
                                value={blogStats.totalComments}
                                description="Reader feedback"
                                icon={MessageCircle}
                                color="text-orange-400"
                            />
                            <StatCard
                                title="Draft Posts"
                                value={blogStats.draftPosts}
                                description="Unpublished content"
                                icon={FileText}
                                color="text-zinc-400"
                            />
                        </div>

                        {/* Quick Actions */}
                        <Card className="bg-zinc-900/50 border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-white">Quick Actions</CardTitle>
                                <CardDescription className="text-zinc-400">
                                    Common blog management tasks
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Button
                                        onClick={() => setActiveTab("posts")}
                                        className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Create New Post
                                    </Button>
                                    <Button
                                        onClick={() => setActiveTab("categories")}
                                        variant="outline"
                                        className="border-zinc-700 hover:bg-zinc-800"
                                    >
                                        <FolderOpen className="h-4 w-4 mr-2" />
                                        Manage Categories
                                    </Button>
                                    <Button
                                        onClick={() => setActiveTab("tags")}
                                        variant="outline"
                                        className="border-zinc-700 hover:bg-zinc-800"
                                    >
                                        <Tag className="h-4 w-4 mr-2" />
                                        Manage Tags
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="posts">
                        <BlogPostManagement />
                    </TabsContent>

                    <TabsContent value="categories">
                        <BlogCategoryManagement />
                    </TabsContent>

                    <TabsContent value="tags">
                        <BlogTagManagement />
                    </TabsContent>
                </Tabs>
            </motion.div>
        </div>
    );
};

export default BlogManagement;
