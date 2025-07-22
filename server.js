const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

const GALLERY_FILE = './gallery.json';
let gallery = [];

if (fs.existsSync(GALLERY_FILE)) {
  gallery = JSON.parse(fs.readFileSync(GALLERY_FILE));
} else {
  fs.writeFileSync(GALLERY_FILE, JSON.stringify(gallery));
}

app.get('/gallery', (req, res) => {
  res.json(gallery);
});

app.post('/upload-url', (req, res) => {
  const { url } = req.body;
  if (url && !gallery.includes(url)) {
    gallery.unshift(url);
    fs.writeFileSync(GALLERY_FILE, JSON.stringify(gallery, null, 2));
  }
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Serveur actif sur http://localhost:${PORT}`);
});
