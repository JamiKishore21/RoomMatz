# RoomMatz - Hotel Room Booking System
Live URL : https://roommatz.vercel.app

A modern, full-stack hotel room booking platform with admin dashboard, user authentication, and real-time notifications.

## ✨ Features

- **User Authentication**: Secure login/register with email verification
- **Room Browsing**: Browse available hotel rooms with detailed information
- **Booking System**: Easy-to-use booking and reservation management
- **Payment Integration**: Secure bill payment processing
- **User Profile**: Manage bookings, personal information, and preferences
- **Admin Dashboard**: Complete admin panel for room management, bookings, and user administration
- **Real-time Notifications**: Live updates for bookings and payments
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS and shadcn components
- **Forgot/Reset Password**: Secure password recovery flow

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js + Express** - Server framework
- **MongoDB** - Database
- **JWT** - Authentication
- **Nodemailer** - Email services
- **Socket.io** - Real-time notifications

## 📋 Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Git

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/JamiKishore21/roommatz.git
cd roommatz
```

2. Backend Setup
```bash
cd backend
npm install
```

## Create .env file:
```bash
NODE_ENV=production
PORT=10000
MONGO_URI=your_mongodb_uri
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=http://localhost:3000
BACKEND_URL=http://localhost:10000
JWT_SECRET=your_jwt_secret
```
Start backend:
```bash
npm start / npm run dev
```
Set up frontend
```bash
cd ../frontend
npm install
```
create .env production
```bash
VITE_API_URL=http://localhost:10000
VITE_SOCKET_URL=http://localhost:10000
VITE_ENV=development
```
Start frontend:
```bash
npm run dev
```

Visit: http://localhost:5173

📁 Project Structure

```bash
roommatz/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── scripts/
│   ├── server.js
│   └── package.json
└── README.md
```
🔑 Key Pages
``` bash
Page	Route	Description
Home	/	Landing page
Login	/login	User authentication
Register	/register	New user signup
Vacancy	/vacancy	Available rooms
Bill Payment	/billpayment	Payment processing
User Profile	/profile	User bookings & info
Admin Login	/admin-login	Admin authentication
Admin Dashboard	/admin-dashboard	Admin panel
```

👥 Contact & Support
Email: jamikishore120303@gmail.com
Issues: GitHub Issues




