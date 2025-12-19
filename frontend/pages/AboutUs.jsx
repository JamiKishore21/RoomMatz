

import { Card, CardContent } from "../src/components/ui/card";
import { Info, Target, CheckCircle, Heart } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black font-sans antialiased text-foreground py-16 px-4 relative overflow-hidden">
      {/* Animated Background Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] animate-float-slow"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10 space-y-12">
        <Card className="bg-gray-800/90 border border-white/10 shadow-2xl backdrop-blur-xl animate-slide-in-up">
          <CardContent className="p-10 md:p-16 space-y-10">
            {/* Header Section */}
            <div className="text-center space-y-4">
              <div className="inline-flex p-5 rounded-3xl bg-blue-600 shadow-lg mb-4 animate-pulse-glow">
                <Info className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                About RoomMatz
              </h1>
              <p className="text-xl text-blue-400 font-bold uppercase tracking-widest text-sm">
                Your Premier Accommodation Management Platform
              </p>
            </div>

            {/* Intro Text */}
            <div className="text-center">
              <p className="text-lg text-gray-300 leading-relaxed font-light italic">
                "Welcome to RoomMatz – a seamless platform designed to simplify hostel administration and student accommodation processes with cutting-edge technology."
              </p>
            </div>

            {/* Mission Box */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-2xl shadow-xl space-y-4 group hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8 text-white" />
                <h2 className="text-2xl font-black text-white">Our Mission</h2>
              </div>
              <p className="text-white/90 leading-relaxed font-medium">
                Our goal is to offer a smart and efficient hostel management system that streamlines room allocation, payments, and overall hostel administration while providing exceptional service to students and administrators.
              </p>
            </div>

            {/* Features Grid */}
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-black text-white text-center flex items-center justify-center gap-3">
                <CheckCircle className="h-8 w-8 text-blue-500" />
                Why Choose RoomMatz?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: '✓', title: 'Easy Online Booking', desc: 'Book rooms in just a few clicks', color: 'text-blue-400' },
                  { icon: '💳', title: 'Automated Bill Payments', desc: 'Secure & instant payment tracking', color: 'text-green-400' },
                  { icon: '👥', title: 'User-Friendly Interface', desc: 'For both students & admins', color: 'text-purple-400' },
                  { icon: '🤝', title: '24/7 Support', desc: 'Always here to help you', color: 'text-rose-400' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-gray-700/30 border border-white/5 rounded-2xl hover:bg-gray-700/50 transition-all duration-300 group"
                  >
                    <div className={`text-3xl mb-4 transform group-hover:scale-110 transition-transform ${item.color}`}>
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm font-light">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Quote */}
            <div className="border-t border-white/10 pt-8 text-center bg-blue-600/10 p-6 rounded-2xl border-l-4 border-l-blue-500">
              <p className="flex items-center justify-center gap-2 text-white font-bold">
                <Heart className="h-5 w-5 text-blue-500 fill-blue-500" />
                Join thousands of satisfied users and experience premium accommodation management today!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutUs;
