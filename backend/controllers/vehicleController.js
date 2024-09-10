const Vehicle = require("../models/Vehicle");
const mongoose = require("mongoose");
// @desc    Register a new vehicle
// @route   POST /api/vehicles
// @access  Private (Driver/Admin)
const registerVehicle = async (req, res) => {
  try {
    const {
      type,
      brand,
      model,
      year,
      plateNumber,
      capacity,
      color,
      registrationNumber,
      insurancePolicyNumber,
      insuranceExpiryDate,
      driver,
      location,
      photo,
    } = req.body;

    // Check if the vehicle with the same plateNumber already exists
    const vehicleExists = await Vehicle.findOne({ plateNumber });
    if (vehicleExists) {
      return res.status(400).json({ message: "Vehicle already registered" });
    }

    // Create new vehicle
    const newVehicle = new Vehicle({
      type,
      brand,
      model,
      year,
      plateNumber,
      capacity,
      color,
      registrationNumber,
      insurancePolicyNumber,
      insuranceExpiryDate,
      driver: req.user._id, // Assuming driver is logged in and sending the request
      location,
      photo,
    });

    await newVehicle.save();
    res.status(201).json({
      message: "Vehicle registered successfully",
      vehicle: newVehicle,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all vehicles
// @route   GET /api/vehicles
// @access  Public (Admin can see all, Driver sees their vehicles)
const getVehicles = async (req, res) => {
  try {
    // If the user is an admin, return all vehicles, otherwise return only the driver's vehicles
    const vehicles =
      req.user.role === "admin"
        ? await Vehicle.find().populate("driver", "name email")
        : await Vehicle.find({ driver: req.user._id }).populate(
            "driver",
            "name email"
          );

    res.status(200).json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get a single vehicle by ID
// @route   GET /api/vehicles/:id
// @access  Public
const getVehicleById = async (req, res) => {
  try {
    const vehicleId = req.params.id;

    // Check if the vehicleId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(vehicleId)) {
      return res.status(400).json({
        message: "Invalid vehicle ID format",
      });
    }

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Update a vehicle's details
// @route   PUT /api/vehicles/:id
// @access  Private (Driver/Admin)
const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // Ensure only the vehicle's owner (driver) or admin can update it
    if (
      vehicle.driver.toString() !== req.user._id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(401)
        .json({ message: "Not authorized to update this vehicle" });
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Vehicle updated successfully",
      vehicle: updatedVehicle,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete a vehicle
// @route   DELETE /api/vehicles/:id
// @access  Private (Driver/Admin)
const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    // Ensure only the vehicle's owner (driver) or admin can delete it
    if (
      vehicle.driver.toString() !== req.user._id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this vehicle" });
    }

    await Vehicle.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  registerVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
