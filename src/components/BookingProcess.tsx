import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  CreditCard,
  Calendar,
  User,
  Check,
  Clock,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import DatePickerWithRange from "@/components/ui/date-picker-with-range";

interface BookingProcessProps {
  hotelName?: string;
  roomType?: string;
  checkInDate?: Date;
  checkOutDate?: Date;
  guestCount?: number;
  pricePerNight?: number;
  onComplete?: () => void;
}

const BookingProcess = ({
  hotelName = "Neo Tokyo Suites",
  roomType = "Cyberpunk Deluxe Room",
  checkInDate = new Date(),
  checkOutDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  guestCount = 2,
  pricePerNight = 199,
  onComplete = () => {},
}: BookingProcessProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(33);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    paymentMethod: "credit-card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      setProgress((currentStep + 1) * 33);
    } else {
      onComplete();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setProgress((currentStep - 1) * 33);
    }
  };

  // Calculate nights and total price
  const nights = Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24),
  );
  const totalPrice = pricePerNight * nights;
  const tax = totalPrice * 0.12;
  const grandTotal = totalPrice + tax;

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-black bg-opacity-80 rounded-xl border border-gray-800 backdrop-blur-md">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Complete Your Booking
        </h2>
        <div className="relative">
          <Progress value={progress} className="h-2 bg-gray-700" />
          <div className="flex justify-between mt-2">
            <div
              className={`flex flex-col items-center ${currentStep >= 1 ? "text-blue-400" : "text-gray-500"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-blue-500" : "bg-gray-700"}`}
              >
                <User size={16} />
              </div>
              <span className="text-xs mt-1">Guest Info</span>
            </div>
            <div
              className={`flex flex-col items-center ${currentStep >= 2 ? "text-blue-400" : "text-gray-500"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-blue-500" : "bg-gray-700"}`}
              >
                <Calendar size={16} />
              </div>
              <span className="text-xs mt-1">Review</span>
            </div>
            <div
              className={`flex flex-col items-center ${currentStep >= 3 ? "text-blue-400" : "text-gray-500"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-blue-500" : "bg-gray-700"}`}
              >
                <CreditCard size={16} />
              </div>
              <span className="text-xs mt-1">Payment</span>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {currentStep === 1 && (
          <Card className="bg-gray-900 border-gray-800 text-white">
            <CardHeader>
              <CardTitle className="text-blue-400">Guest Information</CardTitle>
              <CardDescription className="text-gray-400">
                Please provide your details for the reservation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-300">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-300">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-300">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialRequests" className="text-gray-300">
                  Special Requests (Optional)
                </Label>
                <Input
                  id="specialRequests"
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Any special requests or requirements"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card className="bg-gray-900 border-gray-800 text-white">
            <CardHeader>
              <CardTitle className="text-blue-400">Booking Summary</CardTitle>
              <CardDescription className="text-gray-400">
                Review your booking details before proceeding to payment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-700">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {hotelName}
                    </h3>
                    <p className="text-gray-400">{roomType}</p>
                  </div>
                  <div className="bg-blue-500 bg-opacity-20 p-2 rounded-lg border border-blue-500">
                    <span className="text-blue-400 font-bold">
                      ${pricePerNight}
                    </span>
                    <span className="text-gray-400 text-sm"> / night</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Calendar size={16} className="text-blue-400 mr-2" />
                      <span className="text-gray-300">Check-in</span>
                    </div>
                    <p className="text-white font-medium">
                      {checkInDate.toLocaleDateString()}
                    </p>
                    <p className="text-gray-400 text-sm">After 3:00 PM</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Calendar size={16} className="text-blue-400 mr-2" />
                      <span className="text-gray-300">Check-out</span>
                    </div>
                    <p className="text-white font-medium">
                      {checkOutDate.toLocaleDateString()}
                    </p>
                    <p className="text-gray-400 text-sm">Before 11:00 AM</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <User size={16} className="text-blue-400 mr-2" />
                    <span className="text-gray-300">Guests</span>
                  </div>
                  <p className="text-white">
                    {guestCount} {guestCount === 1 ? "Guest" : "Guests"}
                  </p>
                </div>

                <Separator className="bg-gray-700" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-300">
                      {nights} {nights === 1 ? "night" : "nights"} × $
                      {pricePerNight}
                    </span>
                    <span className="text-white">${totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Taxes (12%)</span>
                    <span className="text-white">${tax.toFixed(2)}</span>
                  </div>
                  <Separator className="bg-gray-700 my-2" />
                  <div className="flex justify-between">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-blue-400 font-bold">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <div className="flex items-start">
                    <Clock size={18} className="text-blue-400 mr-2 mt-1" />
                    <div>
                      <h4 className="text-white font-medium">
                        Cancellation Policy
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Free cancellation until 48 hours before check-in. After
                        that, you will be charged the first night's rate.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
          <Card className="bg-gray-900 border-gray-800 text-white">
            <CardHeader>
              <CardTitle className="text-blue-400">
                Payment Information
              </CardTitle>
              <CardDescription className="text-gray-400">
                Select your preferred payment method
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="credit-card" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                  <TabsTrigger
                    value="credit-card"
                    className="data-[state=active]:bg-blue-500"
                  >
                    Credit Card
                  </TabsTrigger>
                  <TabsTrigger
                    value="paypal"
                    className="data-[state=active]:bg-blue-500"
                  >
                    PayPal
                  </TabsTrigger>
                  <TabsTrigger
                    value="crypto"
                    className="data-[state=active]:bg-blue-500"
                  >
                    Crypto
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="credit-card" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber" className="text-gray-300">
                      Card Number
                    </Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cardName" className="text-gray-300">
                      Name on Card
                    </Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate" className="text-gray-300">
                        Expiry Date
                      </Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-700 text-white"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv" className="text-gray-300">
                        CVV
                      </Label>
                      <Input
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="bg-gray-800 border-gray-700 text-white"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="paypal" className="mt-4">
                  <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center">
                    <div className="text-2xl font-bold mb-4 text-blue-400">
                      PayPal
                    </div>
                    <p className="text-gray-300 mb-4">
                      You will be redirected to PayPal to complete your payment
                      securely.
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                      Continue to PayPal
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="crypto" className="mt-4">
                  <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 text-center">
                    <div className="text-2xl font-bold mb-4 text-blue-400">
                      Cryptocurrency
                    </div>
                    <p className="text-gray-300 mb-4">
                      Pay with Bitcoin, Ethereum, or other cryptocurrencies.
                    </p>
                    <div className="bg-gray-900 p-4 rounded-lg mb-4 border border-gray-700">
                      <p className="text-gray-300 text-sm mb-2">
                        Send exact amount to the following address:
                      </p>
                      <p className="text-white font-mono bg-gray-800 p-2 rounded">
                        bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <AlertCircle size={16} className="text-yellow-500 mr-2" />
                      <p className="text-yellow-500 text-sm">
                        Payment will be confirmed after 3 network confirmations
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </motion.div>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrevStep}
          disabled={currentStep === 1}
          className="border-gray-700 text-gray-300 hover:bg-gray-800"
        >
          Back
        </Button>
        <Button
          onClick={handleNextStep}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {currentStep === 3 ? "Complete Booking" : "Continue"}
          <ChevronRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default BookingProcess;
