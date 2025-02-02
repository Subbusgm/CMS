const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated.js");
const router = express.Router();
const { registerStudent } = require("../controllers/studentReg");
const {loginStudent} = require("../controllers/studentLogin");
const { getStudentCourses, studentProfile, getStudentActivity, studentLogout } = require("../controllers/studentController");

router.post("/student/register", registerStudent);
router.post("/student/login",loginStudent);
router.route("/student/logout").get(studentLogout);
router.route("/student/profile").get(isAuthenticated(["student"]), studentProfile);
router.route("/student/courses").get(isAuthenticated(["student"]), getStudentCourses);
router.route("/student/events").get(isAuthenticated(["student"]), getStudentActivity);


module.exports = router;
