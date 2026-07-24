import API from "./api";

// ==========================================
// GET ALL NOTIFICATIONS
// GET /api/notifications
// ==========================================
export const getNotifications = async () => {
  try {
    const response = await API.get("/notifications");

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Unable to load notifications.",
      }
    );
  }
};

// ==========================================
// GET UNREAD NOTIFICATIONS
// ==========================================
export const getUnreadNotifications = async () => {
  try {
    const response = await getNotifications();

    if (!response.success) {
      return [];
    }

    return response.data.filter(
      (notification) => !notification.is_read
    );
  } catch {
    return [];
  }
};

// ==========================================
// MARK AS READ
// PATCH /api/notifications/:id/read
// ==========================================
export const markAsRead = async (
  notificationId
) => {
  try {
    const response = await API.patch(
      `/notifications/${notificationId}/read`
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Unable to mark notification as read.",
      }
    );
  }
};

// ==========================================
// DELETE NOTIFICATION
// DELETE /api/notifications/:id
// ==========================================
export const deleteNotification = async (
  notificationId
) => {
  try {
    const response = await API.delete(
      `/notifications/${notificationId}`
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Unable to delete notification.",
      }
    );
  }
};

// ==========================================
// CLEAR ALL NOTIFICATIONS
// ==========================================
export const clearNotifications = async () => {
  try {
    const response = await API.delete(
      "/notifications"
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Unable to clear notifications.",
      }
    );
  }
};

// ==========================================
// GET UNREAD COUNT
// ==========================================
export const getUnreadCount = async () => {
  try {
    const unread = await getUnreadNotifications();

    return unread.length;
  } catch {
    return 0;
  }
};

// ==========================================
// REFRESH NOTIFICATIONS
// ==========================================
export const refreshNotifications = async () => {
  return await getNotifications();
};