import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    MapPin,
    Globe,
    Phone,
    Mail,
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Place {
    id: string;
    name: string;
    description: string;
    address: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    website: string;
    type: string;
    rating: number;
    isActive: boolean;
}

const PlaceManagement = () => {
    const [places, setPlaces] = useState<Place[]>([
        {
            id: "1",
            name: "NeoCity Downtown",
            description: "Premium hotel in the heart of the business district",
            address: "123 Cyber Street",
            city: "Neo Tokyo",
            country: "Japan",
            phone: "+81-3-1234-5678",
            email: "downtown@neocitystays.com",
            website: "https://downtown.neocitystays.com",
            type: "Hotel",
            rating: 4.8,
            isActive: true,
        },
        {
            id: "2",
            name: "NeoCity Resort",
            description: "Luxury resort with spa and entertainment facilities",
            address: "456 Neon Boulevard",
            city: "Neo Angeles",
            country: "USA",
            phone: "+1-555-987-6543",
            email: "resort@neocitystays.com",
            website: "https://resort.neocitystays.com",
            type: "Resort",
            rating: 4.9,
            isActive: true,
        },
        {
            id: "3",
            name: "NeoCity Suites",
            description: "Extended stay suites for business travelers",
            address: "789 Digital Drive",
            city: "Neo London",
            country: "UK",
            phone: "+44-20-1234-5678",
            email: "suites@neocitystays.com",
            website: "https://suites.neocitystays.com",
            type: "Suites",
            rating: 4.6,
            isActive: true,
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingPlace, setEditingPlace] = useState<Place | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        address: "",
        city: "",
        country: "",
        phone: "",
        email: "",
        website: "",
        type: "",
        rating: 0,
    });

    const placeTypes = ["Hotel", "Resort", "Suites", "Boutique", "Hostel", "Apartment"];

    const filteredPlaces = places.filter((place) =>
        place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        place.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        place.country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingPlace) {
            setPlaces(places.map(place =>
                place.id === editingPlace.id
                    ? { ...place, ...formData }
                    : place
            ));
        } else {
            const newPlace: Place = {
                id: Date.now().toString(),
                ...formData,
                isActive: true,
            };
            setPlaces([...places, newPlace]);
        }
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            address: "",
            city: "",
            country: "",
            phone: "",
            email: "",
            website: "",
            type: "",
            rating: 0,
        });
        setEditingPlace(null);
        setIsDialogOpen(false);
    };

    const handleEdit = (place: Place) => {
        setEditingPlace(place);
        setFormData({
            name: place.name,
            description: place.description,
            address: place.address,
            city: place.city,
            country: place.country,
            phone: place.phone,
            email: place.email,
            website: place.website,
            type: place.type,
            rating: place.rating,
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        setPlaces(places.filter(place => place.id !== id));
    };

    const toggleStatus = (id: string) => {
        setPlaces(places.map(place =>
            place.id === id
                ? { ...place, isActive: !place.isActive }
                : place
        ));
    };

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Place Management</h1>
                        <p className="text-zinc-400">Manage hotel locations and properties</p>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Place
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-3xl">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingPlace ? "Edit Place" : "Add New Place"}
                                </DialogTitle>
                                <DialogDescription className="text-zinc-400">
                                    {editingPlace ? "Update place details" : "Add a new hotel location"}
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="name">Place Name</Label>
                                        <Input
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="bg-zinc-800 border-zinc-700"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="type">Type</Label>
                                        <Select
                                            value={formData.type}
                                            onValueChange={(value) => setFormData({ ...formData, type: value })}
                                        >
                                            <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-800 border-zinc-700">
                                                {placeTypes.map((type) => (
                                                    <SelectItem key={type} value={type}>
                                                        {type}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="bg-zinc-800 border-zinc-700"
                                        rows={3}
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            className="bg-zinc-800 border-zinc-700"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                            className="bg-zinc-800 border-zinc-700"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="country">Country</Label>
                                        <Input
                                            id="country"
                                            value={formData.country}
                                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                            className="bg-zinc-800 border-zinc-700"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input
                                            id="phone"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="bg-zinc-800 border-zinc-700"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="bg-zinc-800 border-zinc-700"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="website">Website</Label>
                                        <Input
                                            id="website"
                                            value={formData.website}
                                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                            className="bg-zinc-800 border-zinc-700"
                                            placeholder="https://"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="rating">Rating</Label>
                                        <Input
                                            id="rating"
                                            type="number"
                                            value={formData.rating}
                                            onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                                            className="bg-zinc-800 border-zinc-700"
                                            min="0"
                                            max="5"
                                            step="0.1"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={resetForm}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" className="bg-gradient-to-r from-violet-600 to-cyan-500">
                                        {editingPlace ? "Update" : "Create"} Place
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Search */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardContent className="p-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                            <Input
                                placeholder="Search places..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 bg-zinc-800 border-zinc-700"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Places Table */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            Places ({filteredPlaces.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="border-zinc-800">
                                    <TableHead className="text-zinc-300">Place</TableHead>
                                    <TableHead className="text-zinc-300">Location</TableHead>
                                    <TableHead className="text-zinc-300">Contact</TableHead>
                                    <TableHead className="text-zinc-300">Rating</TableHead>
                                    <TableHead className="text-zinc-300">Status</TableHead>
                                    <TableHead className="text-zinc-300">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredPlaces.map((place) => (
                                    <TableRow key={place.id} className="border-zinc-800">
                                        <TableCell>
                                            <div>
                                                <div className="font-medium text-white">{place.name}</div>
                                                <div className="text-sm text-zinc-400">
                                                    <Badge variant="outline" className="border-zinc-600 text-zinc-300 mr-2">
                                                        {place.type}
                                                    </Badge>
                                                </div>
                                                <div className="text-sm text-zinc-400 truncate max-w-xs mt-1">
                                                    {place.description}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm">
                                                <div className="text-white">{place.address}</div>
                                                <div className="text-zinc-400">{place.city}, {place.country}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm space-y-1">
                                                <div className="flex items-center gap-1 text-zinc-300">
                                                    <Phone className="h-3 w-3" />
                                                    {place.phone}
                                                </div>
                                                <div className="flex items-center gap-1 text-zinc-300">
                                                    <Mail className="h-3 w-3" />
                                                    {place.email}
                                                </div>
                                                {place.website && (
                                                    <div className="flex items-center gap-1 text-zinc-300">
                                                        <Globe className="h-3 w-3" />
                                                        <a href={place.website} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">
                                                            Website
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <span className="text-yellow-400">★</span>
                                                <span className="text-white">{place.rating}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={place.isActive ? "default" : "secondary"}
                                                className={place.isActive ? "bg-green-600" : "bg-zinc-600"}
                                            >
                                                {place.isActive ? "Active" : "Inactive"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleEdit(place)}
                                                    className="text-zinc-400 hover:text-white"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => toggleStatus(place.id)}
                                                    className="text-zinc-400 hover:text-white"
                                                >
                                                    {place.isActive ? "Deactivate" : "Activate"}
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleDelete(place.id)}
                                                    className="text-zinc-400 hover:text-red-400"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default PlaceManagement;