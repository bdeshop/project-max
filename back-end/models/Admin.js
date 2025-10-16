// models/Admin.js
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    role: { type: String, default: "AD" },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },

    // financial fields...
    credit: { type: Number, default: 0 },
    balance: { type: Number, default: 0 },
    exposure: { type: Number, default: 0 },
    availBal: { type: Number, default: 0 },
    totalBal: { type: Number, default: 0 },
    playerBal: { type: Number, default: 0 },
    refPL: { type: Number, default: 0 },

    timeZone: { type: String, default: "Asia/Dhaka" },
    status: { type: String, default: "Active" },

    // NEW: who created this admin (nullable)
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Admin", adminSchema);
