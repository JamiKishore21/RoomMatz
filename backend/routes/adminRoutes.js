import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Admin from '../models/Admin.js';
import Room from '../models/Room.js';
import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';
import Notification from '../models/Notification.js';
import { verifyAdminToken, verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'roommatz_default_secret_key_2024';
let io = null;

export const setIO = (socketIO) => {
  io = socketIO;
};

// Admin Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !user.isAdmin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, isAdmin: user.isAdmin, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Admin Dashboard Stats
router.get('/dashboard', verifyAdminToken, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalRooms = await Room.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const totalRevenue = await Booking.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    res.json({
      totalUsers,
      totalRooms,
      totalBookings,
      pendingBookings,
      totalRevenue: totalRevenue[0]?.total || 0,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all users
router.get('/users', verifyAdminToken, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user by ID
router.get('/users/:id', verifyAdminToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a room
router.post('/rooms', verifyAdminToken, async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all rooms
router.get('/rooms', verifyAdminToken, async (req, res) => {
  try {
    const rooms = await Room.find();
    
    // Get active bookings for all rooms
    const roomIds = rooms.map(room => room._id);
    const activeBookings = await Booking.find({
      roomId: { $in: roomIds },
      status: { $in: ['confirmed', 'checked-in'] }
    }).populate('userId', 'name email');
    
    // Group bookings by room
    const bookingsByRoom = {};
    activeBookings.forEach(booking => {
      const roomId = booking.roomId.toString();
      if (!bookingsByRoom[roomId]) {
        bookingsByRoom[roomId] = [];
      }
      bookingsByRoom[roomId].push(booking);
    });
    
    // Add bookings to rooms
    const roomsWithBookings = rooms.map(room => ({
      ...room.toObject(),
      currentBookings: bookingsByRoom[room._id.toString()] || []
    }));
    
    res.json(roomsWithBookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update room
router.put('/rooms/:id', verifyAdminToken, async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete room
router.delete('/rooms/:id', verifyAdminToken, async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) return res.status(404).json({ error: 'Room not found' });
    res.json({ message: 'Room deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all bookings
router.get('/bookings', verifyAdminToken, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email')
      .populate('roomId', 'roomNumber roomType')
      .sort({ 
        status: 1, // Sort by status (pending first, then confirmed, etc.)
        createdAt: -1 // Then by creation date (newest first)
      });
    
    // Get payment details for each booking based on transaction ID or other matching criteria
    const bookingsWithPayments = await Promise.all(
      bookings.map(async (booking) => {
        // Try to find payment by guest email and amount (since transactionId might not be directly linked)
        const payment = await Payment.findOne({
          price: booking.totalPrice,
          $or: [
            { studentName: booking.guestName },
            { transactionId: { $exists: true } }
          ]
        }).sort({ paymentDate: -1 }); // Get the most recent matching payment
        
        return {
          ...booking.toObject(),
          paymentDetails: payment ? {
            transactionId: payment.transactionId,
            paymentMethod: payment.paymentMethod,
            paymentDate: payment.paymentDate
          } : null
        };
      })
    );
    
    res.json(bookingsWithPayments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update booking status
router.put('/bookings/:id/status', verifyAdminToken, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    ).populate('roomId');
    
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    
    // Update room occupancy and status based on booking status
    if (booking.roomId) {
      const room = await Room.findById(booking.roomId._id);
      
      if (status === 'confirmed' || status === 'checked-in') {
        // Increment occupancy when booking is confirmed or checked-in
        room.occupancy += 1;
        // Set status to occupied only if room is at full capacity
        if (room.occupancy >= room.capacity) {
          room.status = 'occupied';
        }
        await room.save();
        console.log(`Room ${room.roomNumber} occupancy increased to ${room.occupancy}/${room.capacity}, status: ${room.status}`);
      } else if (status === 'cancelled' || status === 'checked-out') {
        // Decrement occupancy when booking is cancelled or checked-out
        room.occupancy = Math.max(0, room.occupancy - 1);
        // Set status back to available if room has space
        if (room.occupancy < room.capacity) {
          room.status = 'available';
        }
        await room.save();
        console.log(`Room ${room.roomNumber} occupancy decreased to ${room.occupancy}/${room.capacity}, status: ${room.status}`);
      }
    }
    
    // Create notification for user
    try {
      let notificationTitle = '';
      let notificationMessage = '';
      
      if (status === 'confirmed') {
        notificationTitle = 'Booking Confirmed!';
        notificationMessage = `Your booking for room ${booking.roomId?.roomNumber} has been confirmed. Check-in: ${new Date(booking.checkInDate).toLocaleDateString()}`;
      } else if (status === 'checked-in') {
        notificationTitle = 'Checked In Successfully';
        notificationMessage = `You have been checked in to room ${booking.roomId?.roomNumber}. Enjoy your stay!`;
      } else if (status === 'checked-out') {
        notificationTitle = 'Checkout Completed';
        notificationMessage = `Your checkout from room ${booking.roomId?.roomNumber} has been completed. Thank you for staying with us!`;
      } else if (status === 'cancelled') {
        notificationTitle = 'Booking Cancelled';
        notificationMessage = `Your booking for room ${booking.roomId?.roomNumber} has been cancelled.`;
      } else if (status === 'pending') {
        notificationTitle = 'Booking Pending';
        notificationMessage = `Your booking is under review. We will notify you once it's confirmed.`;
      }
      
      if (notificationTitle) {
        const userNotification = new Notification({
          userId: booking.userId,
          bookingId: booking._id,
          type: status === 'confirmed' ? 'booking_confirmed' : 'booking_status_updated',
          title: notificationTitle,
          message: notificationMessage
        });
        await userNotification.save();
        
        // Emit real-time notification via Socket.io
        if (io) {
          io.emit('user-notification', {
            userId: booking.userId.toString(),
            type: status === 'confirmed' ? 'booking_confirmed' : 'booking_status_updated',
            title: notificationTitle,
            message: notificationMessage,
            bookingId: booking._id,
            createdAt: new Date()
          });
        }
        
        console.log(`[NOTIFICATION] Sent to user ${booking.userId}: ${notificationTitle}`);
      }
    } catch (notificationError) {
      console.log("[NOTIFICATION] Error creating user notification (non-critical):", notificationError.message);
    }
    
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete booking
router.delete('/bookings/:id', verifyAdminToken, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id).populate('roomId');
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    
    // Set room status back to available when booking is deleted
    if (booking.roomId) {
      await Room.findByIdAndUpdate(booking.roomId._id, { status: 'available' });
      console.log(`Room ${booking.roomId.roomNumber} status set to available after booking deletion`);
    }
    
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user
router.delete('/users/:id', verifyAdminToken, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Make user admin
router.post('/users/:id/make-admin', verifyAdminToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isAdmin: true, role: 'admin' },
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove admin from user
router.post('/users/:id/remove-admin', verifyAdminToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isAdmin: false, role: 'user' },
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update User Role (Admin only)
router.put('/users/:id/role', verifyAdminToken, async (req, res) => {
  try {
    const { role } = req.body;
    const allowedRoles = ['user', 'admin', 'student', 'staff', 'manager'];
    
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User role updated successfully', user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;