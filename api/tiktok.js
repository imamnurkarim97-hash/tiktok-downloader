// File: api/tiktok.js
import axios from "axios";

export default async function handler(req, res) {
  // ===== CORS =====
  res.setHeader("Access-Control-Allow-Origin", "*"); // izinkan semua origin
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // ===== AMBIL URL TIKTOK =====
  const { url } = req.query;
  if (!url) {
    res.status(400).json({ code: 1, msg: "URL kosong" });
    return;
  }

  try {
    // PANGGIL API TikTok / TikWM
    // Bisa diganti sesuai API TikTok yang kamu pakai
    const response = await axios.get(
      `https://api.tikwm.com/?url=${encodeURIComponent(url)}`
    );

    if (!response.data || !response.data.data) {
      throw new Error("Tidak ada data video dari API");
    }

    // KIRIM DATA KE FRONTEND
    res.status(200).json({
      code: 0,
      data: response.data.data, // pastikan struktur sama dengan yang di frontend
    });
  } catch (err) {
    console.error("Error ambil video:", err.message);
    res.status(500).json({
      code: 1,
      msg: "Gagal ambil video",
      error: err.message,
    });
  }
}
