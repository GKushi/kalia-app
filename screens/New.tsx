import React, { useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TabContent from "@/components/TabContent";

const New: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("first");

  const handleTabPress = (tab: ActiveTab): void => {
    setActiveTab(tab);
  };

  return (
    <SafeAreaView className="bg-blue h-full">
      <View className="items-center py-8">
        <Text className="font-bold text-white text-2xl">Dodaj nowy</Text>
      </View>
      <TabContent
        firstTab="Dług"
        secondTab="Należność"
        activeTab={activeTab}
        tabPress={handleTabPress}
      >
        <ScrollView
          className="space-y-4 px-4 mt-10 h-full"
          showsVerticalScrollIndicator={false}
        >
          <View className="h-[200px]" />
        </ScrollView>
      </TabContent>
    </SafeAreaView>
  );
};
export default New;
