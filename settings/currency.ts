import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Local from "expo-localization";
import Toast from "react-native-toast-message";

export const currency = [
  { iso: "USD", norm: "$" },
  { iso: "PLN", norm: "zł" },
  { iso: "GBP", norm: "£" },
  { iso: "EUR", norm: "€" },
  { iso: "CHF", norm: "₣" },
];

export const getCurrency = async (): Promise<Currency | null> => {
  return await AsyncStorage.getItem("currency")
    .then((r) => {
      if (r === null) return null;
      return JSON.parse(r);
    })
    .catch(() => {
      Toast.show({
        type: "error",
      });
      return null;
    });
};

export const setCurrency = async (currency: Currency): Promise<void> => {
  const jsonValue = JSON.stringify(currency);
  await AsyncStorage.setItem("currency", jsonValue).catch(() => {
    Toast.show({
      type: "error",
    });
  });
};

export const initCurrency = async (): Promise<void> => {
  await getCurrency().then(async (r) => {
    if (r !== null) return;
    const index = currency.findIndex((lang) => lang.iso === Local.currency);

    if (index === -1) {
      await setCurrency(currency[0]);
      return;
    }
    await setCurrency(currency[index]);
  });
};
