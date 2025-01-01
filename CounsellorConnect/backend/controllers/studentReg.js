const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../config/db"); // Import the database connection pool

// Register Student Endpoint
exports.registerStudent = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }

  try {
    const {
      usn,
      branch,
      firstName,
      lastName,
      number_of_backlogs,
      phoneNumber,
      cgpa,
      email,
      faculty_id,
      password,
    } = req.body;

    const [existingStudent] = await db.promise().query(
      "SELECT * FROM student WHERE usn = ?", 
      [usn]
    );

    if (existingStudent.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Student with this USN already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = `
      INSERT INTO student 
      (usn, branch, first_name, last_name, number_of_backlogs, phone_number, cgpa, email_id, faculty_id, password) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const insertValues = [
      usn,
      branch,
      firstName,
      lastName,
      number_of_backlogs || 0, // Default to 0 if not provided
      phoneNumber,
      cgpa || 0, // Default to 0 if not provided
      email,
      faculty_id || null, // Default to NULL if not provided
      hashedPassword,
    ];

    await db.promise().query(insertQuery, insertValues);

    res.status(201).json({
      success: true,
      message: "Student registered successfully!",
    });
  } catch (error) {
    console.error("Error registering student:", error);
    res.status(500).json({
      success: false,
      message: "An unexpected server error occurred. Please try again later.",
    });
  }
};
