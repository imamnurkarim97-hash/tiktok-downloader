import axios from "axios";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // biar frontend bisa fetch
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL kosong" });

  try {
    const response = await axios.get(
      `https://api.tikwm.com/?url=${encodeURIComponent(url)}`
    );

    const data = response.data;

    if (!data || data.code !== 0 || !data.data) {
      return res.status(500).json({ error: "Gagal ambil video dari API TikTok" });
    }

    res.status(200).json({
      play: data.data.play || null,
      hdplay: data.data.hdplay || data.data.play || null,
      music: data.data.music || null
    });

  } catch (err) {
    console.error("Error TikTok API:", err.message);
    res.status(500).json({ error: "Error server: " + err.message });
  }
}
