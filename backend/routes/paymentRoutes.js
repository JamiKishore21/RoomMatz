import express from "express";
import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Room from "../models/Room.js";
import Notification from "../models/Notification.js";

const router = express.Router();
let io = null;

export const setIO = (socketIO) => {
  io = socketIO;
};

// Route to save payment details and create booking
router.post("/save-payment", async (req, res) => {
  try {
    const { studentName, hostelName, roomType, price, paymentMethod, transactionId, paymentDate, email, roomId, checkInDate, checkOutDate, numberOfGuests, specialRequests } = req.body;

    console.log("[PAYMENT] Request body:", req.body);

    // Validate required fields (only studentName and transactionId)
    if (!studentName || !transactionId) {
      return res.status(400).json({ message: "studentName and transactionId are required" });
    }

    // Check if payment already exists (prevent duplicates)
    const existingPayment = await Payment.findOne({ transactionId });
    if (existingPayment) {
      return res.status(400).json({ message: "Payment with this transaction ID already exists" });
    }

    // Save payment (main operation)
    const newPayment = new Payment({
      studentName,
      hostelName: hostelName || "RoomMatz",
      roomType: roomType || "single",
      price: price || 0,
      paymentMethod: paymentMethod || "Unknown",
      transactionId,
      paymentDate: paymentDate || new Date(),
    });

    await newPayment.save();
    console.log("[PAYMENT] Payment saved successfully:", newPayment._id);

    // Booking creation is optional (only if email AND roomId provided)
    let booking = null;

    if (email && roomId) {
      try {
        // Find or create user
        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({ 
            name: studentName, 
            email, 
            password: "temp_" + Math.random().toString(36).slice(2, 11)
          });
          console.log("[PAYMENT] User created:", user._id);
        } else {
          console.log("[PAYMENT] User found:", user._id);
        }

        // Find room
        const room = await Room.findById(roomId);
        if (room) {
          // Create booking with pending status
          booking = new Booking({
            userId: user._id,
            roomId: room._id,
            checkInDate: checkInDate ? new Date(checkInDate) : new Date(),
            checkOutDate: checkOutDate ? new Date(checkOutDate) : new Date(Date.now() + 86400000),
            totalPrice: price || 0,
            guestName: studentName,
            guestEmail: email,
            guestPhone: "9876543210", // Default phone
            numberOfGuests: numberOfGuests || 1,
            specialRequests: specialRequests || "",
            status: "pending", // Start as pending for admin approval
            paymentStatus: "paid",
          });

          await booking.save();
          
          // Create notification for admin
          try {
            const notification = new Notification({
              bookingId: booking._id,
              paymentId: newPayment._id,
              type: 'payment_submitted',
              title: 'New Payment Received',
              message: `Payment of ₹${price} received from ${studentName} for ${roomType} room. Transaction ID: ${transactionId}`,
              adminId: null // Will be populated when admin logs in
            });
            await notification.save();
            
            // Emit real-time notification via Socket.io
            if (io) {
              io.emit('admin-notification', {
                type: 'payment_submitted',
                title: 'New Payment Received',
                message: `Payment of ₹${price} received from ${studentName}`,
                bookingId: booking._id,
                paymentId: newPayment._id,
                createdAt: new Date()
              });
            }
          } catch (notificationError) {
            console.log("[PAYMENT] Notification creation failed (non-critical):", notificationError.message);
          }
          
          // Room status remains available until admin approves the booking
          console.log("[PAYMENT] Booking created with pending status:", booking._id);
          console.log("[PAYMENT] Booking details - User:", user._id, "Room:", room._id);
        } else {
          console.log("[PAYMENT] Room not found:", roomId);
        }
      } catch (bookingError) {
        console.log("[PAYMENT] Booking creation failed (non-critical):", bookingError.message);
        // Don't fail payment if booking creation fails
      }
    }

    res.status(201).json({ 
      message: "Payment saved successfully",
      success: true,
      payment: newPayment,
      booking: booking || null,
    });
  } catch (error) {
    console.error("[PAYMENT ERROR]:", error.message);
    res.status(500).json({ 
      message: "Error saving payment", 
      error: error.message 
    });
  }
});

export default router;
