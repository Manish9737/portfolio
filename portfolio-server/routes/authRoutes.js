const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controllers/authController");
const upload = require("../config/multer");

// Auth Routes
router.post(
  "/register",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  registerUser
);
router.post("/login", loginUser);

// Admin or authenticated user routes
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.patch(
  "/users/:id",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  updateUser
);
router.delete("/users/:id", deleteUser);

module.exports = router;
