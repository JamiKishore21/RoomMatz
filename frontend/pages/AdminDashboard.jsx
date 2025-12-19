
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NotificationBell from '../components/NotificationBell';
import DashboardLayout from '../src/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../src/components/ui/card';
import { Button } from '../src/components/ui/button';
import { Input } from '../src/components/ui/input';
import { Label } from '../src/components/ui/label';

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showGuestModal, setShowGuestModal] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomType: 'single',
    capacity: '',
    price: '',
    amenities: '',
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return { Authorization: `Bearer ${token}` };
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');

    if (!token || !user) {
      navigate('/admin-login');
    } else {
      setAdminUser(JSON.parse(user));
      fetchDashboardData();

      const interval = setInterval(() => {
        if (activeTab === 'bookings') {
          console.log('Auto-refreshing bookings...');
          fetchDashboardData();
        }
      }, 50000);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate, activeTab]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const headers = getAuthHeaders();
      const apiUrl = import.meta.env.VITE_API_URL;

      const [statsRes, usersRes, roomsRes, bookingsRes] = await Promise.all([
        axios.get(`${apiUrl}/api/admin/dashboard`, { headers }).catch(e => { throw e; }),
        axios.get(`${apiUrl}/api/admin/users`, { headers }).catch(e => { throw e; }),
        axios.get(`${apiUrl}/api/admin/rooms`, { headers }).catch(e => { throw e; }),
        axios.get(`${apiUrl}/api/admin/bookings`, { headers }).catch(e => { throw e; }),
      ]);

      setStats(statsRes.data);
      setUsers(usersRes.data);
      setRooms(roomsRes.data);
      setBookings(bookingsRes.data);
    } catch {
      console.error('Error fetching dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin-login');
  };

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      const headers = getAuthHeaders();
      await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/rooms`,
        {
          ...formData,
          capacity: parseInt(formData.capacity),
          price: parseFloat(formData.price),
          amenities: formData.amenities.split(',').map(a => a.trim()),
        },
        { headers }
      );
      setFormData({
        roomNumber: '',
        roomType: 'single',
        capacity: '',
        price: '',
        amenities: '',
      });
      fetchDashboardData();
      alert('Room added successfully!');
    } catch (error) {
      alert('Error adding room: ' + error.response?.data?.error);
    }
  };

  const handleDeleteRoom = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        const headers = getAuthHeaders();
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/rooms/${id}`, { headers });
        fetchDashboardData();
        alert('Room deleted successfully!');
      } catch {
        alert('Error deleting room');
      }
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const headers = getAuthHeaders();
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/admin/users/${id}`, { headers });
        fetchDashboardData();
        alert('User deleted successfully!');
      } catch {
        alert('Error deleting user');
      }
    }
  };

  const handleUpdateBookingStatus = async (id, newStatus) => {
    try {
      const headers = getAuthHeaders();
      await axios.put(`${import.meta.env.VITE_API_URL}/api/admin/bookings/${id}/status`,
        { status: newStatus },
        { headers }
      );
      fetchDashboardData();
      alert('Booking status updated!');
    } catch {
      alert('Error updating booking status');
    }
  };

  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={handleLogout}
      adminName={adminUser?.name}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>
          <div className="flex items-center gap-2">
            <NotificationBell userType="admin" />
          </div>
        </div>

        {loading && (
          <div className="text-center py-10 text-gray-300">Loading...</div>
        )}

        {/* Dashboard Tab */}
        {!loading && activeTab === 'dashboard' && stats && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {[
              { label: 'Total Users', value: stats.totalUsers, color: 'text-primary', icon: '👥' },
              { label: 'Total Rooms', value: stats.totalRooms, color: 'text-emerald-500', icon: '🏠' },
              { label: 'Total Bookings', value: stats.totalBookings, color: 'text-amber-500', icon: '📋' },
              { label: 'Pending Bookings', value: stats.pendingBookings, color: 'text-rose-500', icon: '⏳' },
              { label: 'Total Revenue', value: `₹${stats.totalRevenue.toFixed(2)}`, color: 'text-yellow-600', icon: '💰' }
            ].map((stat, idx) => (
              <Card key={idx} className="bg-gray-800/90 border-white/10 hover:shadow-xl transition-all">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    {stat.label}
                  </CardTitle>
                  <span className="text-2xl opacity-80">{stat.icon}</span>
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Users Tab */}
        {!loading && activeTab === 'users' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-white">Users Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-800/80 text-gray-300 border-b border-white/10 uppercase text-[10px] tracking-widest">
                    <tr>
                      <th className="p-4 font-bold">Name</th>
                      <th className="p-4 font-bold">Email</th>
                      <th className="p-4 font-bold">Role</th>
                      <th className="p-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {users.map((user) => (
                      <tr key={user._id} className="transition-colors hover:bg-white/5 group">
                        <td className="p-4 font-semibold text-white group-hover:text-blue-400 transition-colors">{user.name}</td>
                        <td className="p-4 text-gray-400">{user.email}</td>
                        <td className="p-4">
                          <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20">
                            {user.role || 'User'}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <Button
                            variant="destructive"
                            size="sm"
                            className="h-8 bg-red-900/40 text-red-400 border border-red-500/20 hover:bg-red-900/60"
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Rooms Tab */}
        {!loading && activeTab === 'rooms' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Room</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddRoom} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 pt-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-gray-400 uppercase font-black">Room Number</Label>
                    <Input
                      placeholder="e.g. 101"
                      value={formData.roomNumber}
                      onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                      required
                      className="bg-gray-700/50 border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-gray-400 uppercase font-black">Type</Label>
                    <select
                      className="flex h-10 w-full rounded-md border border-white/10 bg-gray-700/50 px-3 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500/20 outline-none"
                      value={formData.roomType}
                      onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                    >
                      <option value="single">Single Sharing</option>
                      <option value="double">Double Sharing</option>
                      <option value="threeSharing">Three Sharing</option>
                      <option value="fourSharing">Four Sharing</option>
                      <option value="suite">Premium Suite</option>
                      <option value="deluxe">Deluxe Wing</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-gray-400 uppercase font-black">Capacity</Label>
                    <Input
                      type="number"
                      placeholder="Guests"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      required
                      className="bg-gray-700/50 border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-gray-400 uppercase font-black">Price (₹)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Amount"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                      className="bg-gray-700/50 border-white/10 text-white"
                    />
                  </div>
                  <div className="md:col-span-2 lg:col-span-4 space-y-2">
                    <Label className="text-xs text-gray-400 uppercase font-black">Amenities</Label>
                    <Input
                      placeholder="WiFi, AC, TV (comma separated)"
                      value={formData.amenities}
                      onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                      className="bg-gray-700/50 border-white/10 text-white"
                    />
                  </div>
                  <Button type="submit" className="md:col-span-2 lg:col-span-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11">
                    Add Room to Inventory
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Rooms List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-white/10 overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-800/80 text-gray-300 border-b border-white/10 uppercase text-[10px] tracking-widest">
                      <tr>
                        {['Room #', 'Type', 'Capacity', 'Occupancy', 'Current Guests', 'Price', 'Status', 'Actions'].map((header) => (
                          <th key={header} className="p-4 font-bold">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {rooms.map((room) => (
                        <tr key={room._id} className="transition-colors hover:bg-white/5 group">
                          <td className="p-4 font-bold text-white uppercase">{room.roomNumber}</td>
                          <td className="p-4 capitalize text-gray-400">{room.roomType}</td>
                          <td className="p-4 text-gray-400">{room.capacity}</td>
                          <td className="p-4 text-gray-400 font-mono">{room.occupancy || 0}/{room.capacity}</td>
                          <td className="p-4">
                            {room.currentBookings && room.currentBookings.length > 0 ? (
                              <Button
                                variant="link"
                                size="sm"
                                className="text-blue-400 hover:text-blue-300 p-0 h-auto font-bold underline-offset-4 hover:underline"
                                onClick={() => {
                                  setSelectedRoom(room);
                                  setShowGuestModal(true);
                                }}
                              >
                                {room.currentBookings.length} Guests →
                              </Button>
                            ) : (
                              <span className="text-gray-500 text-xs italic">Vacant</span>
                            )}
                          </td>
                          <td className="p-4 font-black text-white">₹{room.price}</td>
                          <td className="p-4">
                            <span className={`inline-flex items-center rounded-md px-2 py-1 text-[10px] font-black uppercase tracking-tighter ring-1 ring-inset ${room.status === 'available'
                              ? 'bg-emerald-500/10 text-emerald-500 ring-emerald-500/30'
                              : 'bg-red-500/10 text-red-500 ring-red-500/30'
                              }`}>
                              {room.status}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <Button variant="destructive" size="sm" className="h-8 bg-red-900/40 text-red-400 border border-red-500/20" onClick={() => handleDeleteRoom(room._id)}>
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Bookings Tab */}
        {!loading && activeTab === 'bookings' && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Bookings Management</CardTitle>
              <Button onClick={fetchDashboardData} size="sm" variant="outline">
                Refresh
              </Button>
            </CardHeader>
            <CardContent>
              {bookings.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                  No bookings found
                </div>
              ) : (
                <div className="rounded-md border border-white/10 overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-800/80 text-gray-300 border-b border-white/10 uppercase text-[10px] tracking-widest">
                      <tr>
                        {['Room', 'User', 'Paid Date', 'Status', 'Amount Paid', 'Actions'].map((h) => (
                          <th key={h} className="p-4 font-bold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {bookings.map((booking) => (
                        <tr key={booking._id} className="transition-colors hover:bg-white/5 group">
                          <td className="p-4 font-bold text-white">{booking.roomId?.roomNumber || 'N/A'}</td>
                          <td className="p-4">
                            <div className="font-bold text-gray-200">{booking.userId?.name}</div>
                            <div className="text-[10px] text-gray-500 font-mono tracking-tighter uppercase">{booking.userId?.email}</div>
                          </td>
                          <td className="p-4 text-gray-400 font-mono text-xs">
                            {booking.paymentDetails?.paymentDate ? new Date(booking.paymentDetails.paymentDate).toLocaleDateString('en-IN') :
                              (booking.paymentDate ? new Date(booking.paymentDate).toLocaleDateString('en-IN') :
                                (booking.createdAt ? new Date(booking.createdAt).toLocaleDateString('en-IN') : 'N/A'))}
                          </td>
                          <td className="p-4">
                            <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter ring-1 ring-inset ${booking.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-500 ring-emerald-500/30' :
                              booking.status === 'pending' ? 'bg-amber-500/10 text-amber-500 ring-amber-500/30' :
                                'bg-red-500/10 text-red-500 ring-red-500/30'
                              }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="p-4 font-black text-white">
                            ₹{booking.totalPrice || booking.price || booking.amount || 'N/A'}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 border-white/10 bg-white/5 text-gray-300 hover:bg-white/10"
                                onClick={() => {
                                  setSelectedBooking(booking);
                                  setShowTransactionModal(true);
                                }}
                              >
                                View Details
                              </Button>
                              <select
                                className="h-8 w-[100px] rounded-md border border-white/10 bg-gray-900 px-2 py-1 text-[10px] font-black uppercase text-gray-300 focus:ring-1 focus:ring-blue-500 outline-none"
                                value={booking.status}
                                onChange={(e) => handleUpdateBookingStatus(booking._id, e.target.value)}
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Transaction Details Modal */}
      {showTransactionModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-2xl z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-white/10 shadow-3xl">
            <CardHeader className="border-b border-white/5 p-6 bg-white/[0.02]">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-black text-white">Transaction Metadata</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
                  onClick={() => {
                    setShowTransactionModal(false);
                    setSelectedBooking(null);
                  }}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              {/* Booking Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-blue-500">Inventory Logic</h3>
                <div className="grid grid-cols-2 gap-6 bg-white/[0.02] p-6 rounded-2xl border border-white/5">
                  <div>
                    <Label className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1 block">Booking Reference</Label>
                    <p className="font-mono text-xs text-blue-400">{selectedBooking._id}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1 block">Fulfillment</Label>
                    <p>
                      <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter ring-1 ring-inset ${selectedBooking.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-500 ring-emerald-500/30' :
                        selectedBooking.status === 'pending' ? 'bg-amber-500/10 text-amber-500 ring-amber-500/30' :
                          'bg-red-500/10 text-red-500 ring-red-500/30'
                        }`}>
                        {selectedBooking.status}
                      </span>
                    </p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1 block">Asset Pointer</Label>
                    <p className="font-bold text-white uppercase text-sm">Room {selectedBooking.roomId?.roomNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1 block">Asset Category</Label>
                    <p className="capitalize text-gray-300 text-sm font-bold">{selectedBooking.roomId?.roomType || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* User Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-blue-500">Identity Context</h3>
                <div className="grid grid-cols-2 gap-6 bg-white/[0.02] p-6 rounded-2xl border border-white/5">
                  <div>
                    <Label className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1 block">Legal Name</Label>
                    <p className="font-bold text-white">{selectedBooking.userId?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1 block">Authenticated Email</Label>
                    <p className="text-sm text-gray-300 font-mono">{selectedBooking.userId?.email || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1 block">Telecom Handle</Label>
                    <p className="text-gray-300 font-bold">{selectedBooking.userId?.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1 block">System UID</Label>
                    <p className="font-mono text-[10px] text-gray-500">{selectedBooking.userId?._id || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-blue-500">Financial Resolution</h3>
                <div className="grid grid-cols-2 gap-6 bg-white/[0.02] p-6 rounded-2xl border border-white/5">
                  <div>
                    <Label className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1 block">Gross Settlement</Label>
                    <p className="text-3xl font-black text-white">
                      ₹{selectedBooking.totalPrice || selectedBooking.price || selectedBooking.amount || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1 block">Gateway Channel</Label>
                    <p className="capitalize text-gray-300 font-bold">{selectedBooking.paymentMethod || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1 block">Verification State</Label>
                    <p className="capitalize font-black text-emerald-400">{selectedBooking.paymentStatus || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1 block">TXN Signature</Label>
                    <p className="font-mono text-[10px] text-gray-500 truncate">{selectedBooking.transactionId || selectedBooking.razorpayOrderId || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-blue-500">Temporal Metadata</h3>
                <div className="grid grid-cols-2 gap-6 bg-white/[0.02] p-6 rounded-2xl border border-white/5 text-sm">
                  <div>
                    <Label className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1 block">Paid Timestamp</Label>
                    <p className="text-gray-300 font-mono">
                      {selectedBooking.paymentDetails?.paymentDate ? new Date(selectedBooking.paymentDetails.paymentDate).toLocaleString('en-IN') :
                        (selectedBooking.paymentDate ? new Date(selectedBooking.paymentDate).toLocaleString('en-IN') :
                          (selectedBooking.createdAt ? new Date(selectedBooking.createdAt).toLocaleString('en-IN') : 'N/A'))}
                    </p>
                  </div>
                  <div>
                    <Label className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1 block">Mutation Cursor</Label>
                    <p className="text-gray-300 font-mono">
                      {selectedBooking.updatedAt
                        ? new Date(selectedBooking.updatedAt).toLocaleString('en-IN')
                        : 'N/A'}
                    </p>
                  </div>
                  {selectedBooking.specialRequests && (
                    <div className="col-span-2">
                      <Label className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1 block">Special Logic Requests</Label>
                      <p className="text-gray-300 bg-black/40 p-3 rounded-lg border border-white/5">{selectedBooking.specialRequests}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Guest Details Modal */}
      {showGuestModal && selectedRoom && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xl z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gray-900 border-white/10 shadow-3xl">
            <CardHeader className="border-b border-white/5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-black text-white">Guest Details — Room {selectedRoom.roomNumber}</CardTitle>
                  <p className="text-sm text-gray-400 mt-1 uppercase tracking-widest">
                    {selectedRoom.currentBookings?.length || 0} active occupant{selectedRoom.currentBookings?.length > 1 ? 's' : ''}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
                  onClick={() => {
                    setShowGuestModal(false);
                    setSelectedRoom(null);
                  }}
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {selectedRoom.currentBookings && selectedRoom.currentBookings.length > 0 ? (
                <div className="space-y-6">
                  {selectedRoom.currentBookings.map((booking, idx) => (
                    <div key={booking._id || idx} className="border border-white/10 rounded-2xl p-6 bg-white/[0.02] hover:bg-white/[0.05] transition-all">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-xl shadow-lg">
                            {booking.userId?.name?.charAt(0).toUpperCase() || 'G'}
                          </div>
                          <div>
                            <h4 className="font-bold text-xl text-white">{booking.userId?.name || 'Guest'}</h4>
                            <p className="text-sm text-gray-400 font-mono">{booking.userId?.email || 'N/A'}</p>
                          </div>
                        </div>
                        <span className={`inline-flex items-center rounded-md px-3 py-1 text-xs font-black uppercase tracking-tighter ring-1 ring-inset ${booking.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-500 ring-emerald-500/30' :
                          booking.status === 'checked-in' ? 'bg-blue-500/10 text-blue-500 ring-blue-500/30' :
                            booking.status === 'pending' ? 'bg-amber-500/10 text-amber-500 ring-amber-500/30' :
                              'bg-red-500/10 text-red-500 ring-red-500/30'
                          }`}>
                          {booking.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="space-y-1">
                          <Label className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Phone</Label>
                          <p className="font-bold text-gray-200">{booking.userId?.phone || 'N/A'}</p>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Rental Type</Label>
                          <p className="font-bold text-gray-200 uppercase text-sm">Monthly</p>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Revenue</Label>
                          <p className="font-black text-white text-lg">₹{booking.totalPrice || booking.price || booking.amount || 'N/A'}</p>
                        </div>
                        <div className="space-y-1">
                          <Label className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Payment Status</Label>
                          <p className="font-bold text-emerald-400 capitalize">{booking.paymentStatus || 'N/A'}</p>
                        </div>
                        <div className="space-y-1 col-span-2">
                          <Label className="text-gray-500 text-[10px] font-black uppercase tracking-widest">Booking UID</Label>
                          <p className="font-mono text-[10px] text-gray-500 truncate">{booking._id}</p>
                        </div>
                      </div>

                      <div className="mt-6 flex gap-3">
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-6"
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowTransactionModal(true);
                            setShowGuestModal(false);
                          }}
                        >
                          Full Database Record
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-dashed border-white/10">
                  <p className="text-gray-500 font-bold uppercase tracking-widest">No guest data found for this room</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}

export default AdminDashboard;