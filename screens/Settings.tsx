import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import SettingsCard from "@/components/SettingsCard";
import { useModal } from "@/components/modal/useModal";
import Theme from "@/components/modal/Theme";
import Currency from "@/components/modal/Currency";
import Language from "@/components/modal/Language";
import Alerts from "@/components/modal/Alerts";
import Modal from "@/components/modal/Modal";
import { ThemeContext } from "@/settings/ThemeContext";

interface SettingsProps {
  setShowTabBar: Dispatch<SetStateAction<boolean>>;
}
interface SettingCard {
  title: string;
  name: string;
}

const Settings: React.FC<SettingsProps> = ({ setShowTabBar }) => {
  // modal
  const [modal, setTitle, toggleIsShowing] = useModal(setShowTabBar);
  const [modalContent, setModalContent] = useState<string>("");
  const { t } = useTranslation();
  const { isDark } = useContext(ThemeContext) || ({} as IThemeContext);

  // open modal
  const toggleModal = (name: string) => {
    switch (name) {
      case "theme":
        setTitle(t("themeTitle"));
        break;
      case "currency":
        setTitle(t("currencyTitle"));
        break;
      case "language":
        setTitle(t("languageTitle"));
        break;
      case "alerts":
        setTitle(t("alertsTitle"));
        break;
    }
    setModalContent(name);
    toggleIsShowing();
  };

  // render modal content
  const modalChild = () => {
    switch (modalContent) {
      case "theme":
        return <Theme />;
      case "currency":
        return <Currency />;
      case "language":
        return <Language toggleIsShowing={toggleIsShowing} />;
      case "alerts":
        return <Alerts />;
      default:
        return null;
    }
  };

  // labels for settings buttons
  const settingsCards: SettingCard[] = [
    { title: t("currencyLabel"), name: "currency" },
    { title: t("alertsLabel"), name: "alerts" },
    { title: t("themeLabel"), name: "theme" },
    { title: t("languageLabel"), name: "language" },
  ];

  return (
    <>
      <SafeAreaView className={`${isDark ? "bg-black" : "bg-blue"} h-full`}>
        <View className="items-center py-8">
          <Text className="font-bold text-white text-2xl">{t("settings")}</Text>
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
          <View className="h-[150px]" />
        </ScrollView>
      </SafeAreaView>
      <Modal modal={modal} height={400}>
        {modalChild()}
      </Modal>
    </>
  );
};
export default Settings;
