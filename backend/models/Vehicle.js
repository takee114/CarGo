const mongoose = require("mongoose");

// Define the Vehicle schema
const VehicleSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["van", "truck", "trailer"], // You can adjust this to fit your app's needs
      required: true,
    },
    brand: {
      type: String,
      required: true, // e.g., Toyota, Ford
    },
    model: {
      type: String,
      required: true, // e.g., Hiace, F-150
    },
    year: {
      type: Number,
      required: true, // Manufacture year
    },
    plateNumber: {
      type: String,
      required: true,
      unique: true, // Ensures each vehicle has a unique plate number
    },
    capacity: {
      type: Number,
      required: true, // Capacity in cubic meters or tons
    },
    color: {
      type: String, // Optional but can be useful for identification
    },
    status: {
      type: String,
      enum: ["active", "inactive", "maintenance", "unavailable"],
      default: "active",
    },
    registrationNumber: {
      type: String,
      required: true, // Vehicle's official registration number
    },
    insurancePolicyNumber: {
      type: String,
      required: true, // Vehicle's insurance policy number
    },
    insuranceExpiryDate: {
      type: Date,
      required: true, // Expiration date of insurance
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming User schema represents drivers
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false, // True when vehicle verification is complete
    },
    serviceHistory: [
      {
        serviceDate: { type: Date, required: true },
        description: { type: String, required: true },
        cost: { type: Number, required: true },
      },
    ],
    location: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    photo: {
      type: String, // Path to vehicle image if required
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

const Vehicle = mongoose.model("Vehicle", VehicleSchema);

module.exports = Vehicle;
