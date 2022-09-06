import React from "react";
import { StatusBar } from "expo-status-bar";
import { TailwindProvider } from "tailwindcss-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Navigation from "@/components/Navigation";

const App: React.FC = () => {
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
