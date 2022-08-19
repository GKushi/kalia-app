import SettingsCard from "@/components/SettingsCard";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings: React.FC = () => {
  return (
    <SafeAreaView className="bg-blue h-full">
      <View className="items-center py-8">
        <Text className="font-bold text-white text-2xl">Ustawienia</Text>
      </View>
      <ScrollView className="space-y-4 px-4">
        <View>
          <SettingsCard title="Domyślna waluta" />
        </View>
        <View>
          <SettingsCard title="Powiadomienia" />
        </View>
        <View>
          <SettingsCard title="Motyw" />
        </View>
        <View>
          <SettingsCard title="Język" />
        </View>
        <View className="items-center h-full">
          <Text className="text-white w-40 text-center mt-10">
            Developed & designed by GKushi
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Settings;
