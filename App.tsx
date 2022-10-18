import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { StatusBar } from "expo-status-bar";
import { TailwindProvider } from "tailwindcss-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import toastConfig from "@/components/toastConfig";
import Navigation from "@/components/Navigation";
import { initTables } from "@/utils/database";
import { initCurrency } from "@/settings/currency";
import { initAlert } from "@/settings/alerts";

import "@/settings/language";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

const App: React.FC = () => {
  const initDefaults = async () => {
    await initTables()
      .then(() => console.log("success creating database"))
      .catch(() =>
        Toast.show({
          type: "error",
        })
      );
    await initCurrency();
    await initAlert();
  };

  useEffect(() => {
    initDefaults();
  }, []);

  return (
    <TailwindProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigation />
        <Toast visibilityTime={1500} config={toastConfig} />
      </GestureHandlerRootView>
      <StatusBar style="light" />
    </TailwindProvider>
  );
};
export default App;
