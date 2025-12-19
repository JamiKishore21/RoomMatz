import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  roomType: { type: String, enum: ['single', 'double', 'threeSharing', 'fourSharing', 'suite', 'deluxe'], required: true },
  capacity: { type: Number, required: true },
  price: { type: Number, required: true },
  status: { type: String, enum: ['available', 'occupied', 'maintenance'], default: 'available' },
  occupancy: { type: Number, default: 0 }, // Track current number of occupants
  amenities: { type: [String], default: [] },
  description: { type: String, default: '' },
  images: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Room = mongoose.model("Room", roomSchema);
export default Room;
