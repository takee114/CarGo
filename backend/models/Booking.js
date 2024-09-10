const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    cargoDetails: {
      type: new mongoose.Schema({
        type: { type: String, required: true },
        weight: { type: Number, required: true },
        dimensions: {
          length: { type: Number, required: true },
          width: { type: Number, required: true },
          height: { type: Number, required: true },
        },
      }),
      required: true,
    },
    pickupLocation: {
      address: { type: String, required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    dropoffLocation: {
      address: { type: String, required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    pickupDate: { type: Date, required: true },
    dropoffDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "in-progress", "completed", "canceled"],
      default: "pending",
    },
    totalPrice: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    notes: { type: String },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
