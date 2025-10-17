import express from "express";
import Admin from "../models/Admin.js";
import Transaction from "../models/Transaction.js" // Import Transaction model
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



// 🔐 Mother Admin LOGIN API
router.post("/ad-login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await Admin.findOne({ username: userName });
    if (!user) return res.status(404).json({ message: "User not found!" });

    if (user.password !== password)
      return res.status(401).json({ message: "Invalid credentials!" });

    if (user.role !== "MA")
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

// 🔐 Sub Admin LOGIN API
router.post("/as-login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await Admin.findOne({ username: userName });
    if (!user) return res.status(404).json({ message: "User not found!" });

    if (user.password !== password)
      return res.status(401).json({ message: "Invalid credentials!" });

    if (user.role !== "SA")
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

// Master Login
router.post("/mt-login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await Admin.findOne({ username: userName });
    if (!user) return res.status(404).json({ message: "User not found!" });

    if (user.password !== password)
      return res.status(401).json({ message: "Invalid credentials!" });

    if (user.role !== "MT")
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

// Agent Login
router.post("/ag-login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await Admin.findOne({ username: userName });
    if (!user) return res.status(404).json({ message: "User not found!" });

    if (user.password !== password)
      return res.status(401).json({ message: "Invalid credentials!" });

    if (user.role !== "AG")
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


// Sub Agent Login
router.post("/sg-login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    const user = await Admin.findOne({ username: userName });
    if (!user) return res.status(404).json({ message: "User not found!" });

    if (user.password !== password)
      return res.status(401).json({ message: "Invalid credentials!" });

    if (user.role !== "SG")
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


// Get single admin by ID
router.get("/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// Transaction API - DEPOSIT/WITHDRAW with history logging
router.post("/transaction", async (req, res) => {
  try {
    const { fromAdminId, toAdminIds, amount, type } = req.body;

    // Validation
    if (!fromAdminId || !toAdminIds || !Array.isArray(toAdminIds) || !amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid transaction data" });
    }

    const fromAdmin = await Admin.findById(fromAdminId);
    if (!fromAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const toAdmins = await Admin.find({ _id: { $in: toAdminIds } });
    if (toAdmins.length !== toAdminIds.length) {
      return res.status(404).json({ message: "One or more target admins not found" });
    }

    // Get IP address
    const ipAddress = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || "-";

    // Process transaction based on type
    let fromAdminBalance = fromAdmin.balance;
    const updatedToAdminBalances = {};

    if (type === "D") {
      // Deposit: Transfer from logged-in admin to selected admins
      const totalAmount = amount * toAdminIds.length;
      if (fromAdmin.balance < totalAmount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }
      fromAdminBalance -= totalAmount;
      
      // Update from admin balance
      fromAdmin.balance = fromAdminBalance;
      await fromAdmin.save();

      // Update to admins and create transactions
      for (let i = 0; i < toAdmins.length; i++) {
        const toAdmin = toAdmins[i];
        const newToAdminBalance = (toAdmin.balance || 0) + amount;
        updatedToAdminBalances[toAdmin._id] = newToAdminBalance;
        
        // Update to admin balance
        toAdmin.balance = newToAdminBalance;
        await toAdmin.save();

        // Create transaction log for from admin (depositDownline)
        await Transaction.create({
          fromAdminId: fromAdmin._id,
          fromAdminName: fromAdmin.username,
          toAdminId: toAdmin._id,
          toAdminName: toAdmin.username,
          amount: amount,
          type: type,
          transactionType: "depositDownline",
          balance: newToAdminBalance,
          remark: "Fund Transfer",
          fromTo: `${fromAdmin.username} ➜ ${toAdmin.username}`,
          ipAddress: ipAddress,
          performedBy: fromAdmin._id,
          performedByName: fromAdmin.username,
        });

        // Create transaction log for to admin (depositUpline)
        await Transaction.create({
          fromAdminId: toAdmin._id,
          fromAdminName: toAdmin.username,
          toAdminId: fromAdmin._id,
          toAdminName: fromAdmin.username,
          amount: amount,
          type: type,
          transactionType: "depositUpline",
          balance: fromAdminBalance,
          remark: "Fund Transfer",
          fromTo: `Upline ➜ ${toAdmin.username}`,
          ipAddress: ipAddress,
          performedBy: fromAdmin._id,
          performedByName: fromAdmin.username,
        });
      }
    } else if (type === "W") {
      // Withdraw: Transfer from selected admins to logged-in admin
      for (let i = 0; i < toAdmins.length; i++) {
        const toAdmin = toAdmins[i];
        if ((toAdmin.balance || 0) < amount) {
          return res.status(400).json({ message: `Insufficient balance in ${toAdmin.username}` });
        }
        updatedToAdminBalances[toAdmin._id] = (toAdmin.balance || 0) - amount;
      }
      
      // Update from admin balance (add total withdrawn amount)
      fromAdminBalance += amount * toAdminIds.length;
      fromAdmin.balance = fromAdminBalance;
      await fromAdmin.save();

      // Update to admins and create transactions
      for (let i = 0; i < toAdmins.length; i++) {
        const toAdmin = toAdmins[i];
        const newToAdminBalance = updatedToAdminBalances[toAdmin._id];
        
        // Update to admin balance
        toAdmin.balance = newToAdminBalance;
        await toAdmin.save();

        // Create transaction log for to admin (withdrawDownline)
        await Transaction.create({
          fromAdminId: toAdmin._id,
          fromAdminName: toAdmin.username,
          toAdminId: fromAdmin._id,
          toAdminName: fromAdmin.username,
          amount: amount,
          type: type,
          transactionType: "withdrawDownline",
          balance: newToAdminBalance,
          remark: "Fund Transfer",
          fromTo: `${toAdmin.username} ➜ ${fromAdmin.username}`,
          ipAddress: ipAddress,
          performedBy: fromAdmin._id,
          performedByName: fromAdmin.username,
        });

        // Create transaction log for from admin (withdrawUpline)
        await Transaction.create({
          fromAdminId: fromAdmin._id,
          fromAdminName: fromAdmin.username,
          toAdminId: toAdmin._id,
          toAdminName: toAdmin.username,
          amount: amount,
          type: type,
          transactionType: "withdrawUpline",
          balance: fromAdminBalance,
          remark: "Fund Transfer",
          fromTo: `Upline ➜ ${toAdmin.username}`,
          ipAddress: ipAddress,
          performedBy: fromAdmin._id,
          performedByName: fromAdmin.username,
        });
      }
    }

    res.json({
      message: `Successfully ${type === "D" ? "deposited" : "withdrawn"} ${amount} to ${toAdminIds.length} admin(s)`,
      fromAdminBalance: fromAdminBalance,
      toAdminBalances: updatedToAdminBalances,
    });
  } catch (error) {
    console.error("Transaction error:", error);
    res.status(500).json({ message: "Transaction failed" });
  }
});

// Get transaction history for AccountStatement
router.get("/transaction-history/:adminId", async (req, res) => {
  try {
    const { adminId } = req.params;
    const { page = 1, limit = 10, fromDate, toDate } = req.query;
    
    // Build query
    let query = { 
      $or: [
        { fromAdminId: adminId },
        { toAdminId: adminId }
      ]
    };

    // Date filtering
    if (fromDate || toDate) {
      const dateFilter = {};
      if (fromDate) dateFilter.$gte = new Date(fromDate);
      if (toDate) dateFilter.$lte = new Date(toDate);
      query.datetime = dateFilter;
    }

    // Pagination
    const skip = (page - 1) * limit;
    const total = await Transaction.countDocuments(query);

    const transactions = await Transaction.find(query)
      .sort({ datetime: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("fromAdminId toAdminId performedBy");

    // Transform data for frontend
    const transformedData = transactions.map(transaction => ({
      datetime: transaction.datetime.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      depositUpline: transaction.transactionType === "depositUpline" ? 
        `${transaction.amount.toFixed(2)}` : "-",
      depositDownline: transaction.transactionType === "depositDownline" ? 
        `${transaction.amount.toFixed(2)}` : "-",
      withdrawUpline: transaction.transactionType === "withdrawUpline" ? 
        `${transaction.amount.toFixed(2)}` : "-",
      withdrawDownline: transaction.transactionType === "withdrawDownline" ? 
        `${transaction.amount.toFixed(2)}` : "-",
      balance: transaction.balance.toFixed(2),
      remark: transaction.remark,
      fromto: transaction.fromTo,
      ip: transaction.ipAddress,
    }));

    // Compute overall totals using aggregation
    const totalsAggregation = await Transaction.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalDepositUpline: {
            $sum: {
              $cond: [{ $eq: ["$transactionType", "depositUpline"] }, "$amount", 0],
            },
          },
          totalDepositDownline: {
            $sum: {
              $cond: [{ $eq: ["$transactionType", "depositDownline"] }, "$amount", 0],
            },
          },
          totalWithdrawUpline: {
            $sum: {
              $cond: [{ $eq: ["$transactionType", "withdrawUpline"] }, "$amount", 0],
            },
          },
          totalWithdrawDownline: {
            $sum: {
              $cond: [{ $eq: ["$transactionType", "withdrawDownline"] }, "$amount", 0],
            },
          },
        },
      },
    ]);

    const totals = totalsAggregation[0] || {
      totalDepositUpline: 0,
      totalDepositDownline: 0,
      totalWithdrawUpline: 0,
      totalWithdrawDownline: 0,
    };

    res.json({
      data: transformedData,
      totalCount: total,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totals: {
        totalDepositUpline: totals.totalDepositUpline.toFixed(2),
        totalDepositDownline: totals.totalDepositDownline.toFixed(2),
        totalWithdrawUpline: totals.totalWithdrawUpline.toFixed(2),
        totalWithdrawDownline: totals.totalWithdrawDownline.toFixed(2),
      },
    });
  } catch (error) {
    console.error("Transaction history error:", error);
    res.status(500).json({ message: "Failed to fetch transaction history" });
  }
});

// Change Password Route
router.post("/change-password", async (req, res) => {
  try {
    const { adminId, currentPassword, newPassword } = req.body;

    // Find admin by ID
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Verify current password (plain text comparison - not secure)
    if (currentPassword !== admin.password) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Validate new password (basic validation)
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters" });
    }

    // Update password
    admin.password = newPassword;
    await admin.save();

    res.status(200).json({ message: "Password changed successfully. Please login again." });
  } catch (error) {
    console.error("Password change error:", error);
    res.status(500).json({ message: "Server error while changing password" });
  }
});

export default router;
