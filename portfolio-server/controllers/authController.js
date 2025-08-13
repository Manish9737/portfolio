const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

// Register
exports.registerUser = async (req, res) => {
  try {
    const {
      fullName,
      designation,
      study,
      experience,
      email,
      password,
      username,
      phone,
      bio,
      skills,
      socialLinks,
      addresses,
    } = req.body;

    if (!fullName || !email || !password || !username) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const parsedSkills = Array.isArray(skills)
      ? skills
      : typeof skills === "string"
      ? skills.split(",").map((s) => s.trim())
      : [];

    const parsedSocialLinks =
      typeof socialLinks === "string" ? JSON.parse(socialLinks) : {};
    const parsedAddresses =
      typeof addresses === "string" ? JSON.parse(addresses) : [];

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      username,
      phone,
      bio,
      designation,
      study,
      experience,
      skills: parsedSkills,
      socialLinks: parsedSocialLinks,
      addresses: parsedAddresses,
      profileImage: req.file ? `/uploads/${req.file.filename}` : "",
      resume: req.file ? `/uploads/${req.file.filename}` : "",
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.error("Error during registration:", err);
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// Get all users (Admin)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
  }
};

// Get single user
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: err.message });
  }
};

// Update user profile
exports.updateUser = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (typeof updateData.skills === "string") {
      updateData.skills = JSON.parse(updateData.skills);
    }
    if (typeof updateData.socialLinks === "string") {
      updateData.socialLinks = JSON.parse(updateData.socialLinks);
    }
    if (typeof updateData.addresses === "string") {
      updateData.addresses = JSON.parse(updateData.addresses);
    }

    const oldUser = await User.findById(req.params.id);
    if (!oldUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.files?.profileImage) {
      if (oldUser.profileImage) {
        const oldPath = path.join(__dirname, "..", oldUser.profileImage);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      updateData.profileImage = `/uploads/${req.files.profileImage[0].filename}`;
    }

    if (req.files?.resume) {
      if (oldUser.resume) {
        const oldPath = path.join(__dirname, "..", oldUser.resume);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      updateData.resume = `/uploads/${req.files.resume[0].filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    ).select("-password");

    res.json({ message: "User updated", updatedUser });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
};
