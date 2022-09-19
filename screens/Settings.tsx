import React, { Dispatch, SetStateAction, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SettingsCard from "@/components/SettingsCard";
import { useModal } from "@/components/modal/useModal";
import Theme from "@/components/modal/Theme";
import Currency from "@/components/modal/Currency";
import Language from "@/components/modal/Language";
import Alerts from "@/components/modal/Alerts";
import Modal from "@/components/modal/Modal";

interface SettingsProps {
  setShowTabBar: Dispatch<SetStateAction<boolean>>;
}
interface SettingCard {
  title: string;
  name: string;
}

const Settings: React.FC<SettingsProps> = ({ setShowTabBar }) => {
  const [modal, setTitle, toggleIsShowing] = useModal(setShowTabBar);
  const [modalContent, setModalContent] = useState<string>("");

  const toggleModal = (name: string) => {
    switch (name) {
      case "theme":
        setTitle("Wybierz motyw");
        break;
      case "currency":
        setTitle("Wybierz domyślną walutę");
        break;
      case "language":
        setTitle("Wybierz język");
        break;
      case "alerts":
        setTitle("Powiadomienia");
        break;
    }
    setModalContent(name);
    toggleIsShowing();
  };

  const modalChild = () => {
    switch (modalContent) {
      case "theme":
        return <Theme />;
      case "currency":
        return <Currency />;
      case "language":
        return <Language />;
      case "alerts":
        return <Alerts />;
      default:
        return null;
    }
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
      <Modal modal={modal}>{modalChild()}</Modal>
    </>
  );
};
export default Settings;
