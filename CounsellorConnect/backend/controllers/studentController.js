const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const db = require('../config/db');

const studentLogout=(req,res)=>{
  try{
      return res.status(200).cookie("token","",{maxAge:0}).json({
          message:"Logged Out Successfully.",
          success:true
      })
  }catch (error){
      console.log(error);
      return res.status(500).json({
          success:false,
          message:"Failed to logout"
      })
  }
}

const studentProfile = async (req, res) => {  

  try {
    // Query to fetch student details along with the assigned faculty's name
    const token = req.cookies.token||""

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usn = decoded.userId

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
  // const { usn } = req.params;

  const token = req.cookies.token||""

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const usn = decoded.userId

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

const getStudentActivity = async(req, res) => {

  const token = req.cookies.token||""

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const usn = decoded.userId

  const query = `
    SELECT 
      e.event_id,
      a.event_category,
      a.event_name,
      a.number_of_points
    FROM 
      activity_points a
    JOIN 
      earned_by e ON e.event_id = a.event_id
    WHERE 
      e.student_usn = ?;
  `;

  console.log(usn);

  try {
    console.log("Fetching activity for USN:", usn);
    const [results] = await db.promise().execute(query, [usn]);
    // console.log(results);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Failed to fetch course data.' });
  }
}

const getStudentMeetings = async(req, res) => {
  const token = req.cookies.token||""

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const usn = decoded.userId

  const query = `
    SELECT m.meeting_id, f.first_name AS faculty_name, m.date, m.time, m.duration
    FROM meeting m
    JOIN faculty f ON m.faculty_id = f.faculty_id
    WHERE m.student_usn = ? AND m.date >= CURDATE() AND m.status = 'PENDING'
    ORDER BY m.date ASC;
  `;

  try {
    console.log("Fetching meetings for USN:", usn);
    const [results] = await db.promise().execute(query, [usn]);
    // console.log(results);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching meetings:', error);
    res.status(500).json({ error: 'Failed to fetch meetings' });
  }
};

const respondMeeting = async(req, res) => {
  console.log("respond meeting called");
  
  const token = req.cookies.token||""

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const usn = decoded.userId

  const { meetingId, status, reason } = req.body;
  const query = `
    UPDATE meeting
    SET status = ?, response_reason = ?
    WHERE meeting_id = ?
  `;

  try {
    await db.promise().execute(query, [status, status === 'declined' ? reason : '', meetingId]);
    res.status(200).json({ message: 'Meeting response updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating meeting status' });
  }

  // db.promise().execute(query, [status, status === 'declined' ? reason : '', meetingId], (err, result) => {
  //   if (err) {
  //     console.error(err);
  //     return res.status(500).json({ message: 'Error updating meeting status' });
  //   }

  //   res.json({ message: 'Meeting response updated successfully' });
  // });
};

module.exports = {
  studentLogout,
  studentProfile,
  getStudentCourses,
  getStudentActivity,
  getStudentMeetings,
  respondMeeting
};

