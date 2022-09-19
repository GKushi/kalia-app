import React, { useState } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "@/screens/Home";
import List from "@/screens/List";
import Settings from "@/screens/Settings";
import New from "@/screens/New";
import TabBar from "@/components/TabBar";

// Screens and their props
type RootStackParamList = {
  Home: undefined;
  List: undefined;
  Settings: undefined;
  New: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  const [showTabBar, setShowTabBar] = useState<boolean>(true);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName={"Home"}
          backBehavior={"none"}
          screenOptions={{
            headerShown: false,
          }}
          tabBar={(props) => (
            <View className={`${showTabBar ? "z-0" : "z-[-1]"}`}>
              <TabBar {...props} />
            </View>
          )}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="List" component={List} />
          <Tab.Screen
            name="Settings"
            children={() => <Settings setShowTabBar={setShowTabBar} />}
          />
          <Tab.Screen
            name="New"
            children={() => <New setShowTabBar={setShowTabBar} />}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigation;
