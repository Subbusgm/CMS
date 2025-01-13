const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const db = require('../config/db');

const studentProfile = async (req, res) => {
  const { usn } = req.params;

  try {
    // Query to fetch student details along with the assigned faculty's name
    const [rows] = await db.promise().query(
      `
      SELECT 
        s.usn, s.first_name, s.last_name, s.branch, s.number_of_backlogs, 
        s.cgpa, s.email_id, s.phone_number, 
        f.first_name AS faculty_first_name, f.last_name AS faculty_last_name 
      FROM 
        student s
      LEFT JOIN 
        faculty f ON s.faculty_id = f.faculty_id
      WHERE 
        s.usn = ?
      `,
      [usn]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Respond with the student's details
    const student = rows[0];
    res.json({
      usn: student.usn,
      first_name: student.first_name,
      last_name: student.last_name,
      branch: student.branch,
      number_of_backlogs: student.number_of_backlogs,
      cgpa: student.cgpa,
      email_id: student.email_id,
      phone_number: student.phone_number,
      counselor_name: `${student.faculty_first_name} ${student.faculty_last_name}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

const getStudentCourses = async(req, res) => {
  const { usn } = req.params;

  const query = `
    SELECT 
      c.course_code, 
      c.course_name, 
      a.percentage AS attendance, 
      a.final_cie_marks
    FROM 
      attended_by a
    JOIN 
      course c ON a.course_code = c.course_code
    WHERE 
      a.student_usn = ?;
  `;

  console.log(usn);

  try {
    console.log("Fetching courses for USN:", usn);
    const [results] = await db.promise().execute(query, [usn]);
    // console.log(results);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Failed to fetch course data.' });
  }
}

module.exports = {
  studentProfile,
  getStudentCourses,
};

