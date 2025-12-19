import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../src/components/ui/card";
import { Button } from "../src/components/ui/button";
import { Input } from "../src/components/ui/input";
import { Label } from "../src/components/ui/label";
import {
  Search, Filter, Users, Wifi, Wind, Coffee,
  MapPin, Star, ArrowRight, Check, SlidersHorizontal
} from "lucide-react";

// Internal Badge Component
const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-primary/10 text-primary border-primary/20",
    success: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    danger: "bg-red-500/10 text-red-600 border-red-500/20",
    secondary: "bg-secondary text-secondary-foreground border-transparent",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default function VacancyPage() {
  const navigate = useNavigate();


  const [dbRooms, setDbRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoomType, setSelectedRoomType] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [sortBy, setSortBy] = useState('recommended');

  // Fetch rooms from database
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/rooms`);
        const rooms = await response.json();
        setDbRooms(rooms);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleRoomClick = useCallback((room) => {
    navigate("/billpayment", {
      state: {
        hostelName: room.hostelName || "RoomMatz Premium",
        roomType: room.roomType,
        price: room.price,
        roomId: room._id,
      },
    });
  }, [navigate]);

  const filteredRooms = dbRooms.filter(room => {
    const matchesType = selectedRoomType === 'all' || room.roomType === selectedRoomType;
    const hasAvailableCapacity = (room.occupancy || 0) < room.capacity;
    const matchesPrice = room.price >= priceRange[0] && room.price <= priceRange[1];
    return matchesType && hasAvailableCapacity && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'availability') return (b.capacity - (b.occupancy || 0)) - (a.capacity - (a.occupancy || 0));
    return 0; // Default recommended (as is from DB)
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="text-gray-400 animate-pulse">Finding the best rooms for you...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-black pb-20">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-purple-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-purple-400/15 to-pink-600/15 rounded-full blur-3xl animate-pulse-glow"></div>
      </div>

      {/* Hero Header */}
      <div className="relative py-24 overflow-hidden">
        <div className="relative container mx-auto px-4 text-center space-y-6 z-10">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight animate-slide-in-up text-white drop-shadow-lg">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200">Perfect Space</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto animate-slide-in-up drop-shadow-md">
            Discover comfort, community, and convenience. Browse our curated selection of verified rooms.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-10">
        {/* Search & Filter Bar */}
        <Card className="border border-white/10 shadow-2xl bg-gray-800/90 backdrop-blur-md sticky top-4 z-20 mb-8 animate-in fade-in zoom-in-95 duration-500">
          <CardContent className="p-4 md:p-6">
            <div className="grid gap-6 md:grid-cols-12 items-end">

              {/* Filter: Room Type */}
              <div className="md:col-span-3 space-y-2">
                <Label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Type</Label>
                <div className="relative">
                  <select
                    className="w-full h-10 pl-3 pr-8 rounded-md border border-white/20 bg-gray-700 text-white hover:bg-gray-600 transition-colors focus:ring-2 focus:ring-primary/20 outline-none text-sm appearance-none cursor-pointer"
                    value={selectedRoomType}
                    onChange={(e) => setSelectedRoomType(e.target.value)}
                  >
                    <option value="all">Check All Options</option>
                    <option value="single">Single Luxury</option>
                    <option value="double">Double Standard</option>
                    <option value="threeSharing">Triple Share</option>
                    <option value="fourSharing">Quad Share</option>
                    <option value="deluxe">Deluxe Room</option>
                    <option value="suite">Suite</option>
                  </select>
                  <Filter className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Filter: Price Range */}
              <div className="md:col-span-4 space-y-2">
                <div className="flex justify-between">
                  <Label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Budget</Label>
                  <span className="text-xs font-medium text-blue-400">₹0 - ₹{priceRange[1].toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Filter: Sort */}
              <div className="md:col-span-3 space-y-2">
                <Label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Sort</Label>
                <div className="relative">
                  <select
                    className="w-full h-10 pl-3 pr-8 rounded-md border border-white/20 bg-gray-700 text-white hover:bg-gray-600 transition-colors focus:ring-2 focus:ring-primary/20 outline-none text-sm appearance-none cursor-pointer"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="recommended">⭐ Recommended</option>
                    <option value="price-low">💰 Lowest Price</option>
                    <option value="price-high">💎 Highest Price</option>
                    <option value="availability">⚡ Availability</option>
                  </select>
                  <SlidersHorizontal className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Action */}
              <div className="md:col-span-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25 h-10" onClick={() => { }}>
                  Update Feed
                </Button>
              </div>

            </div>
          </CardContent>
        </Card>

        {/* Results Grid */}
        {filteredRooms.length === 0 ? (
          <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed border-muted-foreground/25">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4 text-4xl">🔍</div>
            <h3 className="text-xl font-bold text-foreground">No matches found</h3>
            <p className="text-muted-foreground mt-2">Adjust your filters to see more results.</p>
            <Button variant="link" onClick={() => { setSelectedRoomType('all'); setPriceRange([0, 50000]) }}>Clear Filters</Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredRooms.map((room, idx) => {
              const available = room.capacity - (room.occupancy || 0);
              const percent = ((room.occupancy || 0) / room.capacity) * 100;

              return (
                <Card
                  key={room._id}
                  className="group relative overflow-hidden border border-white/10 transition-all duration-500 hover:shadow-2xl bg-gray-800/90 backdrop-blur-xl hover:-translate-y-2 cursor-pointer animate-slide-in-up"
                  onClick={() => handleRoomClick(room)}
                >
                  {/* Card Header Image Area */}
                  <div className={`h-32 w-full bg-gradient-to-br ${idx % 2 === 0 ? 'from-blue-600/20 to-indigo-700/20' : 'from-indigo-600/20 to-blue-700/20'} relative p-4 flex flex-col justify-between`}>
                    <div className="flex justify-between items-start">
                      <Badge variant={available > 0 ? "success" : "danger"} className="bg-gray-900 shadow-md animate-pulse-glow">
                        {available > 0 ? `${available} LEFT` : "SOLD OUT"}
                      </Badge>
                      <div className="p-1.5 rounded-full bg-gray-900 text-yellow-500 shadow-md">
                        <Star className="h-3 w-3 fill-current" />
                      </div>
                    </div>
                    {/* Room Type Overlay */}
                    <div className="absolute -bottom-6 right-4 h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 border-4 border-gray-800 flex items-center justify-center shadow-lg text-white z-10 group-hover:scale-125 transition-transform duration-300">
                      <Users className="h-5 w-5" />
                    </div>
                  </div>

                  <CardContent className="pt-8 px-6 pb-6">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold tracking-tight mb-1 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent group-hover:scale-105 transition-transform inline-block">
                        Room {room.roomNumber}
                      </h3>
                      <p className="text-sm font-medium text-gray-400 uppercase tracking-widest text-[10px]">
                        {room.hostelName || 'Premium Wing'} • {room.roomType}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Occupancy Indicator */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px] font-semibold text-gray-300 uppercase">
                          <span>Occupancy</span>
                          <span>{Math.round(percent)}% Full</span>
                        </div>
                        <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ease-out ${percent > 90 ? 'bg-gradient-to-r from-red-500 to-pink-500' : 'bg-gradient-to-r from-blue-500 to-indigo-600'}`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>

                      {/* Amenities Row */}
                      <div className="flex gap-3 text-gray-300 py-2 border-y border-dashed border-white/20">
                        <div className="flex items-center gap-1.5 text-xs"><Wifi className="h-3.5 w-3.5" /> WiFi</div>
                        <div className="flex items-center gap-1.5 text-xs"><Wind className="h-3.5 w-3.5" /> AC</div>
                        <div className="flex items-center gap-1.5 text-xs"><Coffee className="h-3.5 w-3.5" /> Cafe</div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="px-6 pb-6 pt-0 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase">Monthly</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-white">₹{room.price.toLocaleString()}</span>
                        <span className="text-xs text-gray-400">/mo</span>
                      </div>
                    </div>
                    <Button
                      size="icon"
                      className={`rounded-full h-10 w-10 shadow-lg transition-all duration-300 ${available === 0 ? 'bg-gray-700 text-gray-500' : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:shadow-xl hover:scale-125'}`}
                      disabled={available === 0}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
