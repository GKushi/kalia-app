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
import { getAlert, alerts, setAlert } from "@/settings/alerts";
import { ThemeContext } from "@/settings/ThemeContext";

const Alerts: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [items, setItems] = useState<ItemType<string>[]>([]);
  const [value, setValue] = useState<string | null>(null);
  const { t } = useTranslation();
  const { isDark } = useContext(ThemeContext) || ({} as IThemeContext);

  // fetchin default alerts for initial picker value
  const getCurrentAlert = async (): Promise<void> => {
    await getAlert().then((r) => {
      if (r === null) {
        setValue(alerts[0].type);
        return;
      }
      setValue(r.type);
    });
  };

  // changing the default alert
  const setCurrentAlert = async (alert: ItemType<string>) => {
    if (!alert.value) return;
    // find selected value in alert by value
    const alertObj: Alert =
      alerts.find((item) => item.type === alert.value) || alerts[0];
    await setAlert(alertObj);
  };

  useEffect(() => {
    getCurrentAlert();
    // mapping all app alerts to picker
    alerts.map((option) => {
      setItems((prevState) => [
        ...prevState,
        {
          value: option.type,
          label: t(option.text),
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
          className={`${isDark ? "text-white" : "text-black"} text-xl w-4/6`}
        >
          {t("alertTime")}
        </Text>
        <View className="w-2/6">
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
            onSelectItem={setCurrentAlert}
          />
        </View>
      </View>
    </View>
  );
};
export default Alerts;
