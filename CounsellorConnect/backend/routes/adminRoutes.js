const express = require('express');
const router = express.Router();
const { getDepartmentDetails } = require('../controllers/adminController');

// Route to fetch department details
router.get('/api/admin/dashboard', getDepartmentDetails);

module.exports = router;
