import axios from "axios";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL kosong" });

  try {
    const response = await axios.get(`https://api.tikwm.com/?url=${encodeURIComponent(url)}`);
    const data = response.data;

    if (data.code !== 0) return res.status(500).json({ error: "Gagal ambil video" });

    res.status(200).json({
      play: data.data.play,
      hdplay: data.data.hdplay || data.data.play,
      music: data.data.music
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
