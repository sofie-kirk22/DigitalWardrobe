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
  destination: path.join(__dirname, 'uploads'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Serve your static front-end
app.use(express.static(path.join(__dirname, 'public')));

// Handle uploads
app.post('/upload', upload.array('images'), (req, res) => {
  console.log('Files uploaded:', req.files);
  res.send('Images saved successfully!');
});

// Serve uploaded images
app.use('/uploads', express.static(uploadPath)); // serve files in /uploads

app.get('/api/images', (req, res) => {
  fs.readdir(uploadPath, (err, files) => {
    if (err) return res.status(500).json({ error: 'Error reading uploads' });
    res.json(files); // ["file1.jpg","file2.png",...]
  });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
