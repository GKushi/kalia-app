import React, { Dispatch, SetStateAction } from "react";
import {
  View,
  TextInput,
  Text,
  KeyboardType,
  Platform,
  Pressable,
} from "react-native";
import {
  UserIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
  CalendarIcon,
  ChevronDownIcon,
} from "react-native-heroicons/outline";

interface FormInputProps {
  label: string;
  type: string;
  value: string;
  setValue?: Dispatch<SetStateAction<string>>;
  onTextPress?: () => void;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  onTextPress,
  value,
  setValue,
}) => {
  const icon = (type: string): JSX.Element | null => {
    const iconProps: iconProps = {
      color: "#B0B8DB",
      size: "24",
    };
    switch (type) {
      case "person":
        return <UserIcon {...iconProps} />;
      case "amount":
        return <CurrencyDollarIcon {...iconProps} />;
      case "description":
        return <ShoppingBagIcon {...iconProps} />;
      case "time":
        return <CalendarIcon {...iconProps} />;
      default:
        return null;
    }
  };

  const keyboard = (type: string): KeyboardType | undefined => {
    switch (type) {
      case "amount":
        return "numeric";
      default:
        return undefined;
    }
  };

  return (
    <View className="space-y-1">
      <Text className="font-medium text-sm text-black ml-5">{label}</Text>
      <View className="relative">
        <Pressable
          onPress={() => {
            onTextPress && onTextPress();
          }}
        >
          <TextInput
            className={`border-[1px] border-blue rounded-3xl text-xl h-14 px-14 ${
              type === "amount" ? "pr-20" : ""
            } text-black ${Platform.OS === "ios" && "pb-1"}`}
            value={value}
            onChangeText={(text) => {
              setValue && setValue(text);
            }}
            keyboardType={keyboard(type)}
            selectionColor="#2F3648"
            editable={type === "time" ? false : true}
            onTouchEnd={() => {
              onTextPress && onTextPress();
            }}
          />
        </Pressable>
        <View className="absolute top-[16px] left-5">{icon(type)}</View>
        {type === "amount" && (
          <Pressable
            className="absolute top-[15px] right-3 flex-row items-center"
            onPress={() => console.log("click")}
          >
            <Text className="text-black font-medium text-lg">PLN</Text>
            <ChevronDownIcon color="#2F3648" />
          </Pressable>
        )}
      </View>
    </View>
  );
};
export default FormInput;
