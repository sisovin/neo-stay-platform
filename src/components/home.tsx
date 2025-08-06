import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Calendar,
  Users,
  ChevronRight,
  Star,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { Separator } from "./ui/separator";
import PropertyGallery from "./PropertyGallery";

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Header */}
      <header className="border-b border-zinc-800 bg-black/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500">
                NEOCITY
                <span className="text-violet-500">STAYS</span>
              </div>
            </motion.div>
            <div className="hidden md:flex items-center space-x-6 ml-10">
              <a
                href="#"
                className="text-sm hover:text-cyan-400 transition-colors"
              >
                Explore
              </a>
              <a
                href="#"
                className="text-sm hover:text-cyan-400 transition-colors"
              >
                Destinations
              </a>
              <a
                href="#"
                className="text-sm hover:text-cyan-400 transition-colors"
              >
                Deals
              </a>
              <a
                href="#"
                className="text-sm hover:text-cyan-400 transition-colors"
              >
                About
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="hidden md:flex hover:text-cyan-400 transition-colors"
            >
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white border-none">
              Register
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80 z-10"></div>
        <div
          className="h-[600px] bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-black/40 z-0"></div>

          {/* Circuit overlay pattern */}
          <div
            className="absolute inset-0 opacity-20 z-0"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80')",
              backgroundSize: "100% 100%",
              mixBlendMode: "overlay",
            }}
          ></div>

          <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                Experience the <span className="text-cyan-400">Future</span> of
                Hospitality
              </h1>
              <p className="text-lg md:text-xl text-zinc-300 mb-8">
                Discover extraordinary stays with cutting-edge amenities in the
                most vibrant locations
              </p>
            </motion.div>

            {/* Search Box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-full max-w-4xl"
            >
              <Card className="border border-zinc-800 bg-black/80 backdrop-blur-xl shadow-lg shadow-violet-900/20">
                <CardContent className="p-6">
                  <Tabs defaultValue="stay" className="w-full">
                    <TabsList className="grid grid-cols-3 mb-6 bg-zinc-900/50">
                      <TabsTrigger
                        value="stay"
                        className="data-[state=active]:bg-violet-900/30 data-[state=active]:text-violet-300"
                      >
                        Hotel Stay
                      </TabsTrigger>
                      <TabsTrigger
                        value="experience"
                        className="data-[state=active]:bg-violet-900/30 data-[state=active]:text-violet-300"
                      >
                        Experiences
                      </TabsTrigger>
                      <TabsTrigger
                        value="transport"
                        className="data-[state=active]:bg-violet-900/30 data-[state=active]:text-violet-300"
                      >
                        Transport
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="stay" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm text-zinc-400">
                            Destination
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
                            <Input
                              placeholder="Where are you going?"
                              className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-violet-500 text-white"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm text-zinc-400">
                            Check-in
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
                            <Input
                              type="date"
                              className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-violet-500 text-white"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm text-zinc-400">
                            Check-out
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
                            <Input
                              type="date"
                              className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-violet-500 text-white"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm text-zinc-400">
                            Guests
                          </label>
                          <div className="relative">
                            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
                            <Input
                              type="number"
                              placeholder="2 adults"
                              className="pl-10 bg-zinc-900/50 border-zinc-800 focus:border-violet-500 text-white"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center pt-2">
                        <Button className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white px-8">
                          <Search className="mr-2 h-4 w-4" /> Search Hotels
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="experience">
                      <div className="h-40 flex items-center justify-center text-zinc-500">
                        Experience search coming soon
                      </div>
                    </TabsContent>

                    <TabsContent value="transport">
                      <div className="h-40 flex items-center justify-center text-zinc-500">
                        Transport search coming soon
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-16 bg-gradient-to-b from-black to-zinc-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Featured <span className="text-cyan-400">Properties</span>
              </h2>
              <p className="text-zinc-400">
                Discover our selection of extraordinary accommodations
              </p>
            </div>
            <Button
              variant="outline"
              className="border-violet-500 text-violet-400 hover:bg-violet-950/30"
            >
              View All <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <PropertyGallery />
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">
              Trending <span className="text-cyan-400">Destinations</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Explore the most popular cities with our exclusive deals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Neo Tokyo",
                image:
                  "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80",
                properties: 24,
                rating: 4.8,
              },
              {
                name: "Cyber Shanghai",
                image:
                  "https://images.unsplash.com/photo-1470723710355-95304d8aece4?w=800&q=80",
                properties: 18,
                rating: 4.7,
              },
              {
                name: "Digital Dubai",
                image:
                  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
                properties: 15,
                rating: 4.9,
              },
              {
                name: "Tech Singapore",
                image:
                  "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
                properties: 21,
                rating: 4.6,
              },
            ].map((destination, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-zinc-300">
                      {destination.properties} properties
                    </span>
                    <div className="flex items-center">
                      <Star
                        className="h-4 w-4 text-yellow-500 mr-1"
                        fill="currentColor"
                      />
                      <span>{destination.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 bg-black relative overflow-hidden">
        {/* Circuit pattern background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80')",
            backgroundSize: "cover",
            mixBlendMode: "overlay",
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">
              Special <span className="text-cyan-400">Offers</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Limited time deals you don't want to miss
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Weekend Escape",
                discount: "25% OFF",
                description:
                  "Book a weekend stay and get 25% off on luxury rooms",
                color: "from-violet-600 to-blue-500",
              },
              {
                title: "Extended Stay",
                discount: "30% OFF",
                description:
                  "Stay 7+ nights and enjoy 30% discount on your entire booking",
                color: "from-cyan-500 to-blue-600",
              },
              {
                title: "Early Bird Special",
                discount: "20% OFF",
                description:
                  "Book 30 days in advance and save 20% on any room type",
                color: "from-fuchsia-600 to-violet-600",
              },
            ].map((offer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm overflow-hidden hover:shadow-lg hover:shadow-violet-900/20 transition-all"
              >
                <div className={`h-2 bg-gradient-to-r ${offer.color}`}></div>
                <div className="p-6">
                  <div className="text-lg font-semibold mb-2">
                    {offer.title}
                  </div>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500 mb-4">
                    {offer.discount}
                  </div>
                  <p className="text-zinc-400 mb-6">{offer.description}</p>
                  <Button
                    variant="outline"
                    className="w-full border-zinc-700 hover:bg-zinc-800 hover:text-cyan-400"
                  >
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-b from-zinc-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Stay <span className="text-cyan-400">Connected</span>
            </h2>
            <p className="text-zinc-400 mb-8">
              Subscribe to our newsletter for exclusive deals and travel
              inspiration
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Enter your email"
                className="bg-zinc-900/50 border-zinc-800 focus:border-violet-500 text-white flex-grow"
              />
              <Button className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-700 hover:to-cyan-600 text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-zinc-900 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-500 mb-4">
                NEOCITY<span className="text-violet-500">STAYS</span>
              </div>
              <p className="text-zinc-400 mb-4">
                Redefining the future of hospitality with cutting-edge
                accommodations and experiences.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-zinc-500 hover:text-cyan-400">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a href="#" className="text-zinc-500 hover:text-cyan-400">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
                <a href="#" className="text-zinc-500 hover:text-cyan-400">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-cyan-400 transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-cyan-400 transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-cyan-400 transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-cyan-400 transition-colors"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-cyan-400 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Destinations</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-cyan-400 transition-colors"
                  >
                    Neo Tokyo
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-cyan-400 transition-colors"
                  >
                    Cyber Shanghai
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-cyan-400 transition-colors"
                  >
                    Digital Dubai
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-cyan-400 transition-colors"
                  >
                    Tech Singapore
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-cyan-400 transition-colors"
                  >
                    View All Destinations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-zinc-400">
                <li className="flex items-start">
                  <span className="mr-2">📍</span>
                  <span>123 Neon Street, Digital District, Neo Tokyo</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📱</span>
                  <span>+1 (800) NEO-CITY</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✉️</span>
                  <span>info@neocitystays.com</span>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="bg-zinc-800 my-8" />

          <div className="text-center text-zinc-500 text-sm">
            © {new Date().getFullYear()} NeoCityStays. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
