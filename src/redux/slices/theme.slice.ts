import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type ThemeState = {
  isDark: boolean;
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDark: false,
  } as ThemeState,
  reducers: {
    toggleDarkTheme: (state) => {
      state.isDark = !state.isDark;
    },
  },
});

export const { toggleDarkTheme } = themeSlice.actions;

export const themeSliceReducer = themeSlice.reducer;
