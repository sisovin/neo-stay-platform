import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Star,
    Eye,
    EyeOff,
    Trash2,
    Edit,
    Search,
    Filter,
    CheckCircle,
    XCircle,
    MessageSquare,
    User,
    Calendar,
    Building2,
    Bed,
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { Review } from "@/types/admin";

const ReviewManagement = () => {
    const [reviews, setReviews] = useState<Review[]>([
        {
            id: "1",
            customerId: "cust-1",
            hotelId: "hotel-1",
            roomId: "room-1",
            rating: 5,
            title: "Amazing Stay!",
            comment:
                "The hotel exceeded all expectations. The room was spacious, clean, and the staff was incredibly friendly. The cyberpunk theme was executed perfectly!",
            images: [
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80",
            ],
            isVerified: true,
            isPublished: true,
            createdAt: new Date("2024-01-15"),
            updatedAt: new Date("2024-01-15"),
        },
        {
            id: "2",
            customerId: "cust-2",
            hotelId: "hotel-2",
            rating: 4,
            title: "Great Experience",
            comment:
                "Loved the futuristic design and the amenities. The only downside was the noise from the street at night.",
            images: [],
            isVerified: true,
            isPublished: true,
            createdAt: new Date("2024-01-14"),
            updatedAt: new Date("2024-01-14"),
        },
        {
            id: "3",
            customerId: "cust-3",
            hotelId: "hotel-1",
            roomId: "room-2",
            rating: 2,
            title: "Disappointing",
            comment:
                "The room was not as advertised. The cyberpunk theme felt cheap and the service was poor.",
            images: [],
            isVerified: false,
            isPublished: false,
            createdAt: new Date("2024-01-13"),
            updatedAt: new Date("2024-01-13"),
        },
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filterRating, setFilterRating] = useState("all");
    const [filterStatus, setFilterStatus] = useState("all");
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const filteredReviews = reviews.filter((review) => {
        const matchesSearch =
            review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.comment.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesRating =
            filterRating === "all" || review.rating.toString() === filterRating;

        const matchesStatus =
            filterStatus === "all" ||
            (filterStatus === "published" && review.isPublished) ||
            (filterStatus === "unpublished" && !review.isPublished) ||
            (filterStatus === "verified" && review.isVerified) ||
            (filterStatus === "unverified" && !review.isVerified);

        return matchesSearch && matchesRating && matchesStatus;
    });

    const handleTogglePublished = (reviewId: string) => {
        setReviews(
            reviews.map((review) =>
                review.id === reviewId
                    ? {
                        ...review,
                        isPublished: !review.isPublished,
                        updatedAt: new Date(),
                    }
                    : review,
            ),
        );
    };

    const handleToggleVerified = (reviewId: string) => {
        setReviews(
            reviews.map((review) =>
                review.id === reviewId
                    ? { ...review, isVerified: !review.isVerified, updatedAt: new Date() }
                    : review,
            ),
        );
    };

    const handleDeleteReview = (reviewId: string) => {
        setReviews(reviews.filter((review) => review.id !== reviewId));
    };

    const handleEditReview = (review: Review) => {
        setSelectedReview(review);
        setIsEditDialogOpen(true);
    };

    const handleSaveReview = (updatedReview: Review) => {
        setReviews(
            reviews.map((review) =>
                review.id === updatedReview.id
                    ? { ...updatedReview, updatedAt: new Date() }
                    : review,
            ),
        );
        setIsEditDialogOpen(false);
        setSelectedReview(null);
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-zinc-600"
                    }`}
            />
        ));
    };

    const getStatusBadge = (review: Review) => {
        if (review.isPublished && review.isVerified) {
            return (
                <Badge className="bg-green-900/30 text-green-400 border-green-800">
                    Published & Verified
                </Badge>
            );
        } else if (review.isPublished) {
            return (
                <Badge className="bg-blue-900/30 text-blue-400 border-blue-800">
                    Published
                </Badge>
            );
        } else if (review.isVerified) {
            return (
                <Badge className="bg-yellow-900/30 text-yellow-400 border-yellow-800">
                    Verified
                </Badge>
            );
        } else {
            return (
                <Badge variant="secondary" className="bg-zinc-800 text-zinc-400">
                    Pending
                </Badge>
            );
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Review Management</h1>
                        <p className="text-zinc-400">
                            Manage customer reviews and feedback
                        </p>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-300">
                                Total Reviews
                            </CardTitle>
                            <MessageSquare className="h-4 w-4 text-cyan-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">
                                {reviews.length}
                            </div>
                            <p className="text-xs text-zinc-500">All time</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-300">
                                Average Rating
                            </CardTitle>
                            <Star className="h-4 w-4 text-yellow-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">
                                {(
                                    reviews.reduce((sum, review) => sum + review.rating, 0) /
                                    reviews.length
                                ).toFixed(1)}
                            </div>
                            <p className="text-xs text-zinc-500">Out of 5 stars</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-300">
                                Published
                            </CardTitle>
                            <Eye className="h-4 w-4 text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">
                                {reviews.filter((r) => r.isPublished).length}
                            </div>
                            <p className="text-xs text-zinc-500">Live reviews</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/50 border-zinc-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-zinc-300">
                                Verified
                            </CardTitle>
                            <CheckCircle className="h-4 w-4 text-blue-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-white">
                                {reviews.filter((r) => r.isVerified).length}
                            </div>
                            <p className="text-xs text-zinc-500">Verified reviews</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Filter className="h-5 w-5" />
                            Filters
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <Label htmlFor="search" className="text-zinc-300">
                                    Search Reviews
                                </Label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                                    <Input
                                        id="search"
                                        placeholder="Search by title or comment..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label className="text-zinc-300">Rating</Label>
                                <Select value={filterRating} onValueChange={setFilterRating}>
                                    <SelectTrigger className="w-32 bg-zinc-800 border-zinc-700">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Ratings</SelectItem>
                                        <SelectItem value="5">5 Stars</SelectItem>
                                        <SelectItem value="4">4 Stars</SelectItem>
                                        <SelectItem value="3">3 Stars</SelectItem>
                                        <SelectItem value="2">2 Stars</SelectItem>
                                        <SelectItem value="1">1 Star</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label className="text-zinc-300">Status</Label>
                                <Select value={filterStatus} onValueChange={setFilterStatus}>
                                    <SelectTrigger className="w-40 bg-zinc-800 border-zinc-700">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="unpublished">Unpublished</SelectItem>
                                        <SelectItem value="verified">Verified</SelectItem>
                                        <SelectItem value="unverified">Unverified</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Reviews Table */}
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">
                            Reviews ({filteredReviews.length})
                        </CardTitle>
                        <CardDescription className="text-zinc-400">
                            Manage customer reviews and feedback
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-zinc-800">
                                        <TableHead className="text-zinc-300">Review</TableHead>
                                        <TableHead className="text-zinc-300">Rating</TableHead>
                                        <TableHead className="text-zinc-300">Hotel/Room</TableHead>
                                        <TableHead className="text-zinc-300">Status</TableHead>
                                        <TableHead className="text-zinc-300">Date</TableHead>
                                        <TableHead className="text-zinc-300">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredReviews.map((review) => (
                                        <TableRow key={review.id} className="border-zinc-800">
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="font-medium text-white">
                                                        {review.title}
                                                    </div>
                                                    <div className="text-sm text-zinc-400 max-w-xs truncate">
                                                        {review.comment}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                                                        <User className="h-3 w-3" />
                                                        Customer ID: {review.customerId}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    {renderStars(review.rating)}
                                                    <span className="ml-2 text-sm text-zinc-400">
                                                        ({review.rating})
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-1 text-sm text-zinc-400">
                                                        <Building2 className="h-3 w-3" />
                                                        {review.hotelId}
                                                    </div>
                                                    {review.roomId && (
                                                        <div className="flex items-center gap-1 text-sm text-zinc-500">
                                                            <Bed className="h-3 w-3" />
                                                            {review.roomId}
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(review)}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1 text-sm text-zinc-400">
                                                    <Calendar className="h-3 w-3" />
                                                    {review.createdAt.toLocaleDateString()}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleTogglePublished(review.id)}
                                                        className="text-zinc-400 hover:text-white"
                                                    >
                                                        {review.isPublished ? (
                                                            <EyeOff className="h-4 w-4" />
                                                        ) : (
                                                            <Eye className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleToggleVerified(review.id)}
                                                        className="text-zinc-400 hover:text-white"
                                                    >
                                                        {review.isVerified ? (
                                                            <XCircle className="h-4 w-4" />
                                                        ) : (
                                                            <CheckCircle className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleEditReview(review)}
                                                        className="text-zinc-400 hover:text-white"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleDeleteReview(review.id)}
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
                        </div>
                    </CardContent>
                </Card>

                {/* Edit Review Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Edit Review</DialogTitle>
                            <DialogDescription className="text-zinc-400">
                                Modify review details and status
                            </DialogDescription>
                        </DialogHeader>
                        {selectedReview && (
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="title" className="text-zinc-300">
                                        Title
                                    </Label>
                                    <Input
                                        id="title"
                                        value={selectedReview.title}
                                        onChange={(e) =>
                                            setSelectedReview({
                                                ...selectedReview,
                                                title: e.target.value,
                                            })
                                        }
                                        className="bg-zinc-800 border-zinc-700 text-white"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="comment" className="text-zinc-300">
                                        Comment
                                    </Label>
                                    <Textarea
                                        id="comment"
                                        value={selectedReview.comment}
                                        onChange={(e) =>
                                            setSelectedReview({
                                                ...selectedReview,
                                                comment: e.target.value,
                                            })
                                        }
                                        className="bg-zinc-800 border-zinc-700 text-white min-h-24"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="rating" className="text-zinc-300">
                                        Rating
                                    </Label>
                                    <Select
                                        value={selectedReview.rating.toString()}
                                        onValueChange={(value) =>
                                            setSelectedReview({
                                                ...selectedReview,
                                                rating: parseInt(value),
                                            })
                                        }
                                    >
                                        <SelectTrigger className="bg-zinc-800 border-zinc-700">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">1 Star</SelectItem>
                                            <SelectItem value="2">2 Stars</SelectItem>
                                            <SelectItem value="3">3 Stars</SelectItem>
                                            <SelectItem value="4">4 Stars</SelectItem>
                                            <SelectItem value="5">5 Stars</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="published"
                                            checked={selectedReview.isPublished}
                                            onCheckedChange={(checked) =>
                                                setSelectedReview({
                                                    ...selectedReview,
                                                    isPublished: checked,
                                                })
                                            }
                                        />
                                        <Label htmlFor="published" className="text-zinc-300">
                                            Published
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="verified"
                                            checked={selectedReview.isVerified}
                                            onCheckedChange={(checked) =>
                                                setSelectedReview({
                                                    ...selectedReview,
                                                    isVerified: checked,
                                                })
                                            }
                                        />
                                        <Label htmlFor="verified" className="text-zinc-300">
                                            Verified
                                        </Label>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2 pt-4">
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsEditDialogOpen(false)}
                                        className="border-zinc-700 hover:bg-zinc-800"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={() => handleSaveReview(selectedReview)}
                                        className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600"
                                    >
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </motion.div>
        </div>
    );
};

export default ReviewManagement;
