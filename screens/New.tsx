import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { TouchableOpacity, View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DateData } from "react-native-calendars";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import TabContent from "@/components/TabContent";
import FormInput from "@/components/FormInput";
import { useModal } from "@/components/modal/useModal";
import Calendar from "@/components/modal/Calendar";
import CurrentCurrency from "@/components/modal/CurrentCurrency";
import Modal from "@/components/modal/Modal";
import { addItem } from "@/utils/database";
import { convertDateToString } from "@/utils/utils";
import { Item } from "@/types/global.d";
import { getCurrency, currency as allCurrency } from "@/settings/currency";
import { scheduleNotifications } from "@/settings/alerts";

interface NewProps {
  setShowTabBar: Dispatch<SetStateAction<boolean>>;
}

const New: React.FC<NewProps> = ({ setShowTabBar }) => {
  // modal
  const [modal, setTitle, toggleIsShowing] = useModal(setShowTabBar);
  const [modalContent, setModalContent] = useState<string>("");
  // form inputs
  const [activeTab, setActiveTab] = useState<ActiveTab>("first");
  const [person, setPerson] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [currency, setCurrency] = useState<string | null>(null);
  // calendar
  const [startTime, setStartTime] = useState<DateObj>();
  const [endTime, setEndTime] = useState<DateObj>();
  const [secondClick, setSecondClick] = useState<boolean>(true);

  const { t } = useTranslation();

  // reset form values
  const resetValues = (): void => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setStartTime({
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear(),
      timestamp: today.getTime(),
    });
    setEndTime(undefined);
    setSecondClick(true);
    setPerson("");
    setAmount("");
    setDescription("");
    getCurrentCurrency();
  };

  // change active tab
  const handleTabPress = (tab: ActiveTab): void => {
    setActiveTab(tab);
    resetValues();
  };

  // add item to database
  const submitHandler = async () => {
    const newItem: Omit<Item, "id"> = {
      person: person,
      description: description ? description : null,
      value: amount,
      currency: currency ? currency : "$",
      start: startTime?.timestamp ? startTime.timestamp : null,
      end: endTime?.timestamp ? endTime.timestamp : null,
    };
    // item validation
    const validation = Item.omit({ id: true }).safeParse(newItem);
    if (validation.success === false) {
      Toast.show({
        type: "error",
        text1: t("validationError"),
      });
      return;
    }

    if (activeTab === "first") {
      await addItem(newItem, "debt")
        .then(() => {
          resetValues();
          Toast.show({
            type: "success",
            text1: t("successfullyAdded"),
          });
          if (newItem.end) scheduleNotifications(newItem.end, "debt");
        })
        .catch(() =>
          Toast.show({
            type: "error",
          })
        );
    }
    if (activeTab === "second") {
      await addItem(newItem, "due")
        .then(() => {
          resetValues();
          Toast.show({
            type: "success",
            text1: t("successfullyAdded"),
          });
          if (newItem.end) scheduleNotifications(newItem.end, "due");
        })
        .catch(() =>
          Toast.show({
            type: "error",
          })
        );
    }
  };

  // press day on calendar
  const dayPressHandler = (day: DateData) => {
    // fix library wrong hours set
    day.timestamp -= 7200000;

    if (!secondClick) {
      if (endTime && endTime.timestamp < day.timestamp) {
        setStartTime({
          day: day.day,
          month: day.month,
          year: day.year,
          timestamp: day.timestamp,
        });
        setEndTime(undefined);
      } else {
        setStartTime({
          day: day.day,
          month: day.month,
          year: day.year,
          timestamp: day.timestamp,
        });
      }
      setSecondClick(true);
    }

    if (startTime && secondClick) {
      if (startTime.timestamp > day.timestamp) {
        setStartTime({
          day: day.day,
          month: day.month,
          year: day.year,
          timestamp: day.timestamp,
        });
        setSecondClick(true);
      } else {
        setEndTime({
          day: day.day,
          month: day.month,
          year: day.year,
          timestamp: day.timestamp,
        });
        setSecondClick(false);
      }
    }
  };

  // open modal
  const toggleModal = (name: string) => {
    switch (name) {
      case "calendar":
        setTitle(t("dateTitle"));
        break;
      case "currency":
        setTitle(t("currentCurrencyTitle"));
        break;
    }
    setModalContent(name);
    toggleIsShowing();
  };

  // render modal content
  const modalChild = () => {
    switch (modalContent) {
      case "calendar":
        return (
          <Calendar
            dayPressHandler={dayPressHandler}
            startTime={startTime}
            endTime={endTime}
          />
        );
      case "currency":
        return (
          <CurrentCurrency currency={currency} setCurrency={setCurrency} />
        );
      default:
        return null;
    }
  };

  // get default currency
  const getCurrentCurrency = async (): Promise<void> => {
    await getCurrency().then((r) => {
      if (r === null) {
        setCurrency(allCurrency[0].norm);
        return;
      }
      setCurrency(r.norm);
    });
  };

  // set default options when screen is loaded
  useFocusEffect(
    useCallback(() => {
      resetValues();
    }, [])
  );

  return (
    <>
      <SafeAreaView className="bg-blue h-full">
        <View className="items-center py-8">
          <Text className="font-bold text-white text-2xl">{t("addNew")}</Text>
        </View>
        <TabContent
          firstTab={t("debt")}
          secondTab={t("due")}
          activeTab={activeTab}
          tabPress={handleTabPress}
        >
          <ScrollView
            className="space-y-14 px-4 mt-10 h-full"
            showsVerticalScrollIndicator={false}
          >
            {activeTab === "first" ? (
              <View className="space-y-4">
                <View>
                  <FormInput
                    label={t("debtPerson")}
                    type="person"
                    value={person}
                    setValue={setPerson}
                  />
                </View>
                <View>
                  <FormInput
                    label={t("debtAmount")}
                    type="amount"
                    value={amount}
                    setValue={setAmount}
                    onAmountPress={() => toggleModal("currency")}
                    currency={currency}
                  />
                </View>
                <View>
                  <FormInput
                    label={t("debtDescription")}
                    type="description"
                    value={description}
                    setValue={setDescription}
                  />
                </View>
                <View>
                  <FormInput
                    label={t("debtTime")}
                    type="time"
                    value={`${
                      startTime
                        ? convertDateToString(startTime?.timestamp)
                        : "__.__.____"
                    } - ${
                      endTime
                        ? convertDateToString(endTime?.timestamp)
                        : "__.__.____"
                    }`}
                    onTextPress={() => toggleModal("calendar")}
                  />
                </View>
              </View>
            ) : (
              <View className="space-y-4">
                <View>
                  <FormInput
                    label={t("duePerson")}
                    type="person"
                    value={person}
                    setValue={setPerson}
                  />
                </View>
                <View>
                  <FormInput
                    label={t("dueAmount")}
                    type="amount"
                    value={amount}
                    setValue={setAmount}
                    onAmountPress={() => toggleModal("currency")}
                    currency={currency}
                  />
                </View>
                <View>
                  <FormInput
                    label={t("dueDescription")}
                    type="description"
                    value={description}
                    setValue={setDescription}
                  />
                </View>
                <View>
                  <FormInput
                    label={t("dueTime")}
                    type="time"
                    value={`${
                      startTime
                        ? convertDateToString(startTime?.timestamp)
                        : "__.__.____"
                    } - ${
                      endTime
                        ? convertDateToString(endTime?.timestamp)
                        : "__.__.____"
                    }`}
                    onTextPress={() => toggleModal("calendar")}
                  />
                </View>
              </View>
            )}
            <View className="flex-row justify-center">
              <TouchableOpacity onPress={submitHandler} activeOpacity={0.5}>
                <View className="py-3 px-8 rounded-2xl bg-purple items-center justify-center">
                  <Text className="text-2xl text-white font-bold">
                    {t("add")}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View className="h-[250px]" />
          </ScrollView>
        </TabContent>
      </SafeAreaView>
      <Modal modal={modal} height={500}>
        {modalChild()}
      </Modal>
    </>
  );
};
export default New;
