import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import API from "../services/api";

// ===================================================================
// PUSH NOTIFICATION HELPER (Week 7)
//
// Handles the full lifecycle the backend expects:
//   1. Ask the OS for notification permission.
//   2. Get this device's Expo push token.
//   3. Send that token to the backend so it can be used later when an
//      emergency status changes (see notificationController.registerToken).
//   4. Configure how notifications should be presented while the app
//      is in the foreground.
//   5. Provide listener setup for both foreground (app open) and
//      background/killed-state (tap to open) notification delivery.
// ===================================================================

// While the app is open and in the foreground, still show an alert +
// play a sound instead of silently queuing the notification.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const requestNotificationPermission = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === "granted";
};

/**
 * Requests permission, fetches this device's Expo push token, and
 * registers it with the backend so status-change pushes can reach it.
 * Safe to call multiple times (e.g. every app load) — the backend
 * upserts on the token value.
 */
export const registerForPushNotificationsAsync = async () => {
  try {
    const granted = await requestNotificationPermission();
    if (!granted) {
      return { success: false, message: "Notification permission not granted" };
    }

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.HIGH,
      });
    }

    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ||
      Constants?.easConfig?.projectId;

    const tokenResponse = await Notifications.getExpoPushTokenAsync(
      projectId ? { projectId } : undefined
    );

    const expoPushToken = tokenResponse?.data;
    if (!expoPushToken) {
      return { success: false, message: "Unable to obtain Expo push token" };
    }

    await API.post("/notifications/register-token", {
      expoPushToken,
      platform: Platform.OS,
    });

    return { success: true, token: expoPushToken };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to register for push notifications",
    };
  }
};

/**
 * Wires up listeners for notifications received while the app is
 * foregrounded, and for taps on a notification that opened/resumed
 * the app from the background. Returns a cleanup function to call
 * from a useEffect's return.
 */
export const addNotificationListeners = ({ onReceive, onTap } = {}) => {
  const receivedSubscription = Notifications.addNotificationReceivedListener((notification) => {
    onReceive?.(notification);
  });

  const responseSubscription = Notifications.addNotificationResponseReceivedListener((response) => {
    onTap?.(response.notification);
  });

  return () => {
    receivedSubscription.remove();
    responseSubscription.remove();
  };
};
