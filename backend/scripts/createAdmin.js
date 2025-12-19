import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function createAdmin() {
  try {
    // Connect to MongoDB
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI not found in .env file. Please check your .env configuration.');
    }
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@hotel.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new User({
      name: 'Admin',
      email: 'admin@hotel.com',
      password: hashedPassword,
      isAdmin: true,
      role: 'admin',
    });

    await admin.save();
    console.log('Admin user created successfully!');
    console.log('Email: admin@hotel.com');
    console.log('Password: admin123');
    console.log('Please change the password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
