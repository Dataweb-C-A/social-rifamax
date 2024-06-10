import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
  language: "en" | "es" | null;
  country: 'VE' | 'US' | null;
}

const currentLang = (localStorage.getItem("language") as "en" | "es") || 'en';

const initialState: LanguageState = {
  language: currentLang,
  country: currentLang === 'es' ? 'VE' : 'US',
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<"en" | "es">) => {
      state.language = action.payload;
      state.country = action.payload === 'es' ? 'VE' : 'US';
      localStorage.setItem("language", action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
