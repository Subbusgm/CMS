const { Storage } = require('@google-cloud/storage');
const multer = require('multer');
const db = require("../config/db");
const dotenv = require('dotenv');
dotenv.config();


// Initialize Google Cloud Storage with the credentials
const storage = new Storage({
  keyFilename: process.env.GCLOUD_KEY_FILE, // Path to your service account key file
  projectId: process.env.GCLOUD_PROJECT_ID,
});

const bucket = storage.bucket(process.env.GCLOUD_BUCKET_NAME);

// Multer configuration for storing files temporarily
const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

// Function to upload a file to Google Cloud Storage
const uploadFileToGCS = async (file) => {
  const uniqueFilename = `${Date.now()}-${file.originalname}`; // Unique file name
  const blob = bucket.file(uniqueFilename);
  const blobStream = blob.createWriteStream();

  return new Promise((resolve, reject) => {
    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${process.env.GCLOUD_BUCKET_NAME}/${uniqueFilename}`;
      resolve(publicUrl);
    });

    blobStream.on('error', (error) => {
      reject(`Error uploading file: ${error.message}`);
    });

    blobStream.end(file.buffer);
  });
};

// Controller function for handling file upload requests
const uploadFile = async (req, res) => {
  const file = req.file;
  const usn = req.body.usn;
  const courseCode = req.body.courseCode;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }
  if (!usn) {
    return res.status(400).send("No usn uploaded.");
  }

  try {
    const fileUrl = await uploadFileToGCS(file); // Get the file URL
    const insertQuery = 'UPDATE attended_by SET permission_doc_link = ?, permission = 0 WHERE course_code = ? AND student_usn = ?';
    const insertValues = [fileUrl, courseCode, usn];
    
    await db.promise().query(insertQuery,insertValues);
    res.status(200).send({
      message: 'File uploaded successfully',
      fileUrl, // Respond with the file URL
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send(`File upload failed. Error: ${error}`);
  }
};

// Export upload middleware and controller
module.exports = {
  upload,
  uploadFile,
};
