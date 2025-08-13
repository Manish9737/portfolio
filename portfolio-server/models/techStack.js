// models/techSchema.js

const mongoose = require("mongoose");

const techSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      default: "Beginner",
    },
    category: {
      type: String,
      enum: ["Frontend", "Backend", "Database", "DevOps", "Tools", "Language", "Tools", "Other"],
      default: "Other",
    },
    description: {
      type: String,
      maxlength: 500,
    },
    order: {
      type: Number,
      default: 0,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Tech = mongoose.model("Tech", techSchema);

module.exports = Tech;
