import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  paymentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' },
  type: { 
    type: String, 
    enum: ['payment_submitted', 'booking_confirmed', 'booking_status_updated', 'booking_cancelled', 'payment_received'],
    required: true 
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
