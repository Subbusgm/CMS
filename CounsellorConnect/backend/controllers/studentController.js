const db = require('../config/db');

// Fetch student profile with attendance and event details
const getStudentProfile = async (req, res) => {
  const { usn } = req.params;

  try {
    // Query for attendance details
    const attendanceQuery = `
      SELECT 
        attendance.percentage AS attendance_percentage,
        course.course_code,
        course.course_name,
        course.handled_by,
        CONCAT(faculty.first_name, ' ', faculty.last_name) AS faculty_name
      FROM attendance
      JOIN course ON attendance.course_code = course.course_code
      JOIN faculty ON course.handled_by = faculty.email_id
      WHERE attendance.student_usn = ?;
    `;

    // Query for events participated by the student
    const eventsQuery = `
      SELECT 
        activity_points.event_id,
        activity_points.event_name,
        activity_points.points_awarded
      FROM student_event_participation
      JOIN activity_points ON student_event_participation.event_id = activity_points.event_id
      WHERE student_event_participation.student_usn = ?;
    `;

    // Execute queries in parallel
    const attendancePromise = new Promise((resolve, reject) => {
      db.query(attendanceQuery, [usn], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    const eventsPromise = new Promise((resolve, reject) => {
      db.query(eventsQuery, [usn], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });

    const [attendanceData, eventsData] = await Promise.all([attendancePromise, eventsPromise]);

    // Check if data is available
    if (!attendanceData.length && !eventsData.length) {
      return res.status(404).json({ message: 'No data found for the student' });
    }

    // Send response
    res.status(200).json({
      attendance: attendanceData,
      events: eventsData,
    });
  } catch (error) {
    console.error('Error fetching student profile:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getStudentProfile,
};
