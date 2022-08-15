import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DebtCard from "@/components/DebtCard";

const List: React.FC = () => {
  return (
    <SafeAreaView className="bg-blue h-full">
      <View className="bg-white h-full">
        <Text>List</Text>
        <DebtCard
          title="Za keksik"
          name="Kasper Gaworski"
          value="124231"
          leftSwipe={{ title: "dsgfdg" }}
          urgent
        />
      </View>
    </SafeAreaView>
  );
};
export default List;
