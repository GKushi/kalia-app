import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import { useTranslation } from "react-i18next";
import {
  lightStyle,
  darkStyle,
  containerStyle,
  lightDropDownContainerStyle,
  darkDropDownContainerStyle,
  lightText,
  darkText,
} from "@/components/modal/dropDownStyle";
import { currency, getCurrency, setCurrency } from "@/settings/currency";
import { ThemeContext } from "@/settings/ThemeContext";

const Currency: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [items, setItems] = useState<ItemType<string>[]>([]);
  const [value, setValue] = useState<string | null>(null);
  const { t } = useTranslation();
  const { isDark } = useContext(ThemeContext) || ({} as IThemeContext);

  // fetchin default currency for initial picker value
  const getCurrentCurrency = async (): Promise<void> => {
    await getCurrency().then((r) => {
      if (r === null) {
        setValue(currency[0].norm);
        return;
      }
      setValue(r.norm);
    });
  };

  // changing the default currency
  const setCurrentCurrency = async (currency: ItemType<string>) => {
    if (!currency.value || !currency.label) return;
    const currencyObject: Currency = {
      iso: currency.label,
      norm: currency.value,
    };
    await setCurrency(currencyObject);
  };

  useEffect(() => {
    getCurrentCurrency();
    // mapping all app currency to picker
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
        <Text
          className={`${isDark ? "text-white" : "text-black"} text-xl w-1/2`}
        >
          {t("currency")}
        </Text>
        <View className="w-1/2">
          <DropDownPicker
            style={isDark ? darkStyle : lightStyle}
            containerStyle={containerStyle}
            dropDownContainerStyle={
              isDark ? darkDropDownContainerStyle : lightDropDownContainerStyle
            }
            textStyle={isDark ? lightText : darkText}
            listItemLabelStyle={isDark ? lightText : darkText}
            theme={isDark ? "DARK" : "LIGHT"}
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
