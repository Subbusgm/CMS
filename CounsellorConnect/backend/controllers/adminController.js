const db = require('../config/db');

// Function to fetch department details
exports.getDepartmentDetails = async (req, res) => {
  try {
    const [results] = await db.promise().query(`
      SELECT 
        f.department AS department,
        COUNT(DISTINCT f.faculty_id) AS faculty_count,
        COUNT(DISTINCT s.usn) AS student_count
      FROM faculty f
      LEFT JOIN student s ON f.department = s.branch
      GROUP BY f.department
    `);
    
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching department details." });
  }
};
