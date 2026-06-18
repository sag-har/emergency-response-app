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

module.exports = { createEmergencyRequest, getEmergencyRequestById };