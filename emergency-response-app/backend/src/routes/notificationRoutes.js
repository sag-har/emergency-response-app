const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  registerToken,
  getNotifications,
  markNotificationRead,
  deleteNotification,
  clearNotifications,
} = require("../controllers/notificationController");

// ==========================================
// Register / Refresh Expo Push Token
// POST /api/notifications/register-token
// ==========================================
router.post("/register-token", auth, registerToken);

// ==========================================
// Get All Notifications
// GET /api/notifications
// ==========================================
router.get("/", auth, getNotifications);

// ==========================================
// Mark Notification as Read
// PATCH /api/notifications/:id/read
// ==========================================
router.patch("/:id/read", auth, markNotificationRead);

// ==========================================
// Clear All Notifications
// DELETE /api/notifications
// Must come BEFORE /:id
// ==========================================
router.delete("/", auth, clearNotifications);

// ==========================================
// Delete Single Notification
// DELETE /api/notifications/:id
// ==========================================
router.delete("/:id", auth, deleteNotification);

module.exports = router;