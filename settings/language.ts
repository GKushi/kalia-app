import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Local from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { LocaleConfig } from "react-native-calendars";
import translations from "@/settings/translations";

// custom language detector
const languageDetector: any = {
  type: "languageDetector",
  async: true,
  init: () => {},
  detect: async (callback: (lng: string) => void) => {
    // detect language based on localization
    await AsyncStorage.getItem("i18n")
      .then((r) => {
        if (r !== null) {
          callback(r);
          return;
        }

        const localLang = Local.locale.split("-")[0];
        if (
          Object.keys(translations).findIndex((lang) => lang === localLang) ===
          -1
        ) {
          callback("en");
          return;
        }
        callback(localLang);
        return;
      })
      .catch(() =>
        Toast.show({
          type: "error",
        })
      );
  },
  cacheUserLanguage: async (lng: string) => {
    // save user language
    await AsyncStorage.setItem("i18n", lng).catch(() =>
      Toast.show({
        type: "error",
      })
    );
    LocaleConfig.defaultLocale = lng;
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: translations,
    compatibilityJSON: "v3",
    supportedLngs: Object.keys(translations),
    fallbackLng: "en",
    debug: true,
  });

export default i18n;
