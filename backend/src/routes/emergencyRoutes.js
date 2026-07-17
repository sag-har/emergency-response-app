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
} = require("../controllers/emergencyController");

// Emergency Request
router.post("/emergency", protect, createEmergencyRequest);

router.get("/emergency", protect, getEmergencyRequestsByUserId);

router.get("/emergency/:id", protect, getEmergencyRequestById);

router.put(
  "/emergency/:id/status",
  protect,
  updateEmergencyStatus
);

// Hospitals
router.get(
  "/hospitals",
  protect,
  getNearestHospitals
);

// Contacts
router.get(
  "/contacts",
  protect,
  getEmergencyContacts
);

router.post(
  "/contacts",
  protect,
  addEmergencyContact
);

router.delete(
  "/contacts/:id",
  protect,
  deleteEmergencyContact
);

router.post(
  "/contacts/:id/notify",
  protect,
  notifyEmergencyContact
);

module.exports = router;