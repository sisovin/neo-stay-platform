import React, { useCallback, useMemo, useState } from "react";
import { Testimonials } from "@/types/admin";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Save,
  X,
  Eye,
  EyeOff,
  Star,
  StarOff,
  Pencil,
  Trash2,
  MessageSquare,
  Users,
  Award,
  TrendingUp,
  Search,
  Filter,
  RefreshCw
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const initialData: Testimonials[] = [
  {
    id: "1",
    customerId: "cust-001",
    customerName: "Sarah Chen",
    customerEmail: "sarah.chen@email.com",
    hotelId: "hotel-001",
    hotelName: "Neo Tokyo Suites",
    title: "Absolutely Amazing Experience!",
    content: "The cyberpunk atmosphere and futuristic design exceeded all my expectations. The staff was incredibly professional and the amenities were top-notch. Will definitely stay here again!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    isPublished: true,
    isFeatured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: "2",
    customerId: "cust-002",
    customerName: "Marcus Johnson",
    customerEmail: "marcus.j@email.com",
    hotelId: "hotel-002",
    hotelName: "Orbital Heights",
    title: "Outstanding Service",
    content: "The view from my room was breathtaking and the high-tech amenities made my stay comfortable and memorable. Great value for money.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    isPublished: true,
    isFeatured: false,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: "3",
    customerId: "cust-003",
    customerName: "Luna Rodriguez",
    customerEmail: "luna.rodriguez@email.com",
    title: "Perfect Platform Experience",
    content: "Booking was seamless and the entire experience from start to finish was flawless. The customer support team was responsive and helpful throughout my journey.",
    rating: 5,
    isPublished: true,
    isFeatured: true,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: "4",
    customerId: "cust-004",
    customerName: "Alex Kim",
    customerEmail: "alex.kim@email.com",
    hotelId: "hotel-003",
    hotelName: "Neon Horizon Hotel",
    title: "Good Experience",
    content: "Solid accommodation with modern facilities. The location was convenient and the price was reasonable. Minor issues with room service but overall satisfied.",
    rating: 3,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    isPublished: false,
    isFeatured: false,
    createdAt: new Date('2024-01-30'),
    updatedAt: new Date('2024-01-30')
  }
];

interface FormState {
  id?: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  hotelId: string;
  hotelName: string;
  title: string;
  content: string;
  rating: number;
  image: string;
  isPublished: boolean;
  isFeatured: boolean;
}

const emptyForm: FormState = {
  customerId: "",
  customerName: "",
  customerEmail: "",
  hotelId: "",
  hotelName: "",
  title: "",
  content: "",
  rating: 5,
  image: "",
  isPublished: true,
  isFeatured: false
};

const TestimonialsManagement: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonials[]>(initialData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [compactView, setCompactView] = useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [ratingFilter, setRatingFilter] = useState<string>("all");

  // Filtered testimonials
  const filteredTestimonials = useMemo(() => {
    return testimonials.filter(testimonial => {
      const matchesSearch = searchTerm === "" || 
        testimonial.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (testimonial.hotelName && testimonial.hotelName.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = statusFilter === "all" ||
        (statusFilter === "published" && testimonial.isPublished) ||
        (statusFilter === "unpublished" && !testimonial.isPublished) ||
        (statusFilter === "featured" && testimonial.isFeatured);

      const matchesRating = ratingFilter === "all" ||
        testimonial.rating === parseInt(ratingFilter);

      return matchesSearch && matchesStatus && matchesRating;
    });
  }, [testimonials, searchTerm, statusFilter, ratingFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = testimonials.length;
    const published = testimonials.filter(t => t.isPublished).length;
    const featured = testimonials.filter(t => t.isFeatured).length;
    const avgRating = total > 0 
      ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / total).toFixed(1)
      : "0.0";
    
    return { total, published, featured, avgRating };
  }, [testimonials]);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (testimonial: Testimonials) => {
    setEditingId(testimonial.id);
    setForm({
      id: testimonial.id,
      customerId: testimonial.customerId,
      customerName: testimonial.customerName,
      customerEmail: testimonial.customerEmail,
      hotelId: testimonial.hotelId || "",
      hotelName: testimonial.hotelName || "",
      title: testimonial.title,
      content: testimonial.content,
      rating: testimonial.rating,
      image: testimonial.image || "",
      isPublished: testimonial.isPublished,
      isFeatured: testimonial.isFeatured
    });
    setDialogOpen(true);
  };

  const handleChange = (field: keyof FormState, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!form.customerName.trim() || !form.title.trim() || !form.content.trim()) return;
    setSubmitting(true);
    
    try {
      if (editingId) {
        setTestimonials(prev =>
          prev.map(t =>
            t.id === editingId
              ? {
                  ...t,
                  customerId: form.customerId,
                  customerName: form.customerName,
                  customerEmail: form.customerEmail,
                  hotelId: form.hotelId || undefined,
                  hotelName: form.hotelName || undefined,
                  title: form.title,
                  content: form.content,
                  rating: form.rating,
                  image: form.image || undefined,
                  isPublished: form.isPublished,
                  isFeatured: form.isFeatured,
                  updatedAt: new Date()
                }
              : t
          )
        );
      } else {
        const newTestimonial: Testimonials = {
          id: crypto.randomUUID(),
          customerId: form.customerId || crypto.randomUUID(),
          customerName: form.customerName,
          customerEmail: form.customerEmail,
          hotelId: form.hotelId || undefined,
          hotelName: form.hotelName || undefined,
          title: form.title,
          content: form.content,
          rating: form.rating,
          image: form.image || undefined,
          isPublished: form.isPublished,
          isFeatured: form.isFeatured,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        setTestimonials(prev => [newTestimonial, ...prev]);
      }
      setDialogOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const togglePublished = (id: string) => {
    setTestimonials(prev =>
      prev.map(t =>
        t.id === id ? { ...t, isPublished: !t.isPublished, updatedAt: new Date() } : t
      )
    );
  };

  const toggleFeatured = (id: string) => {
    setTestimonials(prev =>
      prev.map(t =>
        t.id === id ? { ...t, isFeatured: !t.isFeatured, updatedAt: new Date() } : t
      )
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setRatingFilter("all");
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            title={`Rate ${star} star${star > 1 ? "s" : ""}`}
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            onClick={() => interactive && onRate?.(star)}
            className={cn(
              "transition-colors",
              interactive && "hover:text-yellow-400 cursor-pointer",
              !interactive && "cursor-default"
            )}
          >
            <Star
              className={cn(
                "h-4 w-4",
                star <= rating 
                  ? "text-yellow-400 fill-yellow-400" 
                  : "text-zinc-500"
              )}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-black/95 text-white min-h-screen rounded-lg p-4 md:p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Testimonials
            </h1>
            <p className="text-zinc-400 text-sm">
              Manage customer testimonials and reviews for your platform.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={openAdd}
              className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Testimonial
            </Button>
            <Button
              variant="outline"
              onClick={() => setCompactView(v => !v)}
              className="border-zinc-700 text-zinc-200 hover:bg-zinc-800"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              {compactView ? "Comfort View" : "Compact View"}
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-zinc-300">
                Total Testimonials
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total}</div>
              <p className="text-xs text-zinc-500">All testimonials</p>
            </CardContent>
          </Card>
          
          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-zinc-300">
                Published
              </CardTitle>
              <Eye className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.published}</div>
              <p className="text-xs text-zinc-500">Visible to public</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-zinc-300">
                Featured
              </CardTitle>
              <Award className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.featured}</div>
              <p className="text-xs text-zinc-500">Highlighted</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-zinc-300">
                Average Rating
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.avgRating}</div>
              <p className="text-xs text-zinc-500">Overall rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-zinc-900/60 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-zinc-300">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input
                    placeholder="Search testimonials..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-zinc-300">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="unpublished">Unpublished</SelectItem>
                    <SelectItem value="featured">Featured</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-300">Rating</Label>
                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-300">Actions</Label>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full border-zinc-700 text-zinc-200 hover:bg-zinc-800"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Testimonials Table */}
        <Card className="bg-zinc-900/60 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">
              Customer Testimonials ({filteredTestimonials.length})
            </CardTitle>
            <CardDescription className="text-zinc-400 text-xs">
              Manage and moderate customer testimonials
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800">
                  <TableHead className="min-w-[200px] text-zinc-400">Customer</TableHead>
                  <TableHead className="min-w-[250px] text-zinc-400">Testimonial</TableHead>
                  <TableHead className="text-zinc-400">Hotel</TableHead>
                  <TableHead className="text-zinc-400">Rating</TableHead>
                  <TableHead className="text-zinc-400">Status</TableHead>
                  <TableHead className="text-zinc-400">Featured</TableHead>
                  <TableHead className="text-zinc-400">Date</TableHead>
                  <TableHead className="text-right text-zinc-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTestimonials.map((testimonial) => (
                  <TableRow key={testimonial.id} className="border-zinc-800">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {testimonial.image ? (
                          <img
                            src={testimonial.image}
                            alt={testimonial.customerName}
                            className={cn(
                              "rounded-full object-cover border border-zinc-700",
                              compactView ? "w-8 h-8" : "w-12 h-12"
                            )}
                          />
                        ) : (
                          <div className={cn(
                            "rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center text-white font-bold",
                            compactView ? "w-8 h-8 text-xs" : "w-12 h-12 text-sm"
                          )}>
                            {testimonial.customerName.charAt(0)}
                          </div>
                        )}
                        <div className="space-y-1">
                          <div className="text-white font-medium leading-none">
                            {testimonial.customerName}
                          </div>
                          {!compactView && (
                            <div className="text-xs text-zinc-500">
                              {testimonial.customerEmail}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell className="align-top">
                      <div className="space-y-2">
                        <div className="text-white font-medium line-clamp-1">
                          {testimonial.title}
                        </div>
                        <div className="text-xs text-zinc-400 line-clamp-2 max-w-xs">
                          {testimonial.content}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="align-top">
                      {testimonial.hotelName ? (
                        <Badge variant="outline" className="border-cyan-500 text-cyan-400">
                          {testimonial.hotelName}
                        </Badge>
                      ) : (
                        <span className="text-zinc-500 text-sm">Platform Review</span>
                      )}
                    </TableCell>

                    <TableCell className="align-top">
                      {renderStars(testimonial.rating)}
                    </TableCell>

                    <TableCell className="align-top">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePublished(testimonial.id)}
                        className="text-zinc-300 hover:text-white"
                      >
                        {testimonial.isPublished ? (
                          <Eye className="h-4 w-4 text-green-400" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-zinc-500" />
                        )}
                      </Button>
                    </TableCell>

                    <TableCell className="align-top">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFeatured(testimonial.id)}
                        className="text-zinc-300 hover:text-white"
                      >
                        {testimonial.isFeatured ? (
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        ) : (
                          <StarOff className="h-4 w-4 text-zinc-500" />
                        )}
                      </Button>
                    </TableCell>

                    <TableCell className="align-top text-zinc-400 text-sm">
                      {testimonial.createdAt.toLocaleDateString()}
                    </TableCell>

                    <TableCell className="align-top">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(testimonial)}
                          className="h-8 w-8 text-zinc-300 hover:text-white"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(testimonial.id)}
                          className="h-8 w-8 text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredTestimonials.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10">
                      <div className="text-zinc-500 text-sm">
                        {searchTerm || statusFilter !== "all" || ratingFilter !== "all"
                          ? "No testimonials match your filters."
                          : "No testimonials yet. Add your first one."}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={o => !submitting && setDialogOpen(o)}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg">
              {editingId ? "Edit Testimonial" : "Add Testimonial"}
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-xs">
              {editingId
                ? "Update testimonial details."
                : "Create a new customer testimonial."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name *</Label>
              <Input
                id="customerName"
                value={form.customerName}
                onChange={e => handleChange("customerName", e.target.value)}
                className="bg-zinc-800 border-zinc-700"
                placeholder="Customer name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="customerEmail">Customer Email *</Label>
              <Input
                id="customerEmail"
                type="email"
                value={form.customerEmail}
                onChange={e => handleChange("customerEmail", e.target.value)}
                className="bg-zinc-800 border-zinc-700"
                placeholder="customer@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hotelName">Hotel Name (Optional)</Label>
              <Input
                id="hotelName"
                value={form.hotelName}
                onChange={e => handleChange("hotelName", e.target.value)}
                className="bg-zinc-800 border-zinc-700"
                placeholder="Hotel name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Customer Image URL (Optional)</Label>
              <Input
                id="image"
                value={form.image}
                onChange={e => handleChange("image", e.target.value)}
                className="bg-zinc-800 border-zinc-700"
                placeholder="https://..."
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="title">Testimonial Title *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={e => handleChange("title", e.target.value)}
                className="bg-zinc-800 border-zinc-700"
                placeholder="Testimonial title"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="content">Testimonial Content *</Label>
              <Textarea
                id="content"
                rows={4}
                value={form.content}
                onChange={e => handleChange("content", e.target.value)}
                className="bg-zinc-800 border-zinc-700 resize-none"
                placeholder="Write the testimonial content..."
              />
            </div>

            <div className="space-y-2">
              <Label>Rating *</Label>
              <div className="flex items-center gap-2">
                {renderStars(form.rating, true, (rating) => handleChange("rating", rating))}
                <span className="text-sm text-zinc-400">({form.rating}/5)</span>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={form.isPublished}
                  onCheckedChange={v => handleChange("isPublished", v)}
                />
                <Label htmlFor="published">Published</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={form.isFeatured}
                  onCheckedChange={v => handleChange("isFeatured", v)}
                />
                <Label htmlFor="featured">Featured</Label>
              </div>
            </div>

            {form.image && (
              <div className="md:col-span-2">
                <Label className="text-xs text-zinc-400">Image Preview</Label>
                <div className="mt-2">
                  <img
                    src={form.image}
                    alt="Customer preview"
                    className="w-20 h-20 rounded-full object-cover border border-zinc-800"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-zinc-800">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={submitting}
              className="border-zinc-700 text-zinc-200 hover:bg-zinc-800"
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={submitting || !form.customerName.trim() || !form.title.trim() || !form.content.trim()}
              className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600"
            >
              <Save className="h-4 w-4 mr-2" />
              {editingId ? "Update" : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestimonialsManagement;