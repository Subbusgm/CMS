const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

exports.loginFaculty = async (req, res) => {
  const { facultyid, password } = req.body;

  try {
    // Query the database for the student based on USN
    const [rows] = await db.promise().query("SELECT * FROM faculty WHERE faculty_id = ?", [facultyid]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = rows[0]; // Get the first user from the result

    // Verify the password with bcrypt
    // const isMatch = await bcrypt.compare(password, user.password);
    if (user.password != password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate the JWT token
    const token = jwt.sign({ facultyid: user.facultyid }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the response with the token
    res.status(200).json({ message: "Login successful", token, facultyid });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "Server error" });
  }
};
