import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// ✅ Allowed frontend URL (change yahan karna ho to kar)
const allowedOrigins = [
  "https://code-review-frontend.pages.dev",
  "https://02dcdf4a.code-review-frontend.pages.dev",
  "http://localhost:5173"
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

// ✅ Base route to check if backend running
app.get("/", (req, res) => {
  res.send("✅ Backend is live and working!");
});

// ✅ Main route to get AI code review
app.post("/ai/get-review", async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: "No code provided" });

    // 👇 Your AI logic (for now, just dummy response)
    const review = Here's a quick review of your code:\n\n✅ Logic looks fine.\n⚙ You can improve by adding error handling.;

    res.json({ review });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
