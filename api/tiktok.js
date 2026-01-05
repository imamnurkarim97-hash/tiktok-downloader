// /api/tiktok.js
import axios from "axios";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL TikTok diperlukan" });

  try {
    // PANGGIL API pihak ketiga untuk dapatkan link video
    const apiResp = await axios.get(`https://downloader99.vercel.app/api/tiktok?url=${encodeURIComponent(url)}`);
    const videoData = apiResp.data?.data || apiResp.data;

    if (!videoData?.play) {
      return res.status(500).json({ error: "Gagal ambil video" });
    }

    // STREAM VIDEO HD atau HD tanpa watermark
    const videoURL = videoData.hdplay || videoData.play;
    const videoResp = await axios.get(videoURL, {
      responseType: "stream",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://www.tiktok.com/"
      },
    });

    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Content-Disposition", `attachment; filename="tiktok.mp4"`);

    videoResp.data.pipe(res); // relay stream ke frontend
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Terjadi kesalahan saat download video" });
  }
}
