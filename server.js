const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); 

const app = express();
const PORT = 3000;

// Ensure the upload directory exists
const uploadPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Set storage location & file name
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = req.params.destination || ''; // category param
    const uploadPath = path.join(__dirname, 'uploads', dest);

    // Ensure directory exists
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({ storage });

// Serve your static front-end
app.use(express.static(path.join(__dirname, 'public')));

// Handle uploads with category/destination
app.post('/upload/:destination', upload.array('images'), (req, res) => {
  console.log(`Files uploaded to category "${req.params.destination}":`, req.files);
  res.send(`Images saved successfully in ${req.params.destination}!`);
});

// Serve uploaded images
app.use('/uploads', express.static(uploadPath)); // serve files in /uploads

app.get('/api/images/:destination', (req, res) => {
  const dest = req.params.destination || ''; // category param
  const uploadPath = path.join(__dirname, 'uploads', dest);
  fs.readdir(uploadPath, (err, files) => {
    if (err) return res.status(500).json({ error: 'Error reading uploads' });
    res.json(files); // ["file1.jpg","file2.png",...]
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
