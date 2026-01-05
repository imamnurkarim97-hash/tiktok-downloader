// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint TikTok Downloader
app.get('/api/tiktok', async (req, res) => {
    const url = req.query.url;
    if (!url) {
        return res.status(400).json({ error: 'URL TikTok harus diisi' });
    }

    try {
        // Ganti dengan API TikTok downloader yang kamu pakai
        // Contoh menggunakan layanan downloader99
        const backendURL = `https://downloader99.vercel.app/api/tiktok?url=${encodeURIComponent(url)}`;
        const response = await axios.get(backendURL, { timeout: 10000 });

        if (!response.data || !response.data.data) {
            return res.status(500).json({ error: 'Gagal ambil data video' });
        }

        const data = response.data.data;

        res.json({
            video: {
                play: data.play,
                hdplay: data.hdplay
            },
            music: data.music
        });

    } catch (err) {
        console.error('Error fetch TikTok:', err.message);
        res.status(500).json({ error: 'Gagal ambil video', detail: err.message });
    }
});

// Gunakan port Vercel, fallback 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
