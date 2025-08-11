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

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
