const Payment = require("../models/Payment");

// Function to create a payment when a service is requested
const createPaymentForService = async (
  userId,
  bookingId,
  amount,
  description
) => {
  try {
    const payment = await Payment.create({
      user: userId,
      service: serviceId,
      amount,
      status: "pending", // Payment starts as pending
      description: description || `Payment for requested service ${serviceId}`,
    });
    return payment;
  } catch (error) {
    throw new Error(`Failed to create payment: ${error.message}`);
  }
};

// Function to update payment status when service is completed
const updatePaymentStatus = async (serviceId, status) => {
  try {
    const payment = await Payment.findOne({ service: serviceId });
    if (!payment) {
      throw new Error("Payment not found for this service");
    }

    payment.status = status;
    await payment.save();
    return payment;
  } catch (error) {
    throw new Error(`Failed to update payment: ${error.message}`);
  }
};

module.exports = { createPaymentForService, updatePaymentStatus };
