import { createSlice } from "@reduxjs/toolkit";

import { config } from "@/config";
import { STORAGE, THEME } from "@/constants";
import { Theme } from "@/types";
import { loadFromStorage, saveToStorage } from "@/utils";

import { ThemeState } from "./themeSlice.types";

let defaultTheme = loadFromStorage<Theme>(STORAGE.THEME);

if (!defaultTheme) {
  saveToStorage(STORAGE.THEME, config.defaultTheme);
  defaultTheme = config.defaultTheme;
}

const initialState: ThemeState = {
  theme: defaultTheme,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    lightTheme: (state) => {
      state.theme = THEME.LIGHT;
    },
    darkTheme: (state) => {
      state.theme = THEME.DARK;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
    },
  },
});

export const selectTheme = (state: { theme: ThemeState }) => state.theme;

export const { lightTheme, darkTheme, toggleTheme } = themeSlice.actions;
export const { reducer: themeReducer } = themeSlice;
