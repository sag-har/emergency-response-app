const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  getNotifications,
  markNotificationRead,
  deleteNotification,
  clearNotifications,
} = require("../controllers/notificationController");

// GET /api/notifications
router.get("/", protect, getNotifications);

// PATCH /api/notifications/:id/read
router.patch("/:id/read", protect, markNotificationRead);

// DELETE /api/notifications  (clear all) -- must be registered before /:id
router.delete("/", protect, clearNotifications);

// DELETE /api/notifications/:id
router.delete("/:id", protect, deleteNotification);

module.exports = router;
