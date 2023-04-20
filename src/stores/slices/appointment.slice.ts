import { IAppointment, SelectedSlot } from '@/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppointmentState {
  dialogOpen: boolean;
  target: IAppointment | null;
}

const initialState: AppointmentState = {
  dialogOpen: false,
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
      state.target = null;
    },
  },
});

export const { openAppointmentDialog, closeAppointmentDialog } =
  appointmentSlice.actions;
export const appointmentReducer = appointmentSlice.reducer;
