const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: ["ETB", "USD", "EUR", "GBP"],
      required: true,
      default: "ETB",
    },
    paymentMethod: {
      type: String,
      enum: [
        "Telebirr",
        "MPesa",
        "CBE Birr",
        "Amole",
        "Chapa",
        "Bank Transfer",
        "Cash",
        "PayPal",
        "Credit Card",
        "Debit Card",
      ],
      required: true,
    },
    transactionId: {
      type: String,
      required: function () {
        return this.paymentMethod !== "Cash";
      },
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    tax: {
      type: Number,
      default: 0,
    },
    serviceFee: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
