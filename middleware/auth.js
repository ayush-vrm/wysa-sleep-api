const jwt = require("jsonwebtoken");
require("dotenv").config();

// Authentication Middleware
exports.auth = async (req, res, next) => {
    try {
    const token = req.body.token 
                    || req.header("Authorisation")?.replace("Bearer ", "");

      // console.log("token is :", token);
  
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Missing Token",
        });
      }
  
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
      } catch (err) {
        console.log("jwt verification error:", err.message); 
        return res.status(401).json({
          success: false,
          message: "Invalid or expired token.",
        });
      }
  
      next();
    } catch (error) {
      // console.log("Token Validation Error:", error); 
      return res.status(500).json({
        success: false,
        message: "An error occurred while validating the token.",
      });
    }
  };
  

