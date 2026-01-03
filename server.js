// server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint TikTok Downloader
app.get("/tiktok", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).json({ error: "Masukkan URL TikTok" });

  try {
    // Memanggil API pihak ketiga yang bisa ambil video HD tanpa watermark
    const apiURL = "https://tikwm.com/api/?url=" + encodeURIComponent(url);
    const response = await axios.get(apiURL);
    const data = response.data;

    if (data.code !== 0) {
      return res.status(500).json({ error: "Gagal mengambil video TikTok" });
    }

    // Format data untuk frontend
    const videoData = {
      play: data.data.play,           // SD/HD biasa
      hdplay: data.data.hdplay || data.data.play, // HD tanpa watermark
      music: data.data.music          // Audio MP3
    };

    res.json(videoData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
