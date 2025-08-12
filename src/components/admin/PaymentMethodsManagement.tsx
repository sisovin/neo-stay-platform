import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    CreditCard,
    Smartphone,
    QrCode,
    Building2,
    Plus,
    Edit,
    Trash2,
    Settings,
    Eye,
    EyeOff,
    Check,
    X,
    Star,
    AlertTriangle,
    Banknote,
    Wallet,
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
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
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import type { PaymentMethod, PaymentGateway } from "@/types/admin";

const PaymentMethodsManagement = () => {
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
        {
            id: "1",
            name: "ABA PayWay",
            type: "digital_wallet",
            provider: "ABA Bank",
            description: "Cambodia's leading digital payment solution",
            isActive: true,
            isDefault: true,
            configuration: {
                apiKey: "aba_live_***",
                secretKey: "***",
                merchantId: "MERCHANT_001",
                publicKey: "pub_***",
                webhookUrl: "https://api.hotel.com/webhooks/aba",
                sandboxMode: false,
                supportedCurrencies: ["USD", "KHR"],
                processingFee: 2.5,
                processingFeeType: "percentage",
            },
            gatewayDetails: {
                endpoint: "https://api.payway.com.kh",
                version: "v2",
                timeout: 30000,
                retryAttempts: 3,
            },
            features: {
                supportsRefunds: true,
                supportsPartialRefunds: true,
                supportsRecurring: false,
                supportsQrCode: true,
                supportsMobileApp: true,
            },
            createdAt: new Date("2024-01-15"),
            updatedAt: new Date("2024-01-20"),
        },
        {
            id: "2",
            name: "Bakong (NBC)",
            type: "qr_payment",
            provider: "National Bank of Cambodia",
            description: "Cambodia's national payment system",
            isActive: true,
            isDefault: false,
            configuration: {
                apiKey: "bakong_live_***",
                secretKey: "***",
                merchantId: "NBC_MERCHANT_001",
                webhookUrl: "https://api.hotel.com/webhooks/bakong",
                sandboxMode: false,
                supportedCurrencies: ["KHR", "USD"],
                processingFee: 1.0,
                processingFeeType: "percentage",
            },
            gatewayDetails: {
                endpoint: "https://api-bakong.nbc.gov.kh",
                version: "v1",
                timeout: 25000,
                retryAttempts: 2,
            },
            features: {
                supportsRefunds: true,
                supportsPartialRefunds: false,
                supportsRecurring: false,
                supportsQrCode: true,
                supportsMobileApp: true,
            },
            createdAt: new Date("2024-01-10"),
            updatedAt: new Date("2024-01-18"),
        },
    ]);

    const [paymentGateways, setPaymentGateways] = useState<PaymentGateway[]>([
        {
            id: "1",
            name: "ABA PayWay Gateway",
            provider: "aba_payway",
            displayName: "ABA PayWay",
            logo: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&q=80",
            description: "Secure payment processing with ABA Bank",
            supportedPaymentTypes: ["card", "wallet", "qr", "mobile"],
            configuration: {
                baseUrl: "https://api.payway.com.kh",
                apiVersion: "v2",
                merchantCode: "ABA_MERCHANT_001",
                apiKey: "aba_api_***",
                secretKey: "aba_secret_***",
                publicKey: "aba_public_***",
                webhookSecret: "webhook_secret_***",
                callbackUrl: "https://api.hotel.com/payment/callback",
                returnUrl: "https://hotel.com/payment/success",
                cancelUrl: "https://hotel.com/payment/cancel",
            },
            qrCodeSettings: {
                enabled: true,
                format: "dynamic",
                expiryMinutes: 15,
                maxAmount: 10000,
                minAmount: 1,
            },
            fees: {
                transactionFee: 2.5,
                transactionFeeType: "percentage",
                minimumFee: 0.5,
                maximumFee: 50,
            },
            limits: {
                minTransactionAmount: 1,
                maxTransactionAmount: 10000,
                dailyLimit: 50000,
                monthlyLimit: 500000,
            },
            isActive: true,
            testMode: false,
            createdAt: new Date("2024-01-15"),
            updatedAt: new Date("2024-01-20"),
        },
        {
            id: "2",
            name: "Bakong NBC Gateway",
            provider: "bakong_nbc",
            displayName: "Bakong",
            logo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&q=80",
            description: "National payment system of Cambodia",
            supportedPaymentTypes: ["qr", "mobile", "bank_transfer"],
            configuration: {
                baseUrl: "https://api-bakong.nbc.gov.kh",
                apiVersion: "v1",
                merchantCode: "NBC_MERCHANT_001",
                apiKey: "bakong_api_***",
                secretKey: "bakong_secret_***",
                webhookSecret: "bakong_webhook_***",
                callbackUrl: "https://api.hotel.com/payment/bakong/callback",
                returnUrl: "https://hotel.com/payment/success",
                cancelUrl: "https://hotel.com/payment/cancel",
            },
            qrCodeSettings: {
                enabled: true,
                format: "static",
                expiryMinutes: 30,
                maxAmount: 5000,
                minAmount: 0.5,
            },
            fees: {
                transactionFee: 1.0,
                transactionFeeType: "percentage",
                minimumFee: 0.1,
                maximumFee: 25,
            },
            limits: {
                minTransactionAmount: 0.5,
                maxTransactionAmount: 5000,
                dailyLimit: 25000,
                monthlyLimit: 250000,
            },
            isActive: true,
            testMode: false,
            createdAt: new Date("2024-01-10"),
            updatedAt: new Date("2024-01-18"),
        },
    ]);

    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isGatewayDialogOpen, setIsGatewayDialogOpen] = useState(false);
    const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
    const [editingGateway, setEditingGateway] = useState<PaymentGateway | null>(null);
    const [showSecrets, setShowSecrets] = useState<{ [key: string]: boolean }>({});

    const getMethodIcon = (type: string) => {
        switch (type) {
            case "credit_card":
                return CreditCard;
            case "digital_wallet":
                return Wallet;
            case "qr_payment":
                return QrCode;
            case "mobile_banking":
                return Smartphone;
            case "bank_transfer":
                return Building2;
            default:
                return CreditCard;
        }
    };

    const getProviderIcon = (provider: string) => {
        switch (provider) {
            case "aba_payway":
                return Wallet;
            case "bakong_nbc":
                return QrCode;
            case "wing":
                return Smartphone;
            default:
                return Banknote;
        }
    };

    const handleSetDefault = (methodId: string) => {
        setPaymentMethods(prev =>
            prev.map(method => ({
                ...method,
                isDefault: method.id === methodId,
            }))
        );
    };

    const handleToggleActive = (methodId: string) => {
        setPaymentMethods(prev =>
            prev.map(method =>
                method.id === methodId
                    ? { ...method, isActive: !method.isActive }
                    : method
            )
        );
    };

    const handleDeleteMethod = (methodId: string) => {
        setPaymentMethods(prev => prev.filter(method => method.id !== methodId));
    };

    const toggleSecretVisibility = (key: string) => {
        setShowSecrets(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const maskSecret = (secret: string, show: boolean) => {
        if (show) return secret;
        return secret.replace(/./g, "*");
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
                        <h1 className="text-3xl font-bold mb-2">Payment Methods</h1>
                        <p className="text-zinc-400">
                            Configure payment gateways and manage payment processing
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Dialog open={isGatewayDialogOpen} onOpenChange={setIsGatewayDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="border-zinc-700 hover:bg-zinc-800"
                                >
                                    <Settings className="h-4 w-4 mr-2" />
                                    Gateway Settings
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-zinc-900 border-zinc-800 max-w-4xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle className="text-white">Payment Gateway Configuration</DialogTitle>
                                    <DialogDescription className="text-zinc-400">
                                        Configure payment gateway settings and API details
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-6">
                                    {paymentGateways.map((gateway) => {
                                        const ProviderIcon = getProviderIcon(gateway.provider);
                                        return (
                                            <Card key={gateway.id} className="bg-zinc-800/50 border-zinc-700">
                                                <CardHeader>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-2 bg-gradient-to-r from-violet-600/20 to-cyan-500/20 rounded-lg">
                                                                <ProviderIcon className="h-5 w-5 text-cyan-400" />
                                                            </div>
                                                            <div>
                                                                <CardTitle className="text-white">{gateway.displayName}</CardTitle>
                                                                <CardDescription className="text-zinc-400">
                                                                    {gateway.description}
                                                                </CardDescription>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Badge
                                                                variant={gateway.isActive ? "default" : "secondary"}
                                                                className={gateway.isActive ? "bg-green-600" : "bg-zinc-600"}
                                                            >
                                                                {gateway.isActive ? "Active" : "Inactive"}
                                                            </Badge>
                                                            {gateway.testMode && (
                                                                <Badge variant="outline" className="border-yellow-600 text-yellow-400">
                                                                    Test Mode
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <Label className="text-zinc-300">API Endpoint</Label>
                                                            <Input
                                                                value={gateway.configuration.baseUrl}
                                                                className="bg-zinc-800 border-zinc-700 text-white"
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label className="text-zinc-300">Merchant Code</Label>
                                                            <Input
                                                                value={gateway.configuration.merchantCode}
                                                                className="bg-zinc-800 border-zinc-700 text-white"
                                                                readOnly
                                                            />
                                                        </div>
                                                        <div>
                                                            <Label className="text-zinc-300">API Key</Label>
                                                            <div className="flex gap-2">
                                                                <Input
                                                                    value={maskSecret(
                                                                        gateway.configuration.apiKey,
                                                                        showSecrets[`${gateway.id}_api`] || false
                                                                    )}
                                                                    className="bg-zinc-800 border-zinc-700 text-white"
                                                                    readOnly
                                                                />
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => toggleSecretVisibility(`${gateway.id}_api`)}
                                                                >
                                                                    {showSecrets[`${gateway.id}_api`] ? (
                                                                        <EyeOff className="h-4 w-4" />
                                                                    ) : (
                                                                        <Eye className="h-4 w-4" />
                                                                    )}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <Label className="text-zinc-300">Secret Key</Label>
                                                            <div className="flex gap-2">
                                                                <Input
                                                                    value={maskSecret(
                                                                        gateway.configuration.secretKey,
                                                                        showSecrets[`${gateway.id}_secret`] || false
                                                                    )}
                                                                    className="bg-zinc-800 border-zinc-700 text-white"
                                                                    readOnly
                                                                />
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => toggleSecretVisibility(`${gateway.id}_secret`)}
                                                                >
                                                                    {showSecrets[`${gateway.id}_secret`] ? (
                                                                        <EyeOff className="h-4 w-4" />
                                                                    ) : (
                                                                        <Eye className="h-4 w-4" />
                                                                    )}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {gateway.qrCodeSettings?.enabled && (
                                                        <div className="mt-4">
                                                            <h4 className="text-sm font-medium text-zinc-300 mb-2">QR Code Settings</h4>
                                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                                <div>
                                                                    <Label className="text-xs text-zinc-400">Format</Label>
                                                                    <p className="text-sm text-white capitalize">
                                                                        {gateway.qrCodeSettings.format}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <Label className="text-xs text-zinc-400">Expiry (min)</Label>
                                                                    <p className="text-sm text-white">
                                                                        {gateway.qrCodeSettings.expiryMinutes}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <Label className="text-xs text-zinc-400">Min Amount</Label>
                                                                    <p className="text-sm text-white">
                                                                        ${gateway.qrCodeSettings.minAmount}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <Label className="text-xs text-zinc-400">Max Amount</Label>
                                                                    <p className="text-sm text-white">
                                                                        ${gateway.qrCodeSettings.maxAmount}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="mt-4">
                                                        <h4 className="text-sm font-medium text-zinc-300 mb-2">Transaction Limits</h4>
                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                            <div>
                                                                <Label className="text-xs text-zinc-400">Min Transaction</Label>
                                                                <p className="text-sm text-white">
                                                                    ${gateway.limits.minTransactionAmount}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <Label className="text-xs text-zinc-400">Max Transaction</Label>
                                                                <p className="text-sm text-white">
                                                                    ${gateway.limits.maxTransactionAmount}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <Label className="text-xs text-zinc-400">Daily Limit</Label>
                                                                <p className="text-sm text-white">
                                                                    ${gateway.limits.dailyLimit.toLocaleString()}
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <Label className="text-xs text-zinc-400">Monthly Limit</Label>
                                                                <p className="text-sm text-white">
                                                                    ${gateway.limits.monthlyLimit.toLocaleString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </DialogContent>
                        </Dialog>

                        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Payment Method
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-zinc-900 border-zinc-800 max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle className="text-white">Add Payment Method</DialogTitle>
                                    <DialogDescription className="text-zinc-400">
                                        Configure a new payment method for your hotel booking system
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-zinc-300">Method Name</Label>
                                            <Input
                                                placeholder="e.g., Wing Money"
                                                className="bg-zinc-800 border-zinc-700 text-white"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-zinc-300">Provider</Label>
                                            <Input
                                                placeholder="e.g., Wing Bank"
                                                className="bg-zinc-800 border-zinc-700 text-white"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label className="text-zinc-300">Payment Type</Label>
                                        <Select>
                                            <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                                                <SelectValue placeholder="Select payment type" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-800 border-zinc-700">
                                                <SelectItem value="credit_card">Credit Card</SelectItem>
                                                <SelectItem value="digital_wallet">Digital Wallet</SelectItem>
                                                <SelectItem value="qr_payment">QR Payment</SelectItem>
                                                <SelectItem value="mobile_banking">Mobile Banking</SelectItem>
                                                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label className="text-zinc-300">Description</Label>
                                        <Textarea
                                            placeholder="Brief description of the payment method"
                                            className="bg-zinc-800 border-zinc-700 text-white"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsAddDialogOpen(false)}
                                        className="border-zinc-700 hover:bg-zinc-800"
                                    >
                                        Cancel
                                    </Button>
                                    <Button className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600">
                                        Add Method
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Payment Methods Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paymentMethods.map((method) => {
                        const MethodIcon = getMethodIcon(method.type);
                        return (
                            <Card
                                key={method.id}
                                className={`bg-zinc-900/50 border-zinc-800 transition-all hover:border-zinc-700 ${method.isDefault ? "ring-2 ring-violet-500/50" : ""
                                    }`}
                            >
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gradient-to-r from-violet-600/20 to-cyan-500/20 rounded-lg">
                                                <MethodIcon className="h-5 w-5 text-cyan-400" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-white flex items-center gap-2">
                                                    {method.name}
                                                    {method.isDefault && (
                                                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                    )}
                                                </CardTitle>
                                                <CardDescription className="text-zinc-400">
                                                    {method.provider}
                                                </CardDescription>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Switch
                                                checked={method.isActive}
                                                onCheckedChange={() => handleToggleActive(method.id)}
                                            />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-zinc-400">{method.description}</p>

                                    <div className="flex flex-wrap gap-2">
                                        <Badge
                                            variant={method.isActive ? "default" : "secondary"}
                                            className={method.isActive ? "bg-green-600" : "bg-zinc-600"}
                                        >
                                            {method.isActive ? "Active" : "Inactive"}
                                        </Badge>
                                        <Badge variant="outline" className="border-zinc-600 text-zinc-300">
                                            {method.type.replace("_", " ").toUpperCase()}
                                        </Badge>
                                        {method.configuration.sandboxMode && (
                                            <Badge variant="outline" className="border-yellow-600 text-yellow-400">
                                                Sandbox
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-zinc-400">Processing Fee:</span>
                                            <span className="text-white">
                                                {method.configuration.processingFee}%
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-zinc-400">Currencies:</span>
                                            <span className="text-white">
                                                {method.configuration.supportedCurrencies.join(", ")}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-1">
                                        {method.features.supportsQrCode && (
                                            <Badge variant="outline" className="text-xs border-cyan-600 text-cyan-400">
                                                QR Code
                                            </Badge>
                                        )}
                                        {method.features.supportsRefunds && (
                                            <Badge variant="outline" className="text-xs border-green-600 text-green-400">
                                                Refunds
                                            </Badge>
                                        )}
                                        {method.features.supportsMobileApp && (
                                            <Badge variant="outline" className="text-xs border-blue-600 text-blue-400">
                                                Mobile
                                            </Badge>
                                        )}
                                    </div>

                                    <Separator className="bg-zinc-800" />

                                    <div className="flex gap-2">
                                        {!method.isDefault && (
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleSetDefault(method.id)}
                                                className="flex-1 border-zinc-700 hover:bg-zinc-800"
                                            >
                                                <Star className="h-3 w-3 mr-1" />
                                                Set Default
                                            </Button>
                                        )}
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => setEditingMethod(method)}
                                            className="text-zinc-400 hover:text-white"
                                        >
                                            <Edit className="h-3 w-3" />
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className="bg-zinc-900 border-zinc-800">
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle className="text-white">
                                                        Delete Payment Method
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription className="text-zinc-400">
                                                        Are you sure you want to delete &quot;{method.name}&quot;? This action cannot be undone.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel className="border-zinc-700 hover:bg-zinc-800">
                                                        Cancel
                                                    </AlertDialogCancel>
                                                    <AlertDialogAction
                                                        onClick={() => handleDeleteMethod(method.id)}
                                                        className="bg-red-600 hover:bg-red-700"
                                                    >
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Quick Setup Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-br from-violet-900/20 to-cyan-900/20 border-violet-800/50">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <QrCode className="h-6 w-6 text-violet-400" />
                                <div>
                                    <CardTitle className="text-white">QR Code Payments</CardTitle>
                                    <CardDescription className="text-zinc-400">
                                        Enable quick QR code scanning
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-zinc-400 mb-4">
                                Allow customers to pay by scanning QR codes with their mobile banking apps.
                            </p>
                            <Button
                                size="sm"
                                className="bg-violet-600 hover:bg-violet-700"
                            >
                                Configure QR Settings
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border-cyan-800/50">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <Smartphone className="h-6 w-6 text-cyan-400" />
                                <div>
                                    <CardTitle className="text-white">Mobile Banking</CardTitle>
                                    <CardDescription className="text-zinc-400">
                                        Integrate with local banks
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-zinc-400 mb-4">
                                Connect with Wing, TrueMoney, Pi Pay, and other Cambodian mobile banking services.
                            </p>
                            <Button
                                size="sm"
                                className="bg-cyan-600 hover:bg-cyan-700"
                            >
                                Add Mobile Banking
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-800/50">
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <Building2 className="h-6 w-6 text-green-400" />
                                <div>
                                    <CardTitle className="text-white">Bank Integration</CardTitle>
                                    <CardDescription className="text-zinc-400">
                                        Direct bank connections
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-zinc-400 mb-4">
                                Integrate with ACLEDA, Canadia Bank, and other major Cambodian banks.
                            </p>
                            <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                            >
                                Setup Bank APIs
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        </div>
    );
};

export default PaymentMethodsManagement;
