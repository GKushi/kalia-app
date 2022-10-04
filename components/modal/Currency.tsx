import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import { useTranslation } from "react-i18next";
import {
  style,
  containerStyle,
  dropDownContainerStyle,
} from "@/components/modal/dropDownStyle";
import { currency, getCurrency, setCurrency } from "@/settings/currency";

interface CurrencyProps {}
const Currency: React.FC<CurrencyProps> = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [items, setItems] = useState<ItemType<string>[]>([]);
  const [value, setValue] = useState<string | null>(null);
  const { t } = useTranslation();

  const getCurrentCurrency = async (): Promise<void> => {
    await getCurrency().then((r) => {
      if (r === null) {
        setValue(currency[0].norm);
        return;
      }
      setValue(r.norm);
    });
  };

  const setCurrentCurrency = async (currency: ItemType<string>) => {
    if (!currency.value || !currency.label) return;
    await setCurrency({ iso: currency.label, norm: currency.value });
  };

  useEffect(() => {
    getCurrentCurrency();
    currency.map((str) => {
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
        <Text className="text-xl w-1/2">{t("currency")}</Text>
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
            onSelectItem={setCurrentCurrency}
          />
        </View>
      </View>
    </View>
  );
};
export default Currency;
