const axios = require("axios");

module.exports = async (req, res) => {
  const { url } = req.query;
  if (!url) return res.json({ code: 1, msg: "URL kosong" });

  try {
    const response = await axios.get(`https://api.tikwm.com/?url=${encodeURIComponent(url)}`);
    res.json({ code: 0, data: response.data });
  } catch (err) {
    res.json({ code: 1, msg: "Gagal ambil video", err: err.message });
  }
};
