import React, { Dispatch, SetStateAction } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingsCard from "@/components/SettingsCard";
import { useModal } from "@/components/modal/useModal";
import Theme from "@/components/modal/Theme";
import Currency from "@/components/modal/Currency";
import Language from "@/components/modal/Language";
import Alerts from "@/components/modal/Alerts";

interface SettingsProps {
  setShowTabBar: Dispatch<SetStateAction<boolean>>;
}
interface SettingCard {
  title: string;
  name: string;
}

const Settings: React.FC<SettingsProps> = ({ setShowTabBar }) => {
  const [toggleIsShowing, setModal, modal] = useModal(setShowTabBar);

  const toggleModal = (name: string) => {
    switch (name) {
      case "theme":
        setModal("Wybierz motyw", <Theme />);
        break;
      case "currency":
        setModal("Wybierz domyślną walutę", <Currency />);
        break;
      case "language":
        setModal("Wybierz język", <Language />);
        break;
      case "alerts":
        setModal("Powiadomienia", <Alerts />);
        break;
    }
    toggleIsShowing();
  };

  const settingsCards: SettingCard[] = [
    { title: "Domyślna waluta", name: "currency" },
    { title: "Powiadomienia", name: "alerts" },
    { title: "Motyw", name: "theme" },
    { title: "Język", name: "language" },
  ];

  return (
    <>
      <SafeAreaView className="bg-blue h-full">
        <View className="items-center py-8">
          <Text className="font-bold text-white text-2xl">Ustawienia</Text>
        </View>
        <ScrollView className="space-y-4 px-4">
          {settingsCards.map((card) => (
            <View key={card.title}>
              <SettingsCard
                title={card.title}
                onPress={() => toggleModal(card.name)}
              />
            </View>
          ))}
          <View className="items-center h-full">
            <Text className="text-white w-40 text-center mt-10">
              Developed & designed by GKushi
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      {modal}
    </>
  );
};
export default Settings;
