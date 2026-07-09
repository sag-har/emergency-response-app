const { sql } = require("../config/db");
const crypto = require("crypto");

// Create Emergency Request
const createEmergencyRequest = async (req, res) => {
  try {
    const { emergencyType, notes, latitude, longitude } = req.body;
    const userId = req.user.id; // JWT se aayi hui User ID

    // 1. Strict validation for database constraints
    if (!emergencyType || !latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "Emergency type, latitude, and longitude are required",
      });
    }

    // 2. Database check constraint verification ('Accident', 'Fire', 'Medical')
    const allowedTypes = ['Accident', 'Fire', 'Medical'];
    if (!allowedTypes.includes(emergencyType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid emergency type. Must be 'Accident', 'Fire', or 'Medical'",
      });
    }

    const requestId = crypto.randomUUID();
    const status = "Pending"; // Matches DB default constraint

    // 3. Exact Column Names matched to your DB script (id, user_id, emergency_type, notes, lat, lng, status)
    await sql.query`
      INSERT INTO [emergency_requests] 
      (id, user_id, emergency_type, notes, lat, lng, status)
      VALUES 
      (${requestId}, ${userId}, ${emergencyType}, ${notes || null}, ${latitude}, ${longitude}, ${status})
    `;

    res.status(201).json({
      success: true,
      message: "Emergency request submitted successfully",
      requestId,
      status,
    });
  } catch (error) {
    console.error("Create Emergency Error:", error);
    res.status(500).json({ success: false, message: "Server Error creating emergency request" });
  }
};

// Get Emergency Request by ID
const getEmergencyRequestById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await sql.query`
      SELECT * FROM [emergency_requests] WHERE id = ${id}
    `;

    if (result.recordset.length === 0) {
      return res.status(404).json({ success: false, message: "Emergency request not found" });
    }

    res.status(200).json({
      success: true,
      data: result.recordset[0],
    });
  } catch (error) {
    console.error("Get Emergency Error:", error);
    res.status(500).json({ success: false, message: "Server Error retrieving request data" });
  }
};

// Get Emergency Requests by User ID
const getEmergencyRequestsByUserId = async (req, res) => {
  try {
    const { userId } = req.query; // ?userId=... se value nikalna

    if (!userId) {
      return res.status(400).json({ success: false, message: "userId query parameter is required" });
    }

    const result = await sql.query`
      SELECT * FROM [emergency_requests] WHERE user_id = ${userId} ORDER BY created_at DESC
    `;

    res.status(200).json({
      success: true,
      count: result.recordset.length,
      data: result.recordset
    });
  } catch (error) {
    console.error("Get User Emergencies Error:", error);
    res.status(500).json({ success: false, message: "Server Error retrieving requests" });
  }
};

// GET /api/emergency/hospitals?lat=xxx&lng=xxx (Week 5 Track B Deliverable)
const getNearestHospitals = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    // 1. Validation check
    if (!lat || !lng) {
      return res.status(400).json({ 
        success: false, 
        message: "Latitude (lat) and Longitude (lng) query parameters are required" 
      });
    }

    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);

    // 2. SQL Query using Haversine Formula for distance sorting (6371 for KM)
    const result = await sql.query`
      SELECT 
        id, 
        name, 
        address, 
        lat, 
        lng, 
        phone, 
        is_available,
        (6371 * acos(
          cos(radians(${userLat})) * cos(radians(lat)) * 
          cos(radians(lng) - radians(${userLng})) + 
          sin(radians(${userLat})) * sin(radians(lat))
        )) AS distance_km
      FROM [hospitals]
      WHERE is_available = 1
      ORDER BY distance_km ASC
    `;

    res.status(200).json({
      success: true,
      count: result.recordset.length,
      data: result.recordset,
    });
  } catch (error) {
    console.error("Get Nearest Hospitals Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server Error retrieving sorted hospital list" 
    });
  }
};

module.exports = { 
  createEmergencyRequest, 
  getEmergencyRequestById, 
  getEmergencyRequestsByUserId,
  getNearestHospitals 
};