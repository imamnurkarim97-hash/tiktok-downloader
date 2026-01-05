const axios = require("axios");

module.exports = async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("URL kosong");

  try {
    const r = await axios.get(
      "https://api.tikwm.com/?url=" + encodeURIComponent(url)
    );

    const video =
      r.data?.data?.hdplay ||
      r.data?.data?.play;

    if (!video) {
      return res.status(500).send("Video tidak ditemukan");
    }

    // ⬇️ INI KUNCI AUTO DOWNLOAD (REDIRECT SERVER)
    res.redirect(video);

  } catch (e) {
    res.status(500).send("Gagal download");
  }
};
