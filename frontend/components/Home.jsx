import { useNavigate } from "react-router-dom";
import { Button } from "../src/components/ui/button";
import { Card, CardContent } from "../src/components/ui/card";
import { Search, CreditCard, Clock, Heart, Star, Smartphone, CheckCircle, ArrowRight } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/vacancy");
    } else {
      navigate("/register");
    }
  };

  return (
    <div className="font-sans antialiased bg-gradient-soft text-foreground">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-center px-4 overflow-hidden">
        {/* Animated Background Overlay */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-fixed animate-scale-in"
          style={{
            backgroundImage: `url('https://static.wixstatic.com/media/11062b_f960368972304b679e6b95c0fdbfb931~mv2.jpg/v1/fill/w_1891,h_1098,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/11062b_f960368972304b679e6b95c0fdbfb931~mv2.jpg')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-slate-900/85 to-black/80 backdrop-blur-[1px]"></div>
          {/* Floating Gradient Orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6 animate-slide-in-up">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-xl">
              Welcome to <br />
              <span className="text-gradient animate-pulse-subtle">RoomMatz</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-accent to-transparent mx-auto"></div>
          </div>
          <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-light">
            Experience refined comfort and luxury accommodation. Find your perfect room and book seamlessly in moments.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button
              size="lg"
              className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold"
              onClick={handleBookNow}
            >
              <Search className="h-5 w-5" /> Book Now <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-500 transition-all duration-300 gap-2 font-semibold"
              onClick={() => navigate("/information")}
            >
              <CheckCircle className="h-5 w-5" /> Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 px-4 bg-gradient-to-b from-gray-900 via-slate-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
              Why Choose RoomMatz?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
              Experience refined comfort with premium facilities and personalized service
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <Search className="h-12 w-12 text-white" />, title: '🔍 Easy Search', desc: 'Find rooms that match your needs with advanced filters', gradient: 'from-cyan-500 to-blue-600' },
              { icon: <CreditCard className="h-12 w-12 text-white" />, title: '💳 Secure Payment', desc: 'Safe and encrypted payment options for your convenience', gradient: 'from-purple-500 to-pink-600' },
              { icon: <Clock className="h-12 w-12 text-white" />, title: '⚡ Quick Booking', desc: 'Book your room in just 3 simple steps', gradient: 'from-orange-500 to-red-600' },
              { icon: <Heart className="h-12 w-12 text-white" />, title: '❤️ 24/7 Support', desc: 'Our team is always here to help you', gradient: 'from-pink-500 to-rose-600' },
              { icon: <Star className="h-12 w-12 text-white" />, title: '⭐ Quality Rooms', desc: 'Clean, comfortable rooms with modern amenities', gradient: 'from-yellow-500 to-orange-600' },
              { icon: <Smartphone className="h-12 w-12 text-white" />, title: '📱 Mobile Friendly', desc: 'Book on-the-go with our mobile-optimized platform', gradient: 'from-green-500 to-teal-600' }
            ].map((feature, idx) => (
              <Card
                key={idx}
                className="border border-white/10 bg-gray-800/90 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-10 text-center space-y-5">
                  <div className="inline-flex p-5 rounded-3xl bg-blue-600 shadow-lg">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                  <p className="text-gray-300 font-light text-base leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-20 px-4 bg-gray-900 text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: 'Happy Guests', icon: '👥' },
              { number: '50+', label: 'Available Rooms', icon: '🏠' },
              { number: '100%', label: 'Satisfaction', icon: '⭐' },
              { number: '24/7', label: 'Support', icon: '📞' }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-2 group cursor-pointer transform transition-all duration-300 hover:scale-110 animate-slide-in-up" style={{ animationDelay: `${idx * 150}ms` }}>
                <div className="text-4xl mb-2 transform transition-transform group-hover:scale-125 animate-float" style={{ animationDelay: `${idx * 0.5}s` }}>{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg group-hover:text-yellow-300 transition-colors">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base font-semibold opacity-90 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 px-4 bg-gradient-to-b from-black via-slate-900 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-20 text-white">
            What Our Guests Say
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { name: 'Arjun M.', role: 'Student', text: 'Amazing experience! The rooms are clean and the staff is very helpful. Highly recommended!', rating: 5, emoji: '🎓', gradient: 'from-blue-500 to-cyan-500' },
              { name: 'Priya S.', role: 'Young Professional', text: 'Perfect location, affordable prices, and great amenities. Will definitely book again!', rating: 5, emoji: '💼', gradient: 'from-purple-500 to-pink-500' },
              { name: 'Rahul K.', role: 'Traveler', text: 'Best hostel experience. Great atmosphere and friendly people. 10/10!', rating: 5, emoji: '✈️', gradient: 'from-orange-500 to-red-500' }
            ].map((testimonial, idx) => (
              <Card
                key={idx}
                className="bg-gray-800/90 border border-white/10 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="text-5xl p-3 rounded-2xl bg-blue-600">{testimonial.emoji}</div>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-lg italic text-gray-300 leading-relaxed font-light">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t border-white/10 pt-4">
                    <p className="font-bold text-white text-lg">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="py-24 px-4 bg-gray-900">
        <div className="max-w-3xl mx-auto space-y-8 text-center">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            Ready to Find Your <span className="text-blue-400">Perfect Room?</span>
          </h2>
          <p className="text-xl text-gray-300 font-light leading-relaxed">
            Join thousands of satisfied guests. Book your accommodation today and enjoy a refined, comfortable stay!
          </p>
          <Button
            size="lg"
            className="text-lg px-10 py-7 shadow-lg hover:shadow-xl transition-all duration-300 mx-auto gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold"
            onClick={handleBookNow}
          >
            🚀 Start Booking Now <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
