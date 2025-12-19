import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  try {
    console.log('🔍 Testing MongoDB connection...\n');
    
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI not found in .env file');
    }
    
    console.log('📍 Connection String:', process.env.MONGO_URI.substring(0, 50) + '...\n');
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully!\n');
    
    // Test a simple query
    const adminCount = await mongoose.connection.db.collection('users').countDocuments();
    console.log(`📊 Users in database: ${adminCount}\n`);
    
    await mongoose.disconnect();
    console.log('✅ Disconnected successfully\n');
    console.log('🎉 Connection test passed! You can now create admin user.');
  } catch (err) {
    console.error('❌ Connection failed!\n');
    console.error('Error:', err.message, '\n');
    console.error('Troubleshooting steps:');
    console.error('1. Check your internet connection');
    console.error('2. Verify .env file has correct MONGO_URI');
    console.error('3. Whitelist your IP on MongoDB Atlas');
    console.error('4. Check username and password in connection string');
    console.error('\nFor help, see: MONGODB_CONNECTION_GUIDE.md');
  }
}

testConnection();
