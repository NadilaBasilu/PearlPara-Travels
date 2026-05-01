const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const { auth, admin } = require('../middleware/auth');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename:    (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
    cb(null, unique + path.extname(file.originalname).toLowerCase());
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|gif/;
  const ext  = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);
  if (ext && mime) cb(null, true);
  else cb(new Error('Only image files are allowed (jpg, png, webp, gif)'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

// Helper — wraps multer so its errors are caught and returned as JSON
const uploadSingle = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: `Upload error: ${err.message}` });
    }
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

const uploadMultiple = (req, res, next) => {
  upload.array('images', 5)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: `Upload error: ${err.message}` });
    }
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

// POST /api/upload/single
router.post('/single', auth, admin, uploadSingle, (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const base = process.env.SERVER_URL || 'http://localhost:5000';
  res.json({
    url:      `${base}/uploads/${req.file.filename}`,
    filename: req.file.filename,
  });
});

// POST /api/upload/multiple
router.post('/multiple', auth, admin, uploadMultiple, (req, res) => {
  if (!req.files?.length) return res.status(400).json({ message: 'No files uploaded' });
  const base = process.env.SERVER_URL || 'http://localhost:5000';
  res.json({
    urls: req.files.map(f => ({
      url:      `${base}/uploads/${f.filename}`,
      filename: f.filename,
    })),
  });
});

// DELETE /api/upload/:filename
router.delete('/:filename', auth, admin, (req, res) => {
  // Sanitize filename to prevent path traversal attacks
  const filename = path.basename(req.params.filename);
  if (!filename || filename === '.' || filename === '..') {
    return res.status(400).json({ message: 'Invalid filename' });
  }
  const filePath = path.join(uploadDir, filename);
  // Ensure the resolved path is inside uploadDir
  if (!filePath.startsWith(uploadDir)) {
    return res.status(400).json({ message: 'Invalid filename' });
  }
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.json({ message: 'File deleted' });
  } else {
    res.status(404).json({ message: 'File not found' });
  }
});

module.exports = router;
