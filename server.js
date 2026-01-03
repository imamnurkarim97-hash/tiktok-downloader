import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/api/tiktok", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.json({ error: "URL kosong" });

  try {
    const r = await axios.get("https://tikwm.com/api/", {
      params: { url }
    });

    if (r.data.code !== 0) {
      return res.json({ error: "Gagal ambil video" });
    }

    res.json({
      play: r.data.data.play,
      hdplay: r.data.data.hdplay || r.data.data.play,
      music: r.data.data.music
    });

  } catch (e) {
    res.json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log("Backend aktif di port " + PORT);
});
