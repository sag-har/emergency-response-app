const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
// src/routes/emergencyRoutes.js ke top par yeh sahi line honi chahiye:
const { createEmergencyRequest, getEmergencyRequestById } = require("../controllers/emergencyController");

// Secure endpoints by checking JWT first 
router.post("/emergency", protect, createEmergencyRequest);
router.get("/emergency/:id", protect, getEmergencyRequestById);

module.exports = router;