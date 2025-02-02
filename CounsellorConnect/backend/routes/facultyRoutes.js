const express = require("express");
const router = express.Router();
const {loginFaculty} = require("../controllers/facultyLogin");
const {facultyProfile, getCounseleesActivityPoints, getCounseleesAcademicPerformance, getStudents, scheduleMeeting} = require("../controllers/facultyController");
const isAuthenticated = require("../middleware/isAuthenticated");

router.post("/faculty/login",loginFaculty);
router.route("/faculty/profile").get(isAuthenticated(["faculty"]), facultyProfile);
router.route("/faculty/counselees").get(isAuthenticated(["faculty"]), getCounseleesActivityPoints);
router.route("/faculty/counselees/academics").get(isAuthenticated(["faculty"]), getCounseleesAcademicPerformance);
router.route("/faculty/students").get(isAuthenticated(["faculty"]), getStudents);
router.route("/faculty/schedule-meeting").post(isAuthenticated(["faculty"]), scheduleMeeting);

module.exports = router;
