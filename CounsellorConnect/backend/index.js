const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');  // Import cors here
const cookieParser = require("cookie-parser");
const studentRoutes = require('./routes/StudentRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const adminRoutes = require('./routes/adminRoutes');
const fileRoutes = require('./routes/fileRoutes');
const chatbotRoutes = require('./routes/chatbotroutes');

dotenv.config();

const app = express();  // Initialize app after dotenv config

// app.use(cors());  // Use CORS after initializing app
app.use(cors({
  origin: process.env.FRONTEND_URL, // Adjust if your frontend runs on a different port
  credentials: true,
}));
app.use(express.json());  // Middleware to parse JSON bodies
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Use the student routes
app.use('/api', studentRoutes,facultyRoutes,adminRoutes,fileRoutes,chatbotRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
