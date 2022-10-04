import React, { useState } from "react";
import { Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useTranslation } from "react-i18next";

interface ThemeProps {}
interface CheckboxOption {
  title: string;
  value: boolean;
  name: string;
}
const Theme: React.FC<ThemeProps> = () => {
  const [isDefault, setIsDefault] = useState<boolean>(true);
  const [isLight, setIsLight] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleCheckboxClick = (name: string): void => {
    switch (name) {
      case "default":
        setIsDefault(true);
        setIsLight(false);
        setIsDark(false);
        break;
      case "dark":
        setIsDark(true);
        setIsDefault(false);
        setIsLight(false);
        break;
      case "light":
        setIsLight(true);
        setIsDefault(false);
        setIsDark(false);
        break;
    }
  };

  const checkboxOptions: CheckboxOption[] = [
    {
      title: t("defaultTheme"),
      value: isDefault,
      name: "default",
    },
    { title: t("lightTheme"), value: isLight, name: "light" },
    { title: t("darkTheme"), value: isDark, name: "dark" },
  ];

  return (
    <View className="space-y-3">
      {checkboxOptions.map((option) => (
        <View className="flex-row gap-4 items-center" key={option.title}>
          <Text className="text-xl w-3/4">{option.title}</Text>
          <Checkbox
            className={`rounded-full w-8 h-8 border-4 mr-6`}
            color="#CC1CCF"
            value={option.value}
            onValueChange={() => handleCheckboxClick(option.name)}
          />
        </View>
      ))}
    </View>
  );
};
export default Theme;
