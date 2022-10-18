import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { t } from "i18next";

// list of available alerts

export const alerts: Alert[] = [
  { type: "day", text: "oneDay", ms: 86400000 },
  { type: "twoDays", text: "twoDays", ms: 172800000 },
  { type: "threeDays", text: "threeDays", ms: 259200000 },
  { type: "week", text: "week", ms: 604800000 },
];

export const getAlert = async (): Promise<Alert | null> => {
  return await AsyncStorage.getItem("alert")
    .then((r) => {
      if (r === null) return null;
      return JSON.parse(r);
    })
    .catch(() => {
      Toast.show({
        type: "error",
      });
      return null;
    });
};

export const setAlert = async (alert: Alert): Promise<void> => {
  const jsonValue = JSON.stringify(alert);
  await AsyncStorage.setItem("alert", jsonValue).catch(() => {
    Toast.show({
      type: "error",
    });
  });
};

// init default alert
export const initAlert = async (): Promise<void> => {
  await getAlert().then(async (r) => {
    if (r !== null) return;
    await setAlert(alerts[0]);
  });
};

export const scheduleNotifications = async (
  end: number,
  type: ItemType
): Promise<void> => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const alert = await getAlert().then((r) => {
    if (r === null) {
      return alerts[0];
    }
    return r;
  });

  // scheldue notification only if notification might be displayed
  if (end - alert.ms <= today.getTime()) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Kalia",
      body: type === "debt" ? t("debtNotification") : t("dueNotification"),
    },
    trigger: end,
  });
};
