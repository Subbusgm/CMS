// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");

const isAuthenticated = (roles = []) => {
    return async (req, res, next) => {
      try {
        const token = req.cookies.token;
        console.log(token);
        
        // console.log(req.origin);
        

        if(token==undefined)console.log('viji')
          // else console.log(token)
        if (!token) {
          return res.status(401).json({
            message: "User Not Authenticated",
            success: false,
          });
        }
  
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
        if (!decoded) {
          return res.status(401).json({
            message: "Invalid Token",
            success: false,
          });
        }

        req.user = { userId: decoded.userId, role: decoded.role };
  
        // Check if the user's role matches the required roles (if specified)
        if (roles.length > 0 && !roles.includes(decoded.role)) {
          return res.status(403).json({
            message: "Forbidden: You do not have the required access",
            success: false,
          });
        }
  
        next();
      } catch (error) {
        return res.status(500).json({
          message: "Server Error",
          success: false,
          error: error.message,
        });
      }
    };
  };
  
//   export default isAuthenticated;
module.exports = isAuthenticated;