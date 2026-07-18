const { sql } = require("../config/db");
const crypto = require("crypto");

// =======================================================
// EXISTING WEEK 5 DELIVERABLES (OPTIMIZED & ENHANCED)
// =======================================================

// Create Emergency Request
const createEmergencyRequest = async (req, res) => {
  try {
    const { emergencyType, notes, latitude, longitude } = req.body; 
    const userId = req.user?.id || "USR-DUMMY-9992";

    if (!emergencyType || !latitude || !longitude) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // 1. Generate unique ID on Server Side
    const requestId = crypto.randomUUID(); 
    const status = "Pending";

    // 2. Insert into SQL
    await sql.query`
      INSERT INTO dbo.emergency_requests 
      (id, user_id, emergency_type, notes, lat, lng, status, created_at, updated_at)
      VALUES 
      (${requestId}, ${userId}, ${emergencyType}, ${notes || null}, ${latitude}, ${longitude}, ${status}, GETDATE(), GETDATE())
    `;

    // 3. Send back the EXACT ID to frontend
    res.status(201).json({
      success: true,
      id: requestId, 
      message: "Emergency request created"
    });
  } catch (error) {
    console.error("Create Emergency Error:", error);
    res.status(500).json({ success: false, message: "Database Error" });
  }
};

// Get Emergency Request by ID
const getEmergencyRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const cleanId = String(id).trim();

    console.log(`🔍 Executing Database Lookup for Emergency ID: '${cleanId}'`);

    const result = await sql.query`
      SELECT 
        er.*,
        h.name AS hospital_name,
        h.phone AS hospital_phone,
        h.address AS hospital_address
      FROM dbo.emergency_requests er
      LEFT JOIN dbo.hospitals h ON TRIM(er.hospital_id) = TRIM(h.id)
      WHERE TRIM(er.id) = ${cleanId}
    `;

    if (result.recordset.length === 0) {
      console.log(`⚠️ Request ID '${cleanId}' database table me nahi mila.`);
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
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ success: false, message: "userId query parameter is required" });
    }

    const cleanUserId = String(userId).trim();

    const result = await sql.query`
      SELECT * FROM dbo.emergency_requests WHERE TRIM(user_id) = ${cleanUserId} ORDER BY created_at DESC
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

// GET Nearest Hospitals
const getNearestHospitals = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng || lat === "undefined" || lng === "undefined") {
      return res.status(400).json({ 
        success: false, 
        message: "Valid Latitude (lat) and Longitude (lng) query parameters are required" 
      });
    }

    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);

    if (isNaN(userLat) || isNaN(userLng)) {
      return res.status(400).json({ success: false, message: "Coordinates must be valid numbers" });
    }

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
          CASE 
            WHEN (cos(radians(${userLat})) * cos(radians(lat)) * cos(radians(lng) - radians(${userLng})) + sin(radians(${userLat})) * sin(radians(lat))) > 1 THEN 1
            WHEN (cos(radians(${userLat})) * cos(radians(lat)) * cos(radians(lng) - radians(${userLng})) + sin(radians(${userLat})) * sin(radians(lat))) < -1 THEN -1
            ELSE (cos(radians(${userLat})) * cos(radians(lat)) * cos(radians(lng) - radians(${userLng})) + sin(radians(${userLat})) * sin(radians(lat)))
          END
        )) AS distance_km
      FROM dbo.hospitals
      WHERE is_available = 1
      ORDER BY distance_km ASC
    `;

    res.status(200).json({
      success: true,
      count: result.recordset.length,
      data: result.recordset,
    });
  } catch (error) {
    console.error("❌ Get Nearest Hospitals Error Catch:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server Error retrieving sorted hospital list",
      error: error.message
    });
  }
};

// =======================================================
// EXISTING WEEK 6 DELIVERABLES
// =======================================================

const getEmergencyContacts = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await sql.query`
      SELECT id, user_id, name, phone_number, relation, created_at 
      FROM dbo.emergency_contacts 
      WHERE TRIM(user_id) = TRIM(${userId})
      ORDER BY created_at DESC
    `;

    res.status(200).json({
      success: true,
      count: result.recordset.length,
      data: result.recordset
    });
  } catch (error) {
    console.error("Get Emergency Contacts Error:", error);
    res.status(500).json({ success: false, message: "Server Error retrieving contacts" });
  }
};

const addEmergencyContact = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone_number, relation } = req.body;

    if (!name || !phone_number || !relation) {
      return res.status(400).json({
        success: false,
        message: "Name, phone number, and relation are required"
      });
    }

    const contactId = crypto.randomUUID();

    const result = await sql.query`
      INSERT INTO dbo.emergency_contacts (id, user_id, name, phone_number, relation, created_at)
      OUTPUT inserted.created_at
      VALUES (${contactId}, ${userId}, ${name}, ${phone_number}, ${relation}, GETDATE())
    `;

    res.status(201).json({
      success: true,
      message: "Emergency contact added successfully",
      data: {
        id: contactId,
        user_id: userId,
        name,
        phone_number,
        relation,
        created_at: result.recordset[0].created_at
      }
    });
  } catch (error) {
    console.error("Add Emergency Contact Error:", error);
    res.status(500).json({ success: false, message: "Server Error adding emergency contact" });
  }
};

const deleteEmergencyContact = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const checkResult = await sql.query`
      SELECT id FROM dbo.emergency_contacts WHERE TRIM(id) = TRIM(${id}) AND TRIM(user_id) = TRIM(${userId})
    `;

    if (checkResult.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Emergency contact not found or unauthorized"
      });
    }

    await sql.query`
      DELETE FROM dbo.emergency_contacts WHERE TRIM(id) = TRIM(${id})
    `;

    res.status(200).json({
      success: true,
      message: "Emergency contact deleted successfully"
    });
  } catch (error) {
    console.error("Delete Emergency Contact Error:", error);
    res.status(500).json({ success: false, message: "Server Error deleting contact" });
  }
};

const notifyEmergencyContact = async (req, res) => {
  try {
    const userId = req.user.id;
    const contactId = req.params.id;

    const contactResult = await sql.query`
      SELECT id, name, phone_number, relation FROM dbo.emergency_contacts 
      WHERE TRIM(id) = TRIM(${contactId}) AND TRIM(user_id) = TRIM(${userId})
    `;

    if (contactResult.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Emergency contact not found or unauthorized to notify"
      });
    }

    const contact = contactResult.recordset[0];
    const notificationId = crypto.randomUUID();
    const title = "Emergency Alert Sent!";
    const message = `SOS Alert! Your emergency contact ${contact.name} (${contact.relation}) has been notified via call/SMS on ${contact.phone_number}.`;

    await sql.query`
      INSERT INTO dbo.notification_history (id, user_id, title, message, is_read, created_at)
      VALUES (${notificationId}, ${userId}, ${title}, ${message}, 0, GETDATE())
    `;

    res.status(200).json({
      success: true,
      message: `Emergency notification successfully triggered for ${contact.name}`,
      notification: {
        id: notificationId,
        contactName: contact.name,
        contactPhone: contact.phone_number,
        relation: contact.relation,
        alertTitle: title,
        alertMessage: message
      }
    });
  } catch (error) {
    console.error("Notify Emergency Contact Error:", error);
    res.status(500).json({ success: false, message: "Server Error triggering emergency notification" });
  }
};

// =======================================================
// NEW WEEK 7 DELIVERABLES (TRACK B - MEMBER C)
// =======================================================

const updateEmergencyStatus = async (req, res) => {
  try {
    const { id } = req.params; 
    const { status } = req.body; 

    if (!status) {
      return res.status(400).json({ success: false, message: "Status field is required" });
    }

    const allowedStatuses = ['Pending', 'Dispatched', 'Resolved'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid status. Allowed values are 'Pending', 'Dispatched', or 'Resolved'" 
      });
    }

    const checkRequest = await sql.query`
      SELECT user_id, emergency_type FROM dbo.emergency_requests WHERE TRIM(id) = TRIM(${id})
    `;

    if (checkRequest.recordset.length === 0) {
      return res.status(404).json({ success: false, message: "Emergency request not found" });
    }

    const targetUserId = checkRequest.recordset[0].user_id;
    const emergencyType = checkRequest.recordset[0].emergency_type;

    await sql.query`
      UPDATE dbo.emergency_requests 
      SET status = ${status}, updated_at = GETDATE() 
      WHERE TRIM(id) = TRIM(${id})
    `;

    const notificationId = crypto.randomUUID();
    const alertTitle = `Emergency Status: ${status}`;
    const alertMessage = `Your ${emergencyType} request status has been updated to [${status}]. Personnel have been coordinated.`;

    await sql.query`
      INSERT INTO dbo.notification_history (id, user_id, title, message, is_read, created_at)
      VALUES (${notificationId}, ${targetUserId}, ${alertTitle}, ${alertMessage}, 0, GETDATE())
    `;

    console.log(`🔔 [PUSH NOTIFICATION EVENT]: Triggered for User ${targetUserId} due to status change to [${status}]`);
    await mockPushServiceTrigger(targetUserId, alertTitle, alertMessage);

    res.status(200).json({
      success: true,
      message: `Emergency request status updated to ${status} and push notification triggered successfully.`,
      data: {
        requestId: id,
        userId: targetUserId,
        status,
        notificationLog: {
          id: notificationId,
          title: alertTitle,
          message: alertMessage
        }
      }
    });

  } catch (error) {
    console.error("Update Emergency Status Error:", error);
    res.status(500).json({ success: false, message: "Server Error updating emergency status" });
  }
};

const assignHospitalToEmergency = async (req, res) => {
  try {
    const emergencyId = req.body.emergencyId ? String(req.body.emergencyId).trim() : null;
    const hospitalId = req.body.hospitalId ? String(req.body.hospitalId).trim() : null;

    console.log("📥 [Assign Hospital Controller Input Cleaned]:", { emergencyId, hospitalId });

    if (!emergencyId || !hospitalId) {
      return res.status(400).json({
        success: false,
        message: "Both emergencyId and hospitalId are required",
      });
    }

    const checkEmergency = await sql.query`
      SELECT id, user_id, emergency_type 
      FROM dbo.emergency_requests 
      WHERE TRIM(id) = ${emergencyId}
    `;

    if (checkEmergency.recordset.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Emergency request not found in database" 
      });
    }

    const targetUserId = checkEmergency.recordset[0].user_id;
    const emergencyType = checkEmergency.recordset[0].emergency_type;

    const checkHospital = await sql.query`
      SELECT id, name FROM dbo.hospitals WHERE TRIM(id) = ${hospitalId}
    `;

    if (checkHospital.recordset.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: `Selected hospital ID [${hospitalId}] not found in database` 
      });
    }

    const hospitalName = checkHospital.recordset[0].name;

    await sql.query`
      UPDATE dbo.emergency_requests
      SET hospital_id = ${hospitalId}, status = 'Dispatched', updated_at = GETDATE()
      WHERE TRIM(id) = ${emergencyId}
    `;

    const notificationId = crypto.randomUUID();
    const alertTitle = `Hospital Dispatched: ${hospitalName}`;
    const alertMessage = `${hospitalName} has accepted your ${emergencyType} request. Medical responders are en route.`;

    await sql.query`
      INSERT INTO dbo.notification_history (id, user_id, title, message, is_read, created_at)
      VALUES (${notificationId}, ${targetUserId}, ${alertTitle}, ${alertMessage}, 0, GETDATE())
    `;

    console.log(`🔔 [ASSIGNMENT EVENT]: Hospital ${hospitalName} assigned to Emergency ${emergencyId}`);
    await mockPushServiceTrigger(targetUserId, alertTitle, alertMessage);

    res.status(200).json({
      success: true,
      message: "Hospital assigned successfully and status updated to Dispatched",
      data: { emergencyId, hospitalId, status: "Dispatched" }
    });
  } catch (error) {
    console.error("❌ Assign Hospital Controller Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server Error assigning hospital to emergency request",
      error: error.message 
    });
  }
};

const mockPushServiceTrigger = async (userId, title, message) => {
  console.log(`📱 Push Dispatch -> Device Token Registered to User: ${userId} | Payload: { Title: "${title}", Message: "${message}" }`);
};

module.exports = { 
  createEmergencyRequest, 
  getEmergencyRequestById, 
  getEmergencyRequestsByUserId,
  getNearestHospitals,
  getEmergencyContacts,
  addEmergencyContact,
  deleteEmergencyContact,
  notifyEmergencyContact,
  updateEmergencyStatus,
  assignHospitalToEmergency,
  mockPushServiceTrigger
};