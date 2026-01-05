// /api/tiktok.js
const axios = require("axios");

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: "URL TikTok kosong" });
  }

  try {
    const apiURL = "https://tikwm.com/api/?url=" + encodeURIComponent(url);
    const response = await axios.get(apiURL);
    const data = response.data;

    if (data.code !== 0 || !data.data) {
      return res.status(500).json({ error: "Gagal mengambil video TikTok" });
    }

    res.json({
      play: data.data.play,
      hdplay: data.data.hdplay || data.data.play,
      music: data.data.music
    });

  } catch (err) {
    res.status(500).json({
      error: "Server error",
      detail: err.message
    });
  }
};
