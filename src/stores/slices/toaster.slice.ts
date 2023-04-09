import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToasterMessage } from '@/shared/types';

interface ToasterState {
  toasterPack: ToasterMessage[];
}

const initialState: ToasterState = {
  toasterPack: [],
};

export const toasterSlice = createSlice({
  name: 'toaster',
  initialState,
  reducers: {
    setToaster: (state, { payload }: PayloadAction<ToasterMessage>) => {
      state.toasterPack = [...state.toasterPack, payload];
    },
    removeToasterFromPack: state => {
      state.toasterPack = state.toasterPack.slice(1);
    },
  },
});

export const { setToaster, removeToasterFromPack } = toasterSlice.actions;
export const toasterReducer = toasterSlice.reducer;
