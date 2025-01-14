const express = require("express");
const router = express.Router();
const {loginFaculty} = require("../controllers/facultyLogin");
const {facultyProfile, getCounseleesActivityPoints} = require("../controllers/facultyController");

router.post("/faculty/login",loginFaculty);
router.route("/faculty/:facultyId").get(facultyProfile);
router.route("/faculty/:facultyId/counselees").get(getCounseleesActivityPoints);

module.exports = router;
