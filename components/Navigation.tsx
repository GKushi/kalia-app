import React from "react";
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
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={"Home"}
        backBehavior={"none"}
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="List" component={List} />
        <Tab.Screen name="Settings" component={Settings} />
        <Tab.Screen name="New" component={New} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
