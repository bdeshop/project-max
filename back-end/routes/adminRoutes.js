import express from "express";
import Admin from "../models/Admin.js";

const router = express.Router();

// Create admin
router.post("/", async (req, res) => {
  try {
    // expect req.body to possibly include createdBy (creator's _id)
    const payload = req.body;

    // Ensure required fields are present (simple validation)
    if (!payload.username || !payload.password || !payload.firstName) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const newAdmin = new Admin(payload);
    await newAdmin.save();
    res.status(201).json({ success: true, message: "Admin added successfully!", admin: newAdmin });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Failed to add admin", error: error.message });
  }
});


// Get all admins
router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find().sort({ createdAt: -1 });
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch admins" });
  }
});


// Get admins created by a specific admin
router.get("/created/:creatorId", async (req, res) => {
  try {
    const { creatorId } = req.params;
    const subs = await Admin.find({ createdBy: creatorId }).sort({ createdAt: -1 });
    res.status(200).json(subs);
  } catch (error) {
    console.error("Fetch created admins error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch created admins" });
  }
});



// 🔐 LOGIN API
router.post("/ad-login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await Admin.findOne({ username: userName });
    if (!user) return res.status(404).json({ message: "User not found!" });

    if (user.password !== password)
      return res.status(401).json({ message: "Invalid credentials!" });

    if (user.role !== "AD")
      return res.status(401).json({ message: "Not authorized!" });

    user.updatedAt = new Date();
    await user.save();

    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.error("🔥 Login Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


export default router;
