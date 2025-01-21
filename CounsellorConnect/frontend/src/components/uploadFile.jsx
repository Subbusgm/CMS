import React, { useState } from 'react';
import axios from 'axios';
import './UploadFiles.css'

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [usn, setUsn] = useState('');
  const [courseCode, setCourseCode] = useState('');

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle USN change
  const handleUsnChange = (event) => {
    setUsn(event.target.value);
  };

  const handleCourseCodeChange = (event) => {
    setCourseCode(event.target.value);
  };

  // Handle file upload
  const handleFileUpload = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setUploadStatus("Please select a file to upload.");
      return;
    }

    if (!usn) {
      setUploadStatus("Please enter a USN.");
      return;
    }

    if (!courseCode) {
      setUploadStatus("Please enter a CourseCode.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("usn", usn);
    formData.append('courseCode', courseCode); // Append USN to the form data

    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setUploadStatus(`File uploaded successfully. File URL: ${response.data.fileUrl}`);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("File upload failed. Please try again.");
    }
  };

  return (
    <div className="file-upload-container">
      <h1 className="file-upload-header">Upload File</h1>
      <form className="file-upload-form" onSubmit={handleFileUpload}>
        <input 
          type="file" 
          className="file-input" 
          onChange={handleFileChange} 
        />
        <input 
          type="text" 
          className="text-input"
          placeholder="Enter USN" 
          value={usn} 
          onChange={handleUsnChange} 
        />
        <input 
          type="text" 
          className="text-input"
          placeholder="Enter CourseCode" 
          value={courseCode} 
          onChange={handleCourseCodeChange} 
        />
        <button type="submit" className="submit-button">Upload</button>
      </form>
      {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
    </div>
  );
};

export default FileUpload;
