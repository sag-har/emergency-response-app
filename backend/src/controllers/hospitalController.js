const { sql } = require("../config/db");

// ===================================================
// GET ALL HOSPITALS
// GET /api/hospitals?lat=33.68&lng=73.04
// ===================================================
const getHospitals = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    // Fallback coordinates (Islamabad) agar query parameters na milen
    const userLat = parseFloat(lat || 33.6844);
    const userLng = parseFloat(lng || 73.0479);

    // Exact match with your SS: Table is "Hospitals", columns are lat, lng, phone
    const result = await sql.query`
      SELECT
        id,
        name,
        address,
        lat,
        lng,
        phone,
        is_available
      FROM Hospitals
    `;

    const hospitals = result.recordset.map((hospital) => {
      // Calculate distance using exact DB column names from screenshot
      const distance = calculateDistance(
        userLat,
        userLng,
        parseFloat(hospital.lat || 0),
        parseFloat(hospital.lng || 0)
      );

      return {
        id: hospital.id,
        name: hospital.name,
        address: hospital.address,
        lat: hospital.lat,
        lng: hospital.lng,
        phone: hospital.phone,
        is_available: hospital.is_available,
        distance: `${distance.toFixed(1)} km`,
        distanceNum: distance // Kept for exact sorting accuracy
      };
    });

    // Sorting by distance so the closest hospital shows first
    hospitals.sort((a, b) => a.distanceNum - b.distanceNum);

    // Remove the numeric helper before sending response to frontend
    hospitals.forEach(h => delete h.distanceNum);

    res.status(200).json({
      success: true,
      hospitals,
    });
  } catch (error) {
    console.error("Hospital Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch hospitals",
      error: error.message
    });
  }
};

// ===================================================
// GET SINGLE HOSPITAL
// ===================================================
const getHospitalById = async (req, res) => {
  try {
    const { id } = req.params;

    // Query matching the exact Hospitals table name
    const result = await sql.query`
      SELECT *
      FROM Hospitals
      WHERE id = ${id}
    `;

    if (result.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Hospital not found",
      });
    }

    const hospital = result.recordset[0];

    // Explicit structural mapping matching the screenshot fields
    const formattedHospital = {
      id: hospital.id,
      name: hospital.name,
      address: hospital.address,
      lat: hospital.lat,
      lng: hospital.lng,
      phone: hospital.phone,
      is_available: hospital.is_available,
      created_at: hospital.created_at
    };

    res.status(200).json({
      success: true,
      hospital: formattedHospital,
    });
  } catch (error) {
    console.error("GetHospitalById Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
};

// ===================================================
// HAVERSINE FORMULA
// ===================================================
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

module.exports = {
  getHospitals,
  getHospitalById,
};