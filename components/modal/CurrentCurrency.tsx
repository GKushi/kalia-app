import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Text, View } from "react-native";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import { useTranslation } from "react-i18next";
import {
  style,
  containerStyle,
  dropDownContainerStyle,
} from "@/components/modal/dropDownStyle";
import { currency as allCurrency } from "@/settings/currency";

interface CurrentCurrencyProps {
  currency: string | null;
  setCurrency: Dispatch<SetStateAction<string | null>>;
}
const CurrentCurrency: React.FC<CurrentCurrencyProps> = ({
  currency,
  setCurrency,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [items, setItems] = useState<ItemType<string>[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    // mapping all app currency to picker
    allCurrency.map((str) => {
      setItems((prevState) => [
        ...prevState,
        {
          value: str.norm,
          label: str.iso,
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
        <Text className="text-xl w-3/4">{t("currency")}</Text>
        <View className="w-1/4">
          <DropDownPicker
            style={style}
            containerStyle={containerStyle}
            dropDownContainerStyle={dropDownContainerStyle}
            open={open}
            value={currency}
            items={items}
            setOpen={setOpen}
            setValue={setCurrency}
            setItems={setItems}
          />
        </View>
      </View>
    </View>
  );
};
export default CurrentCurrency;
