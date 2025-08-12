import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Building2,
    Bed,
    Tags,
    Utensils,
    Star,
    Wrench,
    MapPin,
    MessageSquare,
    Users,
    Receipt,
    Ticket,
    BarChart3,
    Settings,
    LogOut,
    Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HotelManagement from './HotelManagement';
import RoomManagement from './RoomManagement';
import RoomCategoryManagement from './RoomCategoryManagement';
import AmenityManagement from './AmenityManagement';
import FoodManagement from './FoodManagement';
import HotelFeatureManagement from './HotelFeatureManagement';
import ServiceManagement from './ServiceManagement';
import PlaceManagement from './PlaceManagement';
import ReviewManagement from './ReviewManagement';
import CustomerManagement from './CustomerManagement';
import TaxManagement from './TaxManagement';
import CouponManagement from './CouponManagement';
import type { AdminStats } from '@/types/admin';
import BookingReport from './BookingReport';
import BookingsManagement from './BookingsManagement';
import BookingCalendar from './BookingCalendar';
import InvoicesManagement from './InvoicesManagement';
import ContentManagement from './WebsiteContentManagement';
import BlogManagement from './BlogManagement';
import GalleriesManagement from './GalleriesManagement';
import TestimonialsManagement from './TestimonialsManagement';
import PaymentMethodsManagement from './PaymentMethodsManagement';
import PaymentTransactions from './PaymentTransactions';
import ContactManagement from './ContactManagement';
import SettingsComponent from './Settings';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    // Mock stats data
    const stats: AdminStats = {
        totalHotels: 24,
        totalRooms: 156,
        totalCustomers: 1247,
        totalBookings: 892,
        totalRevenue: 245680,
        occupancyRate: 78.5,
        averageRating: 4.6,
        activePromotions: 8,
    };

    const sidebarItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'hotels', label: 'Hotels', icon: Building2 },
        { id: 'rooms', label: 'Rooms', icon: Bed },
        { id: 'categories', label: 'Room Categories', icon: Tags },
        { id: 'amenities', label: 'Amenities', icon: Star },
        { id: 'food', label: 'Food & Dining', icon: Utensils },
        { id: 'features', label: 'Hotel Features', icon: Settings },
        { id: 'services', label: 'Services', icon: Wrench },
        { id: 'places', label: 'Places', icon: MapPin },
        { id: 'reviews', label: 'Reviews', icon: MessageSquare },
        { id: 'customers', label: 'Customers', icon: Users },
        { id: 'tax', label: 'Tax Management', icon: Receipt },
        { id: 'coupons', label: 'Coupons', icon: Ticket },
    ];

    const StatCard = ({ title, value, description, icon: Icon, color }: {
        title: string;
        value: string | number;
        description: string;
        icon: any;
        color: string;
    }) => (
        <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-300">{title}</CardTitle>
                <Icon className={`h-4 w-4 ${color}`} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-white">{value}</div>
                <p className="text-xs text-zinc-500">{description}</p>
            </CardContent>
        </Card>
    );

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="border-b border-zinc-800 bg-black/90 backdrop-blur-sm sticky top-0 z-50">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-4">
                        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500">
                            NEOCITY<span className="text-violet-500">STAYS</span> Admin
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                            <Settings className="h-4 w-4 mr-2" />
                            Settings
                        </Button>
                        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-red-400">
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-zinc-900/50 border-r border-zinc-800 min-h-screen">
                    <nav className="p-4 space-y-2">
                        {/* Hotel Management */}
                        <div className="p-4 border-b border-zinc-800">
                            <h2 className="text-lg font-semibold text-white mb-2">Hotel Management:</h2>
                        </div>
                        {sidebarItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === item.id
                                        ? 'bg-violet-900/30 text-violet-300 border border-violet-800/50'
                                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                        }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    <span className="text-sm">{item.label}</span>
                                </button>
                            );
                        })}
                        { /* Bookings & Reports */}

                        <div className="p-4 border-t border-zinc-800">
                            <h2 className="text-lg font-semibold text-white mb-2">Bookings & Reports:</h2>
                        </div>
                        <button
                            onClick={() => setActiveTab('bookingCalendar')}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'bookingCalendar'
                                ? 'bg-violet-900/30 text-violet-300 border border-violet-800/50'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                }`}
                        >
                            <Calendar className="h-4 w-4" />
                            <span className="text-sm">Booking Calendar</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('bookingsManagement')}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'bookingsManagement'
                                ? 'bg-violet-900/30 text-violet-300 border border-violet-800/50'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                }`}
                        >
                            <BarChart3 className="h-4 w-4" />
                            <span className="text-sm">Bookings Management</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('bookingReports')}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'bookingReports'
                                ? 'bg-violet-900/30 text-violet-300 border border-violet-800/50'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                }`}
                        >
                            <BarChart3 className="h-4 w-4" />
                            <span className="text-sm">Bookings Report</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('invoicesManagement')}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'invoicesManagement'
                                ? 'bg-violet-900/30 text-violet-300 border border-violet-800/50'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                }`}
                        >
                            <BarChart3 className="h-4 w-4" />
                            <span className="text-sm">Invoices Management</span>
                        </button>
                        {/* Website Content & Settings */}
                        <div className="p-4 border-t border-zinc-800">
                            <h2 className="text-lg font-semibold text-white mb-2">Contents & Settings:</h2>
                        </div>
                        <button
                            onClick={() => setActiveTab('contentManagement')}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'contentManagement'
                                ? 'bg-violet-900/30 text-violet-300 border border-violet-800/50'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                }`}
                        >
                            <Settings className="h-4 w-4" />
                            <span className="text-sm">Content Management</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('BlogManagement')}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'BlogManagement'
                                ? 'bg-violet-900/30 text-violet-300 border border-violet-800/50'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                }`}
                        >
                            <Settings className="h-4 w-4" />
                            <span className="text-sm">Blog Management</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('galleriesManagement')}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'galleriesManagement'
                                ? 'bg-violet-900/30 text-violet-300 border border-violet-800/50'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                }`}
                        >
                            <Settings className="h-4 w-4" />
                            <span className="text-sm">Galleries Management</span>
                        </button>
                        <button 
                            onClick={() => setActiveTab('testimonialsManagement')}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'testimonialsManagement'
                                ? 'bg-violet-900/30 text-violet-300 border border-violet-800/50'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                }`}
                        >
                            <Settings className="h-4 w-4" />
                            <span className="text-sm">Testimonials Management</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('paymentMethodsManagement')}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'paymentMethodsManagement'
                                ? 'bg-violet-900/30 text-violet-300 border border-violet-800/50'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                }`}
                        >
                            <Settings className="h-4 w-4" />
                            <span className="text-sm">Payment Methods</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('paymentTransactions')}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'paymentTransactions'
                                ? 'bg-violet-900/30 text-violet-300 border border-violet-800/50'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                }`}
                        >
                            <Settings className="h-4 w-4" />
                            <span className="text-sm">Payment Transactions</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('contactManagement')}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'contactManagement'
                                ? 'bg-violet-900/30 text-violet-300 border border-violet-800/50'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                }`}
                        >
                            <Settings className="h-4 w-4" />
                            <span className="text-sm">Contact Management</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('settings')}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${activeTab === 'settings'
                                ? 'bg-violet-900/30 text-violet-300 border border-violet-800/50'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                }`}
                        >
                            <Settings className="h-4 w-4" />
                            <span className="text-sm">Settings</span>
                        </button>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6">
                    {activeTab === 'overview' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6"
                        >
                            <div>
                                <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
                                <p className="text-zinc-400">Welcome to your hotel management dashboard</p>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <StatCard
                                    title="Total Hotels"
                                    value={stats.totalHotels}
                                    description="Active properties"
                                    icon={Building2}
                                    color="text-cyan-400"
                                />
                                <StatCard
                                    title="Total Rooms"
                                    value={stats.totalRooms}
                                    description="Available rooms"
                                    icon={Bed}
                                    color="text-violet-400"
                                />
                                <StatCard
                                    title="Customers"
                                    value={stats.totalCustomers.toLocaleString()}
                                    description="Registered users"
                                    icon={Users}
                                    color="text-green-400"
                                />
                                <StatCard
                                    title="Revenue"
                                    value={`$${stats.totalRevenue.toLocaleString()}`}
                                    description="This month"
                                    icon={BarChart3}
                                    color="text-yellow-400"
                                />
                                <StatCard
                                    title="Occupancy Rate"
                                    value={`${stats.occupancyRate}%`}
                                    description="Current occupancy"
                                    icon={BarChart3}
                                    color="text-blue-400"
                                />
                                <StatCard
                                    title="Average Rating"
                                    value={stats.averageRating}
                                    description="Customer satisfaction"
                                    icon={Star}
                                    color="text-orange-400"
                                />
                                <StatCard
                                    title="Total Bookings"
                                    value={stats.totalBookings}
                                    description="This month"
                                    icon={Receipt}
                                    color="text-purple-400"
                                />
                                <StatCard
                                    title="Active Promotions"
                                    value={stats.activePromotions}
                                    description="Running campaigns"
                                    icon={Ticket}
                                    color="text-pink-400"
                                />
                            </div>

                            {/* Quick Actions */}
                            <Card className="bg-zinc-900/50 border-zinc-800">
                                <CardHeader>
                                    <CardTitle className="text-white">Quick Actions</CardTitle>
                                    <CardDescription className="text-zinc-400">
                                        Common management tasks
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <Button
                                            onClick={() => setActiveTab('hotels')}
                                            className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600"
                                        >
                                            <Building2 className="h-4 w-4 mr-2" />
                                            Add New Hotel
                                        </Button>
                                        <Button
                                            onClick={() => setActiveTab('rooms')}
                                            variant="outline"
                                            className="border-zinc-700 hover:bg-zinc-800"
                                        >
                                            <Bed className="h-4 w-4 mr-2" />
                                            Manage Rooms
                                        </Button>
                                        <Button
                                            onClick={() => setActiveTab('coupons')}
                                            variant="outline"
                                            className="border-zinc-700 hover:bg-zinc-800"
                                        >
                                            <Ticket className="h-4 w-4 mr-2" />
                                            Create Coupon
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {activeTab === 'hotels' && <HotelManagement />}
                    {activeTab === 'rooms' && <RoomManagement />}
                    {activeTab === 'categories' && <RoomCategoryManagement />}
                    {activeTab === 'amenities' && <AmenityManagement />}
                    {activeTab === 'food' && <FoodManagement />}
                    {activeTab === 'features' && <HotelFeatureManagement />}
                    {activeTab === 'services' && <ServiceManagement />}
                    {activeTab === 'places' && <PlaceManagement />}
                    {activeTab === 'reviews' && <ReviewManagement />}
                    {activeTab === 'customers' && <CustomerManagement />}
                    {activeTab === 'tax' && <TaxManagement />}
                    {activeTab === 'coupons' && <CouponManagement />}

                    {activeTab === 'bookingCalendar' && <BookingCalendar />}
                    {activeTab === 'bookingsManagement' && <BookingsManagement />}
                    {activeTab === 'bookingReports' && <BookingReport />}
                    {activeTab === 'invoicesManagement' && <InvoicesManagement />}

                    {activeTab === 'contentManagement' && <ContentManagement />}
                    {activeTab === 'BlogManagement' && <BlogManagement />}
                    {activeTab === 'galleriesManagement' && <GalleriesManagement />}
                    {activeTab === 'testimonialsManagement' && <TestimonialsManagement />}
                    {activeTab === 'paymentMethodsManagement' && <PaymentMethodsManagement />}
                    {activeTab === 'paymentTransactions' && <PaymentTransactions />}
                    {activeTab === 'contactManagement' && <ContactManagement />}
                    {activeTab === 'settings' && <SettingsComponent />}

                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
