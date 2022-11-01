import React, { useContext } from "react";
import { Text, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "@/settings/ThemeContext";

interface CheckboxOption {
  value: boolean;
  name: Theme;
}
const Theme: React.FC = () => {
  const { t } = useTranslation();
  const context = useContext(ThemeContext);

  const checkboxOptions: CheckboxOption[] = [
    {
      value: context?.themeState === "default",
      name: "default",
    },
    {
      value: context?.themeState === "light",
      name: "light",
    },
    {
      value: context?.themeState === "dark",
      name: "dark",
    },
  ];

  return (
    <View className="space-y-3">
      {checkboxOptions.map((option) => (
        <View className="flex-row gap-4 items-center" key={option.name}>
          <Text
            className={`${
              context?.isDark ? "text-white" : "text-black"
            } text-xl w-3/4`}
          >
            {t(option.name)}
          </Text>
          <Checkbox
            className={`rounded-full w-8 h-8 border-4 mr-6`}
            color="#CC1CCF"
            value={option.value}
            onValueChange={() => context?.changeTheme(option.name)}
          />
        </View>
      ))}
    </View>
  );
};
export default Theme;
