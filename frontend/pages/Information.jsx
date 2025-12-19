import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../src/components/ui/button";

const Information = () => {
  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("You must log in first!");
      navigate("/register"); // Redirect to Sign Up page
    }
  }, [navigate]);

  const roomTypes = [
    {
      id: "single",
      name: "Single Room",
      capacity: 1,
      price: "₹15,000/month",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
      description: "Perfect for students who prefer privacy and personal space.",
      amenities: [
        "Single bed with mattress",
        "Study desk and chair",
        "Personal wardrobe",
        "Attached bathroom",
        "Air conditioning",
        "High-speed Wi-Fi",
        "24/7 security"
      ],
      rules: [
        "No smoking inside rooms",
        "Maintain room cleanliness",
        "No loud music after 10 PM",
        "Respect other residents"
      ]
    },
    {
      id: "double",
      name: "Double Sharing Room",
      capacity: 2,
      price: "₹12,000/month",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      description: "Ideal for friends or students looking to share accommodation.",
      amenities: [
        "Two single beds",
        "Shared study area",
        "Two wardrobes",
        "Attached bathroom",
        "Air conditioning",
        "High-speed Wi-Fi",
        "Common balcony access"
      ],
      rules: [
        "Coordinate with roommate",
        "Keep common areas clean",
        "No visitors after 8 PM",
        "Respect roommate's privacy"
      ]
    },
    {
      id: "threeSharing",
      name: "Three Sharing Room",
      capacity: 3,
      price: "₹10,000/month",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
      description: "Affordable option for groups of three students.",
      amenities: [
        "Three single beds",
        "Shared study tables",
        "Individual lockers",
        "Common bathroom",
        "Air conditioning",
        "High-speed Wi-Fi",
        "Storage space"
      ],
      rules: [
        "Maintain harmony with roommates",
        "Take turns for bathroom use",
        "Keep noise levels down",
        "Share responsibilities equally"
      ]
    },
    {
      id: "fourSharing",
      name: "Four Sharing Room",
      capacity: 4,
      price: "₹8,000/month",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      description: "Budget-friendly option for larger groups.",
      amenities: [
        "Four single beds",
        "Shared study area",
        "Personal storage lockers",
        "Common bathroom facilities",
        "Air conditioning",
        "High-speed Wi-Fi",
        "Common lounge area"
      ],
      rules: [
        "Follow room schedule",
        "Keep personal belongings organized",
        "Respect group decisions",
        "Maintain cleanliness standards"
      ]
    },
    {
      id: "suite",
      name: "Suite Room",
      capacity: 2,
      price: "₹20,000/month",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
      description: "Premium accommodation with enhanced comfort and privacy.",
      amenities: [
        "Queen-size bed",
        "Private sitting area",
        "Mini refrigerator",
        "Private bathroom with shower",
        "Air conditioning",
        "High-speed Wi-Fi",
        "Work desk with lamp",
        "Premium furnishings"
      ],
      rules: [
        "No cooking in rooms",
        "Maintain premium standards",
        "Report maintenance issues promptly",
        "Follow premium guest guidelines"
      ]
    },
    {
      id: "deluxe",
      name: "Deluxe Room",
      capacity: 2,
      price: "₹18,000/month",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400&h=300&fit=crop",
      description: "Luxurious accommodation with top-tier amenities.",
      amenities: [
        "King-size bed",
        "Private balcony",
        "Mini kitchenette",
        "Luxury bathroom",
        "Air conditioning",
        "High-speed Wi-Fi",
        "Entertainment system",
        "Premium bedding"
      ],
      rules: [
        "No parties or large gatherings",
        "Maintain luxury standards",
        "Use facilities responsibly",
        "Follow premium service guidelines"
      ]
    }
  ];

  const generalRules = [
    "Check-in time: 2:00 PM, Check-out time: 11:00 AM",
    "Visitors allowed only in common areas with permission",
    "No alcohol or prohibited substances",
    "Maintain hostel property and report damages",
    "Follow fire safety and emergency procedures",
    "Respect diversity and maintain harmony",
    "Use water and electricity responsibly"
  ];

  const facilities = [
    "24/7 Security with CCTV surveillance",
    "High-speed internet throughout the campus",
    "Mess serving nutritious meals three times a day",
    "Gym and sports facilities",
    "Study rooms and library access",
    "Laundry services",
    "Medical assistance on call",
    "Housekeeping services",
    "Parking facilities",
    "Common recreation areas"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      {/* Static Background Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Header */}
      <div className="relative py-16 text-center z-10">
        <div className="max-w-6xl mx-auto px-5 animate-slide-in-up">
          <h1 className="text-5xl md:text-6xl font-black mb-3 text-white drop-shadow-lg">
            RoomMatz Hostel
          </h1>
          <p className="text-xl md:text-2xl text-white/95 mb-2 drop-shadow-md">
            Your Home Away From Home
          </p>
          <p className="text-base text-white/80 drop-shadow-sm">
            Near GVP College, Vishakapatnam
          </p>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-5 pb-16 z-10">
        {/* Room Types Section */}
        <div className="text-center mb-12 animate-slide-in-up">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-3 drop-shadow-lg">
            Our Room Types
          </h2>
          <p className="text-lg text-white/90 drop-shadow-md">
            Choose the perfect accommodation for your stay
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {roomTypes.map((room) => (
            <div
              key={room.id}
              className="group relative bg-gray-800/90 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  {room.capacity} Person{room.capacity > 1 ? 's' : ''}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-black text-white mb-2">
                  {room.name}
                </h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed line-clamp-2">
                  {room.description}
                </p>

                <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
                  <span className="text-2xl font-black text-blue-400">
                    {room.price.split('/')[0]}
                  </span>
                  <button
                    onClick={() => navigate("/vacancy")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors hover:bg-blue-700"
                  >
                  Book
                  </button>
                </div>

                <div className="mb-4">
                  <h4 className="font-bold text-white mb-2 text-xs uppercase tracking-wider opacity-60">
                    🏠 Amenities
                  </h4>
                  <div className="grid grid-cols-2 gap-y-1">
                    {room.amenities.slice(0, 4).map((amenity, index) => (
                      <div key={index} className="text-xs text-gray-500 flex items-center gap-1">
                        <span className="text-blue-500">•</span> {amenity}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white mb-2 text-xs uppercase tracking-wider opacity-60">
                    📋 Room Rules
                  </h4>
                  <div className="space-y-1">
                    {room.rules.slice(0, 2).map((rule, index) => (
                      <div key={index} className="text-xs text-gray-500 flex items-start gap-1">
                        <span>•</span> <span className="line-clamp-1">{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* General Facilities Section */}
        <div className="bg-gray-800/90 border border-white/10 rounded-2xl p-8 mb-10 shadow-xl">
          <h2 className="text-3xl font-black text-white text-center mb-10">
            🏢 Hostel Facilities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {facilities.map((facility, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-gray-700/30 rounded-xl border border-white/5">
                <span className="text-blue-400 text-xl">✅</span>
                <span className="text-gray-200 font-medium">{facility}</span>
              </div>
            ))}
          </div>
        </div>

        {/* General Rules Section */}
        <div className="bg-gray-800/90 border border-white/10 rounded-2xl p-8 mb-10 shadow-xl">
          <h2 className="text-3xl font-black text-white text-center mb-10">
            📋 General Hostel Rules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {generalRules.map((rule, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-red-900/10 border-l-4 border-red-500 rounded-xl">
                <span className="text-red-400 text-xl font-bold">⚠️</span>
                <span className="text-gray-300 text-sm leading-relaxed">{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h2 className="text-4xl md:text-5xl font-black">Ready to Join Our Community?</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Experience comfortable living with modern amenities and a supportive environment.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button
                onClick={() => navigate("/vacancy")}
                className="bg-transparent border-2 border-white/80 text-white hover:bg-white/10 font-bold px-8 py-6 rounded-xl transition-all duration-300"
              >
                Start Booking Now
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate("/contact")}
                className="bg-transparent border-2 border-white/80 text-white hover:bg-white/10 font-bold px-8 py-6 rounded-xl transition-all duration-300"
              >
                Contact Us
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate("/about")}
                className="bg-transparent border-2 border-white/80 text-white hover:bg-white/10 font-bold px-8 py-6 rounded-xl transition-all duration-300"
              >
                About Us
              </Button>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full -ml-32 -mb-32 blur-[100px]"></div>
        </div>
      </div>
    </div>
  );
};

export default Information;
