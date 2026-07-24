const { sql } = require("../config/db");

// ===================================================================
// PUSH NOTIFICATION SERVICE (Week 7)
//
// Sends real push notifications through Expo's Push Notification
// service (https://exp.host/--/api/v2/push/send). This replaces the
// old `mockPushServiceTrigger` which only logged to the console and
// never actually delivered anything to a device.
//
// Uses Node's built-in `fetch` (Node 18+) so no extra dependency is
// required. If a device's Expo push token has been unregistered by
// the OS, Expo returns a "DeviceNotRegistered" error for that ticket;
// we detect that and clean up the stale token so future sends don't
// keep failing against it.
// ===================================================================

const EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send";

/**
 * Look up every device token registered for a user and send them all
 * a push notification. Safe to call even if the user has zero
 * registered devices (e.g. web/testing) — it just becomes a no-op.
 */
const sendPushNotification = async (userId, title, body, data = {}) => {
  try {
    const tokenResult = await sql.query`
      SELECT id, expo_token FROM dbo.device_tokens WHERE TRIM(user_id) = TRIM(${userId})
    `;

    const tokens = tokenResult.recordset;
    if (!tokens || tokens.length === 0) {
      // Nothing registered for this user yet — not an error, just skip.
      return { sent: 0, skipped: true };
    }

    const messages = tokens.map((row) => ({
      to: row.expo_token,
      sound: "default",
      title,
      body,
      data,
      priority: "high",
    }));

    const response = await fetch(EXPO_PUSH_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messages),
    });

    const result = await response.json();
    const tickets = result?.data || [];

    // Clean up any tokens Expo reports as dead so we stop sending to them.
    const staleTokenIds = [];
    tickets.forEach((ticket, index) => {
      if (ticket.status === "error" && ticket.details?.error === "DeviceNotRegistered") {
        staleTokenIds.push(tokens[index].id);
      }
    });

    if (staleTokenIds.length > 0) {
      for (const tokenId of staleTokenIds) {
        await sql.query`DELETE FROM dbo.device_tokens WHERE id = ${tokenId}`;
      }
    }

    return { sent: tickets.length, tickets };
  } catch (error) {
    // A push delivery failure should never crash the request that
    // triggered it (e.g. an emergency status update). Log and move on.
    console.error("Push Notification Send Error:", error.message);
    return { sent: 0, error: error.message };
  }
};

/**
 * Register (or refresh) a device's Expo push token for a user.
 * Upserts on the unique token value so re-registering the same
 * device on app relaunch doesn't create duplicate rows.
 */
const registerDeviceToken = async (userId, expoToken, platform) => {
  const existing = await sql.query`
    SELECT id FROM dbo.device_tokens WHERE expo_token = ${expoToken}
  `;

  if (existing.recordset.length > 0) {
    await sql.query`
      UPDATE dbo.device_tokens
      SET user_id = ${userId}, platform = ${platform || null}, updated_at = GETDATE()
      WHERE expo_token = ${expoToken}
    `;
    return existing.recordset[0].id;
  }

  const crypto = require("crypto");
  const tokenId = crypto.randomUUID();

  await sql.query`
    INSERT INTO dbo.device_tokens (id, user_id, expo_token, platform, created_at, updated_at)
    VALUES (${tokenId}, ${userId}, ${expoToken}, ${platform || null}, GETDATE(), GETDATE())
  `;

  return tokenId;
};

module.exports = { sendPushNotification, registerDeviceToken };