import { createSlice } from "@reduxjs/toolkit";

import { config } from "@/config";

import { ThemeState } from "./themeSlice.types";

const initialState: ThemeState = {
  theme: config.defaultTheme,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    lightTheme: (state) => {
      state.theme = "light";
    },
    darkTheme: (state) => {
      state.theme = "dark";
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const selectTheme = (state: { theme: ThemeState }) => state.theme;

export const { lightTheme, darkTheme, toggleTheme } = themeSlice.actions;
export const { reducer: themeReducer } = themeSlice;
