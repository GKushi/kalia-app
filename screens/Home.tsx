import React, { useCallback, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import Card from "@/components/Card";
import { getDoneItems, getItems } from "@/utils/database";
import { getClosestDate, countDoneSum } from "@/utils/utils";

const Home: React.FC = () => {
  const [debts, setDebts] = useState<Item[] | undefined>();
  const [dues, setDues] = useState<Item[] | undefined>();
  const [doneItems, setDoneItems] = useState<DoneItem[] | undefined>();

  const fetchItems = async () => {
    await getItems("debt")
      .then((r) => {
        setDebts(r);
        console.log("sucess fetching debts");
      })
      .catch(() => console.log("error fetching debts"));

    await getItems("due")
      .then((r) => {
        setDues(r);
        console.log("sucess fetching dues");
      })
      .catch(() => console.log("error fetching dues"));

    await getDoneItems()
      .then((r) => {
        setDoneItems(r);
        console.log("success fetching done items");
      })
      .catch(() => console.log("error fetching done items"));
  };

  useFocusEffect(
    useCallback(() => {
      fetchItems();
    }, [])
  );

  return (
    <SafeAreaView className="bg-blue">
      <ScrollView
        className="bg-blue h-full p-[5%] space-y-[5%]"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row justify-between">
          <View className="w-[45%]">
            <Card title="Do spłacenia">
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
            <Card title="Do odebrania">
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
          <Card title="Termin najbliszej spłaty">
            <Text className="text-2xl text-black font-semibold">
              {debts && getClosestDate(debts)}
            </Text>
          </Card>
        </View>
        <View>
          <Card title="Termin najbliższego odbioru">
            <Text className="text-2xl text-black font-semibold">
              {dues && getClosestDate(dues)}
            </Text>
          </Card>
        </View>
        <View>
          <Card title="Ostatnie zakończone">
            {doneItems &&
              doneItems
                .slice(-5)
                .map((record) => (
                  <Text
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
            <Card title="Ilość spłaconych długów">
              <Text className="text-2xl text-black font-semibold">
                {doneItems && countDoneSum("debt", doneItems)}
              </Text>
            </Card>
          </View>
          <View className="w-[45%]">
            <Card title="Ilość odebranych należności">
              <Text className="text-2xl text-black font-semibold">
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
