import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetCode: { type: String, default: null },
  resetCodeExpiry: { type: Date, default: null },
  isAdmin: { type: Boolean, default: false },
  role: { type: String, enum: ['user', 'admin', 'student', 'staff', 'manager'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
export default User;