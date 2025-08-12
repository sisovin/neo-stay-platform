import React, { useState } from "react";
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
    Building,
    Phone,
    Mail,
    Shield,
    X,
    Camera,
    ImageIcon
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
import { Label } from "../ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { motion } from "framer-motion";

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

// New interfaces for General Options and Logo
interface GeneralOptions {
    aboutUs: string;
    hotelRules: string;
    cancellationPolicy: string;
    termsOfService: string;
    privacyPolicy: string;
    contactInfo: {
        hotline: string;
        email: string;
        address: string;
        emergencyContact: string;
        businessHours: string;
    };
    socialMedia: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
        linkedin?: string;
        youtube?: string;
    };
    companyInfo: {
        name: string;
        tagline: string;
        description: string;
        foundedYear: string;
        licenseNumber: string;
    };
}

interface LogoSettings {
    mainLogo: string;
    darkLogo: string;
    favicon: string;
    logoText: string;
    showLogoText: boolean;
    logoPosition: 'left' | 'center' | 'right';
    logoSize: 'small' | 'medium' | 'large';
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
    const [showGeneralOptions, setShowGeneralOptions] = useState(false);
    const [showLogoSettings, setShowLogoSettings] = useState(false);

    // General Options State
    const [generalOptions, setGeneralOptions] = useState<GeneralOptions>({
        aboutUs: "NeoCityStays is revolutionizing the hospitality industry with cutting-edge technology and unparalleled service. We offer futuristic accommodations that blend comfort with innovation, creating extraordinary experiences for our guests in the heart of Night City.",
        hotelRules: "1. Check-in: 3:00 PM | Check-out: 11:00 AM\n2. No smoking in rooms (designated smoking areas available)\n3. Pets are welcome with prior approval\n4. Quiet hours: 10:00 PM - 8:00 AM\n5. Maximum occupancy as stated per room\n6. Valid ID required at check-in\n7. Damage to property will be charged to guest account\n8. Use of recreational substances is prohibited\n9. Visitors must be registered at the front desk\n10. Emergency exits must remain unobstructed",
        cancellationPolicy: "Free cancellation up to 24 hours before check-in. Cancellations made within 24 hours of check-in will be charged one night's stay. No-shows will be charged the full reservation amount. Special events and holidays may have different cancellation policies. Travel insurance is recommended for unexpected cancellations.",
        termsOfService: "By using our services, you agree to our terms and conditions. All reservations are subject to availability and confirmation. Prices are subject to change without notice. We reserve the right to refuse service to anyone.",
        privacyPolicy: "We are committed to protecting your privacy. Personal information collected is used solely for reservation and service purposes. We do not share your information with third parties without consent.",
        contactInfo: {
            hotline: "+1 (555) NEO-STAY",
            email: "info@neocitystays.com",
            address: "2077 Cyberpunk Avenue, Night City, NC 12345",
            emergencyContact: "+1 (555) 911-HELP",
            businessHours: "24/7 Customer Support Available"
        },
        socialMedia: {
            facebook: "https://facebook.com/neocitystays",
            twitter: "https://twitter.com/neocitystays",
            instagram: "https://instagram.com/neocitystays",
            linkedin: "https://linkedin.com/company/neocitystays",
            youtube: "https://youtube.com/neocitystays"
        },
        companyInfo: {
            name: "NeoCityStays",
            tagline: "Future of Hospitality",
            description: "Experience extraordinary stays with cutting-edge amenities and unparalleled service.",
            foundedYear: "2077",
            licenseNumber: "HTL-2077-NC-001"
        }
    });

    // Logo Settings State
    const [logoSettings, setLogoSettings] = useState<LogoSettings>({
        mainLogo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=60&fit=crop",
        darkLogo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=60&fit=crop",
        favicon: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=32&h=32&fit=crop",
        logoText: "NeoCityStays",
        showLogoText: true,
        logoPosition: 'left',
        logoSize: 'medium'
    });

    // Mock data (existing)
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

    const handleSaveGeneralOptions = () => {
        // Here you would typically save to your backend
        console.log('Saving general options:', generalOptions);
        setShowGeneralOptions(false);
    };

    const handleSaveLogoSettings = () => {
        // Here you would typically save to your backend
        console.log('Saving logo settings:', logoSettings);
        setShowLogoSettings(false);
    };

    const handleUpdateGeneralOption = (field: string, value: string, subField?: string) => {
        setGeneralOptions(prev => {
            if (subField) {
                const parent = prev[field as keyof GeneralOptions];
                if (parent && typeof parent === "object" && !Array.isArray(parent)) {
                    return {
                        ...prev,
                        [field]: {
                            ...parent,
                            [subField]: value
                        }
                    };
                }
                // fallback: just set the field as an object with the subField
                return {
                    ...prev,
                    [field]: {
                        [subField]: value
                    }
                };
            }
            return {
                ...prev,
                [field]: value
            };
        });
    };

    const handleUpdateLogoSetting = (field: keyof LogoSettings, value: any) => {
        setLogoSettings(prev => ({
            ...prev,
            [field]: value
        }));
    };

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

                        {/* Tabs - Enhanced with new options */}
                        <div className="flex items-center gap-1 bg-zinc-900/50 rounded-lg p-1">
                            <Button
                                variant={activeTab === 'pages' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setActiveTab('pages')}
                                className="text-xs"
                            >
                                <File className="h-4 w-4 mr-1" />
                                Pages
                            </Button>
                            <Button
                                variant={activeTab === 'blocks' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setActiveTab('blocks')}
                                className="text-xs"
                            >
                                <Layers className="h-4 w-4 mr-1" />
                                Blocks
                            </Button>
                            <Button
                                variant={activeTab === 'templates' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setActiveTab('templates')}
                                className="text-xs"
                            >
                                <Layout className="h-4 w-4 mr-1" />
                                Templates
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* New Settings Buttons */}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowGeneralOptions(true)}
                            className="border-zinc-700 text-zinc-200 hover:bg-zinc-800"
                        >
                            <Building className="h-4 w-4 mr-2" />
                            General Options
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowLogoSettings(true)}
                            className="border-zinc-700 text-zinc-200 hover:bg-zinc-800"
                        >
                            <ImageIcon className="h-4 w-4 mr-2" />
                            Logo & Branding
                        </Button>

                        {/* Preview Mode */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-zinc-400">Preview</span>
                            <Switch
                                checked={isPreviewMode}
                                onCheckedChange={setIsPreviewMode}
                            />
                        </div>

                        {/* View Mode */}
                        <div className="flex items-center gap-1 bg-zinc-900/50 rounded-lg p-1">
                            <Button
                                variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setViewMode('desktop')}
                            >
                                <Monitor className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={viewMode === 'tablet' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setViewMode('tablet')}
                            >
                                <Tablet className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setViewMode('mobile')}
                            >
                                <Smartphone className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" className="border-zinc-700">
                                <Download className="h-4 w-4 mr-1" />
                                Export
                            </Button>
                            <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
                                <Save className="h-4 w-4 mr-1" />
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
                            {/* Pages content */}
                            <div className="space-y-2">
                                <h3 className="font-semibold">Website Pages</h3>
                                <div className="space-y-1">
                                    {pages.map(page => (
                                        <div
                                            key={page.id}
                                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                                                selectedPage === page.id 
                                                    ? 'bg-violet-600/20 border border-violet-600/50' 
                                                    : 'hover:bg-zinc-800/50 border border-transparent'
                                            }`}
                                            onClick={() => setSelectedPage(page.id)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">{page.name}</span>
                                                <Badge 
                                                    variant={page.status === 'published' ? 'default' : 'secondary'}
                                                    className="text-xs"
                                                >
                                                    {page.status}
                                                </Badge>
                                            </div>
                                            <div className="text-xs text-zinc-400 mt-1">{page.slug}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'blocks' && (
                        <div className="flex-1 p-4 space-y-4">
                            {/* Search and Filter */}
                            <div className="space-y-3">
                                <div className="relative">
                                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                                    <Input
                                        placeholder="Search blocks..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 bg-zinc-800 border-zinc-700"
                                    />
                                </div>
                                
                                <Select value={filterCategory} onValueChange={setFilterCategory}>
                                    <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {blockCategories.map(category => (
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

                            {/* Blocks List */}
                            <div className="space-y-2">
                                {filteredBlocks.map(block => (
                                    <div
                                        key={block.id}
                                        className="p-3 rounded-lg border border-zinc-700 hover:border-zinc-600 cursor-pointer transition-colors"
                                        onClick={() => setSelectedBlock(block.id)}
                                    >
                                        <div className="flex items-start gap-3">
                                            {block.thumbnail && (
                                                <img 
                                                    src={block.thumbnail} 
                                                    alt={block.name}
                                                    className="w-12 h-8 object-cover rounded border border-zinc-600"
                                                />
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-sm truncate">{block.name}</h4>
                                                <p className="text-xs text-zinc-400 line-clamp-2 mt-1">
                                                    {block.description}
                                                </p>
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {block.tags.slice(0, 2).map(tag => (
                                                        <Badge key={tag} variant="outline" className="text-xs">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'templates' && (
                        <div className="flex-1 p-4 space-y-4">
                            <div className="space-y-2">
                                <h3 className="font-semibold">Page Templates</h3>
                                <p className="text-sm text-zinc-400">Pre-built page layouts for quick setup</p>
                                
                                <div className="space-y-2">
                                    {['Homepage Template', 'About Page Template', 'Contact Template', 'Booking Template'].map(template => (
                                        <div key={template} className="p-3 rounded-lg border border-zinc-700 hover:border-zinc-600 cursor-pointer">
                                            <h4 className="font-medium text-sm">{template}</h4>
                                            <p className="text-xs text-zinc-400 mt-1">Ready-to-use layout</p>
                                        </div>
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
                                <div>
                                    <h2 className="text-lg font-semibold">{selectedPageData.name}</h2>
                                    <p className="text-sm text-zinc-400">{selectedPageData.slug}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button size="sm" variant="outline">
                                        <Eye className="h-4 w-4 mr-1" />
                                        Preview
                                    </Button>
                                    <Button size="sm">
                                        <Save className="h-4 w-4 mr-1" />
                                        Publish
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Canvas Area */}
                    <div className="flex-1 overflow-auto">
                        <div className="p-6">
                            <div className="bg-zinc-900/50 rounded-lg border border-zinc-800 min-h-[600px] flex items-center justify-center">
                                <div className="text-center text-zinc-400">
                                    <Layout className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>Visual page builder canvas</p>
                                    <p className="text-sm mt-1">Drag blocks here to build your page</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Properties Panel */}
                <div className="w-80 border-l border-zinc-800 bg-zinc-900/30 p-4 space-y-4">
                    <div className="space-y-4">
                        <h3 className="font-semibold">Block Properties</h3>

                        {selectedBlock ? (
                            <div className="space-y-4">
                                <p className="text-sm text-zinc-400">Configure the selected block</p>
                                {/* Block-specific properties would go here */}
                            </div>
                        ) : (
                            <p className="text-sm text-zinc-400">Select a block to edit its properties</p>
                        )}

                        {/* Page Settings */}
                        <Card className="border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-sm">Page Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {selectedPageData && (
                                    <>
                                        <div className="space-y-2">
                                            <Label className="text-xs">SEO Title</Label>
                                            <Input 
                                                defaultValue={selectedPageData.seoTitle}
                                                className="bg-zinc-800 border-zinc-700 text-xs"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs">SEO Description</Label>
                                            <Textarea 
                                                defaultValue={selectedPageData.seoDescription}
                                                className="bg-zinc-800 border-zinc-700 text-xs resize-none"
                                                rows={3}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs">Page Status</Label>
                                            <Select defaultValue={selectedPageData.status}>
                                                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-xs">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="draft">Draft</SelectItem>
                                                    <SelectItem value="published">Published</SelectItem>
                                                    <SelectItem value="archived">Archived</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* General Options Dialog */}
            <Dialog open={showGeneralOptions} onOpenChange={setShowGeneralOptions}>
                <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-lg flex items-center gap-2">
                            <Building className="h-5 w-5" />
                            General Options & Team Settings
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Update your website's general information, policies, and contact details
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        {/* Company Information */}
                        <Card className="border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-base">Company Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Company Name</Label>
                                        <Input
                                            value={generalOptions.companyInfo.name}
                                            onChange={(e) => handleUpdateGeneralOption('companyInfo', e.target.value, 'name')}
                                            className="bg-zinc-800 border-zinc-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Tagline</Label>
                                        <Input
                                            value={generalOptions.companyInfo.tagline}
                                            onChange={(e) => handleUpdateGeneralOption('companyInfo', e.target.value, 'tagline')}
                                            className="bg-zinc-800 border-zinc-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Founded Year</Label>
                                        <Input
                                            value={generalOptions.companyInfo.foundedYear}
                                            onChange={(e) => handleUpdateGeneralOption('companyInfo', e.target.value, 'foundedYear')}
                                            className="bg-zinc-800 border-zinc-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>License Number</Label>
                                        <Input
                                            value={generalOptions.companyInfo.licenseNumber}
                                            onChange={(e) => handleUpdateGeneralOption('companyInfo', e.target.value, 'licenseNumber')}
                                            className="bg-zinc-800 border-zinc-700"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Company Description</Label>
                                    <Textarea
                                        value={generalOptions.companyInfo.description}
                                        onChange={(e) => handleUpdateGeneralOption('companyInfo', e.target.value, 'description')}
                                        className="bg-zinc-800 border-zinc-700"
                                        rows={3}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Information */}
                        <Card className="border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    Contact Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Hotline</Label>
                                        <Input
                                            value={generalOptions.contactInfo.hotline}
                                            onChange={(e) => handleUpdateGeneralOption('contactInfo', e.target.value, 'hotline')}
                                            className="bg-zinc-800 border-zinc-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email</Label>
                                        <Input
                                            value={generalOptions.contactInfo.email}
                                            onChange={(e) => handleUpdateGeneralOption('contactInfo', e.target.value, 'email')}
                                            className="bg-zinc-800 border-zinc-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Emergency Contact</Label>
                                        <Input
                                            value={generalOptions.contactInfo.emergencyContact}
                                            onChange={(e) => handleUpdateGeneralOption('contactInfo', e.target.value, 'emergencyContact')}
                                            className="bg-zinc-800 border-zinc-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Business Hours</Label>
                                        <Input
                                            value={generalOptions.contactInfo.businessHours}
                                            onChange={(e) => handleUpdateGeneralOption('contactInfo', e.target.value, 'businessHours')}
                                            className="bg-zinc-800 border-zinc-700"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Address</Label>
                                    <Textarea
                                        value={generalOptions.contactInfo.address}
                                        onChange={(e) => handleUpdateGeneralOption('contactInfo', e.target.value, 'address')}
                                        className="bg-zinc-800 border-zinc-700"
                                        rows={2}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* About Us */}
                        <Card className="border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-base">About Us</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Textarea
                                    value={generalOptions.aboutUs}
                                    onChange={(e) => handleUpdateGeneralOption('aboutUs', e.target.value)}
                                    className="bg-zinc-800 border-zinc-700"
                                    rows={6}
                                    placeholder="Tell your story..."
                                />
                            </CardContent>
                        </Card>

                        {/* Hotel Rules */}
                        <Card className="border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-base flex items-center gap-2">
                                    <Shield className="h-4 w-4" />
                                    Hotel Rules
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Textarea
                                    value={generalOptions.hotelRules}
                                    onChange={(e) => handleUpdateGeneralOption('hotelRules', e.target.value)}
                                    className="bg-zinc-800 border-zinc-700"
                                    rows={8}
                                    placeholder="List your hotel rules..."
                                />
                            </CardContent>
                        </Card>

                        {/* Cancellation Policy */}
                        <Card className="border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-base">Cancellation Policy</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Textarea
                                    value={generalOptions.cancellationPolicy}
                                    onChange={(e) => handleUpdateGeneralOption('cancellationPolicy', e.target.value)}
                                    className="bg-zinc-800 border-zinc-700"
                                    rows={5}
                                    placeholder="Define your cancellation policy..."
                                />
                            </CardContent>
                        </Card>

                        {/* Social Media */}
                        <Card className="border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-base">Social Media Links</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Facebook</Label>
                                        <Input
                                            value={generalOptions.socialMedia.facebook || ''}
                                            onChange={(e) => handleUpdateGeneralOption('socialMedia', e.target.value, 'facebook')}
                                            className="bg-zinc-800 border-zinc-700"
                                            placeholder="https://facebook.com/yourpage"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Twitter</Label>
                                        <Input
                                            value={generalOptions.socialMedia.twitter || ''}
                                            onChange={(e) => handleUpdateGeneralOption('socialMedia', e.target.value, 'twitter')}
                                            className="bg-zinc-800 border-zinc-700"
                                            placeholder="https://twitter.com/yourhandle"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Instagram</Label>
                                        <Input
                                            value={generalOptions.socialMedia.instagram || ''}
                                            onChange={(e) => handleUpdateGeneralOption('socialMedia', e.target.value, 'instagram')}
                                            className="bg-zinc-800 border-zinc-700"
                                            placeholder="https://instagram.com/yourpage"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>LinkedIn</Label>
                                        <Input
                                            value={generalOptions.socialMedia.linkedin || ''}
                                            onChange={(e) => handleUpdateGeneralOption('socialMedia', e.target.value, 'linkedin')}
                                            className="bg-zinc-800 border-zinc-700"
                                            placeholder="https://linkedin.com/company/yourcompany"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t border-zinc-800">
                        <Button
                            variant="outline"
                            onClick={() => setShowGeneralOptions(false)}
                            className="border-zinc-700 text-zinc-200 hover:bg-zinc-800"
                        >
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSaveGeneralOptions}
                            className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600"
                        >
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Logo Settings Dialog */}
            <Dialog open={showLogoSettings} onOpenChange={setShowLogoSettings}>
                <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-lg flex items-center gap-2">
                            <ImageIcon className="h-5 w-5" />
                            Logo & Branding Settings
                        </DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Update your website logo, favicon, and branding elements
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        {/* Logo Preview */}
                        <Card className="border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-base">Logo Preview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-center p-8 bg-zinc-800/50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={logoSettings.mainLogo}
                                            alt="Logo"
                                            className={`object-contain ${
                                                logoSettings.logoSize === 'small' ? 'h-8' :
                                                logoSettings.logoSize === 'medium' ? 'h-12' : 'h-16'
                                            }`}
                                        />
                                        {logoSettings.showLogoText && (
                                            <span className="font-bold text-xl">{logoSettings.logoText}</span>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Logo Images */}
                        <Card className="border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-base">Logo Images</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Main Logo (Light Theme)</Label>
                                    <Input
                                        value={logoSettings.mainLogo}
                                        onChange={(e) => handleUpdateLogoSetting('mainLogo', e.target.value)}
                                        className="bg-zinc-800 border-zinc-700"
                                        placeholder="https://example.com/logo.png"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Dark Logo (Dark Theme)</Label>
                                    <Input
                                        value={logoSettings.darkLogo}
                                        onChange={(e) => handleUpdateLogoSetting('darkLogo', e.target.value)}
                                        className="bg-zinc-800 border-zinc-700"
                                        placeholder="https://example.com/logo-dark.png"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Favicon (32x32)</Label>
                                    <Input
                                        value={logoSettings.favicon}
                                        onChange={(e) => handleUpdateLogoSetting('favicon', e.target.value)}
                                        className="bg-zinc-800 border-zinc-700"
                                        placeholder="https://example.com/favicon.ico"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Logo Text Settings */}
                        <Card className="border-zinc-800">
                            <CardHeader>
                                <CardTitle className="text-base">Logo Text & Display</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Logo Text</Label>
                                    <Input
                                        value={logoSettings.logoText}
                                        onChange={(e) => handleUpdateLogoSetting('logoText', e.target.value)}
                                        className="bg-zinc-800 border-zinc-700"
                                        placeholder="Your brand name"
                                    />
                                </div>
                                
                                <div className="flex items-center space-x-2">
                                    <Switch
                                        checked={logoSettings.showLogoText}
                                        onCheckedChange={(checked) => handleUpdateLogoSetting('showLogoText', checked)}
                                    />
                                    <Label>Show logo text alongside image</Label>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Logo Position</Label>
                                        <Select
                                            value={logoSettings.logoPosition}
                                            onValueChange={(value) => handleUpdateLogoSetting('logoPosition', value)}
                                        >
                                            <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-800 border-zinc-700">
                                                <SelectItem value="left">Left</SelectItem>
                                                <SelectItem value="center">Center</SelectItem>
                                                <SelectItem value="right">Right</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label>Logo Size</Label>
                                        <Select
                                            value={logoSettings.logoSize}
                                            onValueChange={(value) => handleUpdateLogoSetting('logoSize', value)}
                                        >
                                            <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-800 border-zinc-700">
                                                <SelectItem value="small">Small</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="large">Large</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t border-zinc-800">
                        <Button
                            variant="outline"
                            onClick={() => setShowLogoSettings(false)}
                            className="border-zinc-700 text-zinc-200 hover:bg-zinc-800"
                        >
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSaveLogoSettings}
                            className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600"
                        >
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ContentManagement;