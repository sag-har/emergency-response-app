const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

// Importing controllers for emergency routes
const { 
  createEmergencyRequest, 
  getEmergencyRequestById,
  getEmergencyRequestsByUserId,
  getNearestHospitals,
  // Week 6 New Controllers
  getEmergencyContacts,
  addEmergencyContact,
  deleteEmergencyContact,
  notifyEmergencyContact,
  // Week 7 New Controller (Track B - Member C)
  updateEmergencyStatus
} = require("../controllers/emergencyController");

// =======================================================
// WEEK 5 EXISTING ROUTES
// =======================================================

// 1. Create Emergency Request (POST /api/emergency/emergency)
router.post("/emergency", protect, createEmergencyRequest);

// 2. Get User's Emergency History via Query Param (GET /api/emergency/emergency?userId=...)
router.get("/emergency", protect, getEmergencyRequestsByUserId);

// 3. Nearest Hospitals Fetch (GET /api/emergency/hospitals?lat=xxx&lng=xxx)
router.get("/hospitals", protect, getNearestHospitals);


// =======================================================
// WEEK 6 DELIVERABLES (TRACK B - MEMBER C)
// =======================================================

// 4. GET all contacts (GET /api/emergency/contacts)
router.get("/contacts", protect, getEmergencyContacts);

// 5. POST new contact (POST /api/emergency/contacts)
router.post("/contacts", protect, addEmergencyContact);

// 6. DELETE contact by ID (DELETE /api/emergency/contacts/:id)
router.delete("/contacts/:id", protect, deleteEmergencyContact);

// 7. Trigger notification for specific contact (POST /api/emergency/contacts/:id/notify)
router.post("/contacts/:id/notify", protect, notifyEmergencyContact);


// =======================================================
// WEEK 7 DELIVERABLES (TRACK B - MEMBER C)
// =======================================================

// 8. Update Emergency Status & Trigger Push Notification (PUT /api/emergency/emergency/:id/status)
router.put("/emergency/:id/status", protect, updateEmergencyStatus);


// =======================================================
// DYNAMIC ROUTES 
// =======================================================

// 9. Get Emergency Request by Explicit ID (GET /api/emergency/emergency/:id)
router.get("/emergency/:id", protect, getEmergencyRequestById);

module.exports = router;