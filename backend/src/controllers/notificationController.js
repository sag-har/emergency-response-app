const { sql } = require("../config/db");

// ============================
// Get Notifications
// ============================

const getNotifications = async (req, res) => {
  try {

    const result = await sql.query`
      SELECT
        id,
        title,
        message,
        is_read,
        created_at
      FROM notification_history
      WHERE user_id = ${req.user.id}
      ORDER BY created_at DESC
    `;

    return res.json({
      success: true,
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

module.exports = {

  getNotifications,
  addNotification,

};