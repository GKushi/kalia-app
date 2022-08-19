import React, { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface TabContentProps {
  firstTab: string;
  secondTab: string;
  activeTab: ActiveTab;
  tabPress?: (tab: ActiveTab) => void;
  children?: ReactNode;
}
interface Tab {
  name: string;
  active: boolean;
  onPress?: () => void;
}

const Tab: React.FC<Tab> = ({ name, active, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <View
        className={`py-1 px-5 rounded-t-3xl border-white border-[1.5px] ${
          active ? "bg-white" : "bg-blue -mt-2 border-b-0"
        }`}
      >
        <Text className={`text-2xl ${active ? "text-blue" : "text-white"}`}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const TabContent: React.FC<TabContentProps> = ({
  firstTab,
  secondTab,
  activeTab,
  tabPress,
  children,
}) => {
  return (
    <>
      <View className="flex-row bg-blue justify-center gap-4">
        <View>
          <Tab
            name={firstTab}
            active={activeTab === "first"}
            onPress={() => tabPress && tabPress("first")}
          />
        </View>
        <View>
          <Tab
            name={secondTab}
            active={activeTab === "second"}
            onPress={() => tabPress && tabPress("second")}
          />
        </View>
      </View>
      <View className="bg-white w-full h-full rounded-t-3xl">{children}</View>
    </>
  );
};
export default TabContent;
