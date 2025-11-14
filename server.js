import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { reviewCode } from "./ai.services.js";  // <-- IMPORTANT

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Allowed frontend URLs
const allowedOrigins = [
  "https://code-review-frontend.pages.dev",
  "https://02dcdf4a.code-review-frontend.pages.dev",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked for origin: " + origin));
      }
    },
  })
);

app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("✅ Backend is live and working!");
});

// ⭐ AI CODE REVIEW ROUTE ⭐
app.post("/ai/get-review", async (req, res) => {
  try {
    const { code } = req.body;

    if (!code)
      return res.status(400).json({ error: "No code provided" });

    // 🔥 REAL AI REVIEW CALL
    const review = await reviewCode(code);

    res.json({ review });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
