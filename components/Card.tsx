import React, { ReactNode } from "react";
import { View, Text } from "react-native";

interface CardProps {
  title: string;
  children?: ReactNode;
}
const Card: React.FC<CardProps> = ({ children, title }) => {
  return (
    <View
      className="bg-white rounded-2xl items-center p-4 space-y-2 w-full"
      style={{
        elevation: 5,
        shadowOffset: { width: 0, height: -2 },
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
      }}
    >
      <Text className="text-black text-sm text-center">{title}</Text>
      <View className="items-center">{children}</View>
    </View>
  );
};
export default Card;
