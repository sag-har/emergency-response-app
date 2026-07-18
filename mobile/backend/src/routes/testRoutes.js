const express = require("express");
const router = express.Router();
const { sql } = require("../config/db");

// This file didn't exist in the uploaded project but was required by
// server.js (`require("./src/routes/testRoutes")`), which meant the app
// would crash immediately on startup. This is a minimal stand-in — extend
// it with whatever test/debug endpoints you actually need, or remove the
// require() in server.js if you don't need this route group at all.

// GET /api/test/db -> quick DB connectivity check
router.get("/db", async (req, res) => {
  try {
    const result = await sql.query`SELECT GETDATE() AS serverTime`;
    res.status(200).json({
      success: true,
      message: "Database connection is healthy",
      serverTime: result.recordset[0].serverTime,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
});

module.exports = router;
