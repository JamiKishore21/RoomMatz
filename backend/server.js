import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server as SocketServer } from "socket.io";
import cookieParser from "cookie-parser";

import paymentRoutes, { setIO as setPaymentIO } from "./routes/paymentRoutes.js";
import adminRoutes, { setIO as setAdminIO } from "./routes/adminRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();
const app = express();
const httpServer = createServer(app);

// Determine frontend URL based on environment
const getFrontendURL = () => {
  const env = process.env.NODE_ENV || 'development';
  if (env === 'production') {
    return process.env.FRONTEND_URL || 'https://your-production-domain.com';
  }
  // For development, accept any localhost port
  return [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5176',
    'http://localhost:5177',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'http://127.0.0.1:5175',
    'http://127.0.0.1:5176',
    'http://127.0.0.1:5177',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001'
  ];
};

const FRONTEND_URLS = getFrontendURL();

const io = new SocketServer(httpServer, {
  cors: {
    origin: FRONTEND_URLS,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Set Socket.io instance for routes
setPaymentIO(io);
setAdminIO(io);

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('join-admin', (adminId) => {
    socket.join(`admin-${adminId}`);
    console.log(`Admin ${adminId} joined`);
  });

  socket.on('join-user', (userId) => {
    socket.join(`user-${userId}`);
    console.log(`User ${userId} joined`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Middleware - CORS configuration
app.use(cors({
  origin: FRONTEND_URLS,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.get("/", (req, res) => { res.send("Hello World"); });
app.use(express.json());
app.use(cookieParser());


// Routes
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
