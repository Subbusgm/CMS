const express = require('express');
const router = express.Router();
const counselorController = require('../controllers/chatbotcontrollers/counsellorcontroller');

// Route for handling counselor-related queries
router.post('/chatbot', counselorController.getCounselorInfo);

module.exports = router;
