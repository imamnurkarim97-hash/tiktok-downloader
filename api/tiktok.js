// api/tiktok.js
import axios from "axios";

export default async function handler(req, res) {
  // ======= CORS =======
  res.setHeader("Access-Control-Allow-Origin", "*"); // bisa dipanggil dari domain mana saja
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  // ======= Ambil query =======
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL kosong" });

  try {
    // ======= Panggil API TikWM =======
    const apiResponse = await axios.get(
      `https://api.tikwm.com/?url=${encodeURIComponent(url)}`
    );

    const data = apiResponse.data;

    if (!data || data.code !== 0) {
      return res.status(500).json({ error: "Gagal ambil video TikTok" });
    }

    // ======= Format response untuk frontend =======
    const videoData = {
      play: data.data.play,           // SD/HD biasa
      hdplay: data.data.hdplay || data.data.play, // HD tanpa watermark
      music: data.data.music          // audio MP3
    };

    return res.status(200).json(videoData);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Server error", details: err.message });
  }
}
