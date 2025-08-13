const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["home", "office", "other"],
    default: "home",
  },
  line1: String,
  line2: String,
  city: String,
  state: String,
  postalCode: String,
  country: String,
});

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profileImage: {
      type: String,
      default: "null",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    bio: {
      type: String,
      maxlength: 500,
    },
    skills: [String],
    resume: {
      type: String,
      default: "null",
    },
    designation: {
      type: String,
      trim: true,
      default: "null",
    },
    study: {
      type: String,
      trim: true,
      default: "null",
    },
    experience: {
      type: String,
      trim: true,
      default: "null",
    },
    socialLinks: {
      linkedin: { type: String, default: "null" },
      github: { type: String, default: "null" },
      facebook: { type: String, default: "null" },
      instagram: { type: String, default: "null" },
      twitter: { type: String, default: "null" },
    },
    addresses: [addressSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
