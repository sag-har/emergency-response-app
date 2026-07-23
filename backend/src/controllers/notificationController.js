const { sql } = require("../config/db");
const { registerDeviceToken } = require("../services/pushService");

// ===================================================
// REGISTER (OR REFRESH) A DEVICE'S EXPO PUSH TOKEN
// POST /api/notifications/register-token
// Called on app load once the user is authenticated, and
// again whenever Expo issues a new token for the device.
// ===================================================
const registerToken = async (req, res) => {
  try {
    const userId = req.user.id;
    const { expoPushToken, platform } = req.body;

    if (!expoPushToken) {
      return res.status(400).json({ success: false, message: "expoPushToken is required" });
    }

    await registerDeviceToken(userId, expoPushToken, platform);

    res.status(200).json({ success: true, message: "Device token registered" });
  } catch (error) {
    console.error("Register Device Token Error:", error);
    res.status(500).json({ success: false, message: "Server Error registering device token" });
  }
};

// ===================================================
// GET ALL NOTIFICATIONS FOR LOGGED-IN USER
// GET /api/notifications
// ===================================================
const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await sql.query`
      SELECT id, user_id, title, message, is_read, created_at
      FROM dbo.notification_history
      WHERE TRIM(user_id) = TRIM(${userId})
      ORDER BY created_at DESC
    `;

    res.status(200).json({
      success: true,
      count: result.recordset.length,
      data: result.recordset,
    });
  } catch (error) {
    console.error("Get Notifications Error:", error);
    res.status(500).json({ success: false, message: "Server Error retrieving notifications" });
  }
};

// ===================================================
// MARK NOTIFICATION AS READ
// PATCH /api/notifications/:id/read
// ===================================================
const markNotificationRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const existing = await sql.query`
      SELECT id FROM dbo.notification_history
      WHERE TRIM(id) = TRIM(${id}) AND TRIM(user_id) = TRIM(${userId})
    `;

    if (existing.recordset.length === 0) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    await sql.query`
      UPDATE dbo.notification_history
      SET is_read = 1
      WHERE TRIM(id) = TRIM(${id})
    `;

    res.status(200).json({ success: true, message: "Notification marked as read" });
  } catch (error) {
    console.error("Mark Notification Read Error:", error);
    res.status(500).json({ success: false, message: "Server Error updating notification" });
  }
};

// ===================================================
// DELETE A SINGLE NOTIFICATION
// DELETE /api/notifications/:id
// ===================================================
const deleteNotification = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const existing = await sql.query`
      SELECT id FROM dbo.notification_history
      WHERE TRIM(id) = TRIM(${id}) AND TRIM(user_id) = TRIM(${userId})
    `;

    if (existing.recordset.length === 0) {
      return res.status(404).json({ success: false, message: "Notification not found" });
    }

    await sql.query`
      DELETE FROM dbo.notification_history WHERE TRIM(id) = TRIM(${id})
    `;

    res.status(200).json({ success: true, message: "Notification deleted" });
  } catch (error) {
    console.error("Delete Notification Error:", error);
    res.status(500).json({ success: false, message: "Server Error deleting notification" });
  }
};

// ===================================================
// CLEAR ALL NOTIFICATIONS FOR LOGGED-IN USER
// DELETE /api/notifications
// ===================================================
const clearNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    await sql.query`
      DELETE FROM dbo.notification_history WHERE TRIM(user_id) = TRIM(${userId})
    `;

    res.status(200).json({ success: true, message: "All notifications cleared" });
  } catch (error) {
    console.error("Clear Notifications Error:", error);
    res.status(500).json({ success: false, message: "Server Error clearing notifications" });
  }
};

module.exports = {
  registerToken,
  getNotifications,
  markNotificationRead,
  deleteNotification,
  clearNotifications,
};
