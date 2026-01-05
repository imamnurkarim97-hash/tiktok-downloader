export default async function handler(req, res) {
  // IZINKAN SEMUA ORIGIN
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");

  if (req.method === "OPTIONS") return res.status(200).end();

  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL kosong" });

  try {
    const response = await fetch(`https://api.tikwm.com/?url=${encodeURIComponent(url)}`);
    const data = await response.json();

    res.status(200).json({
      play: data.data.play,
      hdplay: data.data.hdplay || data.data.play,
      music: data.data.music
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
