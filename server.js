const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors());

app.get("/tiktok", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL kosong" });

  try {
    // Panggil API pihak ketiga
    const response = await axios.get(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`);
    const data = response.data;
    if (data.code !== 0) return res.status(500).json({ error: "Gagal ambil video" });

    // Kirim balik video HD & HD tanpa watermark
    res.json({ data: { play: data.data.play, hdplay: data.data.hdplay, music: data.data.music } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
