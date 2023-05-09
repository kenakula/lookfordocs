import { IImage, ISiteSettings } from '@/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  contactDialogOpen: boolean;
  testimonialsLimit: number;
  email: string;
  telegram: string;
  siteName: string;
  icon: IImage | null;
}

const initialState: SettingsState = {
  contactDialogOpen: false,
  testimonialsLimit: 0,
  email: '',
  telegram: '',
  siteName: '',
  icon: null,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSiteSettings: (state, { payload }: PayloadAction<ISiteSettings>) => {
      state.testimonialsLimit = payload.testimonialsLimit;
      state.email = payload.email;
      state.telegram = payload.telegram;
      state.icon = payload.favicons.png192;

      if (payload.siteName) {
        state.siteName = payload.siteName;
      }
    },
    toggleContactDialog: (state, { payload }: PayloadAction<boolean>) => {
      state.contactDialogOpen = payload;
    },
  },
});

export const { setSiteSettings, toggleContactDialog } = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;
