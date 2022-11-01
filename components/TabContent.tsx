import React, { ReactNode, useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "@/settings/ThemeContext";

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
  const { isDark } = useContext(ThemeContext) || ({} as IThemeContext);
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <View
        className={`py-1 px-5 rounded-t-3xl ${
          isDark ? "border-gray" : "border-white"
        } border-[1.5px] ${
          active
            ? isDark
              ? "bg-gray"
              : "bg-white"
            : isDark
            ? "bg-black -mt-2 border-b-0"
            : "bg-blue -mt-2 border-b-0"
        }`}
      >
        <Text
          className={`text-2xl ${
            active ? (isDark ? "text-white" : "text-blue") : "text-white"
          }`}
        >
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
  const { isDark } = useContext(ThemeContext) || ({} as IThemeContext);
  return (
    <>
      <View
        className={`${
          isDark ? "bg-black" : "bg-blue"
        } flex-row justify-center gap-4`}
      >
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
      <View
        className={`${
          isDark ? "bg-gray" : "bg-white"
        } w-full h-full rounded-t-3xl`}
      >
        {children}
      </View>
    </>
  );
};
export default TabContent;
