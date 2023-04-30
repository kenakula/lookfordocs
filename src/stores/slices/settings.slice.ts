import { IImage, ISiteSettings } from '@/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  testimonialsLimit: number;
  siteName: string;
  icon: IImage | null;
}

const initialState: SettingsState = {
  testimonialsLimit: 0,
  siteName: '',
  icon: null,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSiteSettings: (state, { payload }: PayloadAction<ISiteSettings>) => {
      state.testimonialsLimit = payload.testimonialsLimit;
      state.icon = payload.favicons.png192;

      if (payload.siteName) {
        state.siteName = payload.siteName;
      }
    },
  },
});

export const { setSiteSettings } = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
