import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface PropertyCardProps {
  id?: string;
  name?: string;
  location?: string;
  price?: number;
  rating?: number;
  image?: string;
  featured?: boolean;
}

const PropertyCard = ({
  id = "1",
  name = "Neon Heights Hotel",
  location = "Night City, Downtown",
  price = 199,
  rating = 4.8,
  image = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
  featured = false,
}: PropertyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)" }}
      className="relative"
    >
      <Card className="w-80 h-[380px] overflow-hidden bg-black border border-slate-800 rounded-xl relative group">
        {/* Circuit overlay pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMxLjIgMCAyLjIuOCAyLjIgMS44bC0uMSAyLjJoMS44YzEgMCAxLjguOCAxLjggMS44cy0uOCAxLjgtMS44IDEuOGgtMS44bC0uMSAzLjZoMS44YzEgMCAxLjguOCAxLjggMS44cy0uOCAxLjgtMS44IDEuOGgtMS44bC0uMSAyLjJjMCAxLS44IDEuOC0xLjggMS44cy0xLjgtLjgtMS44LTEuOGwuMS0yLjJoLTMuNmwtLjEgMi4yYzAgMS0uOCAxLjgtMS44IDEuOHMtMS44LS44LTEuOC0xLjhsLjEtMi4yaC0xLjhjLTEgMC0xLjgtLjgtMS44LTEuOHMuOC0xLjggMS44LTEuOGgxLjhsLjEtMy42aC0xLjhjLTEgMC0xLjgtLjgtMS44LTEuOHMuOC0xLjggMS44LTEuOGgxLjhsLjEtMi4yYzAtMS44IDEuOC0yLjYgMy0xLjRsLS4xIDIuMmgzLjZsLjEtMi4yYzAtMSAuOC0xLjggMS44LTEuOHptLTEuOCA3LjJoLTMuNmwtLjEgMy42aDMuNmwuMS0zLjZ6IiBmaWxsPSIjMDBmZmZmMTAiLz48L2c+PC9zdmc+')] opacity-20 mix-blend-overlay pointer-events-none z-10"></div>

        {/* Image with gradient overlay */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {featured && (
            <Badge
              variant="destructive"
              className="absolute top-3 right-3 z-20 bg-gradient-to-r from-red-500 to-orange-500 border-none"
            >
              Featured
            </Badge>
          )}
        </div>

        <CardContent className="relative z-20 p-5">
          {/* Neon border effect */}
          <div className="absolute -inset-px rounded-b-xl bg-gradient-to-t from-cyan-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Hotel name with futuristic typography */}
          <h3 className="text-xl font-bold mb-2 text-white tracking-wide">
            {name}
          </h3>

          {/* Location with icon */}
          <div className="flex items-center mb-3 text-slate-400">
            <MapPin className="w-4 h-4 mr-1 text-cyan-400" />
            <span className="text-sm">{location}</span>
          </div>

          {/* Divider with tech style */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent my-3"></div>

          {/* Price and rating section */}
          <div className="flex justify-between items-center mt-4">
            {/* Price with neon highlight */}
            <div>
              <span className="text-xs text-slate-400">From</span>
              <div className="text-xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                ${price}
                <span className="text-xs text-slate-400">/night</span>
              </div>
            </div>

            {/* Rating with geometric elements */}
            <div className="flex items-center bg-slate-800/50 px-3 py-1 rounded-md border border-slate-700">
              <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" />
              <span className="text-white font-medium">{rating}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tech-style glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
    </motion.div>
  );
};

export default PropertyCard;
