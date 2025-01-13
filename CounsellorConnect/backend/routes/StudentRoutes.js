const express = require("express");
const router = express.Router();
const validateStudent = require("../middleware/validateStudent");
const { registerStudent } = require("../controllers/studentReg");
const {loginStudent} = require("../controllers/studentLogin");
const { getStudentCourses, studentProfile } = require("../controllers/studentController");

router.post("/student/register", validateStudent, registerStudent);
router.post("/student/login",loginStudent);
router.route("/student/:usn/courses").get(getStudentCourses);
router.route("/student/:usn").get(studentProfile);


module.exports = router;
