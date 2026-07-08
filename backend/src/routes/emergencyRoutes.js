const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

// Controller se getNearestHospitals ko bhi import kar liya
const { 
  createEmergencyRequest, 
  getEmergencyRequestById,
  getEmergencyRequestsByUserId,
  getNearestHospitals
} = require("../controllers/emergencyController");

// 1. Create Emergency Request (POST /api/emergency)
router.post("/emergency", protect, createEmergencyRequest);

// 2. Get User's Emergency History via Query Param (GET /api/emergency?userId=...)
router.get("/emergency", protect, getEmergencyRequestsByUserId);

// 3. YEH NAYA ROUTE HAI: Nearest Hospitals Fetch karne ke liye (GET /api/emergency/hospitals?lat=xxx&lng=xxx)
// Isay bhi dynamic ID se upar rakha hai taake bypass na ho
router.get("/hospitals", protect, getNearestHospitals);

// 4. Get Emergency Request by Explicit ID (GET /api/emergency/:id)
router.get("/emergency/:id", protect, getEmergencyRequestById);

module.exports = router;