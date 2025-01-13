const express = require("express");
const router = express.Router();
const {loginFaculty} = require("../controllers/facultyLogin");

router.post("/faculty/login",loginFaculty);

module.exports = router;
