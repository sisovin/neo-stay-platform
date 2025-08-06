import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import {
  CalendarIcon,
  MapPin,
  Star,
  Wifi,
  Coffee,
  Utensils,
  Car,
  Tv,
  Users,
  ChevronRight,
} from "lucide-react";

interface HotelDetailProps {
  hotel?: {
    id: string;
    name: string;
    description: string;
    location: string;
    price: number;
    rating: number;
    images: string[];
    amenities: string[];
  };
}

const HotelDetail = ({
  hotel = {
    id: "1",
    name: "NeoTokyo Skyline Hotel",
    description:
      "Experience luxury with a cyberpunk twist at our premium hotel overlooking the neon-lit cityscape. Featuring cutting-edge technology, immersive environments, and unparalleled comfort for the discerning traveler.",
    location: "Downtown NeoTokyo, Sector 7",
    price: 299,
    rating: 4.8,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
    ],
    amenities: [
      "Free WiFi",
      "Breakfast",
      "Restaurant",
      "Parking",
      "Smart TV",
      "VR Lounge",
    ],
  },
}: HotelDetailProps) => {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    new Date(),
  );
  const [guests, setGuests] = useState(2);
  const [selectedRoom, setSelectedRoom] = useState<string | undefined>();

  const roomTypes = [
    { id: "standard", name: "Standard Room", price: hotel.price, capacity: 2 },
    {
      id: "deluxe",
      name: "Deluxe Room",
      price: hotel.price * 1.5,
      capacity: 2,
    },
    {
      id: "suite",
      name: "Executive Suite",
      price: hotel.price * 2.5,
      capacity: 4,
    },
    { id: "penthouse", name: "Penthouse", price: hotel.price * 4, capacity: 6 },
  ];

  const amenityIcons: Record<string, React.ReactNode> = {
    "Free WiFi": <Wifi className="h-4 w-4 mr-2" />,
    Breakfast: <Coffee className="h-4 w-4 mr-2" />,
    Restaurant: <Utensils className="h-4 w-4 mr-2" />,
    Parking: <Car className="h-4 w-4 mr-2" />,
    "Smart TV": <Tv className="h-4 w-4 mr-2" />,
    "VR Lounge": <Users className="h-4 w-4 mr-2" />,
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-black text-white">
      {/* Hotel Images Carousel with Tech Overlay */}
      <div className="relative mb-8">
        <Carousel className="w-full">
          <CarouselContent>
            {hotel.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-lg">
                  <img
                    src={image}
                    alt={`${hotel.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Circuit overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30"
                    style={{
                      backgroundImage: `url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJjaXJjdWl0IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTEwLDEwIEw5MCwxMCBMOTAsOTAgTDEwLDkwIFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwZjJmZjIwIiBzdHJva2Utd2lkdGg9IjAuNSIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjMiIGZpbGw9IiMwMGYyZmYzMCIvPjxsaW5lIHgxPSIxMCIgeTE9IjUwIiB4Mj0iNDciIHkyPSI1MCIgc3Ryb2tlPSIjMDBmMmZmMzAiIHN0cm9rZS13aWR0aD0iMC41Ii8+PGxpbmUgeDE9IjUzIiB5MT0iNTAiIHgyPSI5MCIgeTI9IjUwIiBzdHJva2U9IiMwMGYyZmYzMCIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjY2lyY3VpdCkiLz48L3N2Zz4=')`,
                    }}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-black/50 text-white border-cyan-400 hover:bg-black/80" />
          <CarouselNext className="right-2 bg-black/50 text-white border-cyan-400 hover:bg-black/80" />
        </Carousel>

        {/* Hotel name overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-wider">
            {hotel.name}
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-cyan-400 mr-1" />
              <span className="text-gray-200">{hotel.location}</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-gray-200">{hotel.rating}/5</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Hotel info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <Card className="bg-gray-900 border-gray-800 text-white overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl text-cyan-400">
                About this property
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">{hotel.description}</p>

              {/* Amenities */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hotel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      {amenityIcons[amenity]}
                      <span className="text-gray-300">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Room Types */}
          <Card className="bg-gray-900 border-gray-800 text-white">
            <CardHeader>
              <CardTitle className="text-2xl text-cyan-400">
                Available Rooms
              </CardTitle>
              <CardDescription className="text-gray-400">
                Select your preferred room type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roomTypes.map((room) => (
                  <motion.div
                    key={room.id}
                    className={`p-4 rounded-lg border ${selectedRoom === room.id ? "border-cyan-400 bg-gray-800" : "border-gray-700 bg-gray-900"} cursor-pointer`}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setSelectedRoom(room.id)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium text-white">
                          {room.name}
                        </h3>
                        <div className="flex items-center mt-1 text-gray-400">
                          <Users className="h-4 w-4 mr-1" />
                          <span>Up to {room.capacity} guests</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-cyan-400">
                          ${room.price.toFixed(0)}
                        </div>
                        <div className="text-sm text-gray-400">per night</div>
                      </div>
                    </div>
                    {selectedRoom === room.id && (
                      <Badge className="mt-2 bg-cyan-400 text-black">
                        Selected
                      </Badge>
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Booking panel */}
        <div>
          <Card className="bg-gray-900 border-gray-800 text-white sticky top-4">
            <CardHeader>
              <CardTitle className="text-2xl text-cyan-400">
                Book Your Stay
              </CardTitle>
              <CardDescription className="text-gray-400">
                Complete your reservation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Check-in date */}
              <div className="space-y-2">
                <Label htmlFor="check-in" className="text-white">
                  Check-in Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-cyan-400" />
                      {checkInDate ? (
                        format(checkInDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                    <Calendar
                      mode="single"
                      selected={checkInDate}
                      onSelect={setCheckInDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Check-out date */}
              <div className="space-y-2">
                <Label htmlFor="check-out" className="text-white">
                  Check-out Date
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-cyan-400" />
                      {checkOutDate ? (
                        format(checkOutDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
                    <Calendar
                      mode="single"
                      selected={checkOutDate}
                      onSelect={setCheckOutDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Guests */}
              <div className="space-y-2">
                <Label htmlFor="guests" className="text-white">
                  Guests
                </Label>
                <Select
                  defaultValue="2"
                  onValueChange={(value) => setGuests(parseInt(value))}
                >
                  <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select number of guests" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator className="my-4 bg-gray-700" />

              {/* Price summary */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Base price</span>
                  <span className="text-white">${hotel.price}/night</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Taxes & fees</span>
                  <span className="text-white">
                    ${(hotel.price * 0.15).toFixed(0)}/night
                  </span>
                </div>
                <Separator className="my-2 bg-gray-700" />
                <div className="flex justify-between font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-cyan-400">
                    ${(hotel.price * 1.15).toFixed(0)}/night
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold">
                Reserve Now <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
