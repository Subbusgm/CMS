// routes/fileRoutes.js
const express = require('express');
const { upload, uploadFile } = require('../controllers/filecontroller'); // Import upload middleware and controller

const router = express.Router();

// File upload route
router.post('/upload', upload.single('file'), uploadFile);  // Use multer's upload middleware and your uploadFile controller

module.exports = router;
