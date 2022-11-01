import React, { useCallback, useContext, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import Card from "@/components/Card";
import { getDoneItems, getItems } from "@/utils/database";
import { getClosestDate, countDoneSum } from "@/utils/utils";
import { ThemeContext } from "@/settings/ThemeContext";

const Home: React.FC = () => {
  const [debts, setDebts] = useState<Item[] | undefined>();
  const [dues, setDues] = useState<Item[] | undefined>();
  const [doneItems, setDoneItems] = useState<DoneItem[] | undefined>();
  const { t } = useTranslation();
  const { isDark } = useContext(ThemeContext) || ({} as IThemeContext);

  // fetch items from database
  const fetchItems = async () => {
    await getItems("debt")
      .then((r) => {
        setDebts(r);
        console.log("sucess fetching debts");
      })
      .catch(() =>
        Toast.show({
          type: "error",
        })
      );

    await getItems("due")
      .then((r) => {
        setDues(r);
        console.log("sucess fetching dues");
      })
      .catch(() =>
        Toast.show({
          type: "error",
        })
      );

    await getDoneItems()
      .then((r) => {
        setDoneItems(r);
        console.log("success fetching done items");
      })
      .catch(() =>
        Toast.show({
          type: "error",
        })
      );
  };

  // refetch items on screen change
  useFocusEffect(
    useCallback(() => {
      fetchItems();
    }, [])
  );

  return (
    <SafeAreaView className={`${isDark ? "bg-black" : "bg-blue"}`}>
      <ScrollView
        className={`${
          isDark ? "bg-black" : "bg-blue"
        } h-full p-[5%] space-y-[5%]`}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row justify-between">
          <View className="w-[45%]">
            <Card title={t("toPay")}>
              {debts &&
                debts.map((record) => (
                  <Text
                    key={record.id}
                    numberOfLines={1}
                    className="text-2xl text-danger font-semibold"
                  >
                    {`-${record.value} ${record.currency}`}
                  </Text>
                ))}
            </Card>
          </View>
          <View className="w-[45%]">
            <Card title={t("toCollect")}>
              {dues &&
                dues.map((record) => (
                  <Text
                    key={record.id}
                    numberOfLines={1}
                    className="text-2xl text-success font-semibold"
                  >
                    {`+${record.value} ${record.currency}`}
                  </Text>
                ))}
            </Card>
          </View>
        </View>
        <View>
          <Card title={t("nextPayment")}>
            <Text
              className={`${
                isDark ? "text-white" : "text-black"
              } text-2xl font-semibold`}
            >
              {debts && getClosestDate(debts)}
            </Text>
          </Card>
        </View>
        <View>
          <Card title={t("nextCollection")}>
            <Text
              className={`${
                isDark ? "text-white" : "text-black"
              } text-2xl font-semibold`}
            >
              {dues && getClosestDate(dues)}
            </Text>
          </Card>
        </View>
        <View>
          <Card title={t("recentlyCompleted")}>
            {doneItems &&
              doneItems.slice(-5).map((record) => (
                <Text
                  key={record.id}
                  className={`text-2xl ${
                    record.type === "debt" ? "text-danger" : "text-success"
                  } font-semibold`}
                >
                  {record.type === "debt"
                    ? `-${record.value} ${record.currency}`
                    : `+${record.value} ${record.currency}`}
                </Text>
              ))}
          </Card>
        </View>
        <View className="flex-row justify-between">
          <View className="w-[45%]">
            <Card title={t("payedDebts")}>
              <Text
                className={`${
                  isDark ? "text-white" : "text-black"
                } text-2xl font-semibold`}
              >
                {doneItems && countDoneSum("debt", doneItems)}
              </Text>
            </Card>
          </View>
          <View className="w-[45%]">
            <Card title={t("collectedDues")}>
              <Text
                className={`${
                  isDark ? "text-white" : "text-black"
                } text-2xl font-semibold`}
              >
                {doneItems && countDoneSum("due", doneItems)}
              </Text>
            </Card>
          </View>
        </View>
        <View className="h-[120px]" />
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home;
