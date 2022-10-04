import React, { useState } from "react";
import { Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useTranslation } from "react-i18next";
import {
  style,
  containerStyle,
  dropDownContainerStyle,
} from "@/components/modal/dropDownStyle";

interface AlertsProps {}
const Alerts: React.FC<AlertsProps> = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const local_data = [
    {
      value: "1",
      label: t("oneDay"),
    },
    {
      value: "2",
      label: t("twoDays"),
    },
    {
      value: "3",
      label: t("threeDays"),
    },
    {
      value: "4",
      label: t("week"),
    },
  ];
  const [items, setItems] = useState(local_data);
  const [value, setValue] = useState(items[0].value);

  return (
    <View className="space-y-3">
      <View className="flex-row items-center">
        <Text className="text-xl w-4/6">{t("alertTime")}</Text>
        <View className="w-2/6">
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
          />
        </View>
      </View>
    </View>
  );
};
export default Alerts;
