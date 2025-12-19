import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  adminLevel: { type: String, enum: ['super_admin', 'admin'], default: 'admin' },
  permissions: { type: [String], default: ['view_dashboard', 'manage_users'] },
  lastLogin: { type: Date, default: null },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
