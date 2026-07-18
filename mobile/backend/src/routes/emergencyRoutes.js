const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createEmergencyRequest,
  getEmergencyRequestById,
  getEmergencyRequestsByUserId,
  getNearestHospitals,
  updateEmergencyStatus,
  getEmergencyContacts,
  addEmergencyContact,
  deleteEmergencyContact,
  notifyEmergencyContact,
  assignHospitalToEmergency
} = require("../controllers/emergencyController");

// ==========================================
// 1. 🚨 HOSPITAL REGISTRY ACTIONS (Top Priority)
// ==========================================
router.post("/hospital/assign", protect, assignHospitalToEmergency);
router.get("/hospitals", protect, getNearestHospitals);

// ==========================================
// 2. 👥 EMERGENCY CONTACTS
// ==========================================
router.get("/contacts", protect, getEmergencyContacts);
router.post("/contacts", protect, addEmergencyContact);

// ==========================================
// 3. 📄 BASE DATA COLLECTION & QUERY ENDPOINTS
// ==========================================
router.get("/history", protect, getEmergencyRequestsByUserId);
router.get("/", protect, getEmergencyRequestsByUserId);
router.post("/", protect, createEmergencyRequest);

// ==========================================
// 4. 🔗 PARAMETER DEPENDENT ROUTES (Isolated Actions)
// ==========================================
router.delete("/contacts/:id", protect, deleteEmergencyContact);
router.post("/contacts/:id/notify", protect, notifyEmergencyContact);

// ==========================================
// 5. 🎯 TARGET REQUEST ID DYNAMIC ROUTER (Absolute Bottom)
// ==========================================
router.put("/:id/status", protect, updateEmergencyStatus);
router.get("/:id", protect, getEmergencyRequestById);

module.exports = router;
