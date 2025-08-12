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
export interface Booking {
    id: string;
    customerId: string;
    hotelId: string;
    roomId: string;
    checkInDate: Date;
    checkOutDate: Date;
    status: 'pending' | 'confirmed' | 'canceled';
    createdAt: Date;
    updatedAt: Date;
}
export interface BookingReport {
    id: string;
    hotelId: string;
    startDate: Date;
    endDate: Date;
    totalBookings: number;
    totalRevenue: number;
    averageStayDuration: number;
    occupancyRate: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface BookingManagement {
    id: string;
    bookingId: string;
    action: 'confirm' | 'cancel' | 'modify';
    performedBy: string; // Admin ID
    performedAt: Date;
    notes?: string;
}
export interface InvoiceManagement{
    id: string;
    bookingId: string;
    customerId: string;
    amount: number;
    status: 'paid' | 'unpaid' | 'refunded';
    issuedAt: Date;
    dueDate: Date;
    paymentMethod: 'credit_card' | 'bank_transfer' | 'cash';
    createdAt: Date;
    updatedAt: Date;
}
export interface Invoice {
    id: string;
    invoiceNumber: string;
    customerId: string;
    customerName: string;
    customerEmail: string;
    hotelId: string;
    hotelName: string;
    bookingId: string;
    issueDate: Date;
    dueDate: Date;
    items: InvoiceItem[];
    subtotal: number;
    taxAmount: number;
    discountAmount: number;
    totalAmount: number;
    paidAmount: number;
    balanceAmount: number;
    status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
    paymentStatus: "pending" | "partial" | "paid" | "failed";
    paymentMethod?: string;
    paymentDate?: Date;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    type: "room" | "service" | "food" | "tax" | "discount";
}
export interface Transaction {
    id: string;
    user: string;
    amount: number;
    method: string;
    status: 'Pending' | 'Completed' | 'Failed' | 'Processing';
    date: string;
}
export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    featuredImage: string;
    authorId: string;
    authorName: string;
    categoryId: string;
    categoryName: string;
    tags: string[];
    status: "draft" | "published" | "archived";
    publishedAt?: Date;
    views: number;
    likes: number;
    comments: number;
    seoTitle?: string;
    seoDescription?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface BlogCategory {
    id: string;
    name: string;
    slug: string;
    description: string;
    color: string;
    image?: string;
    postCount: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface BlogTag {
    id: string;
    name: string;
    slug: string;
    description?: string;
    color: string;
    postCount: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface PaymentTransaction {
    id: string;
    bookingId: string;
    customerId: string;
    customerName: string;
    amount: number;
    currency: string;
    paymentMethod: "credit_card" | "debit_card" | "paypal" | "bank_transfer" | "cash";
    status: "pending" | "completed" | "failed" | "refunded" | "cancelled";
    transactionType: "payment" | "refund" | "partial_refund";
    paymentGateway: string;
    transactionId: string;
    description: string;
    fees: number;
    netAmount: number;
    processedAt?: Date;
    refundedAt?: Date;
    failureReason?: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface PaymentMethod {
    id: string;
    name: string;
    type: "credit_card" | "bank_transfer" | "digital_wallet" | "qr_payment" | "mobile_banking";
    provider: string;
    description: string;
    isActive: boolean;
    isDefault: boolean;
    configuration: {
        apiKey?: string;
        secretKey?: string;
        merchantId?: string;
        publicKey?: string;
        webhookUrl?: string;
        sandboxMode?: boolean;
        supportedCurrencies: string[];
        processingFee: number;
        processingFeeType: "percentage" | "fixed";
    };
    gatewayDetails: {
        endpoint: string;
        version: string;
        timeout: number;
        retryAttempts: number;
    };
    features: {
        supportsRefunds: boolean;
        supportsPartialRefunds: boolean;
        supportsRecurring: boolean;
        supportsQrCode: boolean;
        supportsMobileApp: boolean;
    };
    createdAt: Date;
    updatedAt: Date;
}

export interface PaymentGateway {
    id: string;
    name: string;
    provider: "aba_payway" | "bakong_nbc" | "wing" | "truemoney" | "pipay" | "acleda" | "canadia" | "other";
    displayName: string;
    logo: string;
    description: string;
    supportedPaymentTypes: string[];
    configuration: {
        baseUrl: string;
        apiVersion: string;
        merchantCode: string;
        apiKey: string;
        secretKey: string;
        publicKey?: string;
        certificatePath?: string;
        webhookSecret: string;
        callbackUrl: string;
        returnUrl: string;
        cancelUrl: string;
    };
    qrCodeSettings?: {
        enabled: boolean;
        format: "static" | "dynamic";
        expiryMinutes: number;
        maxAmount: number;
        minAmount: number;
    };
    fees: {
        transactionFee: number;
        transactionFeeType: "percentage" | "fixed";
        minimumFee: number;
        maximumFee: number;
    };
    limits: {
        minTransactionAmount: number;
        maxTransactionAmount: number;
        dailyLimit: number;
        monthlyLimit: number;
    };
    isActive: boolean;
    testMode: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface GalleriesProperty {
    id: string;
    name: string;
    location: string;
    price: number;
    rating: number;
    image: string;
    featured: boolean;
    isVisible: boolean;
    order: number;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
} 
export interface Testimonials {
    id: string;
    customerId: string;
    customerName: string;
    customerEmail: string;
    hotelId?: string;
    hotelName?: string;
    title: string;
    content: string;
    rating: number;
    image?: string;
    isPublished: boolean;
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface ContactManagement {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    status: 'new' | 'in_progress' | 'resolved' | 'closed';
    assignedTo?: string; // Admin ID
    createdAt: Date;
    updatedAt: Date;
}