import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DebtCard from "@/components/DebtCard";
import TabContent from "@/components/TabContent";

const List: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("first");

  const handleTabPress = (tab: ActiveTab): void => {
    setActiveTab(tab);
  };

  const firstrecords = [
    {
      id: "1",
      title: "Za keksik",
      name: "Kasper Gaworski",
      value: "123123124",
      urgent: true,
    },
    {
      id: "13412",
      title: "Zasdasd",
      name: "Kaspeasdworski",
      value: "12123124 dolars",
      urgent: false,
    },
    {
      id: "16547567",
      title: "Zauyiiyuksik",
      name: "Ksdfsdfsdf Gaworski",
      value: "1243124 dol",
      urgent: true,
    },
    {
      id: "123459768",
      title: "Zasdfsdeksik",
      name: "Kaspers fdsdfsdfrski",
      value: "14 $",
      urgent: false,
    },
    {
      id: "1212",
      title: "Zasdfsdfksik",
      name: "Kaspesdfsdfsdf orski",
      value: "124 zł",
      urgent: true,
    },
  ];
  const secondrecords = [
    {
      id: "108978",
      title: "Zaik",
      name: "Ka Gaworski",
      value: "12124",
      urgent: false,
    },
    {
      id: "1124466",
      title: "Zaasd",
      name: "Kaspeasdworski",
      value: "1212 olars",
      urgent: false,
    },
    {
      id: "1234534",
      title: "Zadfgiyuksik",
      name: "Ksdfs orski",
      value: "1243124 dol",
      urgent: true,
    },
    {
      id: "1876434256",
      title: "Zasksik",
      name: "Kasp sdfrski",
      value: "14 $",
      urgent: true,
    },
    {
      id: "112343454568634587",
      title: "Zasdfsdfksik",
      name: "Kasp df orski",
      value: "12 zł",
      urgent: false,
    },
  ];

  return (
    <SafeAreaView className="bg-blue h-full">
      <View className="h-12" />
      <TabContent
        firstTab="Długi"
        secondTab="Należności"
        activeTab={activeTab}
        tabPress={handleTabPress}
      >
        <ScrollView
          className="space-y-4 px-4 mt-10 h-full"
          showsVerticalScrollIndicator={false}
        >
          {activeTab === "first"
            ? firstrecords.map((record) => (
                <View key={record.id}>
                  <DebtCard
                    title={record.title}
                    name={record.name}
                    value={record.value}
                    leftSwipe={{ title: "Usuń" }}
                    rightSwipe={{ title: "Zebrane" }}
                  />
                </View>
              ))
            : secondrecords.map((record) => (
                <View key={record.id}>
                  <DebtCard
                    title={record.title}
                    name={record.name}
                    value={record.value}
                    leftSwipe={{ title: "Usuń" }}
                    rightSwipe={{ title: "Zebrane" }}
                  />
                </View>
              ))}
          <View className="h-[200px]" />
        </ScrollView>
      </TabContent>
    </SafeAreaView>
  );
};
export default List;
