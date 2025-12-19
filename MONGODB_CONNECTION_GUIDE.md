# 🔧 MongoDB Connection Troubleshooting Guide

## Error: ENOTFOUND _mongodb._tcp.cluster0.tjjyb.mongodb.net

This error means MongoDB Atlas cannot be reached. The issue is likely with your internet connection or MongoDB Atlas IP whitelist.

---

## ✅ Fix Your MongoDB Connection

### Option 1: Check Your .env File (Current Setup)

Your `.env` file should look like:
```env
MONGO_URI="mongodb+srv://kishore:kishore@cluster0.tjjyb.mongodb.net/hostelDB?retryWrites=true&w=majority&appName=Cluster0"
EMAIL_USER=subhashtalluri68@gmail.com
EMAIL_PASS=zjug ghbj esci edbq
```

### Option 2: If Connection Still Fails

Follow these steps:

1. **Check Internet Connection**
   - Verify your internet is working
   - Try: `ping 8.8.8.8`

2. **Whitelist Your IP on MongoDB Atlas**
   - Go to: https://cloud.mongodb.com/
   - Login to your account
   - Navigate to: Network Access → IP Whitelist
   - Add your current IP address (or add 0.0.0.0/0 for development only)
   - Click "Add Entry"

3. **Verify Your Connection String**
   - Go to MongoDB Atlas Dashboard
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace in .env file

4. **Check Username & Password**
   - Verify credentials are correct
   - URL-encode special characters if needed
   - Example: `@` becomes `%40`, `:` becomes `%3A`

---

## 🧪 Test Your Connection

### Test 1: Simple Connection Test
Create a file: `backend/test-connection.js`

```javascript
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('MONGO_URI:', process.env.MONGO_URI);
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully!');
    
    await mongoose.disconnect();
    console.log('✅ Disconnected successfully');
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
  }
}

testConnection();
```

Run it:
```bash
node test-connection.js
```

### Test 2: Check Environment Variables
```bash
# On Windows
echo %MONGO_URI%

# Or in Node
node -e "console.log(process.env.MONGO_URI)"
```

---

## 🚨 Common Issues & Solutions

### Issue 1: ENOTFOUND Error
**Cause:** DNS cannot resolve MongoDB Atlas hostname
**Solution:**
- Check internet connection
- Whitelist your IP on MongoDB Atlas
- Verify connection string is correct

### Issue 2: Authentication Failed
**Cause:** Wrong username or password
**Solution:**
- Double-check MongoDB Atlas credentials
- Reset password if needed
- URL-encode special characters

### Issue 3: Connection Timeout
**Cause:** Firewall blocking connection
**Solution:**
- Check your firewall settings
- Disable VPN if using one
- Whitelist IP on MongoDB Atlas

### Issue 4: Certificate Error
**Cause:** SSL/TLS configuration issue
**Solution:**
- Try adding: `&ssl=true` to connection string
- Update Node.js to latest version
- Check MongoDB Atlas TLS setting

---

## 🔄 Retry Creating Admin

After fixing MongoDB connection:

```bash
cd backend

# Clear any Node cache
del package-lock.json

# Reinstall dependencies
npm install

# Try creating admin again
node scripts/createAdmin.js
```

---

## 📋 Step-by-Step: Connect to MongoDB Atlas

### Step 1: Get Your Connection String
1. Go to: https://cloud.mongodb.com
2. Login with your MongoDB Atlas account
3. Select your cluster
4. Click "Connect"
5. Choose "Connect your application"
6. Copy the connection string

### Step 2: Update .env File
Replace the connection string:
```env
MONGO_URI="your_copied_connection_string_here"
```

### Step 3: Whitelist Your IP
1. In MongoDB Atlas, go to "Network Access"
2. Click "Add IP Address"
3. Click "Add Current IP Address" (recommended)
   OR enter your IP manually
   OR add 0.0.0.0/0 for all IPs (development only)
4. Click "Add Entry"

### Step 4: Test Connection
```bash
node backend/test-connection.js
```

### Step 5: Create Admin
```bash
node backend/scripts/createAdmin.js
```

---

## 🎯 Using MongoDB Locally (Alternative)

If MongoDB Atlas is problematic, use local MongoDB:

### Option A: MongoDB Community Edition
1. Download: https://www.mongodb.com/try/download/community
2. Install it
3. Update .env:
   ```env
   MONGO_URI="mongodb://localhost:27017/hostelDB"
   ```

### Option B: MongoDB Atlas - Free Tier
1. Create account: https://cloud.mongodb.com
2. Create free cluster
3. Get connection string
4. Whitelist IP
5. Use connection string in .env

---

## ✨ Expected Output When Working

```bash
$ node scripts/createAdmin.js
Connected to MongoDB
Admin user created successfully!
Email: admin@hotel.com
Password: admin123
Please change the password after first login!
```

---

## 🆘 Still Having Issues?

### Debug Information
Collect this info for troubleshooting:

```bash
# Check MongoDB Atlas status
echo Check: https://cloud.mongodb.com/

# Check your connection string
node -e "console.log(process.env.MONGO_URI)"

# Check Node version
node --version

# Check npm version
npm --version

# Check if MongoDB is running
# For local: mongo --version
# For Atlas: Check connection status in web console
```

### Questions to Ask Yourself:
- [ ] Is internet connection working?
- [ ] Is IP whitelisted on MongoDB Atlas?
- [ ] Are username and password correct?
- [ ] Is connection string in .env file?
- [ ] Did you reload terminal after .env change?

---

## 🔑 Quick Reference

| Problem | Solution |
|---------|----------|
| ENOTFOUND error | Whitelist IP on MongoDB Atlas |
| Authentication failed | Check username/password |
| Connection timeout | Check firewall/VPN |
| Module not found | Run `npm install` |
| .env not loading | Restart terminal after saving |

---

## ✅ Verification Checklist

Before trying again:
- [ ] Internet connection is working
- [ ] IP is whitelisted on MongoDB Atlas
- [ ] .env file has correct MONGO_URI
- [ ] Terminal was restarted after .env change
- [ ] npm install was run
- [ ] Node version is 14+

---

**Your connection should work now! Try again:**

```bash
node backend/scripts/createAdmin.js
```

