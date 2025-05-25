import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LanguageState {
  current: 'en' | 'np';
}

const initialState: LanguageState = {
  current: 'en',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    toggleLanguage(state) {
      state.current = state.current === 'en' ? 'np' : 'en';
    },
    setLanguage(state, action: PayloadAction<'en' | 'np'>) {
      state.current = action.payload;
    },
  },
});

export const { toggleLanguage, setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
