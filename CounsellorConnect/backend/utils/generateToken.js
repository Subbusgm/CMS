// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");

const generateToken = (res, user, role, message) => {
    let currId=1;
    if(role=="student") currId=user.usn;
    else currId=user.faculty_id;
    console.log("debug ", currId);
  const token =  jwt.sign(
    { userId: currId, role }, // Include the role in the token payload
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )
  console.log("debug ", token);
  const isProduction = process.env.NODE_ENV === "production";
  return res
    .status(200)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000,
      secure: false, 
    })
    .json({
      success: true,
      message,
      token,
      user,
    });
};

module.exports = generateToken;