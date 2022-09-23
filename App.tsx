import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { TailwindProvider } from "tailwindcss-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Navigation from "@/components/Navigation";
import { initTables } from "./utils/database";

const App: React.FC = () => {
  const initDatabase = async () => {
    await initTables()
      .then(() => console.log("success creating database"))
      .catch(() => console.log("error creating database"));
  };

  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <TailwindProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigation />
      </GestureHandlerRootView>
      <StatusBar style="light" />
    </TailwindProvider>
  );
};
export default App;
