const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Ensure email is trimmed of whitespace
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["client", "driver", "admin"],
      default: "client",
    },
    address: {
      street: {
        type: String,
        required: function () {
          return this.role === "driver";
        },
      },
      city: {
        type: String,
        required: function () {
          return this.role === "driver";
        },
      },
      state: {
        type: String,
        required: function () {
          return this.role === "driver";
        },
      },
      zip: {
        type: String,
        required: function () {
          return this.role === "driver";
        },
      },
      country: {
        type: String,
        required: function () {
          return this.role === "driver";
        },
      },
    },
    vehicleDetails: {
      type: new mongoose.Schema({
        type: {
          type: String,
          enum: ["van", "truck", "trailer"],
          required: function () {
            return this.role === "driver";
          },
        },
        plateNumber: {
          type: String,
          required: function () {
            return this.role === "driver";
          },
        },
        capacity: {
          type: Number,
          required: function () {
            return this.role === "driver";
          },
        }, // capacity in cubic meters or tons
      }),
      required: function () {
        return this.role === "driver";
      },
    },
    profilePicture: {
      type: String,
      default: "../public/image/default.jpg",
      required: function () {
        return this.role === "driver";
      },
    },
    licenseNumber: {
      type: String,
      required: function () {
        return this.role === "driver";
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` timestamps
  }
);

// Pre-save middleware to hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
