import React, { useCallback, useState } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import DebtCard from "@/components/DebtCard";
import TabContent from "@/components/TabContent";
import { getItems, deleteItem, setItemDone } from "@/utils/database";

const List: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("first");
  const [debts, setDebts] = useState<Item[] | undefined>();
  const [dues, setDues] = useState<Item[] | undefined>();
  const { t } = useTranslation();

  // change active tab
  const handleTabPress = (tab: ActiveTab): void => {
    setActiveTab(tab);
  };

  // fetch needed items from database
  const fetchItems = async (type: ItemType) => {
    await getItems(type)
      .then((r) => {
        if (type === "debt") setDebts(r);
        if (type === "due") setDues(r);
        console.log("sucess fetching data");
      })
      .catch(() =>
        Toast.show({
          type: "error",
        })
      );
  };

  // delete item from database
  const deleteHandler = async (id: number, type: ItemType) => {
    await deleteItem(id, type)
      .then(() => {
        console.log("success deleting item");
        fetchItems(type);
      })
      .catch(() =>
        Toast.show({
          type: "error",
        })
      );
  };

  // mark item as done item from database
  const setItemDoneHandler = async (
    item: Omit<DoneItem, "id">,
    itemId: number
  ) => {
    await setItemDone(item)
      .then(() => {
        deleteHandler(itemId, item.type);
        fetchItems(item.type);
        console.log("success setting item done");
        Toast.show({
          type: "success",
          text1: t("goodJob"),
        });
      })
      .catch(() =>
        Toast.show({
          type: "error",
        })
      );
  };

  // refetch items again on screen change
  useFocusEffect(
    useCallback(() => {
      if (activeTab === "first") fetchItems("debt");
      if (activeTab === "second") fetchItems("due");
    }, [activeTab])
  );

  return (
    <SafeAreaView className="bg-blue h-full">
      <View className="h-12" />
      <TabContent
        firstTab={t("debts")}
        secondTab={t("dues")}
        activeTab={activeTab}
        tabPress={handleTabPress}
      >
        <ScrollView
          className="space-y-4 px-4 mt-10 h-full"
          showsVerticalScrollIndicator={false}
        >
          {activeTab === "first" && debts ? (
            debts.map((record) => (
              <View key={record.id}>
                <DebtCard
                  title={record.description}
                  name={record.person}
                  value={`${record.value} ${record.currency}`}
                  startDate={record.start}
                  endDate={record.end}
                  type="debt"
                  leftSwipe={{
                    title: t("delete"),
                    handler: () => {
                      deleteHandler(record.id, "debt");
                    },
                  }}
                  rightSwipe={{
                    title: t("completeDebt"),
                    handler: () => {
                      setItemDoneHandler(
                        {
                          person: record.person,
                          description: record.description,
                          value: record.value,
                          currency: record.currency,
                          type: "debt",
                        },
                        record.id
                      );
                    },
                  }}
                />
              </View>
            ))
          ) : (
            <></>
          )}
          {activeTab === "second" && dues ? (
            dues.map((record) => (
              <View key={record.id}>
                <DebtCard
                  title={record.description}
                  name={record.person}
                  value={`${record.value} ${record.currency}`}
                  startDate={record.start}
                  endDate={record.end}
                  type="due"
                  leftSwipe={{
                    title: t("delete"),
                    handler: () => {
                      deleteHandler(record.id, "due");
                    },
                  }}
                  rightSwipe={{
                    title: t("completeDue"),
                    handler: () => {
                      setItemDoneHandler(
                        {
                          person: record.person,
                          description: record.description,
                          value: record.value,
                          currency: record.currency,
                          type: "due",
                        },
                        record.id
                      );
                    },
                  }}
                />
              </View>
            ))
          ) : (
            <></>
          )}
          <View className="h-[200px]" />
        </ScrollView>
      </TabContent>
    </SafeAreaView>
  );
};
export default List;
