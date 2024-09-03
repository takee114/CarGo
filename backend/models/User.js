const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Ensure username is trimmed of whitespace
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` timestamps
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
