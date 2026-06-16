const { v4: uuidv4 } = require('uuid');
const { poolPromise, sql } = require('../db/database');

// POST /api/emergency
const createEmergencyRequest = async (req, res) => {
  try {
    const { emergencyType, notes, location } = req.body;
    const userId = req.user.userId;

    if (!emergencyType) {
      return res.status(400).json({ success: false, message: 'Emergency type is required.' });
    }

    // SSMS Schema constraints follow up (Medical, Fire, Accident Only)
    const validTypes = ['Medical', 'Fire', 'Accident'];
    if (!validTypes.includes(emergencyType)) {
      return res.status(400).json({
        success: false,
        message: `Emergency type must be one of: ${validTypes.join(', ')} (Due to SQL constraints)`,
      });
    }

    if (!location || location.lat === undefined || location.lng === undefined) {
      return res.status(400).json({ success: false, message: 'Location (lat, lng) is required.' });
    }

    const requestId = uuidv4();
    const pool = await poolPromise;

    await pool.request()
      .input('id', sql.VarChar(36), requestId)
      .input('user_id', sql.VarChar(36), userId)
      .input('type', sql.VarChar(20), emergencyType)
      .input('notes', sql.Text, notes || '')
      .input('lat', sql.Decimal(10, 8), parseFloat(location.lat))
      .input('lng', sql.Decimal(11, 8), parseFloat(location.lng))
      .query(`
        INSERT INTO emergency_requests (id, user_id, emergency_type, notes, lat, lng, status)
        VALUES (@id, @user_id, @type, @notes, @lat, @lng, 'Pending')
      `);

    res.status(201).json({
      success: true,
      message: 'Emergency request submitted. Help is on the way.',
      request: { id: requestId, userId, emergencyType, notes, location, status: 'Pending' },
    });
  } catch (error) {
    console.error('Create emergency error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

// GET /api/emergency/:id
const getEmergencyById = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    
    const result = await pool.request()
      .input('id', sql.VarChar(36), id)
      .query('SELECT * FROM emergency_requests WHERE id = @id');

    if (result.recordset.length === 0) {
      return res.status(404).json({ success: false, message: 'Emergency request not found.' });
    }

    const request = result.recordset[0];

    if (request.user_id !== req.user.userId) {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }

    res.status(200).json({ success: true, request });
  } catch (error) {
    console.error('Get emergency error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// GET /api/emergency
const getEmergencyByUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    const pool = await poolPromise;

    const result = await pool.request()
      .input('user_id', sql.VarChar(36), userId)
      .query('SELECT * FROM emergency_requests WHERE user_id = @user_id ORDER BY created_at DESC');

    res.status(200).json({
      success: true,
      count: result.recordset.length,
      requests: result.recordset,
    });
  } catch (error) {
    console.error('Get user emergencies error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// GET /api/emergency/:id/location
const getEmergencyLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;

    const result = await pool.request()
      .input('id', sql.VarChar(36), id)
      .query('SELECT * FROM emergency_requests WHERE id = @id');

    if (result.recordset.length === 0) {
      return res.status(404).json({ success: false, message: 'Emergency request not found.' });
    }

    const request = result.recordset[0];
    if (request.user_id !== req.user.userId) {
      return res.status(403).json({ success: false, message: 'Access denied.' });
    }

    const ambulanceLat = request.lat + (Math.random() * 0.01 - 0.005);
    const ambulanceLng = request.lng + (Math.random() * 0.01 - 0.005);

    res.status(200).json({
      success: true,
      requestId: id,
      userLocation: { lat: request.lat, lng: request.lng },
      ambulanceLocation: {
        lat: parseFloat(ambulanceLat.toFixed(6)),
        lng: parseFloat(ambulanceLng.toFixed(6)),
      },
      eta: '8 minutes',
      status: request.status,
    });
  } catch (error) {
    console.error('Get location error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = {
  createEmergencyRequest,
  getEmergencyById,
  getEmergencyByUser,
  getEmergencyLocation,
};