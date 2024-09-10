const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;


  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decode token to get user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by decoded ID and assign it to req.user
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};
const driver = (req, res, next) => {
  if (req.user && req.user.role === "driver") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as a driver" });
  }
};

module.exports = { protect, driver, admin };
