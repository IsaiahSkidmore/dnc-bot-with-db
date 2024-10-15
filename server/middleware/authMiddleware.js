// Handles JWT authentication
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const authMiddleware = async (req, res, next) => {
  // Retrieve token from the Authorization header
  const authHeader = req.headers["authorization"];
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

  // Check if token is provided
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID in the database
    const user = await User.findByPk(decoded.id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach the user object to the request for later use
    req.user = user;

    // Call the next middleware or route handler
    next();
  } catch (err) {
    // Handle token verification errors
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    } else if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    // Handle any other unexpected errors
    return res.status(500).json({ message: "Failed to authenticate token" });
  }
};

export default authMiddleware;
