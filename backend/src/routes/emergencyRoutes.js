const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

// 1. Naya function (getEmergencyRequestsByUserId) yahan include kar liya
const { 
  createEmergencyRequest, 
  getEmergencyRequestById,
  getEmergencyRequestsByUserId 
} = require("../controllers/emergencyController");

// Secure endpoints by checking JWT first 
router.post("/emergency", protect, createEmergencyRequest);

// 2. YEH NAYA ROUTE HAI: GET /api/emergency?userId=... ke liye
// Isay ID wale route se PEHLE rakhna hai taake Express isay dynamic ID na samajh le
router.get("/emergency", protect, getEmergencyRequestsByUserId);

router.get("/emergency/:id", protect, getEmergencyRequestById);

module.exports = router;