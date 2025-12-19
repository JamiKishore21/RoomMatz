import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js"; 
import Room from "../models/Room.js";
import Booking from "../models/Booking.js";
import nodemailer from "nodemailer"

const router = express.Router();

let verificationCodes = {};

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // Use 587 for TLS if needed
  secure: true, // true for 465 (SSL), false for 587 (TLS)
  auth: {
      user: "subhashtalluri68@gmail.com",
      pass: "zjug ghbj esci edbq"
  }
});



// ✅ Register User
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    console.log("[FORGOT PASSWORD] Request received:", req.body);
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
  
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({ message: "Email credentials are missing" });
    }
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found" });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    verificationCodes[email] = code;
    console.log("[FORGOT PASSWORD] Generated code:", code);

    const mailOptions = {
      from: `"RoomMatz" <${process.env.EMAIL_USER}>`,

      to: email,
      subject: "Password Reset Code",
      text: `Your verification code is: ${code}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("[FORGOT PASSWORD] Email Error:", error);
        return res.status(500).json({ message: "Error sending email", error: error.message });
      }
      console.log("[FORGOT PASSWORD] Email sent:", info.response);
      res.json({ message: "Verification code sent" });
    });
  } catch (error) {
    console.error("[FORGOT PASSWORD] Error:", error);
    res.status(500).json({ error: error.message });
  }
});


router.post("/verify-code", async (req, res) => {
  try {
    console.log("[VERIFY CODE] Request received:", req.body);
    const { email, code } = req.body;

    if (!email || !code) {
      console.log("[VERIFY CODE] Missing email or code");
      return res.status(400).json({ message: "Email and code are required" });
    }

    console.log("[VERIFY CODE] Checking stored code for:", email);
    if (verificationCodes[email] && verificationCodes[email] === code) {
      console.log("[VERIFY CODE] Code verified successfully for:", email);
      delete verificationCodes[email]; // Remove the code after successful verification
      return res.json({ message: "Code verified. Proceed to reset password." });
    } else {
      console.log("[VERIFY CODE] Invalid or expired code for:", email);
      return res.status(400).json({ message: "Invalid or expired code" });
    }
  } catch (error) {
    console.error("[VERIFY CODE] Error:", error);
    res.status(500).json({ error: error.message });
  }
});


router.post("/reset-password", async (req, res) => {
  try {
    console.log("[RESET PASSWORD] Request received:", req.body);
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      console.log("[RESET PASSWORD] Missing email or new password");
      return res.status(400).json({ message: "Email and new password are required" });
    }

    console.log("[RESET PASSWORD] Checking user:", email);
    const user = await User.findOne({ email: email.trim().toLowerCase() });

    if (!user) {
      console.log("[RESET PASSWORD] User not found:", email);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("[RESET PASSWORD] Hashing new password...");
    const hashedPassword = await bcrypt.hash(newPassword.trim(), 10);

    user.password = hashedPassword;
    await user.save();

    console.log("[RESET PASSWORD] Password reset successfully for:", email);
    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("[RESET PASSWORD] Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get All Rooms (Public - Available for all users)
router.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    console.error("Get Rooms Error:", error.message);
    res.status(500).json({ message: "Error fetching rooms" });
  }
});

// ✅ Get Room By ID
router.get("/rooms/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
  } catch (error) {
    console.error("Get Room Error:", error.message);
    res.status(500).json({ message: "Error fetching room" });
  }
});

// ✅ Get User Profile by Email
router.get("/profile/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Get Profile Error:", error.message);
    res.status(500).json({ message: "Error fetching user profile" });
  }
});

// ✅ Get User's Bookings by Email
router.get("/bookings/:email", async (req, res) => {
  try {
    console.log("[BOOKINGS] Fetching bookings for email:", req.params.email);
    
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      console.log("[BOOKINGS] User not found for email:", req.params.email);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("[BOOKINGS] Found user:", user._id, "Name:", user.name, "Email:", user.email);

    const bookings = await Booking.find({ userId: user._id })
      .populate('roomId', 'roomNumber roomType price capacity amenities')
      .sort({ createdAt: -1 });
    
    console.log("[BOOKINGS] Found bookings count:", bookings.length);
    console.log("[BOOKINGS] Bookings data:", JSON.stringify(bookings, null, 2));
    
    res.json(bookings);
  } catch (error) {
    console.error("[BOOKINGS ERROR]:", error.message, error.stack);
    res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
});

// ✅ DEBUG: Get all bookings in database
router.get("/debug/all-bookings", async (req, res) => {
  try {
    const allBookings = await Booking.find({})
      .populate('userId', 'email name')
      .populate('roomId', 'roomNumber roomType');
    
    console.log("[DEBUG] Total bookings in DB:", allBookings.length);
    res.json({ 
      totalBookings: allBookings.length, 
      bookings: allBookings 
    });
  } catch (error) {
    console.error("[DEBUG ERROR]:", error.message);
    res.status(500).json({ error: error.message });
  }
});

export default router;
