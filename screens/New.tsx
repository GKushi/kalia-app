import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { TouchableOpacity, View, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DateData } from "react-native-calendars";
import { useFocusEffect } from "@react-navigation/native";
import TabContent from "@/components/TabContent";
import FormInput from "@/components/FormInput";
import { useModal } from "@/components/modal/useModal";
import Calendar from "@/components/Calendar";
import Modal from "@/components/modal/Modal";
import { addItem } from "@/utils/database";
import { convertDateToString } from "@/utils/utils";

interface NewProps {
  setShowTabBar: Dispatch<SetStateAction<boolean>>;
}

const New: React.FC<NewProps> = ({ setShowTabBar }) => {
  const [modal, setTitle, toggleIsShowing] = useModal(setShowTabBar);

  // form inputs
  const [activeTab, setActiveTab] = useState<ActiveTab>("first");
  const [person, setPerson] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  // calendar
  const [startTime, setStartTime] = useState<DateObj>();
  const [endTime, setEndTime] = useState<DateObj>();
  const [secondClick, setSecondClick] = useState<boolean>(true);

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
  };

  const handleTabPress = (tab: ActiveTab): void => {
    setActiveTab(tab);
    resetValues();
  };

  const submitHandler = async () => {
    const newItem: Omit<Item, "id"> = {
      person: person,
      description: description ? description : null,
      value: amount,
      currency: "PLN",
      start: startTime?.timestamp ? startTime.timestamp : null,
      end: endTime?.timestamp ? endTime.timestamp : null,
    };
    if (activeTab === "first") {
      await addItem(newItem, "debt")
        .then(() => {
          resetValues();
          console.log("success adding debt");
        })
        .catch(() => console.log("success adding debt"));
    }
    if (activeTab === "second") {
      await addItem(newItem, "due")
        .then(() => {
          resetValues();
          console.log("success adding due");
        })
        .catch(() => console.log("error adding due"));
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
  const timePressHandler = (): void => {
    setTitle("Wybierz datę");
    toggleIsShowing();
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
          <Text className="font-bold text-white text-2xl">Dodaj nowy</Text>
        </View>
        <TabContent
          firstTab="Dług"
          secondTab="Należność"
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
                    label="Komu?"
                    type="person"
                    value={person}
                    setValue={setPerson}
                  />
                </View>
                <View>
                  <FormInput
                    label="Ile?"
                    type="amount"
                    value={amount}
                    setValue={setAmount}
                  />
                </View>
                <View>
                  <FormInput
                    label="Za co?"
                    type="description"
                    value={description}
                    setValue={setDescription}
                  />
                </View>
                <View>
                  <FormInput
                    label="Od kiedy? Do kiedy?"
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
                    onPress={timePressHandler}
                  />
                </View>
              </View>
            ) : (
              <View className="space-y-4">
                <View>
                  <FormInput
                    label="Kto?"
                    type="person"
                    value={person}
                    setValue={setPerson}
                  />
                </View>
                <View>
                  <FormInput
                    label="Ile?"
                    type="amount"
                    value={amount}
                    setValue={setAmount}
                  />
                </View>
                <View>
                  <FormInput
                    label="Za co?"
                    type="description"
                    value={description}
                    setValue={setDescription}
                  />
                </View>
                <View>
                  <FormInput
                    label="Od kiedy? Do kiedy?"
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
                    onPress={timePressHandler}
                  />
                </View>
              </View>
            )}
            <View className="flex-row justify-center">
              <TouchableOpacity onPress={submitHandler} activeOpacity={0.5}>
                <View className="py-3 px-8 rounded-2xl bg-purple items-center justify-center">
                  <Text className="text-2xl text-white font-bold">Dodaj</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View className="h-[200px]" />
          </ScrollView>
        </TabContent>
      </SafeAreaView>
      <Modal modal={modal}>
        <Calendar
          dayPressHandler={dayPressHandler}
          startTime={startTime}
          endTime={endTime}
        />
      </Modal>
    </>
  );
};
export default New;
