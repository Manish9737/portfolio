const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    techStack: [
      {
        type: String,
        required: true,
      },
    ],
    liveUrl: {
      type: String,
    },
    githubUrl: {
      type: String,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      enum: ["Frontend", "Backend", "Full Stack", "Mobile App", "Other"],
      default: "Other",
    },
    isFeatured: {
      type: Boolean,
      default: false,
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

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
