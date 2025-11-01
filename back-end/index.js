import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import logoRoutes from "./routes/logoRoutes.js";
import sliderRoutes from "./routes/sliderRoutes.js";
import allBannerRoutes from "./routes/allBannerRoutes.js";
import cricketBannerRoutes from "./routes/cricketBannerRoutes.js";
import soccerBannerRoutes from "./routes/soccerBannerRoutes.js";
import tennisBannerRoutes from "./routes/tennisBannerRoutes.js";
import loginImageRoutes from "./routes/loginImageRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import navbarRoutes from "./routes/navbarRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import countRoutes from "./routes/countRoutes.js";
import webMenuRoutes from "./routes/webMenuRoutes.js";
import subCategoryRoutes from "./routes/subCategoryRoutes.js"; // New route
import depositRoutes from "./routes/depositRoutes.js"; // New route
import depositMethodRoutes from "./routes/depositMethodRoutes.js"; // New route
import depositRequestRoutes from "./routes/depositRequestRoutes.js"; // New route
import withdrawRoutes from "./routes/withdrawRoutes.js"; // New route
import gamesRequestRoutes from "./routes/gamesRequestRoutes.js"; // New route
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

// __dirname সেটআপ
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsConfig = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5173",
    "http://localhost:5174",
    `https://${process.env.SITE_URL}`,
    `http://${process.env.SITE_URL}`,
    `http://www.${process.env.SITE_URL}`,
    `www.${process.env.SITE_URL}`,
    `${process.env.SITE_URL}`,
    `https://dstplay.net`,
    `http://dstplay.net`,
    `http://www.dstplay.net`,
    `www.dstplay.net`,
    `gamebaji71.com`,
    `https://dstplay.net`,
    `http://dstplay.net`,
    `http://www.dstplay.net`,
    `www.dstplay.net`,
    `gamebaji71.com`,
    `https://gamebaji71.com`,
    `http://gamebaji71.com`,
    `http://www.gamebaji71.com`,
    `www.gamebaji71.com`,
    `trickboy.xyz`,
    `https://trickboy.xyz`,
    `http://trickboy.xyz`,
    `http://www.trickboy.xyz`,
    `www.melbet99.com`,
    `https://melbet99.com`,
    `http://melbet99.com`,
    `http://melbet99.com`,
    `www.melbet99.com`,
    `www.lclb.net`,
    `https://lclb.net`,
    `http://lclb.net`,
    `http://lclb.net`,
    `www.jstlive.net`,
    `https://jstlive.net`,
    `http://jstlive.net`,
    `http://jstlive.net`,
    `www.jstlive.net`,
    `www.babu666.live`,
    `https://babu666.live`,
    `http://babu666.live`,
    `http://babu666.live`,
    `www.babu666.live`,
    `www.babu666.live`,
    `https://babu666.live`,
    `http://babu666.live`,
    `http://babu666.live`,
    `www.babu666.live`,
    `www.malta99.com`,
    `https://malta99.com`,
    `http://malta99.com`,
    `http://www.malta99.com`,
    `www.gamebaji71.com`,
    `https://gamebaji71.com`,
    `http://gamebaji71.com`,
    `http://www.gamebaji71.com`,

    `www.baji444.online`,
    `https://baji444.online`,
    `http://baji444.online`,
    `http://www.baji444.online`,
    `www.gamebaji71.com`,
    `https://gamebaji71.com`,
    `http://gamebaji71.com`,
    `http://www.gamebaji71.com`,

    `www.baji444.online`,
    `https://baji444.online`,
    `http://baji444.online`,
    `http://www.baji444.online`,

    `www.bajibos.com`,
    `https://bajibos.com`,
    `http://bajibos.com`,
    `http://www.bajibos.com`,
    `www.enjoy365.online`,
    `https://enjoy365.online`,
    `http://enjoy365.online`,
    `http://www.enjoy365.online`,
    `www.ag.enjoy365.online`,
    `https://ag.enjoy365.online`,
    `http://ag.enjoy365.online`,
    `http://www.ag.enjoy365.online`,
    "*",
  ],
  credential: true,
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
};

// Middlewares
app.use(cors(corsConfig));
app.options("", cors(corsConfig));

// মিডলওয়্যার
// app.use(cors());
app.use(express.json());

// uploads ফোল্ডার স্ট্যাটিক সার্ভ করা (for other routes if needed)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB কানেকশন
connectDB();

// রুটস
app.use("/api/admins", adminRoutes);
app.use("/api/logo", logoRoutes);
app.use("/api/sliders", sliderRoutes);
app.use("/api/banners", allBannerRoutes);
app.use("/api/cricket-banners", cricketBannerRoutes);
app.use("/api/soccer-banners", soccerBannerRoutes);
app.use("/api/tennis-banners", tennisBannerRoutes);
app.use("/api", loginImageRoutes);
app.use("/api", settingsRoutes);
app.use("/api", noticeRoutes);
app.use("/api", navbarRoutes);
app.use("/api", bannerRoutes);
app.use("/api", countRoutes);
app.use("/api", webMenuRoutes);
app.use("/api", subCategoryRoutes); // Add subcategory routes
app.use("/api", depositRoutes); // নতুন যোগ
app.use("/api", depositMethodRoutes); // নতুন যোগ
app.use("/api", depositRequestRoutes); // নতুন যোগ
app.use("/api", withdrawRoutes); // API রুট মাউন্ট
app.use("/games", gamesRequestRoutes); // নতুন যোগ

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT} v2.0`));

app.get("/", (req, res) => {
  res.status(200).send("Server is running v2.0");
});
