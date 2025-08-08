import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Settings as SettingsIcon,
    User,
    Shield,
    Palette,
    Globe,
    Bell,
    Database,
    Zap,
    Mail,
    Smartphone,
    Lock,
    Eye,
    EyeOff,
    Check,
    X,
    Upload,
    Download,
    RefreshCw,
    AlertTriangle,
    Info,
    ChevronRight,
    Monitor,
    Moon,
    Sun,
    Volume2,
    VolumeX,
    Wifi,
    Bluetooth,
    Battery,
    HardDrive,
    Cpu,
    MemoryStick,
    Network,
    Key,
    CreditCard,
    FileText,
    Calendar,
    Clock,
    MapPin,
    Languages,
    Accessibility,
    Camera,
    Mic,
    Speaker,
    Headphones,
    Printer,
    Save,
    RotateCcw,
    Search,
    Filter,
    ExternalLink,
    Copy,
    Share2,
    Download as DownloadIcon,
    Trash2,
    Edit3,
    Plus,
    Minus,
    MoreHorizontal,
    ChevronDown,
    ChevronUp,
    MessageCircle,
    BarChart3,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
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
    DropdownMenuSeparator,
    DropdownMenuLabel
} from "../ui/dropdown-menu";
import { Slider } from "../ui/slider";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

// Types for settings
interface SettingsSection {
    id: string;
    name: string;
    icon: any;
    color: string;
    description: string;
    badge?: string;
}

interface UserProfile {
    name: string;
    email: string;
    role: string;
    avatar?: string;
    lastLogin: Date;
    twoFactorEnabled: boolean;
}

interface SystemSettings {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    timezone: string;
    dateFormat: string;
    currency: string;
    autoSave: boolean;
    notifications: boolean;
    soundEnabled: boolean;
    compactMode: boolean;
}

const Settings = () => {
    const [activeSection, setActiveSection] = useState('profile');
    const [searchQuery, setSearchQuery] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [unsavedChanges, setUnsavedChanges] = useState(false);

    // Mock data
    const [userProfile, setUserProfile] = useState<UserProfile>({
        name: 'Admin User',
        email: 'admin@neocitystays.com',
        role: 'Super Administrator',
        lastLogin: new Date(),
        twoFactorEnabled: true
    });

    const [systemSettings, setSystemSettings] = useState<SystemSettings>({
        theme: 'dark',
        language: 'en',
        timezone: 'UTC-8',
        dateFormat: 'MM/DD/YYYY',
        currency: 'USD',
        autoSave: true,
        notifications: true,
        soundEnabled: true,
        compactMode: false
    });

    const settingsSections: SettingsSection[] = [
        {
            id: 'profile',
            name: 'Profile & Account',
            icon: User,
            color: 'text-blue-400',
            description: 'Manage your personal information and account settings',
            badge: 'Updated'
        },
        {
            id: 'security',
            name: 'Security & Privacy',
            icon: Shield,
            color: 'text-green-400',
            description: 'Configure security settings and privacy preferences',
            badge: '2FA Enabled'
        },
        {
            id: 'appearance',
            name: 'Appearance & UI',
            icon: Palette,
            color: 'text-purple-400',
            description: 'Customize the look and feel of your interface'
        },
        {
            id: 'system',
            name: 'System & Performance',
            icon: Cpu,
            color: 'text-orange-400',
            description: 'System configurations and performance settings'
        },
        {
            id: 'notifications',
            name: 'Notifications',
            icon: Bell,
            color: 'text-yellow-400',
            description: 'Manage notification preferences and alerts'
        },
        {
            id: 'integrations',
            name: 'Integrations & APIs',
            icon: Zap,
            color: 'text-cyan-400',
            description: 'Configure third-party integrations and API settings'
        },
        {
            id: 'backup',
            name: 'Backup & Export',
            icon: Database,
            color: 'text-emerald-400',
            description: 'Data backup, export, and recovery options'
        },
        {
            id: 'billing',
            name: 'Billing & Subscription',
            icon: CreditCard,
            color: 'text-pink-400',
            description: 'Manage your subscription and billing information'
        }
    ];

    const filteredSections = settingsSections.filter(section =>
        section.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSaveSettings = () => {
        // Simulate saving
        setUnsavedChanges(false);
        // Add success notification logic here
    };

    const handleResetSettings = () => {
        // Reset to defaults
        setUnsavedChanges(false);
    };

    const renderProfileSection = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Profile Header */}
            <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5 text-blue-400" />
                        Profile Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Avatar Section */}
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                                {userProfile.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <Button
                                size="sm"
                                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-violet-600 hover:bg-violet-700"
                            >
                                <Camera className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold">{userProfile.name}</h3>
                            <p className="text-zinc-400">{userProfile.role}</p>
                            <p className="text-sm text-zinc-500">
                                Last login: {userProfile.lastLogin.toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <Separator className="bg-zinc-800" />

                    {/* Personal Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                id="fullName"
                                value={userProfile.name}
                                onChange={(e) => {
                                    setUserProfile(prev => ({ ...prev, name: e.target.value }));
                                    setUnsavedChanges(true);
                                }}
                                className="bg-zinc-900/50 border-zinc-800"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={userProfile.email}
                                onChange={(e) => {
                                    setUserProfile(prev => ({ ...prev, email: e.target.value }));
                                    setUnsavedChanges(true);
                                }}
                                className="bg-zinc-900/50 border-zinc-800"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Input
                                id="role"
                                value={userProfile.role}
                                disabled
                                className="bg-zinc-900/50 border-zinc-800 opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                placeholder="+1 (555) 123-4567"
                                className="bg-zinc-900/50 border-zinc-800"
                            />
                        </div>
                    </div>

                    {/* Bio Section */}
                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            id="bio"
                            placeholder="Tell us about yourself..."
                            className="bg-zinc-900/50 border-zinc-800"
                            rows={3}
                        />
                    </div>

                    {/* Location & Timezone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                                <Input
                                    id="location"
                                    placeholder="San Francisco, CA"
                                    className="pl-10 bg-zinc-900/50 border-zinc-800"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="timezone">Timezone</Label>
                            <Select value={systemSettings.timezone}>
                                <SelectTrigger className="bg-zinc-900/50 border-zinc-800">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                                    <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                                    <SelectItem value="UTC+0">GMT (UTC+0)</SelectItem>
                                    <SelectItem value="UTC+1">Central European (UTC+1)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Account Preferences */}
            <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                    <CardTitle>Account Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-zinc-400">Receive email updates about your account</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Marketing Communications</p>
                            <p className="text-sm text-zinc-400">Receive promotional emails and updates</p>
                        </div>
                        <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Activity Status</p>
                            <p className="text-sm text-zinc-400">Show when you're online to other users</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );

    const renderSecuritySection = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Password & Authentication */}
            <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lock className="h-5 w-5 text-green-400" />
                        Password & Authentication
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <div className="relative">
                                <Input
                                    id="currentPassword"
                                    type={showPassword ? "text" : "password"}
                                    className="bg-zinc-900/50 border-zinc-800 pr-10"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-2 top-1/2 -translate-y-1/2"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                                id="newPassword"
                                type="password"
                                className="bg-zinc-900/50 border-zinc-800"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                className="bg-zinc-900/50 border-zinc-800"
                            />
                        </div>
                    </div>

                    <Button className="bg-green-600 hover:bg-green-700">
                        Update Password
                    </Button>
                </CardContent>
            </Card>

            {/* Two-Factor Authentication */}
            <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Smartphone className="h-5 w-5 text-green-400" />
                        Two-Factor Authentication
                        <Badge className="bg-green-900/30 text-green-400">Enabled</Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">SMS Authentication</p>
                            <p className="text-sm text-zinc-400">Receive codes via SMS</p>
                        </div>
                        <Switch checked={userProfile.twoFactorEnabled} />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Authenticator App</p>
                            <p className="text-sm text-zinc-400">Use Google Authenticator or similar</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Backup Codes</p>
                            <p className="text-sm text-zinc-400">Generate recovery codes</p>
                        </div>
                        <Button variant="outline" size="sm">
                            Generate
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Session Management */}
            <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Monitor className="h-5 w-5 text-green-400" />
                        Active Sessions
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { device: 'MacBook Pro', location: 'San Francisco, CA', current: true },
                            { device: 'iPhone 15', location: 'San Francisco, CA', current: false },
                            { device: 'Chrome Browser', location: 'New York, NY', current: false }
                        ].map((session, index) => (
                            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                    <div>
                                        <p className="font-medium">{session.device}</p>
                                        <p className="text-sm text-zinc-400">{session.location}</p>
                                    </div>
                                    {session.current && (
                                        <Badge variant="secondary" className="bg-blue-900/30 text-blue-400">
                                            Current
                                        </Badge>
                                    )}
                                </div>
                                {!session.current && (
                                    <Button variant="outline" size="sm" className="text-red-400 border-red-400">
                                        Revoke
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );

    const renderAppearanceSection = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Theme Settings */}
            <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Palette className="h-5 w-5 text-purple-400" />
                        Theme & Colors
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <Label>Theme Preference</Label>
                        <RadioGroup value={systemSettings.theme} className="grid grid-cols-3 gap-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="light" id="light" />
                                <Label htmlFor="light" className="flex items-center gap-2">
                                    <Sun className="h-4 w-4" />
                                    Light
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="dark" id="dark" />
                                <Label htmlFor="dark" className="flex items-center gap-2">
                                    <Moon className="h-4 w-4" />
                                    Dark
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="auto" id="auto" />
                                <Label htmlFor="auto" className="flex items-center gap-2">
                                    <Monitor className="h-4 w-4" />
                                    Auto
                                </Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <Separator className="bg-zinc-800" />

                    <div className="space-y-4">
                        <Label>Accent Color</Label>
                        <div className="grid grid-cols-8 gap-2">
                            {[
                                { color: 'bg-violet-500', name: 'Violet' },
                                { color: 'bg-blue-500', name: 'Blue' },
                                { color: 'bg-green-500', name: 'Green' },
                                { color: 'bg-yellow-500', name: 'Yellow' },
                                { color: 'bg-orange-500', name: 'Orange' },
                                { color: 'bg-red-500', name: 'Red' },
                                { color: 'bg-pink-500', name: 'Pink' },
                                { color: 'bg-cyan-500', name: 'Cyan' }
                            ].map((colorOption, index) => (
                                <button
                                    key={index}
                                    title={`Select ${colorOption.name} accent color`}
                                    className={`w-8 h-8 rounded-full ${colorOption.color} border-2 border-transparent hover:border-white/50 transition-colors`}
                                    onClick={() => setUnsavedChanges(true)}
                                />
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Layout & Display */}
            <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                    <CardTitle>Layout & Display</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Compact Mode</p>
                            <p className="text-sm text-zinc-400">Reduce spacing and padding</p>
                        </div>
                        <Switch
                            checked={systemSettings.compactMode}
                            onCheckedChange={(checked) => {
                                setSystemSettings(prev => ({ ...prev, compactMode: checked }));
                                setUnsavedChanges(true);
                            }}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Sidebar Collapsed</p>
                            <p className="text-sm text-zinc-400">Keep sidebar minimized by default</p>
                        </div>
                        <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Animations</p>
                            <p className="text-sm text-zinc-400">Enable smooth transitions and effects</p>
                        </div>
                        <Switch defaultChecked />
                    </div>

                    <div className="space-y-2">
                        <Label>Font Size</Label>
                        <Slider
                            defaultValue={[16]}
                            max={24}
                            min={12}
                            step={1}
                            className="w-full"
                        />
                        <div className="flex justify-between text-xs text-zinc-400">
                            <span>12px</span>
                            <span>18px</span>
                            <span>24px</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );

    const renderSystemSection = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* System Performance */}
            <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Cpu className="h-5 w-5 text-orange-400" />
                        System Performance
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-3 rounded-lg bg-zinc-800/50 text-center">
                            <Cpu className="h-6 w-6 mx-auto mb-2 text-orange-400" />
                            <p className="text-xs text-zinc-400">CPU Usage</p>
                            <p className="text-lg font-semibold">45%</p>
                        </div>
                        <div className="p-3 rounded-lg bg-zinc-800/50 text-center">
                            <MemoryStick className="h-6 w-6 mx-auto mb-2 text-blue-400" />
                            <p className="text-xs text-zinc-400">Memory</p>
                            <p className="text-lg font-semibold">8.2GB</p>
                        </div>
                        <div className="p-3 rounded-lg bg-zinc-800/50 text-center">
                            <HardDrive className="h-6 w-6 mx-auto mb-2 text-green-400" />
                            <p className="text-xs text-zinc-400">Storage</p>
                            <p className="text-lg font-semibold">156GB</p>
                        </div>
                        <div className="p-3 rounded-lg bg-zinc-800/50 text-center">
                            <Network className="h-6 w-6 mx-auto mb-2 text-purple-400" />
                            <p className="text-xs text-zinc-400">Network</p>
                            <p className="text-lg font-semibold">Fast</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Auto-Save</p>
                            <p className="text-sm text-zinc-400">Automatically save changes</p>
                        </div>
                        <Switch
                            checked={systemSettings.autoSave}
                            onCheckedChange={(checked) => {
                                setSystemSettings(prev => ({ ...prev, autoSave: checked }));
                                setUnsavedChanges(true);
                            }}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Auto-Save Interval</Label>
                        <Select defaultValue="5">
                            <SelectTrigger className="bg-zinc-900/50 border-zinc-800">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">1 minute</SelectItem>
                                <SelectItem value="5">5 minutes</SelectItem>
                                <SelectItem value="10">10 minutes</SelectItem>
                                <SelectItem value="30">30 minutes</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Cache & Storage */}
            <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Database className="h-5 w-5 text-orange-400" />
                        Cache & Storage
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Clear Browser Cache</p>
                                <p className="text-sm text-zinc-400">Remove temporary files and data</p>
                            </div>
                            <Button variant="outline" size="sm">
                                Clear Cache
                            </Button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Clear Application Data</p>
                                <p className="text-sm text-zinc-400">Reset all stored preferences</p>
                            </div>
                            <Button variant="outline" size="sm" className="text-red-400 border-red-400">
                                Clear Data
                            </Button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Optimize Database</p>
                                <p className="text-sm text-zinc-400">Improve database performance</p>
                            </div>
                            <Button variant="outline" size="sm">
                                <RefreshCw className="h-4 w-4 mr-2" />
                                Optimize
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );

    const renderNotificationsSection = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Notification Preferences */}
            <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-yellow-400" />
                        Notification Preferences
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Push Notifications</p>
                            <p className="text-sm text-zinc-400">Receive real-time notifications</p>
                        </div>
                        <Switch
                            checked={systemSettings.notifications}
                            onCheckedChange={(checked) => {
                                setSystemSettings(prev => ({ ...prev, notifications: checked }));
                                setUnsavedChanges(true);
                            }}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-zinc-400">Receive notifications via email</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">SMS Notifications</p>
                            <p className="text-sm text-zinc-400">Receive important alerts via SMS</p>
                        </div>
                        <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Sound Notifications</p>
                            <p className="text-sm text-zinc-400">Play sounds for notifications</p>
                        </div>
                        <Switch
                            checked={systemSettings.soundEnabled}
                            onCheckedChange={(checked) => {
                                setSystemSettings(prev => ({ ...prev, soundEnabled: checked }));
                                setUnsavedChanges(true);
                            }}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Notification Categories */}
            <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                    <CardTitle>Notification Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[
                        { name: 'Bookings & Reservations', desc: 'New bookings, cancellations, modifications', enabled: true },
                        { name: 'System Updates', desc: 'Software updates and maintenance', enabled: true },
                        { name: 'Security Alerts', desc: 'Login attempts and security events', enabled: true },
                        { name: 'Marketing', desc: 'Promotional content and announcements', enabled: false },
                        { name: 'Reports', desc: 'Weekly and monthly reports', enabled: true },
                        { name: 'Team Updates', desc: 'Staff assignments and updates', enabled: false }
                    ].map((category, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">{category.name}</p>
                                <p className="text-sm text-zinc-400">{category.desc}</p>
                            </div>
                            <Switch defaultChecked={category.enabled} />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </motion.div>
    );

    const renderIntegrationsSection = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* API Configuration */}
            <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-cyan-400" />
                        API Configuration
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="apiKey">API Key</Label>
                        <div className="flex gap-2">
                            <Input
                                id="apiKey"
                                value="sk-neo-****-****-****-****"
                                disabled
                                className="bg-zinc-900/50 border-zinc-800 font-mono"
                            />
                            <Button variant="outline" size="sm">
                                <Copy className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                                <RefreshCw className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="webhookUrl">Webhook URL</Label>
                        <Input
                            id="webhookUrl"
                            placeholder="https://your-domain.com/webhook"
                            className="bg-zinc-900/50 border-zinc-800"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Rate Limiting</Label>
                        <Select defaultValue="1000">
                            <SelectTrigger className="bg-zinc-900/50 border-zinc-800">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="100">100 requests/hour</SelectItem>
                                <SelectItem value="500">500 requests/hour</SelectItem>
                                <SelectItem value="1000">1,000 requests/hour</SelectItem>
                                <SelectItem value="5000">5,000 requests/hour</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Third-Party Integrations */}
            <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                    <CardTitle>Third-Party Integrations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[
                        { name: 'Stripe', desc: 'Payment processing', connected: true, icon: CreditCard },
                        { name: 'Google Analytics', desc: 'Website analytics', connected: true, icon: BarChart3 },
                        { name: 'Mailchimp', desc: 'Email marketing', connected: false, icon: Mail },
                        { name: 'Slack', desc: 'Team communication', connected: false, icon: MessageCircle },
                        { name: 'Zapier', desc: 'Workflow automation', connected: true, icon: Zap }
                    ].map((integration, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
                            <div className="flex items-center gap-3">
                                <integration.icon className="h-6 w-6 text-cyan-400" />
                                <div>
                                    <p className="font-medium">{integration.name}</p>
                                    <p className="text-sm text-zinc-400">{integration.desc}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {integration.connected ? (
                                    <>
                                        <Badge className="bg-green-900/30 text-green-400">Connected</Badge>
                                        <Button variant="outline" size="sm">
                                            Configure
                                        </Button>
                                    </>
                                ) : (
                                    <Button variant="outline" size="sm">
                                        Connect
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </motion.div>
    );

    const renderBackupSection = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Backup Settings */}
            <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Database className="h-5 w-5 text-emerald-400" />
                        Backup Settings
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Automatic Backups</p>
                            <p className="text-sm text-zinc-400">Enable scheduled data backups</p>
                        </div>
                        <Switch defaultChecked />
                    </div>

                    <div className="space-y-2">
                        <Label>Backup Frequency</Label>
                        <Select defaultValue="daily">
                            <SelectTrigger className="bg-zinc-900/50 border-zinc-800">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="hourly">Every Hour</SelectItem>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Retention Period</Label>
                        <Select defaultValue="30">
                            <SelectTrigger className="bg-zinc-900/50 border-zinc-800">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="7">7 days</SelectItem>
                                <SelectItem value="30">30 days</SelectItem>
                                <SelectItem value="90">90 days</SelectItem>
                                <SelectItem value="365">1 year</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex gap-2">
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                            <Database className="h-4 w-4 mr-2" />
                            Create Backup Now
                        </Button>
                        <Button variant="outline">
                            <DownloadIcon className="h-4 w-4 mr-2" />
                            Download Latest
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Export Data */}
            <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                    <CardTitle>Export Data</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { name: 'User Data', desc: 'Export all user information', format: 'JSON/CSV' },
                            { name: 'Bookings', desc: 'Export booking records', format: 'CSV/Excel' },
                            { name: 'Analytics', desc: 'Export analytics data', format: 'JSON/PDF' },
                            { name: 'Settings', desc: 'Export configuration settings', format: 'JSON' }
                        ].map((item, index) => (
                            <div key={index} className="p-3 rounded-lg bg-zinc-800/50">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="font-medium">{item.name}</p>
                                    <Button variant="outline" size="sm">
                                        Export
                                    </Button>
                                </div>
                                <p className="text-xs text-zinc-400">{item.desc}</p>
                                <p className="text-xs text-zinc-500 mt-1">Format: {item.format}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );

    const renderBillingSection = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            {/* Subscription Info */}
            <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-pink-400" />
                        Current Subscription
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">Professional Plan</h3>
                            <p className="text-zinc-400">Billed monthly</p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold">$99</p>
                            <p className="text-sm text-zinc-400">per month</p>
                        </div>
                    </div>

                    <Separator className="bg-zinc-800" />

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Next billing date:</span>
                            <span>September 8, 2025</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span>Payment method:</span>
                            <span>•••• •••• •••• 4242</span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="outline">Change Plan</Button>
                        <Button variant="outline">Update Payment</Button>
                        <Button variant="outline" className="text-red-400 border-red-400">
                            Cancel Subscription
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Usage Statistics */}
            <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                    <CardTitle>Usage Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-3 rounded-lg bg-zinc-800/50 text-center">
                            <p className="text-2xl font-bold text-blue-400">2,847</p>
                            <p className="text-sm text-zinc-400">API Calls</p>
                            <p className="text-xs text-zinc-500">of 10,000 limit</p>
                        </div>
                        <div className="p-3 rounded-lg bg-zinc-800/50 text-center">
                            <p className="text-2xl font-bold text-green-400">156</p>
                            <p className="text-sm text-zinc-400">Active Users</p>
                            <p className="text-xs text-zinc-500">of 500 limit</p>
                        </div>
                        <div className="p-3 rounded-lg bg-zinc-800/50 text-center">
                            <p className="text-2xl font-bold text-purple-400">89GB</p>
                            <p className="text-sm text-zinc-400">Storage Used</p>
                            <p className="text-xs text-zinc-500">of 1TB limit</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Billing History */}
            <Card className="border-zinc-800 bg-zinc-900/50">
                <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {[
                            { date: 'Aug 8, 2025', amount: '$99.00', status: 'Paid', invoice: 'INV-001' },
                            { date: 'Jul 8, 2025', amount: '$99.00', status: 'Paid', invoice: 'INV-002' },
                            { date: 'Jun 8, 2025', amount: '$99.00', status: 'Paid', invoice: 'INV-003' }
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50">
                                <div className="flex items-center gap-4">
                                    <div>
                                        <p className="font-medium">{item.date}</p>
                                        <p className="text-sm text-zinc-400">{item.invoice}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge className="bg-green-900/30 text-green-400">{item.status}</Badge>
                                    <p className="font-semibold">{item.amount}</p>
                                    <Button variant="outline" size="sm">
                                        <DownloadIcon className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );

    const renderSection = () => {
        switch (activeSection) {
            case 'profile':
                return renderProfileSection();
            case 'security':
                return renderSecuritySection();
            case 'appearance':
                return renderAppearanceSection();
            case 'system':
                return renderSystemSection();
            case 'notifications':
                return renderNotificationsSection();
            case 'integrations':
                return renderIntegrationsSection();
            case 'backup':
                return renderBackupSection();
            case 'billing':
                return renderBillingSection();
            default:
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center h-64"
                    >
                        <div className="text-center">
                            <SettingsIcon className="h-12 w-12 mx-auto mb-4 text-zinc-400" />
                            <p className="text-zinc-400">Select a settings category to continue</p>
                        </div>
                    </motion.div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="border-b border-zinc-800 bg-black/90 backdrop-blur-sm sticky top-0 z-50">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <SettingsIcon className="h-6 w-6 text-violet-400" />
                            <h1 className="text-xl font-bold">Settings</h1>
                        </div>

                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                            <Input
                                placeholder="Search settings..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 w-64 bg-zinc-900/50 border-zinc-800"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {unsavedChanges && (
                            <div className="flex items-center gap-2 text-yellow-400">
                                <AlertTriangle className="h-4 w-4" />
                                <span className="text-sm">Unsaved changes</span>
                            </div>
                        )}
                        <Button variant="outline" size="sm" onClick={handleResetSettings}>
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Reset
                        </Button>
                        <Button
                            size="sm"
                            className="bg-violet-600 hover:bg-violet-700"
                            onClick={handleSaveSettings}
                            disabled={!unsavedChanges}
                        >
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                        </Button>
                    </div>
                </div>
            </header>

            <div className="flex h-[calc(100vh-80px)]">
                {/* Left Sidebar */}
                <div className="w-80 border-r border-zinc-800 bg-zinc-900/30 overflow-y-auto">
                    <div className="p-4 space-y-2">
                        {filteredSections.map((section) => (
                            <motion.button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full text-left p-3 rounded-lg transition-all group ${activeSection === section.id
                                        ? 'bg-violet-900/30 border border-violet-500/50'
                                        : 'hover:bg-zinc-800/50 border border-transparent'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-center gap-3">
                                    <section.icon className={`h-5 w-5 ${section.color}`} />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="font-medium truncate">{section.name}</p>
                                            {section.badge && (
                                                <Badge variant="secondary" className="text-xs">
                                                    {section.badge}
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                                            {section.description}
                                        </p>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:text-white transition-colors" />
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-auto">
                    <div className="p-6">
                        <AnimatePresence mode="wait">
                            {renderSection()}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
