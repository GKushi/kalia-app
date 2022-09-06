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
    label: "POL",
  },
  {
    value: "2",
    label: "ENG",
  },
  {
    value: "3",
    label: "SPA",
  },
  {
    value: "4",
    label: "GER",
  },
  {
    value: "5",
    label: "NOR",
  },
  {
    value: "6",
    label: "UKR",
  },
  {
    value: "7",
    label: "ITA",
  },
  {
    value: "8",
    label: "SWE",
  },
];

interface LanguageProps {}
const Language: React.FC<LanguageProps> = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(local_data);
  const [value, setValue] = useState(items[0].value);

  return (
    <View className="space-y-3">
      <View className="flex-row items-center">
        <Text className="text-xl w-3/4">Język</Text>
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
export default Language;
