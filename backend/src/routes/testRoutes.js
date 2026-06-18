const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

router.get("/profile", protect, (req, res) => {
  res.json({
    success: true,
    message: "Profile data fetched through active session",
    user: req.user,
  });
});

module.exports = router;