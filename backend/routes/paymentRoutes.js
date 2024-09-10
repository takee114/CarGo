const express = require("express");
const router = express.Router();
const {
  createPayment,
  getPaymentById,
  getUserPayments,
  updatePaymentStatus,
  refundPayment,
} = require("../controllers/paymentController");
const { protect } = require("../middlewares/authMiddleware");
const { admin } = require("../middlewares/adminMiddleware");
const { driver } = require("../middlewares/driverMiddleware");
const { client } = require("../middlewares/clientMiddleware");

// Route to create a new payment (Authenticated user)
router.post("/", protect, createPayment);

// Route to get a payment by its ID (Authenticated user)
router.get("/:id", protect, getPaymentById);

// Route to get all payments(admin )
router.get("/", protect, admin, getUserPayments);

// Route to update payment status (Admin only)
router.put("/:id/status", protect, admin, updatePaymentStatus);

// Route to refund a payment (Admin only)
router.put("/:id/refund", protect, admin, refundPayment);

module.exports = router;
