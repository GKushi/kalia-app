import React, { useState } from "react";
import { Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useTranslation } from "react-i18next";
import {
  style,
  containerStyle,
  dropDownContainerStyle,
} from "@/components/modal/dropDownStyle";

const local_data = [
  {
    value: "1",
    label: "PLN",
  },
  {
    value: "2",
    label: "USD",
  },
  {
    value: "3",
    label: "GBP",
  },
  {
    value: "4",
    label: "EUR",
  },
  {
    value: "5",
    label: "CHF",
  },
];

interface CurrencyProps {}
const Currency: React.FC<CurrencyProps> = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(local_data);
  const [value, setValue] = useState(items[0].value);
  const { t } = useTranslation();

  return (
    <View className="space-y-3">
      <View className="flex-row items-center">
        <Text className="text-xl w-3/4">{t("currency")}</Text>
        <View className="w-1/4">
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
export default Currency;
