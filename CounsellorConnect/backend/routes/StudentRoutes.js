const express = require("express");
const router = express.Router();
const { registerStudent } = require("../controllers/studentReg");
const {loginStudent} = require("../controllers/studentLogin");
const { getStudentCourses, studentProfile, getStudentActivity } = require("../controllers/studentController");

router.post("/student/register", registerStudent);
router.post("/student/login",loginStudent);
router.route("/student/:usn").get(studentProfile);
router.route("/student/:usn/courses").get(getStudentCourses);
router.route("/student/:usn/events").get(getStudentActivity);


module.exports = router;
