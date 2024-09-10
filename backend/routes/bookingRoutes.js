const express = require("express");
const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Route to create a new booking
router.post("/", protect, createBooking);

// Route to get all bookings
router.get("/", protect, getAllBookings);

// Route to get a single booking by ID
router.get("/:id", protect, getBookingById);

// Route to update a booking by ID
router.put("/:id", protect, updateBooking);

// Route to delete a booking by ID
router.delete("/:id", protect, deleteBooking);

module.exports = router;
