const express = require("express");
const router = express.Router();

const {
  loginUser,
  registerUser,
  getProfile,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

router.post("/login", loginUser);

router.post("/register", registerUser);

router.get("/profile", protect, getProfile);

module.exports = router;