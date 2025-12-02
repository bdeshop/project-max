import express from "express";

import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import SubOption from "../models/gameNavMenu.model.js";
import Game from "../models/game.model.js"; // Game মডেল ইমপোর্ট
import { default as axios } from "axios";
import { log } from "console";
import querystring from "querystring";
import Admin from "../models/Admin.js";
const router = express.Router();

// __dirname setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// POST: Add new submenu
router.post("/add-submenu", upload.single("image"), async (req, res) => {
  try {
    const { menuName, providerId } = req.body;

    console.log("this is menu ", menuName);
    console.log("this is provider ", providerId);

    const image = req.file ? req.file.filename : null;

    if (!menuName || !providerId || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newSubMenu = new SubOption({
      menuName,
      providerId,
      image,
    });

    await newSubMenu.save();
    res
      .status(201)
      .json({ message: "Submenu added successfully", submenu: newSubMenu });
  } catch (error) {
    console.error("Error adding submenu:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET: Get all submenus
router.get("/get-submenus", async (req, res) => {
  try {
    const submenus = await SubOption.find();
    res
      .status(200)
      .json({ message: "Submenus fetched successfully", submenus });
  } catch (error) {
    console.error("Error fetching submenus:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET: Get submenu by ID
router.get("/get-submenu/:id", async (req, res) => {
  try {
    const submenu = await SubOption.findById(req.params.id);
    if (!submenu) {
      return res.status(404).json({ message: "Submenu not found" });
    }
    res.status(200).json({ message: "Submenu fetched successfully", submenu });
  } catch (error) {
    console.error("Error fetching submenu:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT: Update submenu
router.put("/update-submenu/:id", upload.single("image"), async (req, res) => {
  try {
    const { menuName, providerId } = req.body;
    const updateData = {
      menuName,
      providerId,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedSubmenu = await SubOption.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedSubmenu) {
      return res.status(404).json({ message: "Submenu not found" });
    }

    res.status(200).json({
      message: "Submenu updated successfully",
      submenu: updatedSubmenu,
    });
  } catch (error) {
    console.error("Error updating submenu:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE: Delete submenu
router.delete("/delete-submenu/:id", async (req, res) => {
  try {
    const deletedSubmenu = await SubOption.findByIdAndDelete(req.params.id);
    if (!deletedSubmenu) {
      return res.status(404).json({ message: "Submenu not found" });
    }
    res.status(200).json({ message: "Submenu deleted successfully" });
  } catch (error) {
    console.error("Error deleting submenu:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Games Routes

// POST: Add new game
router.post("/add-game", upload.single("image"), async (req, res) => {
  try {
    const {
      game_uuid,
      providerName,
      gameName,
      gameApiImage,
      subMenuId,
      isHomeShow,
    } = req.body;
    const image = req.file ? req.file.filename : null;

    if (
      !game_uuid ||
      !providerName ||
      !gameName ||
      !gameApiImage ||
      !subMenuId
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newGame = new Game({
      game_uuid,
      image: image || gameApiImage,
      providerName,
      gameName,
      gameApiImage,
      subMenuId,
      isHomeShow: isHomeShow === "true",
    });

    await newGame.save();
    res.status(201).json({ message: "Game added successfully", game: newGame });
  } catch (error) {
    console.error("Error adding game:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET: Get all games with pagination
router.get("/get-games", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const subMenuId = req.query.subMenuId;

    const query = subMenuId ? { subMenuId } : {};

    const total = await Game.countDocuments(query);
    const games = await Game.find(query)
      .populate("subMenuId")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Games fetched successfully",
      games,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalGames: total,
    });
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT: Update game
router.put("/update-game/:id", upload.single("image"), async (req, res) => {
  try {
    const { isHomeShow } = req.body;
    const updateData = {
      isHomeShow: isHomeShow === "true",
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updatedGame = await Game.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedGame) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.status(200).json({
      message: "Game updated successfully",
      game: updatedGame,
    });
  } catch (error) {
    console.error("Error updating game:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE: Delete game
router.delete("/delete-game/:id", async (req, res) => {
  try {
    const deletedGame = await Game.findByIdAndDelete(req.params.id);
    if (!deletedGame) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.status(200).json({ message: "Game deleted successfully" });
  } catch (error) {
    console.error("Error deleting game:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

// GET: Find games by frontend category (menuName) -> returns merged API data with local overrides
router.get("/by-category", async (req, res) => {
  try {
    const category = req.query.category;

    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "category query required" });
    }

    // find suboptions matching the menuName (case-insensitive)
    const subs = await SubOption.find({
      menuName: new RegExp(`^${category}$`, "i"),
    });
    const subIds = subs.map((s) => s._id);

    if (subIds.length === 0) {
      return res.status(200).json({ success: true, count: 0, data: [] });
    }

    // find saved games that belong to these submenus and are flagged for home (or all saved games?)
    // The requirement said: "and also isHomeShow is true then ok" -> filter isHomeShow true
    const dbGames = await Game.find({
      subMenuId: { $in: subIds },
      isHomeShow: true,
    });

    if (!dbGames || dbGames.length === 0) {
      return res.status(200).json({ success: true, count: 0, data: [] });
    }

    const uuids = dbGames.map((g) => g.game_uuid);

    console.log("this is uuids ", uuids);

    // call external API to get full game details by uuids
    const oracleKey =
      process.env.ORACLE_API_KEY ||
      "300cc0adfcfb041c25c4a8234e3c0e312a44c7570677d64bdb983412f045da67";
    const extRes = await axios.post(
      "https://apigames.oracleapi.net/api/games/by-ids",
      { ids: uuids },
      {
        headers: {
          "x-api-key": oracleKey,
          "Content-Type": "application/json",
        },
      }
    );

    const externalData =
      extRes.data && extRes.data.data ? extRes.data.data : [];

    // merge external data with local DB overrides (use DB image if uploaded, and include isHomeShow/local id)
    const merged = externalData.map((item) => {
      const local = dbGames.find((d) => d.game_uuid === item._id);

      if (local) {
        // normalize local image path so frontend can concatenate base URL safely
        // let imagePath = local.image;
        // if (
        //   imagePath &&
        //   !imagePath.startsWith("http") &&
        //   !imagePath.includes("/")
        // ) {
        //   imagePath = local.image; // filename only -> prefix uploads/
        // }

        return {
          ...item,
          image: `uploads/${local.image}`,
          isHomeShow: local.isHomeShow,
          _localId: local._id,
        };
      }
      return item;
    });

    return res
      .status(200)
      .json({ success: true, count: merged.length, data: merged });
  } catch (error) {
    console.error("Error in /by-category:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// POST: Call back game
router.post("/call-back-game", async (req, res) => {
  try {
    // Extract required fields from request body
    let {
      member_account,
      bet_amount,
      win_amount,
      game_uid,
      serial_number,
      currency_code,
    } = req.body;

    console.log(
      "this is inside the function -> ",
      member_account,
      bet_amount,
      win_amount,
      game_uid,
      serial_number,
      currency_code
    );

    // Validate required fields
    if (!member_account || !game_uid || !serial_number || !currency_code) {
      return res.send({
        success: false,
        message: "All data are not provided.",
      });
    }

    // Ensure currency_code is BDT as per requirement
    if (currency_code !== "BDT") {
      return res.send({
        success: false,
        message: "Currency code must be BDT.",
      });
    }

    // Trim member_account to maximum 45 characters
    if (member_account) {
      member_account = member_account.substring(0, 45);
    }

    // Extract original username by removing last 2 characters
    const originalEmail = member_account.substring(
      0,
      member_account.length - 2
    );

    // Find the user by username
    const matcheduser = await Admin.findOne({
      username: originalEmail,
    });
    if (!matcheduser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    // Prepare the game history record
    const gameRecord = {
      username: member_account,
      bet_amount: parseFloat(bet_amount) || 0,
      win_amount: parseFloat(win_amount) || 0,
      gameID: game_uid,
      serial_number: serial_number,
      currency: currency_code || "BDT",
      status: win_amount > 0 ? "won" : "lost",
      playedAt: new Date(),
    };

    const BDT_PER_PUB = 100;

    // Convert BDT values to PUB
    const betInPUB = (parseFloat(bet_amount) || 0) / BDT_PER_PUB;
    const winInPUB = (parseFloat(win_amount) || 0) / BDT_PER_PUB;

    // Calculate new balance (all in PUB)
    const newBalance =
      (parseFloat(matcheduser.balance) || 0) - betInPUB + winInPUB;

    //     // Calculate new balance
    //     const newBalance =
    //       (matcheduser.balance || 0) -
    //       (parseFloat(bet_amount) || 0) +
    //       (parseFloat(win_amount) || 0);

    // Update user balance and push game record to gameHistory
    const updatedUser = await Admin.findByIdAndUpdate(
      matcheduser._id,
      {
        $set: { balance: newBalance },
        $push: { gameHistory: gameRecord },
      },
      { new: true } // Return the updated document
    );

    // Log the update result for debugging
    // console.log("this is update result -> ", updateResult);

    // Check if update was successful
    if (!updatedUser) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to update user data." });
    }

    // Ensure gameHistory exists and has the new record
    if (!updatedUser.gameHistory || !updatedUser.gameHistory.length) {
      return res
        .status(500)
        .json({ success: false, message: "Game history not updated." });
    }

    // Send success response
    res.json({
      success: true,
      data: {
        username: originalEmail,
        balance: updatedUser.balance,
        win_amount,
        bet_amount,
        game_uid,
        serial_number,
        gameRecordId:
          updatedUser.gameHistory[updatedUser.gameHistory.length - 1]._id,
      },
    });
  } catch (error) {
    console.error("Error in callback-data:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// POST: Play game - forward request to external provider and return response
router.post("/play-game", async (req, res) => {
  try {
    const { username, money, gameID } = req.body;

    console.log("play-game request body:", req.body);

    // build post data (example from your other project)
    const postData = {
      home_url: "https://enjoy365.online",
      token: process.env.DSTPLAY_TOKEN || "daa181337f9fb25b5122ef9df114446d",
      username: (username || "guest") + "45",
      money: money || 0,
      gameid: gameID,
    };

    // send POST as x-www-form-urlencoded
    const response = await axios.post(
      "https://dstplay.net/getgameurl",
      querystring.stringify(postData),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "x-dstgame-key": postData.token,
        },
      }
    );

    console.log("Response from dstplay.net:", response.status, response.data);

    return res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error(
      "Error in /play-game:",
      error?.response?.data || error.message
    );
    return res.status(500).json({
      success: false,
      message: "Failed to call play provider",
      details: error.message,
    });
  }
});
