import { IAppointment } from '@/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppointmentState {
  dialogOpen: boolean;
  dialogSuccess: boolean;
  target: IAppointment | null;
}

const initialState: AppointmentState = {
  dialogOpen: false,
  dialogSuccess: false,
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
      state.dialogSuccess = false;
      state.target = null;
    },
    setAppointmentDialogSuccess: state => {
      state.dialogSuccess = true;
    },
  },
});

export const {
  openAppointmentDialog,
  closeAppointmentDialog,
  setAppointmentDialogSuccess,
} = appointmentSlice.actions;
export const appointmentReducer = appointmentSlice.reducer;
