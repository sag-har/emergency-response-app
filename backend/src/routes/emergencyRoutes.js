const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { createEmergencyRequest, getEmergencyRequestById } = require("../controllers/emergencyController");

router.post("/", protect, createEmergencyRequest);
router.get("/:id", protect, getEmergencyRequestById);

module.exports = router;
