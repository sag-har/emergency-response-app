const express = require("express");

const router = express.Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    data: null,
    message: "API Running Successfully",
  });
});

module.exports = router;