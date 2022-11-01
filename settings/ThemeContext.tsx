import React, { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { getTheme, setTheme, themes } from "@/settings/theme";

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeState, setThemeState] = useState<Theme>("default");
  const colorScheme = useColorScheme();

  const changeTheme = async (theme: Theme) => {
    setThemeState(theme);
    await setTheme(theme);
  };

  // set default theme
  const syncTheme = async () => {
    await getTheme().then(async (r) => {
      if (r === null) {
        await changeTheme(themes[0]);
        return;
      }
      setThemeState(r);
    });
  };

  useEffect(() => {
    syncTheme();
  }, []);

  // Immediately Invoked Function Expression
  const isDark = (() => {
    if (themeState === "default") {
      if (colorScheme === "dark") return true;
      if (colorScheme === "light") return false;
    }
    if (themeState === "dark") return true;
    else return false;
  })();

  return (
    <ThemeContext.Provider value={{ themeState, isDark, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
