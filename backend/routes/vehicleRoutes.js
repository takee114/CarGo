const express = require("express");
const router = express.Router();
const {
  registerVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/vehicleController");
const { protect } = require("../middlewares/authMiddleware");

// Route to register a new vehicle (accessible to drivers and admins)
router.post("/", protect, registerVehicle);

// Route to get all vehicles (admin can see all, drivers see their own)
router.get("/", protect, getVehicles);

// Route to get a single vehicle by its ID
router.get("/:id", protect, getVehicleById);

// Route to update a vehicle (only the driver who owns the vehicle or admin can update it)
router.put("/:id", protect, updateVehicle);

// Route to delete a vehicle (only the driver who owns the vehicle or admin can delete it)
router.delete("/:id", protect, deleteVehicle);

module.exports = router;
