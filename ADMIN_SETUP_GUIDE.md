# Admin System Setup Guide

## Overview
A complete admin system has been created for the hotel booking application with the following features:

### Features Included:
1. **Admin Authentication** - Secure admin login with JWT tokens
2. **Dashboard** - Overview of statistics (users, rooms, bookings, revenue)
3. **User Management** - View all users, promote users to admin, delete users
4. **Room Management** - Add, view, and delete hotel rooms
5. **Booking Management** - View and update booking statuses
6. **Authorization** - Role-based access control (admin-only routes)

---

## File Structure

### Backend Files Created/Updated:

**Models:**
- `backend/models/User.js` - Updated with isAdmin and role fields
- `backend/models/Admin.js` - New admin model
- `backend/models/Room.js` - New room model
- `backend/models/Booking.js` - New booking model

**Routes:**
- `backend/routes/adminRoutes.js` - Complete admin API routes

**Middleware:**
- `backend/middleware/authMiddleware.js` - JWT token verification

**Scripts:**
- `backend/scripts/createAdmin.js` - Script to create initial admin user

**Server:**
- `backend/server.js` - Updated to include admin routes

### Frontend Files Created/Updated:

**Pages:**
- `frontend/pages/AdminLogin.jsx` - Admin login page
- `frontend/pages/AdminDashboard.jsx` - Full-featured admin dashboard

**Components:**
- `frontend/src/App.jsx` - Updated with admin routes

---

## Setup Instructions

### Step 1: Create Initial Admin User

Run the following command in the `backend` directory:

```bash
node scripts/createAdmin.js
```

**Default Admin Credentials:**
- Email: `admin@hotel.com`
- Password: `admin123`

⚠️ **IMPORTANT:** Change the password after first login!

### Step 2: Update Backend Environment

Make sure your `.env` file includes:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### Step 3: Start the Backend Server

```bash
cd backend
npm install
npm run dev
```

### Step 4: Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

### Step 5: Access Admin Panel

1. Navigate to `http://localhost:5173/admin-login`
2. Or click the "Admin" button in the navigation bar
3. Enter admin credentials:
   - Email: `admin@hotel.com`
   - Password: `admin123`

---

## API Endpoints

### Admin Authentication
- `POST /api/admin/login` - Admin login

### Dashboard
- `GET /api/admin/dashboard` - Get dashboard statistics

### Users
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:id` - Get specific user
- `DELETE /api/admin/users/:id` - Delete user
- `POST /api/admin/users/:id/make-admin` - Promote user to admin
- `POST /api/admin/users/:id/remove-admin` - Remove admin privileges

### Rooms
- `GET /api/admin/rooms` - Get all rooms
- `POST /api/admin/rooms` - Create new room
- `PUT /api/admin/rooms/:id` - Update room
- `DELETE /api/admin/rooms/:id` - Delete room

### Bookings
- `GET /api/admin/bookings` - Get all bookings
- `PUT /api/admin/bookings/:id/status` - Update booking status
- `DELETE /api/admin/bookings/:id` - Delete booking

---

## Admin Dashboard Tabs

### 1. Dashboard Tab
Shows key statistics:
- Total Users
- Total Rooms
- Total Bookings
- Pending Bookings
- Total Revenue

### 2. Users Tab
- View all users with their roles
- Promote users to admin status
- Delete users

### 3. Rooms Tab
- Add new rooms with:
  - Room number
  - Room type (single, double, suite, deluxe)
  - Capacity
  - Price
  - Amenities
- View all rooms
- Delete rooms
- Check room status (available, occupied, maintenance)

### 4. Bookings Tab
- View all bookings
- Update booking status
- Track payment status
- View booking details

---

## Security Considerations

1. **JWT Tokens** - All admin routes require valid JWT token
2. **Role-Based Access** - Only users with `isAdmin: true` and `role: 'admin'` can access admin routes
3. **Token Expiration** - Tokens expire after 24 hours
4. **Password Hashing** - Passwords are hashed using bcryptjs

---

## User Roles

Users have the following role structure:

```javascript
{
  role: 'user' | 'admin',
  isAdmin: boolean
}
```

---

## Creating Additional Admins

To make an existing user an admin:

1. Log in with an admin account
2. Go to Users tab
3. Click "Make Admin" button for the desired user

Or use the API:
```bash
POST /api/admin/users/{userId}/make-admin
Authorization: Bearer {token}
```

---

## Troubleshooting

### Admin Login Not Working
- Verify admin user was created with `node scripts/createAdmin.js`
- Check MongoDB connection is working
- Ensure JWT_SECRET is set in .env

### Dashboard Not Loading
- Check that authentication token is valid
- Verify backend is running on port 5000
- Check browser console for CORS errors

### Can't Add Rooms
- Ensure you have admin privileges
- Verify all required fields are filled
- Check MongoDB connection

---

## Future Enhancements

Potential features to add:
- Advanced analytics and reporting
- Email notifications for bookings
- Room availability calendar
- Multi-language support
- Payment history and reports
- Admin activity logs
- Two-factor authentication
- Custom admin roles and permissions

---

## Support

For issues or questions, check:
1. Backend console logs
2. Browser developer console (F12)
3. MongoDB connection status
4. API response errors

