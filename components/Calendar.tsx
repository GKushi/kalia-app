import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarComp,
  LocaleConfig,
  DateData,
} from "react-native-calendars";
import { DateObj } from "@/screens/New";

interface CalendarProps {
  dayPressHandler: (day: DateData) => void;
  startTime?: DateObj;
  endTime?: DateObj;
}
interface DayProps {
  startingDay?: boolean;
  endingDay?: boolean;
  color: string;
  textColor: string;
}
interface IDayBetween {
  [key: string]: DayProps;
}

// Calendar translation
LocaleConfig.locales["pol"] = {
  monthNames: [
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
  ],
  monthNamesShort: [
    "Sty.",
    "Lut.",
    "Mrz.",
    "Kwie.",
    "Maj",
    "Czerw",
    "Lip.",
    "Sier",
    "Wrz.",
    "Paź.",
    "Lis.",
    "Gru.",
  ],
  dayNames: [
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
    "Niedziela",
  ],
  dayNamesShort: ["Pon.", "Wt.", "Śr.", "Czw.", "Pt.", "Sob.", "Nie."],
  today: "Dzisiaj",
};
LocaleConfig.defaultLocale = "pol";

const Calendar: React.FC<CalendarProps> = ({
  dayPressHandler,
  startTime,
  endTime,
}) => {
  const [daysBetween, setDaysBetween] = useState<IDayBetween | undefined>();

  // date objects required by calendar component
  const startTimeObj: IDayBetween = {
    [`${startTime?.year.toString()}-${startTime?.month
      .toString()
      .padStart(2, "0")}-${startTime?.day.toString().padStart(2, "0")}`]: {
      startingDay: true,
      color: "#CC1CCF",
      textColor: "white",
    },
  };
  const endTimeObj: IDayBetween = {
    [`${endTime?.year.toString()}-${endTime?.month
      .toString()
      .padStart(2, "0")}-${endTime?.day.toString().padStart(2, "0")}`]: {
      endingDay: true,
      color: "#CC1CCF",
      textColor: "white",
    },
  };

  useEffect(() => {
    if (startTime && !endTime) {
      setDaysBetween(startTimeObj);
    }
    if (startTime && endTime) {
      if (startTime.timestamp === endTime.timestamp) {
        // set single dot mark once start and end is the same
        setDaysBetween({
          [`${startTime?.year.toString()}-${startTime?.month
            .toString()
            .padStart(2, "0")}-${startTime?.day.toString().padStart(2, "0")}`]:
            {
              startingDay: true,
              endingDay: true,
              color: "#CC1CCF",
              textColor: "white",
            },
        });
      } else {
        // generate all dates between start and end, put them in state object
        for (
          var obj: IDayBetween | undefined = {},
            dt = new Date(startTime?.timestamp + 79200000 * 2);
          dt <= new Date(endTime?.timestamp);
          dt.setDate(dt.getDate() + 1)
        ) {
          let dateString = new Date(dt).toISOString().slice(0, 10);
          Object.assign(obj, {
            [dateString]: {
              color: "#B0B8DB",
              textColor: "white",
            },
          });
        }
        Object.assign(obj, startTimeObj);
        Object.assign(obj, endTimeObj);
        setDaysBetween(obj);
      }
    }
  }, [startTime, endTime]);

  return (
    <CalendarComp
      theme={{
        arrowColor: "#CC1CCF",
        calendarBackground: "#FCFCFC",
        textSectionTitleColor: "#B0B8DB",
        selectedDayTextColor: "#FFFFFF",
        todayTextColor: "#CC1CCF",
        dayTextColor: "#2F3648",
      }}
      markingType="period"
      onDayPress={dayPressHandler}
      minDate="0001-01-01"
      maxDate="3000-01-01"
      markedDates={daysBetween}
    />
  );
};
export default Calendar;
