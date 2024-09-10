const Payment = require("../models/Payment");
const { sendPaymentConfirmationEmail } = require("../services/emailService");

// Create a new payment
const createPayment = async (req, res) => {
  try {
    const {
      amount,
      currency,
      paymentMethod,
      transactionId,
      tax,
      serviceFee,
      notes,
    } = req.body;

    // Calculate the total amount
    const totalAmount = amount + (tax || 0) + (serviceFee || 0);

    const payment = new Payment({
      user: req.user._id, // Assuming the user is authenticated
      amount,
      currency,
      paymentMethod,
      transactionId: paymentMethod !== "Cash" ? transactionId : undefined, // No transactionId for Cash
      tax,
      serviceFee,
      totalAmount,
      notes,
    });

    await payment.save();

    // Send a payment confirmation email
    await sendPaymentConfirmationEmail(req.user.email, payment);

    res.status(201).json({
      message: "Payment created successfully",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get payment details by ID
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json({ payment });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get all payments for admin (or a specific user if not an admin)
const getUserPayments = async (req, res) => {
  try {
    let payments;

    // Check if the current user is an admin
    if (req.user.role === "admin") {
      // If the user is an admin, get all payments
      payments = await Payment.find().populate("user", "name email");
    } else {
      // If the user is not an admin, only get their own payments
      payments = await Payment.find({ user: req.user._id });
    }

    if (!payments.length) {
      return res.status(404).json({ message: "No payments found" });
    }

    res.status(200).json({ payments });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Update payment status (Admin only)
const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;

    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    payment.paymentStatus = paymentStatus;
    await payment.save();

    res.status(200).json({
      message: "Payment status updated",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Refund a payment (Admin only)
const refundPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    if (payment.paymentStatus !== "completed") {
      return res
        .status(400)
        .json({ message: "Cannot refund a payment that is not completed" });
    }

    payment.paymentStatus = "refunded";
    await payment.save();

    res.status(200).json({
      message: "Payment refunded successfully",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createPayment,
  getPaymentById,
  getUserPayments,
  updatePaymentStatus,
  refundPayment,
};
