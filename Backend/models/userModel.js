import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Password must be at least 8 characters long"],
    },
    phoneNumber: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Please enter a valid phone number."],
    },
    role: { type: String, default: "customer" },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, minimize: false }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
