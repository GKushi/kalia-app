import React from "react";
import { BaseToast, ErrorToast, ToastProps } from "react-native-toast-message";

export const toastConfig = {
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#31FF90",
        backgroundColor: "#FCFCFC",
        borderLeftWidth: 25,
        borderRadius: 25,
        height: 60,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
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
        borderLeftColor: "#FF398C",
        backgroundColor: "#FCFCFC",
        borderLeftWidth: 25,
        borderRadius: 25,
        height: 60,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        color: "#2F3648",
        fontSize: 14,
        fontWeight: "600",
      }}
    />
  ),
};
