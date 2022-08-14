import React from "react";
import { StatusBar } from "expo-status-bar";
import { TailwindProvider } from "tailwindcss-react-native";
import Navigation from "@/components/Navigation";

const App: React.FC = () => {
  return (
    <TailwindProvider>
      <Navigation />
      <StatusBar style="dark" />
    </TailwindProvider>
  );
};
export default App;
