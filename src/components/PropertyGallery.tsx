import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PropertyCard from "./PropertyCard";

interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  image: string;
}

interface PropertyGalleryProps {
  properties?: Property[];
}

const PropertyGallery = ({ properties = [] }: PropertyGalleryProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  // Default properties if none are provided
  const defaultProperties: Property[] = [
    {
      id: "1",
      name: "Neo Tokyo Suites",
      location: "Night City, Downtown",
      price: 299,
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    },
    {
      id: "2",
      name: "Orbital Heights",
      location: "Satellite District",
      price: 450,
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    },
    {
      id: "3",
      name: "Neon Horizon Hotel",
      location: "Westside, Night City",
      price: 199,
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
    },
    {
      id: "4",
      name: "Chrome Palace",
      location: "Tech District",
      price: 350,
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
    },
    {
      id: "5",
      name: "Digital Dreams Inn",
      location: "Eastside, Night City",
      price: 275,
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    },
    {
      id: "6",
      name: "Synth Skyline Resort",
      location: "Upper District",
      price: 520,
      rating: 5.0,
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    },
  ];

  const displayProperties =
    properties.length > 0 ? properties : defaultProperties;
  const totalPages = Math.ceil(displayProperties.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentProperties = displayProperties.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  return (
    <div className="w-full py-16 px-4 md:px-8 bg-black bg-opacity-90">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-3 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-cyan-400">Featured</span> Properties
          </motion.h2>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.8 }}
          />
          <motion.p
            className="mt-4 text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Discover our selection of premium cyberpunk-styled accommodations
            across Night City
          </motion.p>
        </div>

        <div className="relative">
          {/* Circuit pattern overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern
                id="circuit"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M10,10 L90,10 L90,90 L10,90 Z"
                  fill="none"
                  stroke="#00ffff"
                  strokeWidth="0.5"
                />
                <circle cx="10" cy="10" r="2" fill="#00ffff" />
                <circle cx="90" cy="10" r="2" fill="#00ffff" />
                <circle cx="90" cy="90" r="2" fill="#00ffff" />
                <circle cx="10" cy="90" r="2" fill="#00ffff" />
                <path
                  d="M10,50 L40,50 L40,10"
                  fill="none"
                  stroke="#ff00ff"
                  strokeWidth="0.5"
                />
                <path
                  d="M60,10 L60,40 L90,40"
                  fill="none"
                  stroke="#ff00ff"
                  strokeWidth="0.5"
                />
                <path
                  d="M90,60 L60,60 L60,90"
                  fill="none"
                  stroke="#ff00ff"
                  strokeWidth="0.5"
                />
                <path
                  d="M40,90 L40,60 L10,60"
                  fill="none"
                  stroke="#ff00ff"
                  strokeWidth="0.5"
                />
              </pattern>
              <rect width="100%" height="100%" fill="url(#circuit)" />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {currentProperties.map((property) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <PropertyCard
                  id={property.id}
                  name={property.name}
                  location={property.location}
                  price={property.price}
                  rating={property.rating}
                  image={property.image}
                />
              </motion.div>
            ))}
          </div>

          {/* Navigation controls */}
          <div className="flex justify-center mt-10 space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevPage}
              className="rounded-full border-cyan-500 text-cyan-400 hover:bg-cyan-950 hover:text-cyan-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index ? "default" : "outline"}
                  size="icon"
                  onClick={() => setCurrentPage(index)}
                  className={`w-3 h-3 p-0 rounded-full ${
                    currentPage === index
                      ? "bg-cyan-400 border-cyan-400"
                      : "border border-cyan-500 bg-transparent hover:bg-cyan-950"
                  }`}
                >
                  <span className="sr-only">Page {index + 1}</span>
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextPage}
              className="rounded-full border-cyan-500 text-cyan-400 hover:bg-cyan-950 hover:text-cyan-300"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyGallery;
