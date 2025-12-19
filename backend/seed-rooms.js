import mongoose from 'mongoose';
import Room from './models/Room.js';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const seedRooms = async () => {
  try {
    // Clear existing rooms
    await Room.deleteMany({});
    console.log('Cleared existing rooms');

    // Sample rooms data
    const rooms = [
      // Single rooms
      { roomNumber: '101', roomType: 'single', capacity: 1, price: 15000, status: 'available', amenities: ['WiFi', 'AC', 'Attached Bathroom'] },
      { roomNumber: '102', roomType: 'single', capacity: 1, price: 15000, status: 'available', amenities: ['WiFi', 'AC', 'Attached Bathroom'] },
      { roomNumber: '103', roomType: 'single', capacity: 1, price: 16000, status: 'occupied', amenities: ['WiFi', 'AC', 'Attached Bathroom', 'TV'] },

      // Double rooms
      { roomNumber: '201', roomType: 'double', capacity: 2, price: 12000, status: 'available', amenities: ['WiFi', 'AC', 'Shared Bathroom'] },
      { roomNumber: '202', roomType: 'double', capacity: 2, price: 12000, status: 'available', amenities: ['WiFi', 'AC', 'Shared Bathroom'] },
      { roomNumber: '203', roomType: 'double', capacity: 2, price: 13000, status: 'maintenance', amenities: ['WiFi', 'AC', 'Shared Bathroom', 'Balcony'] },

      // Three sharing rooms
      { roomNumber: '301', roomType: 'threeSharing', capacity: 3, price: 10000, status: 'available', amenities: ['WiFi', 'AC', 'Shared Bathroom'] },
      { roomNumber: '302', roomType: 'threeSharing', capacity: 3, price: 10000, status: 'available', amenities: ['WiFi', 'AC', 'Shared Bathroom'] },
      { roomNumber: '303', roomType: 'threeSharing', capacity: 3, price: 10500, status: 'available', amenities: ['WiFi', 'AC', 'Shared Bathroom', 'Study Table'] },

      // Four sharing rooms
      { roomNumber: '401', roomType: 'fourSharing', capacity: 4, price: 8000, status: 'available', amenities: ['WiFi', 'Fan', 'Shared Bathroom'] },
      { roomNumber: '402', roomType: 'fourSharing', capacity: 4, price: 8000, status: 'available', amenities: ['WiFi', 'Fan', 'Shared Bathroom'] },
      { roomNumber: '403', roomType: 'fourSharing', capacity: 4, price: 8500, status: 'occupied', amenities: ['WiFi', 'Fan', 'Shared Bathroom', 'Common Area'] },

      // Suite rooms
      { roomNumber: '501', roomType: 'suite', capacity: 2, price: 25000, status: 'available', amenities: ['WiFi', 'AC', 'Attached Bathroom', 'TV', 'Mini Fridge', 'Balcony'] },
      { roomNumber: '502', roomType: 'suite', capacity: 2, price: 25000, status: 'available', amenities: ['WiFi', 'AC', 'Attached Bathroom', 'TV', 'Mini Fridge', 'Balcony'] },

      // Deluxe rooms
      { roomNumber: '601', roomType: 'deluxe', capacity: 2, price: 20000, status: 'available', amenities: ['WiFi', 'AC', 'Attached Bathroom', 'TV', 'Work Desk', 'City View'] },
      { roomNumber: '602', roomType: 'deluxe', capacity: 2, price: 20000, status: 'available', amenities: ['WiFi', 'AC', 'Attached Bathroom', 'TV', 'Work Desk', 'City View'] },
    ];

    // Insert rooms
    await Room.insertMany(rooms);
    console.log(`Successfully seeded ${rooms.length} rooms`);

    // Display summary
    const roomTypes = ['single', 'double', 'threeSharing', 'fourSharing', 'suite', 'deluxe'];
    for (const type of roomTypes) {
      const count = await Room.countDocuments({ roomType: type, status: 'available' });
      console.log(`${type}: ${count} available rooms`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error seeding rooms:', error);
    process.exit(1);
  }
};

seedRooms();