const express = require("express");
const { body } = require("express-validator");
const { registerStudent } = require("../controllers/studentReg");

const router = express.Router();

// Student registration route
router.post(
  "/register/student",
  [
    body("firstName")
      .not()
      .isEmpty()
      .withMessage("First Name is required")
      .isString()
      .withMessage("First Name must be a valid string"),
    body("lastName")
      .not()
      .isEmpty()
      .withMessage("Last Name is required")
      .isString()
      .withMessage("Last Name must be a valid string"),
    body("usn")
      .not()
      .isEmpty()
      .withMessage("USN is required")
      .isAlphanumeric()
      .withMessage("USN must contain only letters and numbers"),
    body("phoneNumber")
      .not()
      .isEmpty()
      .withMessage("Phone Number is required")
      .isMobilePhone()
      .withMessage("Phone Number must be a valid mobile number"),
    body("email")
      .isEmail()
      .withMessage("Valid Email is required"),
    body("branch")
      .not()
      .isEmpty()
      .withMessage("Branch is required")
      .isString()
      .withMessage("Branch must be a valid string"),
    body("faculty_id")
      .not()
      .isEmpty()
      .withMessage("Faculty_ID is required")
      .isString()
      .withMessage("Faculty_ID must be a valid string"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("number_of_backlogs")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Number of Backlogs must be a non-negative integer"),
    body("cgpa")
      .optional()
      .isFloat({ min: 0.0, max: 10.0 })
      .withMessage("CGPA must be between 0 and 10"),
    body("faculty_id")
      .optional()
      .isAlphanumeric()
      .withMessage("Faculty ID must be alphanumeric or null if not provided"),
  ],
  registerStudent
);

module.exports = router;
