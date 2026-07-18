import * as Notifications from "expo-notifications";

export const requestNotificationPermission =
  async () => {
    await Notifications.requestPermissionsAsync();
  };