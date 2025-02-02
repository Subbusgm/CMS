const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const db = require('../config/db');

const facultyProfile = async (req, res) => {
    // const { facultyId } = req.params; // Get faculty ID from request parameters
    // console.log(facultyId);
    
  
    try {
      // Query to fetch faculty details
      const token = req.cookies.token||""
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const faculty_id = decoded.userId

      const [facultyDetails] = await db.promise().query(
        `
        SELECT 
          f.faculty_id, 
          f.first_name, 
          f.last_name, 
          f.department, 
          f.qualification, 
          f.email_id, 
          f.phone_number
        FROM 
          faculty f
        WHERE 
          f.faculty_id = ?
        `,
        [faculty_id]
      );
  
      if (facultyDetails.length === 0) {
        return res.status(404).json({ message: "Faculty not found" });
      }
  
      // Query to fetch courses handled by the faculty
      const [courses] = await db.promise().query(
        `
        SELECT 
          c.course_code, 
          c.course_name 
        FROM 
          handles h
        JOIN 
          course c ON h.course_code = c.course_code
        WHERE 
          h.faculty_id = ?
        `,
        [faculty_id]
      );
  
      // Combine results and respond
      const faculty = facultyDetails[0];
      res.json({
        faculty_id: faculty.faculty_id,
        name: `${faculty.first_name} ${faculty.last_name}`,
        department: faculty.department,
        qualification: faculty.qualification,
        email: faculty.email_id,
        phone_number: faculty.phone_number,
        courses: courses.map((course) => ({
          course_code: course.course_code,
          course_name: course.course_name,
        })),
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
  

  const getCounseleesActivityPoints = async (req, res) => {
    // const { facultyId } = req.params;
  
    try {
      const token = req.cookies.token||""
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const faculty_id = decoded.userId

      // SQL query to fetch counselee details and total activity points
      const [rows] = await db.promise().query(
        `
        SELECT 
          s.usn, 
          s.first_name, 
          s.last_name, 
          s.phone_number, 
          s.email_id, 
          COALESCE(SUM(ap.number_of_points), 0) AS total_activity_points
        FROM 
          student s
        LEFT JOIN 
          earned_by eb ON s.usn = eb.student_usn
        LEFT JOIN 
          activity_points ap ON eb.event_id = ap.event_id
        WHERE 
          s.faculty_id = ?
        GROUP BY 
          s.usn, s.first_name, s.last_name, s.phone_number, s.email_id
        `,
        [faculty_id]
      );
  
      if (rows.length === 0) {
        return res.status(404).json({ message: "No counselees found for this faculty." });
      }
  
      res.json(rows);
    } catch (err) {
      console.error("Error fetching counselees:", err);
      res.status(500).json({ message: "Server error" });
    }
  };

  const getCounseleesAcademicPerformance = async (req, res) => {
    
    try {
      const token = req.cookies.token||""
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const faculty_id = decoded.userId

      // SQL query to fetch counselee details and their academic performance
      const query = `
        SELECT 
          s.usn, 
          s.first_name, 
          s.last_name, 
          c.course_code, 
          c.course_name, 
          a.percentage AS attendance, 
          a.final_cie_marks
        FROM 
          student s
        JOIN 
          attended_by a ON s.usn = a.student_usn
        JOIN 
          course c ON a.course_code = c.course_code
        WHERE 
          s.faculty_id = ?
      `;
  
      const [results] = await db.promise().execute(query, [faculty_id]);
  
      if (results.length === 0) {
        return res.status(404).json({ message: "No counselee academic performance found for this faculty." });
      }
  
      res.json(results);
    } catch (err) {
      console.error("Error fetching counselee academic performance:", err);
      res.status(500).json({ message: "Server error" });
    }
  };
  
  
module.exports = { 
    facultyProfile,
    getCounseleesActivityPoints,
    getCounseleesAcademicPerformance
};
  