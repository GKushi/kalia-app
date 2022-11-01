import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import { ThemeContext } from "@/settings/ThemeContext";

interface SettingsCardProps {
  title: string;
  onPress?: () => void;
}
const SettingsCard: React.FC<SettingsCardProps> = ({ title, onPress }) => {
  const { isDark } = useContext(ThemeContext) || ({} as IThemeContext);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      className={`${isDark ? "bg-gray" : "bg-white"} rounded-2xl p-4 w-full`}
      style={{
        elevation: 5,
        shadowOffset: { width: 0, height: -2 },
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
      }}
    >
      <View className="flex-row items-center justify-between">
        <Text
          className={`${isDark ? "text-white" : "text-black"} text-2xl`}
          numberOfLines={1}
        >
          {title}
        </Text>
        <ChevronRightIcon color={isDark ? "#FCFCFC" : "#2F3648"} size={20} />
      </View>
    </TouchableOpacity>
  );
};
export default SettingsCard;
