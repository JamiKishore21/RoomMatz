import Footer from "../components/Footer";

import { Card, CardContent } from "../src/components/ui/card";
import { Mail, Phone, MapPin, MessageSquare, Send } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black font-sans antialiased text-foreground py-16 px-4 relative overflow-hidden">
      {/* Animated Background Accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] animate-float-slow"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10 space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-slide-in-up">
          <div className="inline-flex p-5 rounded-3xl bg-blue-600 shadow-lg mb-4 animate-pulse-glow">
            <MessageSquare className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Have questions? We're here to help! Reach out to us and we'll respond as quickly as possible.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
          {[
            {
              icon: <Mail className="h-10 w-10" />,
              title: 'Email',
              content: 'kishore@gmail.com',
              link: 'mailto:kishore@gmail.com',
              color: 'text-blue-400'
            },
            {
              icon: <Phone className="h-10 w-10" />,
              title: 'Phone',
              content: '+91 9876543210',
              link: 'tel:+919876543210',
              color: 'text-green-400'
            },
            {
              icon: <MapPin className="h-10 w-10" />,
              title: 'Address',
              content: 'RoomMatz Hostel, near GVP College, Vizag',
              color: 'text-rose-400'
            }
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.link || '#'}
              className="group bg-gray-800/90 border border-white/10 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-gray-800 hover:border-white/20"
            >
              <div className={`mb-4 flex justify-center group-hover:scale-110 transition-transform ${item.color}`}>
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className={`text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity`}>
                {item.content}
              </p>
            </a>
          ))}
        </div>

        {/* Response Guarantee Section */}
        <div className="bg-blue-600/10 border-l-4 border-blue-500 rounded-2xl p-6 text-center animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-white font-bold flex items-center justify-center gap-3">
            <Send className="h-5 w-5 text-blue-500" />
            We typically respond within 24 hours
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
