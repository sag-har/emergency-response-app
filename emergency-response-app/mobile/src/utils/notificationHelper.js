import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";
import API from "../services/api";

// ======================================================
// Notification Handler
// ======================================================

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// ======================================================
// Request Notification Permission
// ======================================================

export const requestNotificationPermission = async () => {
  const { status: existingStatus } =
    await Notifications.getPermissionsAsync();

  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } =
      await Notifications.requestPermissionsAsync();

    finalStatus = status;
  }

  return finalStatus === "granted";
};

// ======================================================
// Register Expo Push Token with Backend
// ======================================================

export const registerForPushNotificationsAsync =
  async () => {
    try {
      const granted =
        await requestNotificationPermission();

      if (!granted) {
        return {
          success: false,
          message:
            "Notification permission not granted",
        };
      }

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync(
          "default",
          {
            name: "default",
            importance:
              Notifications.AndroidImportance.HIGH,
          }
        );
      }

      const projectId =
        Constants?.expoConfig?.extra?.eas
          ?.projectId ||
        Constants?.easConfig?.projectId;

      const tokenResponse =
        await Notifications.getExpoPushTokenAsync(
          projectId
            ? { projectId }
            : undefined
        );

      const expoPushToken =
        tokenResponse?.data;

      if (!expoPushToken) {
        return {
          success: false,
          message:
            "Unable to obtain Expo push token",
        };
      }

      await API.post(
        "/notifications/register-token",
        {
          expoPushToken,
          platform: Platform.OS,
        }
      );

      return {
        success: true,
        token: expoPushToken,
      };
    } catch (error) {
      console.log(
        "Register Push Token Error:",
        error
      );

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to register for push notifications",
      };
    }
  };

// ======================================================
// Notification Listeners
// ======================================================

export const addNotificationListeners = ({
  onReceive,
  onTap,
} = {}) => {
  const receivedSubscription =
    Notifications.addNotificationReceivedListener(
      (notification) => {
        onReceive?.(notification);
      }
    );

  const responseSubscription =
    Notifications.addNotificationResponseReceivedListener(
      (response) => {
        onTap?.(response.notification);
      }
    );

  return () => {
    receivedSubscription.remove();
    responseSubscription.remove();
  };
};