const express = require("express");
const router = express.Router();
const validateStudent = require("../middleware/validateStudent");
const { registerStudent } = require("../controllers/studentReg");
const {loginStudent} = require("../controllers/studentlogin");

router.post("/student/register", validateStudent, registerStudent);
router.post("/student/login",loginStudent);

module.exports = router;
