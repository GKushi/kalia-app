import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronRightIcon } from "react-native-heroicons/outline";

interface SettingsCardProps {
  title: string;
  onPress?: () => void;
}
const SettingsCard: React.FC<SettingsCardProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <View
        className="bg-white rounded-2xl p-4 w-full"
        style={{
          elevation: 5,
          shadowOffset: { width: 0, height: -2 },
          shadowColor: "#000000",
          shadowOpacity: 0.2,
          shadowRadius: 10,
        }}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-black text-2xl" numberOfLines={1}>
            {title}
          </Text>
          <ChevronRightIcon color="#000000" size={20} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default SettingsCard;
