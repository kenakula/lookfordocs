import { IAppointment } from '@/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppointmentState {
  dialogOpen: boolean;
  dialogSuccessState: boolean;
  target: IAppointment | null;
}

const initialState: AppointmentState = {
  dialogOpen: false,
  dialogSuccessState: false,
  target: null,
};

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    openAppointmentDialog: (
      state,
      { payload }: PayloadAction<IAppointment | undefined>,
    ) => {
      state.dialogOpen = true;

      if (payload) {
        state.target = payload;
      } else {
        state.target = null;
      }
    },
    closeAppointmentDialog: state => {
      state.dialogOpen = false;
    },
    setAppointmentDialogSuccessState: (
      state,
      { payload }: PayloadAction<boolean>,
    ) => {
      state.dialogSuccessState = payload;
    },
  },
});

export const {
  openAppointmentDialog,
  closeAppointmentDialog,
  setAppointmentDialogSuccessState,
} = appointmentSlice.actions;
export const appointmentReducer = appointmentSlice.reducer;
