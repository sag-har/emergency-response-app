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
// Matches: POST /api/emergency/hospital/assign
router.post("/hospital/assign", protect, assignHospitalToEmergency);

// Matches: GET /api/emergency/hospitals
router.get("/hospitals", protect, getNearestHospitals);

// ==========================================
// 2. 👥 EMERGENCY CONTACTS STATIC & MANAGEMENTS
// ==========================================
// Matches: GET /api/emergency/contacts
router.get("/contacts", protect, getEmergencyContacts);

// Matches: POST /api/emergency/contacts
router.post("/contacts", protect, addEmergencyContact);

// ==========================================
// 3. 📄 BASE DATA COLLECTION & QUERY ENDPOINTS
// ==========================================
// Matches: GET /api/emergency/history
router.get("/history", protect, getEmergencyRequestsByUserId);

// Matches: GET /api/emergency (Supports ?userId=X query filters)
router.get("/", protect, getEmergencyRequestsByUserId);

// Matches: POST /api/emergency (Create Request Template)
router.post("/", protect, createEmergencyRequest);

// ==========================================
// 4. 🔗 PARAMETER DEPENDENT ROUTES (Isolated Actions)
// ==========================================
// Matches: DELETE /api/emergency/contacts/:id (Isolated under contacts domain space)
router.delete("/contacts/:id", protect, deleteEmergencyContact);

// Matches: POST /api/emergency/contacts/:id/notify
router.post("/contacts/:id/notify", protect, notifyEmergencyContact);

// ==========================================
// 5. 🎯 TARGET REQUEST ID DYNAMIC ROUTER (Absolute Bottom)
// ==========================================
// Matches: PUT /api/emergency/:id/status
router.put("/:id/status", protect, updateEmergencyStatus);

// Matches: GET /api/emergency/:id (Handles REQ-... tags safely at final fallback)
router.get("/:id", protect, getEmergencyRequestById);

module.exports = router;