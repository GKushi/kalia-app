import React, { ReactNode } from "react";
import { View, TouchableOpacity, AccessibilityRole } from "react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import {
  HomeIcon as HomeIconOutline,
  ClipboardListIcon,
  CogIcon,
  PlusIcon,
} from "react-native-heroicons/outline";

interface TabBarItemProps {
  accessibilityRole: AccessibilityRole;
  isFocused: boolean;
  accessibilityLabel: string | undefined;
  onPress: () => void;
  onLongPress: () => void;
  name: string;
  children: ReactNode;
}

const TabBarItem: React.FC<TabBarItemProps> = ({
  accessibilityRole,
  isFocused,
  accessibilityLabel,
  onPress,
  onLongPress,
  name,
  children,
}) => {
  return (
    <View className="flex-1 justify-center items-center space-y-1">
      <TouchableOpacity
        accessibilityRole={accessibilityRole}
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={accessibilityLabel}
        onPress={onPress}
        onLongPress={onLongPress}
        activeOpacity={0.5}
      >
        {name === "New" ? (
          <View className="bg-purple rounded-full p-2">{children}</View>
        ) : (
          children
        )}
      </TouchableOpacity>
      {name !== "New" && isFocused ? (
        <View className="w-[6px] h-[6px] bg-purple items-center rounded-full" />
      ) : (
        <View></View>
      )}
    </View>
  );
};

const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View
      className="flex-row h-[100px] absolute left-0 bottom-0 right-0 bg-white rounded-t-3xl"
      style={{
        elevation: 24,
        shadowOffset: { width: 0, height: -2 },
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            //     // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate(route.name, { merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const icon = (name: string): JSX.Element | null => {
          const iconProps: iconProps = {
            color: isFocused ? "#CC1CCF" : "#B0B8DB",
            size: "30",
          };

          switch (name) {
            case "Home":
              return <HomeIconOutline {...iconProps} />;
            case "List":
              return <ClipboardListIcon {...iconProps} />;
            case "New":
              return <PlusIcon color="#FCFCFC" size="30" />;
            case "Settings":
              return <CogIcon {...iconProps} />;

            default:
              return null;
          }
        };

        return (
          <TabBarItem
            key={route.name}
            accessibilityRole="button"
            isFocused={isFocused}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            name={route.name}
          >
            {icon(route.name)}
          </TabBarItem>
        );
      })}
    </View>
  );
};

export default TabBar;
