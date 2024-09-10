const Booking = require("../models/Booking");
const mongoose = require("mongoose");

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const {
      user,
      vehicle,
      cargoDetails,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      dropoffDate,
      totalPrice,
      paymentStatus,
      notes,
    } = req.body;

    // Create a new booking instance
    const booking = new Booking({
      user,
      vehicle,
      cargoDetails,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      dropoffDate,
      totalPrice,
      paymentStatus,
      notes,
    });

    // Save the booking to the database
    await booking.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user vehicle");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get a single booking by ID
const getBookingById = async (req, res) => {
  try {
    const bookingId = req.params.id;

    // Check if the bookingId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({
        message: "Invalid booking ID format",
      });
    }

    const booking = await Booking.findById(bookingId).populate("user vehicle");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Update a booking
const updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const updateData = req.body;

    // Check if the bookingId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({
        message: "Invalid booking ID format",
      });
    }

    const booking = await Booking.findByIdAndUpdate(bookingId, updateData, {
      new: true,
      runValidators: true,
    }).populate("user vehicle");

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.status(200).json({
      message: "Booking updated successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Delete a booking
const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    // Check if the bookingId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({
        message: "Invalid booking ID format",
      });
    }

    const booking = await Booking.findByIdAndDelete(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.status(200).json({
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};
