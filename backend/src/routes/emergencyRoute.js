const express = require('express');
const router = express.Router();
const {
  createEmergencyRequest,
  getEmergencyById,
  getEmergencyByUser,
  getEmergencyLocation,
} = require('../controllers/emergencyController');
const { authMiddleware } = require('../middleware/auth');

// All emergency routes are protected
router.use(authMiddleware);

// @route   POST /api/emergency
// @desc    Submit a new emergency request
// @access  Protected
router.post('/', createEmergencyRequest);

// @route   GET /api/emergency
// @desc    Get all emergency requests for logged-in user
// @access  Protected
router.get('/', getEmergencyByUser);

// @route   GET /api/emergency/:id
// @desc    Get a single emergency request by ID
// @access  Protected
router.get('/:id', getEmergencyById);

// @route   GET /api/emergency/:id/location
// @desc    Get live ambulance + user location for a request (mock for Week 2)
// @access  Protected
router.get('/:id/location', getEmergencyLocation);

module.exports = router;