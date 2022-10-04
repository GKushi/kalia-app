import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Swipable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { convertDateToString } from "@/utils/utils";

interface DebtCardProps {
  title: string | null;
  name: string | null;
  endDate: number | null;
  startDate: number | null;
  value?: string;
  type: ItemType;
  leftSwipe?: {
    title: string;
    handler?: () => void;
  };
  rightSwipe?: {
    title: string;
    handler?: () => void;
  };
}
const DebtCard: React.FC<DebtCardProps> = ({
  title,
  name,
  endDate,
  startDate,
  value,
  type,
  leftSwipe,
  rightSwipe,
}) => {
  const { t } = useTranslation();
  // left slide button
  const leftActions = () => {
    if (!leftSwipe) return null;
    return (
      <View className="rounded-l-2xl bg-danger h-full w-2/5 pr-5 -mr-5">
        <TouchableOpacity
          className="h-full w-full justify-center items-center"
          onPress={leftSwipe.handler}
        >
          <Text className="font-bold text-2xl text-white">
            {leftSwipe.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // right slide button
  const rightActions = () => {
    if (!rightSwipe) return null;
    return (
      <View className="rounded-r-2xl bg-success h-full w-2/5 pl-5 -ml-5 ">
        <TouchableOpacity
          className="h-full w-full justify-center items-center"
          onPress={rightSwipe.handler}
        >
          <Text className="font-bold text-2xl text-white">
            {rightSwipe.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  // highlighting card based on date
  const isUrgent = (): boolean => {
    if (!endDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (endDate <= today.getTime()) return true;
    return false;
  };

  return (
    <View
      style={{
        elevation: 5,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: "#000000",
        shadowOpacity: 0.1,
        shadowRadius: 3,
      }}
    >
      <GestureHandlerRootView>
        <Swipable
          renderLeftActions={leftActions}
          renderRightActions={rightActions}
          overshootLeft={false}
          overshootRight={false}
          friction={2}
        >
          <View
            className={`bg-white rounded-2xl items-center w-full border-[1px] ${
              isUrgent() ? "border-danger" : "border-blue"
            } h-[100px] flex-row space-x-2`}
          >
            <View
              className={`h-full border-[1px] ${
                isUrgent() ? "border-danger" : "border-blue"
              } rounded-2xl justify-center items-center px-2 w-[40%]`}
            >
              <Text
                className={`text-2xl ${
                  type === "debt" ? "text-danger" : "text-success"
                } font-semibold`}
                numberOfLines={1}
              >
                {`${type === "debt" ? "-" : "+"}${value}`}
              </Text>
            </View>
            <View className="h-full max-w-[50%] justify-center">
              <Text className="text-2xl font-bold" numberOfLines={1}>
                {title}
              </Text>
              <Text className="text-sm font-medium" numberOfLines={1}>
                {name}
              </Text>
              <Text className="text-[10px]" numberOfLines={1}>
                {`${t("paymentDate")} ${
                  endDate ? convertDateToString(endDate) : "--"
                }`}
              </Text>
              <Text className="text-[10px]" numberOfLines={1}>
                {`${t("from")} ${
                  startDate ? convertDateToString(startDate) : "--"
                }`}
              </Text>
            </View>
          </View>
        </Swipable>
      </GestureHandlerRootView>
    </View>
  );
};
export default DebtCard;
