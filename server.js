// server.js
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// TikTok Downloader Endpoint
app.get("/api/tiktok", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "URL TikTok harus diisi" });

  try {
    // Backend kamu sendiri (link baru dari repo)
    const backendURL = `https://tiktok-downloader-57nb.vercel.app/api/tiktok?url=${encodeURIComponent(url)}`;

    // Request ke backend
    const response = await axios.get(backendURL, { timeout: 15000 });

    // Kirim response ke frontend
    res.json(response.data);
  } catch (err) {
    console.error("Error fetch TikTok:", err.message);
    res.status(500).json({ error: "Gagal ambil video", detail: err.message });
  }
});

// Gunakan port Vercel, fallback 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
