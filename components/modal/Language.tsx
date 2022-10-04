import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import {
  style,
  containerStyle,
  dropDownContainerStyle,
} from "@/components/modal/dropDownStyle";
import translations from "@/settings/translations";

interface LanguageProps {
  toggleIsShowing: () => void;
}

const Language: React.FC<LanguageProps> = ({ toggleIsShowing }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [items, setItems] = useState<ItemType<string>[]>([]);
  const [value, setValue] = useState<string>(i18n.language);
  const { t } = useTranslation();

  // change app language and close modal
  const langChange = (en: ItemType<string>) => {
    if (!en.value) return;
    i18n.changeLanguage(en.value);
    toggleIsShowing();
  };

  useEffect(() => {
    // map supported langs into picker
    Object.entries(translations).map((lang) => {
      setItems((prevState) => [
        ...prevState,
        {
          value: lang[0],
          label: lang[1].translation.languageName,
        },
      ]);
    });
    return () => {
      setItems([]);
    };
  }, []);

  return (
    <View className="space-y-3">
      <View className="flex-row items-center">
        <Text className="text-xl w-1/2">{t("languageLabel")}</Text>
        <View className="w-1/2">
          <DropDownPicker
            style={style}
            containerStyle={containerStyle}
            dropDownContainerStyle={dropDownContainerStyle}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onSelectItem={langChange}
          />
        </View>
      </View>
    </View>
  );
};
export default Language;
