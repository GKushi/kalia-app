import { LocaleConfig } from "react-native-calendars";

const translations = {
  pl: {
    translation: {
      languageName: "Polski",
      errorContent: "Coś poszło nie tak :(",
      toPay: "Do spłacenia",
      toCollect: "Do odebrania",
      nextPayment: "Termin najbliszej spłaty",
      nextCollection: "Termin najbliższego odbioru",
      recentlyCompleted: "Ostatnie zakończone",
      payedDebts: "Ilość spłaconych długów",
      collectedDues: "Ilość odebranych należności",
      debts: "Długi",
      dues: "Należności",
      debt: "Dług",
      due: "Należność",
      delete: "Usuń",
      completeDebt: "Oddane",
      completeDue: "Zebrane",
      paymentDate: "Termin spłaty:",
      from: "Od:",
      validationError: "Nieprawidłowe dane!",
      successfullyAdded: "Pomyślnie dodano!",
      addNew: "Dodaj nowy",
      debtPerson: "Komu?",
      debtAmount: "Ile?",
      debtDescription: "Za co?",
      debtTime: "Od kiedy? Do kiedy?",
      duePerson: "Kto?",
      dueAmount: "Ile?",
      dueDescription: "Za co?",
      dueTime: "Od kiedy? Do kiedy?",
      add: "Dodaj",
      dateTitle: "Wybierz datę",
      themeTitle: "Wybierz motyw",
      currencyTitle: "Wybierz domyślną walutę",
      currentCurrencyTitle: "Wybierz walutę",
      languageTitle: "Wybierz język",
      alertsTitle: "Powiadomienia",
      themeLabel: "Motyw",
      currencyLabel: "Domyślna waluta",
      languageLabel: "Język",
      alertsLabel: "Powiadomienia",
      settings: "Ustawienia",
      oneDay: "1 dzień",
      twoDays: "2 dni",
      threeDays: "3 dni",
      week: "tydzień",
      alertTime: "Czas przypomnienia przed terminem spłaty",
      currency: "Waluta",
      defaultTheme: "Zgodny z ustawieniami telefonu",
      lightTheme: "Jasny",
      darkTheme: "Ciemny",
    },
  },
  en: {
    translation: {
      languageName: "English",
      errorContent: "Something went wrong :(",
      toPay: "To pay",
      toCollect: "To collect",
      nextPayment: "Next payment",
      nextCollection: "Next collection",
      recentlyCompleted: "Recently completed",
      payedDebts: "Number of payed debts",
      collectedDues: "Number of collected dues",
      debts: "Debts",
      dues: "Dues",
      debt: "Debt",
      due: "Due",
      delete: "Delete",
      completeDebt: "Payed",
      completeDue: "Collected",
      paymentDate: "To:",
      from: "From:",
      validationError: "Invalid data!",
      successfullyAdded: "Successfully added!",
      addNew: "Add new",
      debtPerson: "Who?",
      debtAmount: "How much?",
      debtDescription: "For what?",
      debtTime: "Since when? Until when?",
      duePerson: "Who?",
      dueAmount: "How much?",
      dueDescription: "For what?",
      dueTime: "Since when? Until when?",
      add: "Add",
      dateTitle: "Choose date",
      themeTitle: "Select theme",
      currencyTitle: "Select default currency",
      currentCurrencyTitle: "Select currency",
      languageTitle: "Select language",
      alertsTitle: "Alerts",
      themeLabel: "Theme",
      currencyLabel: "Default currency",
      languageLabel: "Language",
      alertsLabel: "Alerts",
      settings: "Settings",
      oneDay: "1 day",
      twoDays: "2 days",
      threeDays: "3 days",
      week: "Week",
      alertTime: "Reminder time before payment end",
      currency: "Currency",
      defaultTheme: "Same as phone settings",
      lightTheme: "Light",
      darkTheme: "Dark",
    },
  },
};

LocaleConfig.locales["pl"] = {
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
    "Czerw.",
    "Lip.",
    "Sier.",
    "Wrz.",
    "Paź.",
    "Lis.",
    "Gru.",
  ],
  dayNames: [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
  ],
  dayNamesShort: ["Nie.", "Pon.", "Wt.", "Śr.", "Czw.", "Pt.", "Sob."],
  today: "Dzisiaj",
};
LocaleConfig.locales["en"] = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."],
  today: "Today",
};

export default translations;
