import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  testimonialsLimit: number;
}

const initialState: SettingsState = {
  testimonialsLimit: 0,
};

export const settingsSlice = createSlice({
  name: 'toaster',
  initialState,
  reducers: {
    setTestimonialsLimit: (state, { payload }: PayloadAction<number>) => {
      state.testimonialsLimit = payload;
    },
  },
});

export const { setTestimonialsLimit } = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
