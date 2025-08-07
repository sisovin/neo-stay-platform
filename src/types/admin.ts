export interface Hotel {
    id: string;
    name: string;
    description: string;
    address: string;
    city: string;
    country: string;
    rating: number;
    images: string[];
    amenities: string[];
    features: string[];
    services: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Room {
    id: string;
    hotelId: string;
    title: string;
    description: string;
    categoryId: string;
    price: number;
    maxGuests: number;
    size: number;
    images: string[];
    amenities: string[];
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface RoomCategory {
    id: string;
    name: string;
    description: string;
    basePrice: number;
    features: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Amenity {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: 'room' | 'hotel' | 'both';
    createdAt: Date;
    updatedAt: Date;
}

export interface Food {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    isAvailable: boolean;
    ingredients: string[];
    allergens: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface FoodCategory {
    id: string;
    name: string;
    description: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface HotelFeature {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    category: string;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Place {
    id: string;
    name: string;
    description: string;
    address: string;
    city: string;
    country: string;
    coordinates: {
        lat: number;
        lng: number;
    };
    category: string;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Review {
    id: string;
    customerId: string;
    hotelId: string;
    roomId?: string;
    rating: number;
    title: string;
    comment: string;
    images: string[];
    isVerified: boolean;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Customer {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth?: Date;
    address: {
        street: string;
        city: string;
        state: string;
        country: string;
        zipCode: string;
    };
    preferences: {
        roomType: string[];
        amenities: string[];
        dietaryRestrictions: string[];
    };
    loyaltyPoints: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Tax {
    id: string;
    name: string;
    description: string;
    rate: number;
    type: 'percentage' | 'fixed';
    applicableOn: 'room' | 'service' | 'food' | 'all';
    country: string;
    state?: string;
    city?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Coupon {
    id: string;
    code: string;
    name: string;
    description: string;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    minOrderValue: number;
    maxDiscountAmount?: number;
    usageLimit: number;
    usedCount: number;
    validFrom: Date;
    validUntil: Date;
    applicableOn: 'room' | 'service' | 'food' | 'all';
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface AdminStats {
    totalHotels: number;
    totalRooms: number;
    totalCustomers: number;
    totalBookings: number;
    totalRevenue: number;
    occupancyRate: number;
    averageRating: number;
    activePromotions: number;
}
