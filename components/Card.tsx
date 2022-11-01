import React, { ReactNode, useContext } from "react";
import { View, Text } from "react-native";
import { ThemeContext } from "@/settings/ThemeContext";

interface CardProps {
  title: string;
  children?: ReactNode;
}
const Card: React.FC<CardProps> = ({ children, title }) => {
  const { isDark } = useContext(ThemeContext) || ({} as IThemeContext);
  return (
    <View
      className={`${
        isDark ? "bg-gray" : "bg-white"
      } rounded-2xl items-center p-4 space-y-2 w-full`}
      style={{
        elevation: 5,
        shadowOffset: { width: 0, height: -2 },
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
      }}
    >
      <Text
        className={`${
          isDark ? "text-white" : "text-black"
        } text-sm text-center`}
      >
        {title}
      </Text>
      <View className="items-center">{children}</View>
    </View>
  );
};
export default Card;
