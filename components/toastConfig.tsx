import React from "react";
import { BaseToast, ErrorToast, ToastProps } from "react-native-toast-message";
import { CheckCircleIcon, XCircleIcon } from "react-native-heroicons/solid";
import { View } from "react-native";

const toastConfig = {
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{
        backgroundColor: "#FCFCFC",
        borderLeftWidth: 0,
        borderRadius: 10,
        height: 35,
      }}
      contentContainerStyle={{
        paddingHorizontal: 8,
      }}
      renderLeadingIcon={() => {
        return (
          <View className="pl-3 h-full justify-around">
            <CheckCircleIcon size={24} color="#31FF90" />
          </View>
        );
      }}
      text1Style={{
        color: "#2F3648",
        fontSize: 14,
        fontWeight: "600",
      }}
    />
  ),
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      style={{
        backgroundColor: "#FCFCFC",
        borderLeftWidth: 0,
        borderRadius: 10,
        height: 35,
      }}
      contentContainerStyle={{
        paddingHorizontal: 8,
      }}
      renderLeadingIcon={() => {
        return (
          <View className="pl-3 h-full justify-around">
            <XCircleIcon size={24} color="#FF398C" />
          </View>
        );
      }}
      text1Style={{
        color: "#2F3648",
        fontSize: 14,
        fontWeight: "600",
      }}
    />
  ),
};
export default toastConfig;
