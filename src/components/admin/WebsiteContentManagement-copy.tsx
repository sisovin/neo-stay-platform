import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    MapPin,
    Calendar,
    Users,
    ChevronRight,
    Star,
    ArrowRight,
    Plus,
    Edit3,
    Copy,
    Trash2,
    Eye,
    EyeOff,
    Save,
    Undo2,
    Redo2,
    Settings,
    Layout,
    Type,
    Image,
    Video,
    Grid3X3,
    Palette,
    Code,
    MousePointer,
    Monitor,
    Tablet,
    Smartphone,
    ChevronDown,
    ChevronUp,
    Move,
    MoreHorizontal,
    Filter,
    SortAsc,
    FolderOpen,
    File,
    Layers,
    Download,
    Upload,
    Zap,
    Globe,
    Sparkles,
    Target,
    BarChart3,
    Share2,
    FileText,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "../ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "../ui/dropdown-menu";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";

// Types for UI blocks and pages
interface UIBlock {
    id: string;
    name: string;
    category: string;
    type: 'hero' | 'navbar' | 'footer' | 'content' | 'gallery' | 'form' | 'pricing' | 'testimonial' | 'feature' | 'cta';
    isVisible: boolean;
    order: number;
    lastModified: Date;
    content: any;
    thumbnail?: string;
    description?: string;
    tags: string[];
}

interface WebPage {
    id: string;
    name: string;
    slug: string;
    status: 'published' | 'draft' | 'archived';
    blocks: UIBlock[];
    lastModified: Date;
    author: string;
    seoTitle?: string;
    seoDescription?: string;
    previewImage?: string;
}

const ContentManagement = () => {
    const [activeTab, setActiveTab] = useState('pages');
    const [selectedPage, setSelectedPage] = useState<string | null>('homepage');
    const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
    const [editMode, setEditMode] = useState(false);
    const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    // Mock data
    const [pages, setPages] = useState<WebPage[]>([
        {
            id: 'homepage',
            name: 'Homepage',
            slug: '/',
            status: 'published',
            blocks: [],
            lastModified: new Date(),
            author: 'Admin',
            seoTitle: 'NeoCityStays - Future of Hospitality',
            seoDescription: 'Experience extraordinary stays with cutting-edge amenities'
        },
        {
            id: 'about',
            name: 'About Us',
            slug: '/about',
            status: 'draft',
            blocks: [],
            lastModified: new Date(),
            author: 'Admin'
        },
        {
            id: 'contact',
            name: 'Contact',
            slug: '/contact',
            status: 'published',
            blocks: [],
            lastModified: new Date(),
            author: 'Admin'
        }
    ]);

    const [availableBlocks] = useState<UIBlock[]>([
        // Hero Blocks
        {
            id: 'hero-1',
            name: 'Hero with Video Background',
            category: 'hero',
            type: 'hero',
            isVisible: true,
            order: 1,
            lastModified: new Date(),
            content: {},
            description: 'Full-screen hero with video background and call-to-action',
            tags: ['video', 'fullscreen', 'cta'],
            thumbnail: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80'
        },
        {
            id: 'hero-2',
            name: 'Hero with Search Bar',
            category: 'hero',
            type: 'hero',
            isVisible: true,
            order: 2,
            lastModified: new Date(),
            content: {},
            description: 'Hero section with integrated search functionality',
            tags: ['search', 'booking', 'interactive'],
            thumbnail: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80'
        },
        // Navigation Blocks
        {
            id: 'nav-1',
            name: 'Modern Navigation',
            category: 'navigation',
            type: 'navbar',
            isVisible: true,
            order: 1,
            lastModified: new Date(),
            content: {},
            description: 'Responsive navigation with glassmorphism effect',
            tags: ['responsive', 'glassmorphism', 'sticky'],
            thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80'
        },
        // Content Blocks
        {
            id: 'content-1',
            name: 'Feature Grid',
            category: 'content',
            type: 'feature',
            isVisible: true,
            order: 1,
            lastModified: new Date(),
            content: {},
            description: 'Grid layout showcasing key features with icons',
            tags: ['grid', 'features', 'icons'],
            thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80'
        },
        {
            id: 'content-2',
            name: 'Statistics Counter',
            category: 'content',
            type: 'feature',
            isVisible: true,
            order: 2,
            lastModified: new Date(),
            content: {},
            description: 'Animated counters displaying key metrics',
            tags: ['animation', 'statistics', 'counters'],
            thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80'
        },
        // Gallery Blocks
        {
            id: 'gallery-1',
            name: 'Property Gallery',
            category: 'gallery',
            type: 'gallery',
            isVisible: true,
            order: 1,
            lastModified: new Date(),
            content: {},
            description: 'Interactive property showcase with filters',
            tags: ['properties', 'filter', 'cards'],
            thumbnail: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80'
        },
        // Testimonial Blocks
        {
            id: 'testimonial-1',
            name: 'Customer Reviews',
            category: 'testimonials',
            type: 'testimonial',
            isVisible: true,
            order: 1,
            lastModified: new Date(),
            content: {},
            description: 'Carousel of customer testimonials with ratings',
            tags: ['reviews', 'carousel', 'ratings'],
            thumbnail: 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=400&q=80'
        },
        // Form Blocks
        {
            id: 'form-1',
            name: 'Newsletter Signup',
            category: 'forms',
            type: 'form',
            isVisible: true,
            order: 1,
            lastModified: new Date(),
            content: {},
            description: 'Email subscription form with validation',
            tags: ['newsletter', 'email', 'subscription'],
            thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80'
        },
        // Footer Blocks
        {
            id: 'footer-1',
            name: 'Comprehensive Footer',
            category: 'footer',
            type: 'footer',
            isVisible: true,
            order: 1,
            lastModified: new Date(),
            content: {},
            description: 'Multi-column footer with links and social media',
            tags: ['links', 'social', 'contact'],
            thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80'
        }
    ]);

    const blockCategories = [
        { value: 'all', label: 'All Blocks', icon: Layout },
        { value: 'hero', label: 'Hero Sections', icon: Sparkles },
        { value: 'navigation', label: 'Navigation', icon: MousePointer },
        { value: 'content', label: 'Content', icon: Type },
        { value: 'gallery', label: 'Galleries', icon: Image },
        { value: 'testimonials', label: 'Testimonials', icon: Star },
        { value: 'forms', label: 'Forms', icon: Edit3 },
        { value: 'footer', label: 'Footers', icon: Layout }
    ];

    const filteredBlocks = availableBlocks.filter(block => {
        const matchesSearch = block.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            block.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            block.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCategory = filterCategory === 'all' || block.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const selectedPageData = pages.find(page => page.id === selectedPage);

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="border-b border-zinc-800 bg-black/90 backdrop-blur-sm sticky top-0 z-50">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Globe className="h-6 w-6 text-violet-400" />
                            <h1 className="text-xl font-bold">Content Management</h1>
                        </div>

                        {/* Tabs - Navigation Only */}
                        <div className="flex items-center gap-1 bg-zinc-900/50 rounded-lg p-1">
                            <Button
                                variant={activeTab === 'pages' ? 'secondary' : 'ghost'}
                                size="sm"
                                onClick={() => setActiveTab('pages')}
                                className="data-[state=active]:bg-violet-900/30"
                            >
                                <File className="h-4 w-4 mr-2" />
                                Pages
                            </Button>
                            <Button
                                variant={activeTab === 'blocks' ? 'secondary' : 'ghost'}
                                size="sm"
                                onClick={() => setActiveTab('blocks')}
                                className="data-[state=active]:bg-violet-900/30"
                            >
                                <Layers className="h-4 w-4 mr-2" />
                                Blocks
                            </Button>
                            <Button
                                variant={activeTab === 'templates' ? 'secondary' : 'ghost'}
                                size="sm"
                                onClick={() => setActiveTab('templates')}
                                className="data-[state=active]:bg-violet-900/30"
                            >
                                <Layout className="h-4 w-4 mr-2" />
                                Templates
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Preview Mode Toggle */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm">Preview</label>
                            <Switch
                                checked={isPreviewMode}
                                onCheckedChange={setIsPreviewMode}
                            />
                        </div>

                        {/* Device View Toggle */}
                        <div className="flex items-center gap-1 bg-zinc-900/50 rounded-lg p-1">
                            <Button
                                variant={viewMode === 'desktop' ? 'secondary' : 'ghost'}
                                size="sm"
                                onClick={() => setViewMode('desktop')}
                            >
                                <Monitor className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={viewMode === 'tablet' ? 'secondary' : 'ghost'}
                                size="sm"
                                onClick={() => setViewMode('tablet')}
                            >
                                <Tablet className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={viewMode === 'mobile' ? 'secondary' : 'ghost'}
                                size="sm"
                                onClick={() => setViewMode('mobile')}
                            >
                                <Smartphone className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                                <Undo2 className="h-4 w-4 mr-2" />
                                Undo
                            </Button>
                            <Button variant="outline" size="sm">
                                <Redo2 className="h-4 w-4 mr-2" />
                                Redo
                            </Button>
                            <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
                                <Save className="h-4 w-4 mr-2" />
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex h-[calc(100vh-80px)]">
                {/* Left Sidebar */}
                <div className="w-80 border-r border-zinc-800 bg-zinc-900/30 flex flex-col">
                    {activeTab === 'pages' && (
                        <div className="flex-1 p-4 space-y-4">
                            {/* Page Management */}
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold">Website Pages</h3>
                                <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
                                    <Plus className="h-4 w-4 mr-2" />
                                    New Page
                                </Button>
                            </div>

                            {/* Pages List */}
                            <div className="space-y-2">
                                {pages.map((page) => (
                                    <Card
                                        key={page.id}
                                        className={`cursor-pointer transition-all ${selectedPage === page.id
                                            ? 'border-violet-500 bg-violet-900/20'
                                            : 'border-zinc-800 hover:border-zinc-700'
                                            }`}
                                        onClick={() => setSelectedPage(page.id)}
                                    >
                                        <CardContent className="p-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-medium">{page.name}</h4>
                                                        <Badge
                                                            variant={page.status === 'published' ? 'default' : 'secondary'}
                                                            className={
                                                                page.status === 'published'
                                                                    ? 'bg-green-900/30 text-green-400'
                                                                    : 'bg-yellow-900/30 text-yellow-400'
                                                            }
                                                        >
                                                            {page.status}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-zinc-400 mt-1">{page.slug}</p>
                                                    <p className="text-xs text-zinc-500 mt-1">
                                                        Modified {page.lastModified.toLocaleDateString()}
                                                    </p>
                                                </div>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuItem>
                                                            <Edit3 className="h-4 w-4 mr-2" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Copy className="h-4 w-4 mr-2" />
                                                            Duplicate
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Eye className="h-4 w-4 mr-2" />
                                                            Preview
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem className="text-red-400">
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'blocks' && (
                        <div className="flex-1 p-4 space-y-4">
                            {/* Block Library */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold">Block Library</h3>
                                    <Button size="sm" variant="outline">
                                        <Upload className="h-4 w-4 mr-2" />
                                        Import
                                    </Button>
                                </div>

                                {/* Search and Filter */}
                                <div className="space-y-3">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                                        <Input
                                            placeholder="Search blocks..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-10 bg-zinc-900/50 border-zinc-800"
                                        />
                                    </div>

                                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                                        <SelectTrigger className="bg-zinc-900/50 border-zinc-800">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {blockCategories.map((category) => (
                                                <SelectItem key={category.value} value={category.value}>
                                                    <div className="flex items-center gap-2">
                                                        <category.icon className="h-4 w-4" />
                                                        {category.label}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Blocks Grid */}
                                <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
                                    {filteredBlocks.map((block) => (
                                        <Card
                                            key={block.id}
                                            className="cursor-pointer border-zinc-800 hover:border-zinc-700 transition-all"
                                            onClick={() => setSelectedBlock(block.id)}
                                        >
                                            <CardContent className="p-3">
                                                <div className="flex gap-3">
                                                    {block.thumbnail && (
                                                        <img
                                                            src={block.thumbnail}
                                                            alt={block.name}
                                                            className="w-12 h-12 rounded object-cover"
                                                        />
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-medium text-sm truncate">{block.name}</h4>
                                                        <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                                                            {block.description}
                                                        </p>
                                                        <div className="flex flex-wrap gap-1 mt-2">
                                                            {block.tags.slice(0, 2).map((tag) => (
                                                                <Badge
                                                                    key={tag}
                                                                    variant="secondary"
                                                                    className="text-xs bg-zinc-800 text-zinc-300"
                                                                >
                                                                    {tag}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="text-violet-400 hover:text-violet-300"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'templates' && (
                        <div className="flex-1 p-4 space-y-4">
                            {/* Page Templates */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold">Page Templates</h3>
                                    <Button size="sm" variant="outline">
                                        <Download className="h-4 w-4 mr-2" />
                                        Export
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 gap-3">
                                    {[
                                        { name: 'Landing Page', blocks: 8, preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80' },
                                        { name: 'About Page', blocks: 5, preview: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80' },
                                        { name: 'Contact Page', blocks: 4, preview: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80' },
                                        { name: 'Blog Layout', blocks: 6, preview: 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=400&q=80' }
                                    ].map((template, index) => (
                                        <Card key={index} className="cursor-pointer border-zinc-800 hover:border-zinc-700">
                                            <CardContent className="p-3">
                                                <img
                                                    src={template.preview}
                                                    alt={template.name}
                                                    className="w-full h-20 rounded object-cover mb-2"
                                                />
                                                <h4 className="font-medium text-sm">{template.name}</h4>
                                                <p className="text-xs text-zinc-400">{template.blocks} blocks</p>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col">
                    {/* Page Header */}
                    {selectedPageData && (
                        <div className="border-b border-zinc-800 p-4 bg-zinc-900/20">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div>
                                        <h2 className="text-xl font-bold">{selectedPageData.name}</h2>
                                        <p className="text-sm text-zinc-400">{selectedPageData.slug}</p>
                                    </div>
                                    <Badge
                                        variant={selectedPageData.status === 'published' ? 'default' : 'secondary'}
                                        className={
                                            selectedPageData.status === 'published'
                                                ? 'bg-green-900/30 text-green-400'
                                                : 'bg-yellow-900/30 text-yellow-400'
                                        }
                                    >
                                        {selectedPageData.status}
                                    </Badge>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button variant="outline" size="sm">
                                        <Settings className="h-4 w-4 mr-2" />
                                        Page Settings
                                    </Button>
                                    <Button variant="outline" size="sm">
                                        <Eye className="h-4 w-4 mr-2" />
                                        Preview
                                    </Button>
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                        <Globe className="h-4 w-4 mr-2" />
                                        Publish
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Canvas Area */}
                    <div className="flex-1 overflow-auto">
                        <div className="p-6">
                            <AnimatePresence mode="wait">
                                {isPreviewMode ? (
                                    /* Enhanced Live Preview Mode */
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                                <h2 className="text-xl font-semibold">Live Preview - {selectedPageData?.name}</h2>
                                                <Badge variant="secondary" className="bg-green-900/30 text-green-400">
                                                    <Eye className="h-3 w-3 mr-1" />
                                                    Live
                                                </Badge>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setIsPreviewMode(false)}
                                                className="gap-2"
                                            >
                                                <Edit3 className="h-4 w-4" />
                                                Edit Mode
                                            </Button>
                                        </div>

                                        {/* Preview Container with Device Frame */}
                                        <div className={`mx-auto transition-all duration-300 ${viewMode === 'desktop' ? 'max-w-full' :
                                                viewMode === 'tablet' ? 'max-w-3xl' : 'max-w-sm'
                                            }`}>
                                            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-zinc-700/50">
                                                {/* Device Frame Header */}
                                                <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 border-b">
                                                    <div className="flex gap-1">
                                                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                                    </div>
                                                    <div className="flex-1 text-center text-sm text-gray-600">
                                                        neocitystays.com{selectedPageData?.slug}
                                                    </div>
                                                </div>

                                                {/* Homepage Content Preview */}
                                                <div className="relative">
                                                    {/* Hero Section */}
                                                    <div className="relative h-[500px] bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 overflow-hidden">
                                                        {/* Background Effects */}
                                                        <div className="absolute inset-0">
                                                            <div className="absolute top-20 left-10 w-32 h-32 bg-violet-400/20 rounded-full blur-3xl animate-pulse"></div>
                                                            <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                                                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl"></div>
                                                        </div>

                                                        {/* Content */}
                                                        <div className="relative z-10 h-full flex items-center justify-center text-center text-white p-8">
                                                            <div className="max-w-4xl space-y-6">
                                                                <motion.h1
                                                                    initial={{ opacity: 0, y: 20 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white via-violet-200 to-purple-200 bg-clip-text text-transparent"
                                                                >
                                                                    Welcome to NeoCityStays
                                                                </motion.h1>
                                                                <motion.p
                                                                    initial={{ opacity: 0, y: 20 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    transition={{ delay: 0.2 }}
                                                                    className="text-xl md:text-2xl text-violet-100 leading-relaxed"
                                                                >
                                                                    Experience the future of hospitality with cutting-edge amenities,<br />
                                                                    AI-powered services, and extraordinary comfort
                                                                </motion.p>
                                                                <motion.div
                                                                    initial={{ opacity: 0, y: 20 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    transition={{ delay: 0.4 }}
                                                                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                                                                >
                                                                    <button className="group px-8 py-4 bg-violet-600 hover:bg-violet-700 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-violet-500/25">
                                                                        <span className="flex items-center gap-2">
                                                                            Book Now
                                                                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                                                        </span>
                                                                    </button>
                                                                    <button className="px-8 py-4 border-2 border-violet-400 hover:bg-violet-400/20 rounded-xl font-semibold text-lg transition-all duration-300 backdrop-blur-sm">
                                                                        Explore Hotels
                                                                    </button>
                                                                </motion.div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Features Section */}
                                                    <div className="py-16 px-8 bg-gray-50">
                                                        <div className="max-w-6xl mx-auto">
                                                            <div className="text-center mb-12">
                                                                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                                                    Future-Ready Amenities
                                                                </h2>
                                                                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                                                    Discover revolutionary features that redefine luxury accommodation
                                                                </p>
                                                            </div>
                                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                                {[
                                                                    {
                                                                        title: 'Smart Rooms',
                                                                        desc: 'AI-powered environment control with voice commands and automatic adjustments',
                                                                        icon: '🏠',
                                                                        color: 'from-blue-500 to-cyan-500'
                                                                    },
                                                                    {
                                                                        title: 'Virtual Concierge',
                                                                        desc: '24/7 digital assistance with instant responses and personalized recommendations',
                                                                        icon: '🤖',
                                                                        color: 'from-purple-500 to-pink-500'
                                                                    },
                                                                    {
                                                                        title: 'Eco-Friendly Tech',
                                                                        desc: 'Sustainable technology with carbon-neutral operations and green energy',
                                                                        icon: '🌱',
                                                                        color: 'from-green-500 to-emerald-500'
                                                                    }
                                                                ].map((feature, idx) => (
                                                                    <motion.div
                                                                        key={idx}
                                                                        initial={{ opacity: 0, y: 20 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        transition={{ delay: idx * 0.1 }}
                                                                        className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                                                                    >
                                                                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                                                                            {feature.icon}
                                                                        </div>
                                                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                                                        <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                                                                    </motion.div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Stats Section */}
                                                    <div className="py-16 bg-white">
                                                        <div className="max-w-6xl mx-auto px-8">
                                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                                                                {[
                                                                    { label: 'Hotels Worldwide', value: '500+' },
                                                                    { label: 'Happy Guests', value: '1M+' },
                                                                    { label: 'Countries', value: '50+' },
                                                                    { label: 'Satisfaction Rate', value: '99%' }
                                                                ].map((stat, idx) => (
                                                                    <div key={idx} className="text-center">
                                                                        <div className="text-4xl font-bold text-violet-600 mb-2">{stat.value}</div>
                                                                        <div className="text-gray-600 font-medium">{stat.label}</div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* CTA Section */}
                                                    <div className="py-16 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white text-center relative overflow-hidden">
                                                        <div className="absolute inset-0 bg-black/10"></div>
                                                        <div className="relative z-10 max-w-4xl mx-auto px-8">
                                                            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready for the Future?</h2>
                                                            <p className="text-xl md:text-2xl mb-8 text-violet-100">
                                                                Join thousands of satisfied guests and experience hospitality reimagined
                                                            </p>
                                                            <button className="group px-10 py-4 bg-white text-violet-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                                                                <span className="flex items-center gap-2">
                                                                    Start Your Journey
                                                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    /* Enhanced Visual Editor Mode */
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        className="space-y-6"
                                    >
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-3 h-3 bg-violet-400 rounded-full animate-pulse"></div>
                                                <h2 className="text-xl font-semibold">Visual Editor - {selectedPageData?.name}</h2>
                                                <Badge variant="secondary" className="bg-violet-900/30 text-violet-400">
                                                    <Edit3 className="h-3 w-3 mr-1" />
                                                    Editing
                                                </Badge>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setIsPreviewMode(true)}
                                                    className="gap-2"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                    Preview
                                                </Button>
                                                <Button variant="outline" size="sm" className="gap-2">
                                                    <Download className="h-4 w-4" />
                                                    Export
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Page Canvas */}
                                        <Card className="border-zinc-800 bg-zinc-900/30 min-h-[700px]">
                                            <CardContent className="p-6">
                                                <div className="space-y-4">
                                                    {selectedPageData?.blocks.length === 0 ? (
                                                        /* Empty State */
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            className="border-2 border-dashed border-zinc-700 rounded-xl p-16 text-center hover:border-violet-500 transition-all duration-300 cursor-pointer group"
                                                        >
                                                            <div className="space-y-6">
                                                                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                                                    <Layers className="h-10 w-10 text-violet-400" />
                                                                </div>
                                                                <div>
                                                                    <h3 className="text-2xl font-bold text-white mb-3">
                                                                        Start Building Your Homepage
                                                                    </h3>
                                                                    <p className="text-zinc-400 text-lg mb-6 max-w-md mx-auto">
                                                                        Create a stunning homepage by adding blocks from the sidebar or choosing a pre-built template
                                                                    </p>
                                                                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                                                        <Button className="bg-violet-600 hover:bg-violet-700 text-lg px-8 py-3">
                                                                            <Layout className="h-5 w-5 mr-2" />
                                                                            Choose Template
                                                                        </Button>
                                                                        <Button variant="outline" className="text-lg px-8 py-3">
                                                                            <Plus className="h-5 w-5 mr-2" />
                                                                            Add Block
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ) : (
                                                        /* Page Blocks */
                                                        <div className="space-y-6">
                                                            {/* Hero Block */}
                                                            <motion.div
                                                                className={`group relative rounded-xl border transition-all duration-300 overflow-hidden ${selectedBlock === 'hero-1' ? 'border-violet-500 ring-2 ring-violet-500/20' : 'border-zinc-700 hover:border-violet-500/50'
                                                                    }`}
                                                                whileHover={{ scale: 1.005 }}
                                                                onClick={() => setSelectedBlock(selectedBlock === 'hero-1' ? null : 'hero-1')}
                                                            >
                                                                {/* Block Header */}
                                                                <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                                                                    <span className="text-sm font-medium text-white">Hero Section</span>
                                                                    <Badge variant="secondary" className="text-xs bg-violet-900/50 text-violet-300">Hero</Badge>
                                                                </div>

                                                                {/* Block Actions */}
                                                                <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <DropdownMenu>
                                                                        <DropdownMenuTrigger asChild>
                                                                            <Button variant="outline" size="sm" className="bg-black/80 backdrop-blur-sm border-zinc-600">
                                                                                <MoreHorizontal className="h-4 w-4" />
                                                                            </Button>
                                                                        </DropdownMenuTrigger>
                                                                        <DropdownMenuContent align="end">
                                                                            <DropdownMenuItem>
                                                                                <Edit3 className="h-4 w-4 mr-2" />
                                                                                Edit Content
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem>
                                                                                <Palette className="h-4 w-4 mr-2" />
                                                                                Styling
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem>
                                                                                <Copy className="h-4 w-4 mr-2" />
                                                                                Duplicate
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem>
                                                                                <ChevronUp className="h-4 w-4 mr-2" />
                                                                                Move Up
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuItem>
                                                                                <ChevronDown className="h-4 w-4 mr-2" />
                                                                                Move Down
                                                                            </DropdownMenuItem>
                                                                            <DropdownMenuSeparator />
                                                                            <DropdownMenuItem className="text-red-400">
                                                                                <Trash2 className="h-4 w-4 mr-2" />
                                                                                Delete
                                                                            </DropdownMenuItem>
                                                                        </DropdownMenuContent>
                                                                    </DropdownMenu>
                                                                </div>

                                                                {/* Block Content */}
                                                                <div className="relative bg-gradient-to-br from-violet-900/80 to-purple-900/80 p-8 min-h-[300px] flex items-center justify-center">
                                                                    <div className="text-center text-white space-y-4 max-w-2xl">
                                                                        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">
                                                                            Welcome to NeoCityStays
                                                                        </h1>
                                                                        <p className="text-lg text-violet-100">
                                                                            Experience the future of hospitality with cutting-edge amenities
                                                                        </p>
                                                                        <div className="flex gap-3 justify-center">
                                                                            <div className="px-6 py-2 bg-violet-600 rounded-lg text-sm font-medium">Book Now</div>
                                                                            <div className="px-6 py-2 border border-violet-400 rounded-lg text-sm font-medium">Learn More</div>
                                                                        </div>
                                                                    </div>
                                                                    {/* Background decorations */}
                                                                    <div className="absolute top-10 left-10 w-20 h-20 bg-violet-400/20 rounded-full blur-xl"></div>
                                                                    <div className="absolute bottom-10 right-10 w-24 h-24 bg-purple-400/20 rounded-full blur-xl"></div>
                                                                </div>
                                                            </motion.div>

                                                            {/* Features Block */}
                                                            <motion.div
                                                                className={`group relative rounded-xl border transition-all duration-300 ${selectedBlock === 'features-1' ? 'border-violet-500 ring-2 ring-violet-500/20' : 'border-zinc-700 hover:border-violet-500/50'
                                                                    }`}
                                                                whileHover={{ scale: 1.005 }}
                                                                onClick={() => setSelectedBlock(selectedBlock === 'features-1' ? null : 'features-1')}
                                                            >
                                                                <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                                                    <span className="text-sm font-medium text-white">Features Grid</span>
                                                                    <Badge variant="secondary" className="text-xs bg-green-900/50 text-green-300">Content</Badge>
                                                                </div>

                                                                <div className="p-6 bg-zinc-800/50">
                                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                                        {[
                                                                            { title: 'Smart Rooms', icon: '🏠', color: 'bg-blue-500/20' },
                                                                            { title: 'Virtual Concierge', icon: '🤖', color: 'bg-purple-500/20' },
                                                                            { title: 'Eco-Friendly', icon: '🌱', color: 'bg-green-500/20' }
                                                                        ].map((feature, idx) => (
                                                                            <div key={idx} className="bg-zinc-800/70 rounded-lg p-4 text-center">
                                                                                <div className={`w-12 h-12 ${feature.color} rounded-full mx-auto mb-3 flex items-center justify-center text-lg`}>
                                                                                    {feature.icon}
                                                                                </div>
                                                                                <h3 className="text-sm font-semibold text-white mb-2">{feature.title}</h3>
                                                                                <p className="text-xs text-zinc-400">Advanced technology for your comfort</p>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </motion.div>

                                                            {/* CTA Block */}
                                                            <motion.div
                                                                className={`group relative rounded-xl border transition-all duration-300 ${selectedBlock === 'cta-1' ? 'border-violet-500 ring-2 ring-violet-500/20' : 'border-zinc-700 hover:border-violet-500/50'
                                                                    }`}
                                                                whileHover={{ scale: 1.005 }}
                                                                onClick={() => setSelectedBlock(selectedBlock === 'cta-1' ? null : 'cta-1')}
                                                            >
                                                                <div className="absolute top-3 left-3 z-10 flex items-center gap-2 bg-black/80 backdrop-blur-sm rounded-lg px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                                                    <span className="text-sm font-medium text-white">Call to Action</span>
                                                                    <Badge variant="secondary" className="text-xs bg-yellow-900/50 text-yellow-300">CTA</Badge>
                                                                </div>

                                                                <div className="p-8 bg-gradient-to-r from-violet-600/80 to-purple-600/80 text-center text-white rounded-xl">
                                                                    <h3 className="text-2xl font-bold mb-3">Ready to Experience the Future?</h3>
                                                                    <p className="text-violet-100 mb-6">Join thousands of satisfied guests worldwide</p>
                                                                    <div className="px-6 py-3 bg-white text-violet-600 rounded-lg inline-block font-semibold">
                                                                        Start Your Journey
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        </div>
                                                    )}

                                                    {/* Add Block Zone */}
                                                    <motion.div
                                                        className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center hover:border-violet-500 transition-all duration-300 cursor-pointer group"
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        <div className="flex flex-col items-center gap-3">
                                                            <div className="w-12 h-12 bg-violet-900/20 rounded-full flex items-center justify-center group-hover:bg-violet-600/20 transition-colors">
                                                                <Plus className="h-6 w-6 text-violet-400" />
                                                            </div>
                                                            <span className="text-zinc-400 group-hover:text-violet-300 transition-colors font-medium">
                                                                Add New Block
                                                            </span>
                                                        </div>
                                                    </motion.div>
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Editor Actions */}
                                        <div className="flex justify-between items-center pt-4 border-t border-zinc-800">
                                            <div className="flex items-center gap-2">
                                                <Button variant="outline" size="sm" className="gap-2">
                                                    <Undo2 className="h-4 w-4" />
                                                    Undo
                                                </Button>
                                                <Button variant="outline" size="sm" className="gap-2">
                                                    <Redo2 className="h-4 w-4" />
                                                    Redo
                                                </Button>
                                                <div className="h-6 w-px bg-zinc-700 mx-2"></div>
                                                <Button variant="outline" size="sm" className="gap-2">
                                                    <Copy className="h-4 w-4" />
                                                    Copy Page
                                                </Button>
                                                <Button variant="outline" size="sm" className="gap-2">
                                                    <Share2 className="h-4 w-4" />
                                                    Share
                                                </Button>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button variant="outline" size="sm" className="gap-2">
                                                    <FileText className="h-4 w-4" />
                                                    Save Draft
                                                </Button>
                                                <Button className="bg-violet-600 hover:bg-violet-700 gap-2" size="sm">
                                                    <Globe className="h-4 w-4" />
                                                    Publish
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Right Properties Panel */}
                <div className="w-80 border-l border-zinc-800 bg-zinc-900/30 p-4 space-y-4">
                    <div className="space-y-4">
                        <h3 className="font-semibold">Block Properties</h3>

                        {selectedBlock ? (
                            <div className="space-y-4">
                                <Card className="border-zinc-800">
                                    <CardHeader>
                                        <CardTitle className="text-sm">Block Settings</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">Block Name</label>
                                            <Input
                                                defaultValue="Hero Section"
                                                className="bg-zinc-900/50 border-zinc-800"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium mb-2 block">Visibility</label>
                                            <div className="flex items-center gap-2">
                                                <Switch defaultChecked />
                                                <span className="text-sm">Visible</span>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium mb-2 block">Background Color</label>
                                            <div className="flex gap-2">
                                                <Input
                                                    defaultValue="#000000"
                                                    className="bg-zinc-900/50 border-zinc-800"
                                                />
                                                <Button size="sm" variant="outline">
                                                    <Palette className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium mb-2 block">Custom CSS</label>
                                            <Textarea
                                                placeholder="Enter custom CSS..."
                                                className="bg-zinc-900/50 border-zinc-800 font-mono text-xs"
                                                rows={4}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-zinc-800">
                                    <CardHeader>
                                        <CardTitle className="text-sm">Content Settings</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium mb-2 block">Heading Text</label>
                                            <Input
                                                defaultValue="Welcome to NeoCityStays"
                                                className="bg-zinc-900/50 border-zinc-800"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium mb-2 block">Description</label>
                                            <Textarea
                                                defaultValue="Experience the future of hospitality"
                                                className="bg-zinc-900/50 border-zinc-800"
                                                rows={3}
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium mb-2 block">Button Text</label>
                                            <Input
                                                defaultValue="Get Started"
                                                className="bg-zinc-900/50 border-zinc-800"
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium mb-2 block">Button Link</label>
                                            <Input
                                                defaultValue="/booking"
                                                className="bg-zinc-900/50 border-zinc-800"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ) : (
                            <Card className="border-zinc-800 border-dashed">
                                <CardContent className="p-6 text-center">
                                    <Target className="h-8 w-8 mx-auto text-zinc-400 mb-2" />
                                    <p className="text-sm text-zinc-400">
                                        Select a block to edit its properties
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Analytics Preview */}
                        <Card className="border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-sm flex items-center gap-2">
                                    <BarChart3 className="h-4 w-4" />
                                    Performance Insights
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-400">Page Load Time</span>
                                    <span className="text-green-400">1.2s</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-400">Total Blocks</span>
                                    <span>8</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-400">Mobile Score</span>
                                    <span className="text-green-400">95/100</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-400">SEO Score</span>
                                    <span className="text-yellow-400">78/100</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentManagement;
