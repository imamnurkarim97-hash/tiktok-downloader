// api/tiktok.js
const axios = require("axios");

module.exports = async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ code: 1, msg: "URL kosong" });
  }

  try {
    // Panggil API TikTok pihak ketiga
    const apiResponse = await axios.get(
      `https://tikwm.com/api/?url=${encodeURIComponent(url)}`
    );

    const data = apiResponse.data;

    if (data.code !== 0 || !data.data) {
      return res.status(500).json({ code: 1, msg: "Gagal ambil video TikTok" });
    }

    // Format data untuk frontend
    const videoData = {
      play: data.data.play,           // Video SD/HD
      hdplay: data.data.hdplay || data.data.play, // HD tanpa watermark
      music: data.data.music          // Audio MP3
    };

    res.status(200).json({ code: 0, data: videoData });
  } catch (err) {
    console.error("Tiktok API error:", err.message);
    res.status(500).json({ code: 1, msg: "Terjadi kesalahan server", error: err.message });
  }
};
