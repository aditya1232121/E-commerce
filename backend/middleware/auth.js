const jwt = require("jsonwebtoken");
const User = require("../model/usermodel");

// Middleware to check if the user is authenticated
exports.isAuthenticatedUser = async (req, res, next) => {
  try {
    let token;

    // Check if the token is in the Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];  // Extract token
    }

    if (!token) {
      return res.status(401).json({ message: "Please Login to access this resource" });
    }

    // Verify the token
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);  // Find the user by ID in decoded token
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};

// Middleware to authorize roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({
          message: `Role: ${req.user.role} is not allowed to access this resource`
        });
      }

      next();
    } catch (error) {
      return res.status(403).json({ message: "Authorization failed" });
    }
  };
};
