import React, { useCallback, useMemo, useState } from "react";
import { GalleriesProperty } from "@/types/admin";
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
  ArrowUp,
  ArrowDown,
  Pencil,
  Trash2,
  ImageIcon,
  MapPin,
  RefreshCw,
  Search,
  Filter,
  GalleryHorizontal,
  TrendingUp
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const initialData: GalleriesProperty[] = [
  {
    id: "1",
    name: "Neo Tokyo Suites",
    location: "Night City, Downtown",
    price: 299,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    featured: true,
    isVisible: true,
    order: 1,
    description: "Luxury cyberpunk hotel in the heart of Night City with stunning neon views and cutting-edge technology.",
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: "2",
    name: "Orbital Heights",
    location: "Satellite District",
    price: 450,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    featured: false,
    isVisible: true,
    order: 2,
    description: "High-tech accommodation with orbital views and space-age amenities for the ultimate futuristic experience.",
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: "3",
    name: "Neon Horizon Hotel",
    location: "Westside, Night City",
    price: 199,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
    featured: false,
    isVisible: true,
    order: 3,
    description: "Affordable cyberpunk experience with modern amenities and easy access to the city's entertainment district.",
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25')
  },
  {
    id: "4",
    name: "Chrome Palace",
    location: "Corporate Zone",
    price: 680,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    featured: true,
    isVisible: false,
    order: 4,
    description: "Ultra-luxury corporate hotel with premium services and exclusive access to executive facilities.",
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  }
];

interface FormState {
  id?: string;
  name: string;
  location: string;
  price: number | "";
  rating: number | "";
  image: string;
  featured: boolean;
  isVisible: boolean;
  description: string;
  order?: number;
}

const emptyForm: FormState = {
  name: "",
  location: "",
  price: "",
  rating: "",
  image: "",
  featured: false,
  isVisible: true,
  description: ""
};

const GalleriesManagement: React.FC = () => {
  const [properties, setProperties] = useState<GalleriesProperty[]>(initialData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [compactView, setCompactView] = useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [featuredFilter, setFeaturedFilter] = useState<string>("all");

  // Filtered properties
  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const matchesSearch = searchTerm === "" || 
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (property.description && property.description.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = statusFilter === "all" ||
        (statusFilter === "visible" && property.isVisible) ||
        (statusFilter === "hidden" && !property.isVisible);

      const matchesFeatured = featuredFilter === "all" ||
        (featuredFilter === "featured" && property.featured) ||
        (featuredFilter === "regular" && !property.featured);

      return matchesSearch && matchesStatus && matchesFeatured;
    });
  }, [properties, searchTerm, statusFilter, featuredFilter]);

  // Derived statistics
  const stats = useMemo(() => {
    const total = properties.length;
    const visible = properties.filter(p => p.isVisible).length;
    const featured = properties.filter(p => p.featured).length;
    const avg = total > 0 
      ? (properties.reduce((s, p) => s + p.rating, 0) / total).toFixed(1)
      : "0.0";
    return { total, visible, featured, avg };
  }, [properties]);

  // Normalize ordering after mutations
  const normalizeOrder = useCallback((list: GalleriesProperty[]) => {
    return list
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((p, idx) => ({ ...p, order: idx + 1 }));
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (prop: GalleriesProperty) => {
    setEditingId(prop.id);
    setForm({
      id: prop.id,
      name: prop.name,
      location: prop.location,
      price: prop.price,
      rating: prop.rating,
      image: prop.image,
      featured: prop.featured,
      isVisible: prop.isVisible,
      description: prop.description || "",
      order: prop.order
    });
    setDialogOpen(true);
  };

  const handleChange = (field: keyof FormState, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    setSubmitting(true);
    
    try {
      if (editingId) {
        setProperties(prev =>
          normalizeOrder(
            prev.map(p =>
              p.id === editingId
                ? {
                    ...p,
                    name: form.name,
                    location: form.location,
                    price: Number(form.price) || 0,
                    rating: Number(form.rating) || 0,
                    image: form.image,
                    featured: form.featured,
                    isVisible: form.isVisible,
                    description: form.description,
                    updatedAt: new Date()
                  }
                : p
            )
          )
        );
      } else {
        const newProp: GalleriesProperty = {
          id: crypto.randomUUID(),
          name: form.name,
          location: form.location,
          price: Number(form.price) || 0,
          rating: Number(form.rating) || 0,
          image: form.image,
          featured: form.featured,
          isVisible: form.isVisible,
          description: form.description,
          order: properties.length + 1,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        setProperties(prev => normalizeOrder([...prev, newProp]));
      }
      setDialogOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (id: string) => {
    setProperties(prev => normalizeOrder(prev.filter(p => p.id !== id)));
  };

  const toggleVisibility = (id: string) => {
    setProperties(prev =>
      prev.map(p =>
        p.id === id ? { ...p, isVisible: !p.isVisible, updatedAt: new Date() } : p
      )
    );
  };

  const toggleFeatured = (id: string) => {
    setProperties(prev =>
      prev.map(p =>
        p.id === id ? { ...p, featured: !p.featured, updatedAt: new Date() } : p
      )
    );
  };

  const move = (id: string, dir: "up" | "down") => {
    setProperties(prev => {
      const list = [...prev];
      const idx = list.findIndex(p => p.id === id);
      if (idx === -1) return prev;
      if (dir === "up" && idx === 0) return prev;
      if (dir === "down" && idx === list.length - 1) return prev;
      const target = dir === "up" ? idx - 1 : idx + 1;
      [list[idx], list[target]] = [list[target], list[idx]];
      return normalizeOrder(
        list.map(p => ({ ...p, updatedAt: new Date() }))
      );
    });
  };

  const batchSetVisibility = (visible: boolean) => {
    setProperties(prev =>
      prev.map(p => ({ ...p, isVisible: visible, updatedAt: new Date() }))
    );
  };

  const batchClearFeatured = () => {
    setProperties(prev =>
      prev.map(p => ({ ...p, featured: false, updatedAt: new Date() }))
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setFeaturedFilter("all");
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              "h-3 w-3",
              star <= rating 
                ? "text-yellow-400 fill-yellow-400" 
                : "text-zinc-500"
            )}
          />
        ))}
        <span className="text-xs text-zinc-400 ml-1">{rating}</span>
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
              Gallery Properties
            </h1>
            <p className="text-zinc-400 text-sm">
              Manage properties displayed in the homepage gallery showcase.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={openAdd}
              className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Property
            </Button>
            <Button
              variant="outline"
              onClick={() => batchSetVisibility(true)}
              className="border-zinc-700 text-zinc-200 hover:bg-zinc-800"
            >
              <Eye className="h-4 w-4 mr-2" />
              Show All
            </Button>
            <Button
              variant="outline"
              onClick={() => batchSetVisibility(false)}
              className="border-zinc-700 text-zinc-200 hover:bg-zinc-800"
            >
              <EyeOff className="h-4 w-4 mr-2" />
              Hide All
            </Button>
            <Button
              variant="outline"
              onClick={batchClearFeatured}
              className="border-zinc-700 text-zinc-200 hover:bg-zinc-800"
            >
              <StarOff className="h-4 w-4 mr-2" />
              Clear Featured
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
                Total Properties
              </CardTitle>
              <GalleryHorizontal className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cyan-400">{stats.total}</div>
              <p className="text-xs text-zinc-500">In gallery</p>
            </CardContent>
          </Card>
          
          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-zinc-300">
                Visible Properties
              </CardTitle>
              {stats.visible > 0 ? (
                <Eye className="h-4 w-4 text-green-400" />
              ) : (
                <EyeOff className="h-4 w-4 text-zinc-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">{stats.visible}</div>
              <p className="text-xs text-zinc-500">Currently shown</p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-900/60 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-zinc-300">
                Featured Properties
              </CardTitle>
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-400">{stats.featured}</div>
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
              <div className="text-3xl font-bold text-orange-400">{stats.avg}</div>
              <p className="text-xs text-zinc-500">Overall rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-zinc-900/60 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-zinc-300">Search Properties</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <Input
                    placeholder="Search by name, location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-zinc-800 border-zinc-700 pl-10"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-zinc-300">Visibility Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectItem value="all">All Properties</SelectItem>
                    <SelectItem value="visible">Visible Only</SelectItem>
                    <SelectItem value="hidden">Hidden Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-300">Featured Status</Label>
                <Select value={featuredFilter} onValueChange={setFeaturedFilter}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectItem value="all">All Properties</SelectItem>
                    <SelectItem value="featured">Featured Only</SelectItem>
                    <SelectItem value="regular">Regular Only</SelectItem>
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
                  <X className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Properties Table */}
        <Card className="bg-zinc-900/60 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">
              Gallery Properties ({filteredProperties.length})
            </CardTitle>
            <CardDescription className="text-zinc-400 text-xs">
              Manage property display order, visibility, and featured status
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800">
                  <TableHead className="w-16 text-zinc-400">Order</TableHead>
                  <TableHead className="min-w-[280px] text-zinc-400">Property</TableHead>
                  <TableHead className="text-zinc-400">Location</TableHead>
                  <TableHead className="text-zinc-400">Price</TableHead>
                  <TableHead className="text-zinc-400">Rating</TableHead>
                  <TableHead className="text-zinc-400">Status</TableHead>
                  <TableHead className="text-zinc-400">Featured</TableHead>
                  <TableHead className="text-zinc-400">Created</TableHead>
                  <TableHead className="text-right text-zinc-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProperties
                  .slice()
                  .sort((a, b) => a.order - b.order)
                  .map((p, idx) => (
                    <TableRow key={p.id} className="border-zinc-800 hover:bg-zinc-800/30">
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-medium text-cyan-400">{p.order}</span>
                          <div className="flex flex-col">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => move(p.id, "up")}
                              disabled={idx === 0}
                              className="h-4 w-4 text-zinc-400 hover:text-white disabled:opacity-30"
                            >
                              <ArrowUp className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => move(p.id, "down")}
                              disabled={idx === filteredProperties.length - 1}
                              className="h-4 w-4 text-zinc-400 hover:text-white disabled:opacity-30"
                            >
                              <ArrowDown className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className={cn(
                              "rounded-md object-cover border border-zinc-700",
                              compactView ? "w-12 h-12" : "w-16 h-16"
                            )}
                          />
                          <div className="space-y-1 flex-1">
                            <div className="text-white font-medium leading-none">
                              {p.name}
                            </div>
                            {!compactView && p.description && (
                              <div className="text-xs text-zinc-500 line-clamp-2 max-w-xs">
                                {p.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className="align-top">
                        <div className="flex items-center text-sm text-zinc-300">
                          <MapPin className="h-3 w-3 mr-1 text-cyan-400" />
                          {p.location}
                        </div>
                      </TableCell>

                      <TableCell className="align-top">
                        <div className="text-white font-medium">
                          ${p.price}
                          <span className="text-zinc-500 text-xs">/night</span>
                        </div>
                      </TableCell>

                      <TableCell className="align-top">
                        {renderStars(p.rating)}
                      </TableCell>

                      <TableCell className="align-top">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleVisibility(p.id)}
                          className="text-zinc-300 hover:text-white"
                        >
                          {p.isVisible ? (
                            <Badge variant="outline" className="border-green-500 text-green-400">
                              <Eye className="h-3 w-3 mr-1" />
                              Visible
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="border-zinc-500 text-zinc-500">
                              <EyeOff className="h-3 w-3 mr-1" />
                              Hidden
                            </Badge>
                          )}
                        </Button>
                      </TableCell>

                      <TableCell className="align-top">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleFeatured(p.id)}
                          className="text-zinc-300 hover:text-white"
                        >
                          {p.featured ? (
                            <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                              <Star className="h-3 w-3 mr-1 fill-yellow-400" />
                              Featured
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="border-zinc-500 text-zinc-500">
                              <StarOff className="h-3 w-3 mr-1" />
                              Regular
                            </Badge>
                          )}
                        </Button>
                      </TableCell>

                      <TableCell className="align-top text-zinc-400 text-sm">
                        {p.createdAt.toLocaleDateString()}
                      </TableCell>

                      <TableCell className="align-top">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEdit(p)}
                            className="h-8 w-8 text-zinc-300 hover:text-white"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(p.id)}
                            className="h-8 w-8 text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                
                {filteredProperties.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-10">
                      <div className="text-zinc-500 text-sm">
                        {searchTerm || statusFilter !== "all" || featuredFilter !== "all"
                          ? "No properties match your current filters."
                          : "No properties yet. Add your first gallery property."}
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
              {editingId ? "Edit Gallery Property" : "Add Gallery Property"}
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-xs">
              {editingId
                ? "Update gallery property details and settings."
                : "Create a new property for the gallery showcase."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Property Name *</Label>
              <Input
                id="name"
                value={form.name}
                onChange={e => handleChange("name", e.target.value)}
                className="bg-zinc-800 border-zinc-700"
                placeholder="Enter property name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={form.location}
                onChange={e => handleChange("location", e.target.value)}
                className="bg-zinc-800 border-zinc-700"
                placeholder="City, District"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price per Night (USD) *</Label>
              <Input
                id="price"
                type="number"
                value={form.price}
                onChange={e =>
                  handleChange("price", e.target.value === "" ? "" : Number(e.target.value))
                }
                className="bg-zinc-800 border-zinc-700"
                placeholder="0"
                min={0}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">Rating (0-5) *</Label>
              <Input
                id="rating"
                type="number"
                step="0.1"
                min={0}
                max={5}
                value={form.rating}
                onChange={e =>
                  handleChange("rating", e.target.value === "" ? "" : Number(e.target.value))
                }
                className="bg-zinc-800 border-zinc-700"
                placeholder="0.0"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="image">Image URL *</Label>
              <Input
                id="image"
                value={form.image}
                onChange={e => handleChange("image", e.target.value)}
                className="bg-zinc-800 border-zinc-700"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={3}
                value={form.description}
                onChange={e => handleChange("description", e.target.value)}
                className="bg-zinc-800 border-zinc-700 resize-none"
                placeholder="Property description for the gallery..."
              />
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="visible"
                  checked={form.isVisible}
                  onCheckedChange={v => handleChange("isVisible", v)}
                />
                <Label htmlFor="visible" className="text-sm">
                  Visible in Gallery
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={form.featured}
                  onCheckedChange={v => handleChange("featured", v)}
                />
                <Label htmlFor="featured" className="text-sm">
                  Featured Property
                </Label>
              </div>
            </div>

            {form.image && (
              <div className="md:col-span-2">
                <Label className="text-xs text-zinc-400">Image Preview</Label>
                <div className="mt-2">
                  <img
                    src={form.image}
                    alt="Property preview"
                    className="w-full max-h-48 object-cover rounded-md border border-zinc-800"
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
              disabled={submitting || !form.name.trim() || !form.location.trim() || !form.image.trim()}
              className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600"
            >
              <Save className="h-4 w-4 mr-2" />
              {editingId ? "Update Property" : "Create Property"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleriesManagement;