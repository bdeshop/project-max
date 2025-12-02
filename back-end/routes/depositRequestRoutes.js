import express from "express";
import DepositRequest from "../models/DepositRequest.js";
import Admin from "../models/Admin.js"; // Changed from User to Admin

const router = express.Router();

// POST: Create a deposit request
router.post("/deposit/request", async (req, res) => {
  try {
    const newRequest = new DepositRequest(req.body);
    await newRequest.save();
    res.status(201).json({ message: "পেন্ডিং রিকোয়েস্ট তৈরি সফল" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "রিকোয়েস্ট তৈরি ব্যর্থ", error: error.message });
  }
});

// GET: Fetch pending deposit requests
router.get("/deposit/requests/pending", async (req, res) => {
  try {
    const requests = await DepositRequest.find({ status: "pending" }).populate({
      path: "userId",
      select: "username firstName lastName email", // Include desired fields
    });
    res.status(200).json(requests);
  } catch (error) {
    res
      .status(500)
      .json({ message: "পেন্ডিং রিকোয়েস্ট লোড ব্যর্থ", error: error.message });
  }
});
-
// PUT: Approve a deposit request
router.put("/deposit/request/:id/approve", async (req, res) => {
  try {
    // ডিপোজিট রিকোয়েস্ট খোঁজা
    const request = await DepositRequest.findById(req.params.id);
    if (!request)
      return res.status(404).json({ message: "রিকোয়েস্ট পাওয়া যায়নি" });

    // রিকোয়েস্ট স্ট্যাটাস আপডেট
    request.status = "approved";
    await request.save();

    // ইউজারের ব্যালেন্স আপডেট (ইউজার আসলে Admin কালেকশন থেকে নিচ্ছো)
    const user = await Admin.findById(request.userId);
    if (!user) return res.status(404).json({ message: "ইউজার পাওয়া যায়নি" });

    // ✅ মেইন অ্যাডমিন খোঁজা (যার ব্যালেন্স থেকে টাকা কাটা হবে)
    const mainAdmin = await Admin.findOne({ role: "MA" }); // অথবা তোমার নির্দিষ্ট admin ID দিতে পারো
    if (!mainAdmin)
      return res.status(404).json({ message: "অ্যাডমিন পাওয়া যায়নি" });

    // অ্যাডমিনের ব্যালেন্স চেক
    if (mainAdmin.balance < request.totalPBU) {
      return res
        .status(400)
        .json({ message: "অ্যাডমিনের ব্যালেন্স অপর্যাপ্ত!" });
    }

    // ✅ ইউজারের ব্যালেন্সে টাকা যোগ করা
    user.balance += request.totalPBU;
    await user.save();

    // ✅ অ্যাডমিনের ব্যালেন্স থেকে টাকা বিয়োগ করা
    mainAdmin.balance -= request.totalPBU;
    await mainAdmin.save();

    res
      .status(200)
      .json({
        message:
          "অ্যাপ্রুভ সফল! ইউজারের ব্যালেন্সে PBU যোগ হয়েছে এবং অ্যাডমিনের ব্যালেন্স থেকে কাটা হয়েছে।",
      });
  } catch (error) {
    res.status(500).json({ message: "অ্যাপ্রুভ ব্যর্থ", error: error.message });
  }
});

// PUT: Cancel a deposit request
router.put("/deposit/request/:id/cancel", async (req, res) => {
  try {
    const request = await DepositRequest.findById(req.params.id);
    if (!request)
      return res.status(404).json({ message: "রিকোয়েস্ট পাওয়া যায়নি" });
    request.status = "cancelled";
    await request.save();
    res.status(200).json({ message: "ক্যানসেল সফল" });
  } catch (error) {
    res.status(500).json({ message: "ক্যানসেল ব্যর্থ", error: error.message });
  }
});

// GET: User deposit history
router.get("/deposit/history/user/:userId", async (req, res) => {
  try {
    const history = await DepositRequest.find({ userId: req.params.userId })
      .populate("userId", "username firstName lastName")
      .sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    res
      .status(500)
      .json({ message: "হিস্ট্রি লোড ব্যর্থ", error: error.message });
  }
});

// ✅ সব ডিপোজিট হিস্ট্রি (pending বাদে)
router.get("/deposit/history", async (req, res) => {
  console.log("this is reposit calling ");

  try {
    const history = await DepositRequest.find({ status: { $ne: "pending" } })
      .populate("userId")
      .sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    res
      .status(500)
      .json({ message: "হিস্ট্রি লোড ব্যর্থ", error: error.message });
    console.log(res.status);
  }
});

export default router;
