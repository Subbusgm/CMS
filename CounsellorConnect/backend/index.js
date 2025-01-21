const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');  // Import cors here
const studentRoutes = require('./routes/StudentRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const adminRoutes = require('./routes/adminRoutes');
const fileRoutes = require('./routes/fileRoutes');
const chatbotRoutes = require('./routes/chatbotroutes');

dotenv.config();

const app = express();  // Initialize app after dotenv config

app.use(cors());  // Use CORS after initializing app
app.use(express.json());  // Middleware to parse JSON bodies

// Use the student routes
app.use('/api', studentRoutes,facultyRoutes,adminRoutes,fileRoutes,chatbotRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
