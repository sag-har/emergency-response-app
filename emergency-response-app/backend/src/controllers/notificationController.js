const { sql } = require("../config/db");
const { registerDeviceToken } = require("../services/pushService");

// ============================
// Get Notifications
// ============================

const getNotifications = async (req, res) => {
  try {

    const result = await sql.query`
SELECT
    id,
    user_id,
    title,
    message,
    is_read,
    created_at
FROM notification_history
WHERE TRIM(user_id)=TRIM(${req.user.id})
ORDER BY created_at DESC
`;
    return res.json({
    success: true,
    count: result.recordset.length,
    data: result.recordset,
});

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// ============================
// Add Notification
// ============================

const addNotification = async (
  userId,
  title,
  message
) => {

  await sql.query`
INSERT INTO notification_history
(
    id,
    user_id,
    title,
    message,
    is_read,
    created_at
)
VALUES
(
    NEWID(),
    ${userId},
    ${title},
    ${message},
    0,
    GETDATE()
)
`;
}

// ===================================================
// REGISTER DEVICE TOKEN
// ===================================================

const registerToken = async (req, res) => {
  try {
    const userId = req.user.id;
    const { expoPushToken, platform } = req.body;

    if (!expoPushToken) {
      return res.status(400).json({
        success: false,
        message: "expoPushToken is required",
      });
    }

    await registerDeviceToken(
      userId,
      expoPushToken,
      platform
    );

    res.status(200).json({
      success: true,
      message: "Device token registered",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===================================================
// MARK NOTIFICATION AS READ
// ===================================================

const markNotificationRead = async (req, res) => {
  try {

    const userId = req.user.id;
    const { id } = req.params;

    const existing = await sql.query`
      SELECT id
      FROM notification_history
      WHERE TRIM(id)=TRIM(${id})
      AND TRIM(user_id)=TRIM(${userId})
    `;

    if (existing.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    await sql.query`
      UPDATE notification_history
      SET is_read=1
      WHERE TRIM(id)=TRIM(${id})
    `;

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===================================================
// DELETE NOTIFICATION
// ===================================================

const deleteNotification = async (req, res) => {
  try {

    const userId = req.user.id;
    const { id } = req.params;

    const existing = await sql.query`
      SELECT id
      FROM notification_history
      WHERE TRIM(id)=TRIM(${id})
      AND TRIM(user_id)=TRIM(${userId})
    `;

    if (existing.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    await sql.query`
      DELETE FROM notification_history
      WHERE TRIM(id)=TRIM(${id})
    `;

    res.status(200).json({
      success: true,
      message: "Notification deleted",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===================================================
// CLEAR ALL NOTIFICATIONS
// ===================================================

const clearNotifications = async (req, res) => {
  try {

    const userId = req.user.id;

    await sql.query`
      DELETE FROM notification_history
      WHERE TRIM(user_id)=TRIM(${userId})
    `;

    res.status(200).json({
      success: true,
      message: "All notifications cleared",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  registerToken,
  getNotifications,
  addNotification,
  markNotificationRead,
  deleteNotification,
  clearNotifications,
};