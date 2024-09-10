const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  resetPassword,
  resetPasswordUsingToken,
} = require("../controllers/userController");
const { protect, admin, driver } = require("../middlewares/authMiddleware");

// Route for user registration
router.post("/register", registerUser);

// Route for user login
router.post("/login", loginUser);

// Route to get the current user's profile (protected)
router.get("/profile", protect, getUserProfile);

// Route to update the current user's profile (protected)
router.put("/profile", protect, updateUserProfile);

// Route to initiate password reset (send reset email)
router.post("/reset-password", resetPassword);

// Route to reset password using token
router.put("/reset-password/:token", resetPasswordUsingToken);

module.exports = router;
