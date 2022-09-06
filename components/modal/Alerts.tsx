import React, { useState } from "react";
import { Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import {
  style,
  containerStyle,
  dropDownContainerStyle,
} from "@/components/modal/dropDownStyle";

const local_data = [
  {
    value: "1",
    label: "1 dzień",
  },
  {
    value: "2",
    label: "2 dni",
  },
  {
    value: "3",
    label: "3 dni",
  },
  {
    value: "4",
    label: "tydzień",
  },
];

interface AlertsProps {}
const Alerts: React.FC<AlertsProps> = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(local_data);
  const [value, setValue] = useState(items[0].value);

  return (
    <View className="space-y-3">
      <View className="flex-row items-center">
        <Text className="text-xl w-4/6">
          Czas przypomnienia przed terminem spłaty
        </Text>
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
