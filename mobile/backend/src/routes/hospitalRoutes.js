const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getHospitals,
  getHospitalById,
} = require("../controllers/hospitalController");

// GET Nearby Hospitals -> GET /api/hospitals?lat=33.68&lng=73.04
router.get("/", protect, getHospitals);

// GET Hospital Details -> GET /api/hospitals/:id
router.get("/:id", protect, getHospitalById);

module.exports = router;
