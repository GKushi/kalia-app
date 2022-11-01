import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

// list of available themes
export const themes: Theme[] = ["default", "light", "dark"];

export const getTheme = async (): Promise<Theme | null> => {
  return await AsyncStorage.getItem("theme")
    .then((r) => {
      if (r === null) return null;
      return r as Theme;
    })
    .catch(() => {
      Toast.show({
        type: "error",
      });
      return null;
    });
};

export const setTheme = async (theme: Theme): Promise<void> => {
  await AsyncStorage.setItem("theme", theme).catch(() => {
    Toast.show({
      type: "error",
    });
  });
};
