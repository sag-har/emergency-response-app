const { sql } = require("../config/db");

// ===================================================
// GET ALL HOSPITALS
// GET /api/hospitals?lat=33.68&lng=73.04
// ===================================================

const getHospitals = async (req, res) => {
  try {
    const { lat, lng } = req.query;

    const userLat = parseFloat(lat || 33.6844);
    const userLng = parseFloat(lng || 73.0479);

    const result = await sql.query`
      SELECT
        id,
        name,
        address,
        phone,
        lat,
        lng,
        is_available
      FROM Hospitals
      ORDER BY name
    `;

    const hospitals = result.recordset.map((hospital) => {
      const distance = calculateDistance(
        userLat,
        userLng,
        parseFloat(hospital.lat),
        parseFloat(hospital.lng)
      );

      return {
        ...hospital,
        distance: `${distance.toFixed(1)} km`,
      };
    });

    hospitals.sort((a, b) => {
      return parseFloat(a.distance) - parseFloat(b.distance);
    });

    res.status(200).json({
      success: true,
      hospitals,
    });
  } catch (error) {
    console.error("Hospital Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch hospitals",
    });
  }
};

// ===================================================
// GET SINGLE HOSPITAL
// ===================================================

const getHospitalById = async (req, res) => {
  try {
    const { id } = req.params;

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

    res.status(200).json({
      success: true,
      hospital: result.recordset[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ===================================================
// HAVERSINE FORMULA
// ===================================================

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +
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