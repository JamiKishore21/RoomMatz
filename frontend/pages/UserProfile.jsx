import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      navigate('/login');
      return;
    }

    const userData = JSON.parse(storedUser);
    setUser(userData);
    fetchUserProfile(userData.email);
  }, [navigate]);

  const fetchUserProfile = async (email) => {
    try {
      console.log('Fetching profile for email:', email);

      // Fetch user profile
      const profileRes = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profile/${email}`);
      if (profileRes.ok) {
        const profileData = await profileRes.json();
        console.log('Profile data:', profileData);
        setUser(profileData);
      } else {
        console.error('Profile fetch failed:', profileRes.status);
      }

      // Fetch user bookings
      const bookingsRes = await fetch(`${import.meta.env.VITE_API_URL}/api/users/bookings/${email}`);
      console.log('Bookings response status:', bookingsRes.status);

      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        console.log('Fetched bookings:', bookingsData);
        setBookings(bookingsData);
      } else {
        const errorData = await bookingsRes.json();
        console.error('Bookings fetch failed:', bookingsRes.status, errorData);
        setError(`Failed to fetch bookings: ${errorData.message}`);
      }
    } catch (err) {
      console.error('Error fetching profile data:', err);
      setError('Error loading profile data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black"><div className="text-white text-xl animate-pulse">👤 Loading profile...</div></div>;
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black"><div className="text-white text-xl">❌ User not found</div></div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-900 to-black"><div className="text-white text-xl">⚠️ Error: {error}</div></div>;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-black py-10 px-5">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-purple-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-purple-400/15 to-pink-600/15 rounded-full blur-3xl animate-pulse-glow"></div>
      </div>

      <div className="relative max-w-5xl mx-auto z-10">
        {/* User Profile Card */}
        <div className="bg-gray-800/90 border border-white/10 rounded-2xl shadow-2xl p-8 mb-8 relative">
          <div className="flex gap-6 mb-6 items-center">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-lg">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
              <p className="text-gray-300 mb-1">{user.email}</p>
              <p className="text-gray-500 text-sm">👤 Member since {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
            <div className="text-center">
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Account Status</p>
              <p className="text-lg font-bold text-emerald-400">✓ Active</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Role</p>
              <p className="text-lg font-bold text-white capitalize">{user.role || 'User'}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">Bookings</p>
              <p className="text-lg font-bold text-blue-400">{bookings.length}</p>
            </div>
          </div>
        </div>

        {/* Bookings Section */}
        <div className="bg-gray-800/90 border border-white/10 rounded-2xl shadow-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">📋 Your Bookings</h2>

          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">🏨</div>
              <p className="text-gray-400 text-lg mb-6">No bookings yet</p>
              <button
                onClick={() => navigate('/vacancy')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg"
              >
                🔍 Book a Room Now
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {bookings.map((booking) => (
                <div
                  key={booking._id}
                  className="bg-gray-700/30 border border-white/5 rounded-2xl p-6 transition-all hover:bg-gray-700/50 hover:border-white/10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
                    {/* Left Column - Room Details */}
                    <div>
                      <h3 className="text-lg font-bold text-white mb-4">🏠 Room Details</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400 font-medium">Room Number:</span>
                          <span className="text-white font-semibold">{booking.roomId?.roomNumber || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 font-medium">Room Type:</span>
                          <span className="text-white font-semibold capitalize">{booking.roomId?.roomType || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 font-medium">Capacity:</span>
                          <span className="text-white font-semibold">{booking.roomId?.capacity || 'N/A'} guests</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 font-medium">Monthly Price:</span>
                          <span className="text-blue-400 font-bold">₹{booking.roomId?.price || 'N/A'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Booking Details */}
                    <div>
                      <h3 className="text-lg font-bold text-white mb-4">📅 Booking Details</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400 font-medium">Booking ID:</span>
                          <span className="text-white font-mono text-xs">{booking._id?.slice(-8) || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 font-medium">Guests:</span>
                          <span className="text-white font-semibold">{booking.numberOfGuests}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 font-medium">Total Amount:</span>
                          <span className="text-blue-400 font-bold">₹{booking.totalPrice || booking.totalAmount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 font-medium">Payment Method:</span>
                          <span className="text-white font-semibold capitalize">{booking.paymentMethod || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Row */}
                  <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap justify-between items-center gap-4">
                    <div className="flex gap-3">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize text-white ${booking.status === 'confirmed' ? 'bg-emerald-600' :
                          booking.status === 'pending' ? 'bg-amber-600' : 'bg-rose-600'
                        }`}>
                        {booking.status}
                      </span>
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold text-white ${booking.paymentStatus === 'paid' ? 'bg-emerald-600' :
                          booking.paymentStatus === 'unpaid' ? 'bg-amber-600' : 'bg-gray-600'
                        }`}>
                        Payment: {booking.paymentStatus}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      📝 Booked on {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Amenities */}
                  {booking.roomId?.amenities && booking.roomId.amenities.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-gray-400 text-sm font-semibold mb-3">✨ Amenities:</p>
                      <div className="flex flex-wrap gap-2">
                        {booking.roomId.amenities.map((amenity, idx) => (
                          <span key={idx} className="bg-blue-600/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-medium">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Special Requests */}
                  {booking.specialRequests && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-gray-400 text-sm font-semibold mb-2">💬 Special Requests:</p>
                      <p className="text-gray-300 text-sm leading-relaxed">{booking.specialRequests}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Additional Actions */}
        {bookings.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/vacancy')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg"
            >
              🔍 View More Rooms
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
