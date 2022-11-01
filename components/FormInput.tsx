import React, { Dispatch, SetStateAction, useContext } from "react";
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
import { ThemeContext } from "@/settings/ThemeContext";

interface FormInputProps {
  label: string;
  type: string;
  value: string;
  setValue?: Dispatch<SetStateAction<string>>;
  onTextPress?: () => void;
  onAmountPress?: () => void;
  currency?: string | null;
  error?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  onTextPress,
  onAmountPress,
  value,
  setValue,
  currency,
  error,
}) => {
  const { isDark } = useContext(ThemeContext) || ({} as IThemeContext);
  // render left side icon
  const icon = (type: string): JSX.Element | null => {
    const iconProps: iconProps = {
      color: isDark ? "#FCFCFC" : "#B0B8DB",
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
      <Text
        className={`font-medium text-sm ${
          error ? "text-danger" : isDark ? "text-white" : "text-black"
        } ml-5`}
      >
        {label}
      </Text>
      <View className="relative">
        <Pressable
          onPress={() => {
            onTextPress && onTextPress();
          }}
        >
          <TextInput
            className={`border-[1px] ${
              error ? "border-danger" : isDark ? "border-white" : "border-blue"
            } rounded-3xl text-xl h-14 px-14 ${
              isDark ? "text-white" : "text-black"
            } ${Platform.OS === "ios" && "pb-1"}`}
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
            className="absolute top-[15px] right-3 flex-row items-center gap-1"
            onPress={() => {
              onAmountPress && onAmountPress();
            }}
          >
            <Text
              className={`${
                isDark ? "text-white" : "text-black"
              } font-medium text-lg`}
            >
              {currency}
            </Text>
            <ChevronDownIcon color={isDark ? "#FCFCFC" : "#2F3648"} size={20} />
          </Pressable>
        )}
      </View>
    </View>
  );
};
export default FormInput;
