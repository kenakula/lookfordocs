import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  toasterReducer,
  smartSearchReducer,
  doctorsPageReducer,
  settingsReducer,
  clinicsPageReducer,
} from './slices';
import { appointmentReducer } from './slices/appointment.slice';

export const makeStore = () =>
  configureStore({
    reducer: {
      settings: settingsReducer,
      toaster: toasterReducer,
      smartSearch: smartSearchReducer,
      doctorsPage: doctorsPageReducer,
      appointment: appointmentReducer,
      clinicsPage: clinicsPageReducer,
    },
  });

export const store = makeStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
