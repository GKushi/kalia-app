import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { TailwindProvider } from "tailwindcss-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import toastConfig from "@/components/toastConfig";
import Navigation from "@/components/Navigation";
import { initTables } from "@/utils/database";

import "@/settings/language";

const App: React.FC = () => {
  const initDatabase = async () => {
    await initTables()
      .then(() => console.log("success creating database"))
      .catch(() =>
        Toast.show({
          type: "error",
        })
      );
  };

  useEffect(() => {
    initDatabase();
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
