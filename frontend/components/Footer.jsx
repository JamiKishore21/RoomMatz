import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Heart, Shield, Zap } from 'lucide-react';
import { Button } from '../src/components/ui/button';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white pt-20 pb-10 mt-20 border-t-2 border-white/10 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-accent/50 to-transparent opacity-70"></div>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-subtle"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-subtle" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 animate-slide-in-up">

          {/* Brand Column */}
          <div className="space-y-6 group">
            <div className="flex items-center gap-3 transform transition-all duration-300 group-hover:translate-x-1">
              <span className="text-4xl transform transition-transform group-hover:scale-110 group-hover:rotate-12">🏨</span>
              <h3 className="text-3xl font-black bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                RoomMatz
              </h3>
            </div>
            <p className="text-white/70 leading-relaxed max-w-xs font-light hover:text-white/90 transition-colors duration-300">
              Your ultimate destination for comfortable and affordable accommodation. Experience luxury at pocket-friendly prices.
            </p>
            <div className="flex gap-3 pt-4">
              {[
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Mail, label: 'Email' }
              ].map(({ icon: Icon, label }) => (
                <Button
                  key={label}
                  size="icon"
                  variant="ghost"
                  className="rounded-full bg-white/10 hover:bg-accent hover:text-primary transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                  title={label}
                >
                  <Icon className="h-5 w-5" />
                  <Link to="mailto:jkishore120305@gmail.com"></Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-black text-white mb-6 relative inline-block">
              🔗 Quick Links
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-accent to-transparent rounded-full transition-all duration-300"></span>
            </h4>
            <ul className="space-y-3">
              {[
                { label: '🏠 Home', href: '/' },
                { label: '🔍 Find Rooms', href: '/vacancy' },
                { label: 'ℹ️ About Us', href: '/information' },
                { label: '📞 Contact Us', href: '/contact-us' }
              ].map((item) => (
                <li key={item.label} className="group/item">
                  <Link
                    to={item.href}
                    className="text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block text-sm font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h4 className="text-lg font-black text-white mb-6 relative inline-block">
              📞 Support
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-accent to-transparent rounded-full transition-all duration-300"></span>
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group/contact">
                <Phone className="h-5 w-5 text-accent mt-1 transform transition-transform group-hover/contact:scale-110" />
                <div className="flex flex-col">
                  <span className="text-xs text-white/60 font-semibold">Call us</span>
                  <a href="tel:+91XXXXXXXXXX" className="text-white/80 hover:text-white transition-colors font-medium">
                    +91 (800) 123-4567
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 group/contact">
                <Mail className="h-5 w-5 text-accent mt-1 transform transition-transform group-hover/contact:scale-110" />
                <div className="flex flex-col">
                  <span className="text-xs text-white/60 font-semibold">Email us</span>
                  <a href="mailto:jkishore120305@gmail.com" className="text-white/80 hover:text-white transition-colors font-medium">
                    jkishore120305@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 group/contact">
                <MapPin className="h-5 w-5 text-accent mt-1 transform transition-transform group-hover/contact:scale-110" />
                <div className="flex flex-col">
                  <span className="text-xs text-white/60 font-semibold">Location</span>
                  <p className="text-white/80 font-medium">GVP College, visakhapatnam </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Highlights */}
          <div className="space-y-6">
            <h4 className="text-lg font-black text-white mb-6 relative inline-block">
              ✨ Why Us
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-accent to-transparent rounded-full"></span>
            </h4>
            <div className="space-y-3">
              {[
                { icon: Shield, label: 'Secure Payment', desc: 'Protected transactions' },
                { icon: Zap, label: 'Fast Booking', desc: '3 steps to reserve' },
                { icon: Heart, label: 'Best Service', desc: '24/7 customer support' }
              ].map((feature) => (
                <div key={feature.label} className="flex items-start gap-3 group/feature transform transition-all hover:translate-x-1 duration-300">
                  <feature.icon className="h-5 w-5 text-accent flex-shrink-0 mt-0.5 transform transition-transform group-hover/feature:scale-110" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">{feature.label}</span>
                    <span className="text-xs text-white/60 font-light">{feature.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-12"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8">
          <div className="text-center md:text-left flex items-center gap-2 text-white/70">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-accent animate-pulse" />
            <span>by Kishore</span>
          </div>

          <div className="text-center text-sm text-white/60 space-y-1">
            <p>&copy; 2025 RoomMatz. All rights reserved.</p>
            <div className="flex justify-center gap-6 text-xs">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>

          <Button
            className="bg-gradient-to-r from-accent to-accent/80 text-foreground font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 gap-2"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ⬆️ Back to Top
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;