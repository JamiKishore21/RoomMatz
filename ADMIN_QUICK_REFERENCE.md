# Admin System - Quick Reference

## Quick Start

```bash
# 1. Create admin user
cd backend
node scripts/createAdmin.js

# 2. Start backend
npm run dev

# 3. Start frontend (new terminal)
cd ../frontend
npm run dev

# 4. Access admin panel
http://localhost:5173/admin-login
```

## Default Login
- **Email:** admin@hotel.com
- **Password:** admin123

## Navigation

| Page | URL | Purpose |
|------|-----|---------|
| Admin Login | `/admin-login` | Admin authentication |
| Admin Dashboard | `/admin-dashboard` | Main admin panel |

## Dashboard Tabs

### 1. Dashboard
- Total Users count
- Total Rooms count
- Total Bookings count
- Pending Bookings count
- Total Revenue from paid bookings

### 2. Users
- List all users
- View user role (user/admin)
- Promote user to admin
- Delete user accounts

### 3. Rooms
**Add Room Form:**
- Room Number (required)
- Room Type: single, double, suite, deluxe
- Capacity: number of guests
- Price: per night
- Amenities: comma-separated list

**Room List:**
- View all rooms
- Check room status (available/occupied/maintenance)
- Delete rooms

### 4. Bookings
- View all bookings with guest details
- Update booking status:
  - pending → confirmed → checked-in → checked-out
  - Or mark as cancelled
- View payment status (unpaid/paid/refunded)
- See total booking price
- Delete bookings

## API Endpoints Summary

### Admin Auth
```
POST   /api/admin/login
```

### Dashboard
```
GET    /api/admin/dashboard
```

### Users Management
```
GET    /api/admin/users
GET    /api/admin/users/:id
DELETE /api/admin/users/:id
POST   /api/admin/users/:id/make-admin
POST   /api/admin/users/:id/remove-admin
```

### Rooms Management
```
GET    /api/admin/rooms
POST   /api/admin/rooms
PUT    /api/admin/rooms/:id
DELETE /api/admin/rooms/:id
```

### Bookings Management
```
GET    /api/admin/bookings
PUT    /api/admin/bookings/:id/status
DELETE /api/admin/bookings/:id
```

## Authentication

All requests to admin routes require:
```
Authorization: Bearer {token}
```

Token is automatically:
- Generated on login
- Stored in localStorage
- Sent with each admin request
- Expires after 24 hours

## User Roles

- **user:** Regular guest, can browse and book
- **admin:** Full access to admin dashboard

## Room Types

- **single:** 1 guest
- **double:** 2 guests
- **suite:** Multiple rooms, 4+ guests
- **deluxe:** Premium rooms, 2-4 guests

## Booking Statuses

- **pending:** Initial state when booked
- **confirmed:** Admin confirmed the booking
- **checked-in:** Guest has arrived
- **checked-out:** Guest has left
- **cancelled:** Booking was cancelled

## Payment Statuses

- **unpaid:** Guest hasn't paid yet
- **paid:** Payment received
- **refunded:** Money returned to guest

## Models Overview

### User
```
{
  name, email, password,
  isAdmin, role,
  resetCode, resetCodeExpiry,
  createdAt
}
```

### Admin
```
{
  userId, adminLevel,
  permissions, lastLogin, status,
  createdAt, updatedAt
}
```

### Room
```
{
  roomNumber, roomType, capacity, price,
  status, amenities, description, images,
  createdAt, updatedAt
}
```

### Booking
```
{
  userId, roomId,
  checkInDate, checkOutDate, totalPrice,
  guestName, guestEmail, guestPhone,
  numberOfGuests, specialRequests,
  status, paymentStatus,
  createdAt, updatedAt
}
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Login fails | Run `node scripts/createAdmin.js` |
| Dashboard won't load | Check MongoDB connection |
| Can't add rooms | Verify all fields filled & token valid |
| CORS errors | Ensure backend running on port 5000 |
| Token expired | Logout and login again (24h expiry) |

## Environment Variables

```
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
PORT=5000
```

## File Locations

### Backend
- Models: `backend/models/`
- Routes: `backend/routes/adminRoutes.js`
- Middleware: `backend/middleware/authMiddleware.js`
- Scripts: `backend/scripts/createAdmin.js`

### Frontend
- Pages: `frontend/pages/AdminLogin.jsx`
- Pages: `frontend/pages/AdminDashboard.jsx`
- Router: `frontend/src/App.jsx`

## Key Technologies

- **Backend:** Express.js, MongoDB, Mongoose
- **Frontend:** React, Tailwind CSS, Axios
- **Auth:** JWT, Bcryptjs
- **Database:** MongoDB

