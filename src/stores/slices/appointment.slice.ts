import { IClinic, IDoctor } from '@/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppointmentState {
  dialogOpen: boolean;
  targetDoctor: IDoctor | null;
  targetClinic: IClinic | null;
}

const initialState: AppointmentState = {
  dialogOpen: false,
  targetDoctor: null,
  targetClinic: null,
};

export const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    openAppointmentDialog: (
      state,
      {
        payload: { doctor, clinic },
      }: PayloadAction<{ doctor?: IDoctor; clinic?: IClinic }>,
    ) => {
      state.dialogOpen = true;

      if (doctor) {
        state.targetDoctor = doctor;
      }

      if (clinic) {
        state.targetClinic = clinic;
      }
    },
    closeAppointmentDialog: state => {
      state.dialogOpen = false;
      state.targetClinic = null;
      state.targetDoctor = null;
    },
  },
});

export const { openAppointmentDialog, closeAppointmentDialog } =
  appointmentSlice.actions;
export const appointmentReducer = appointmentSlice.reducer;
