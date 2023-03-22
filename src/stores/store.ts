import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { clinicsPageApi, doctorsPageApi } from './api';
import {
  toasterReducer,
  smartSearchReducer,
  doctorsPageReducer,
  settingsReducer,
  clinicsPageReducer,
} from './slices';
import { appointmentReducer } from './slices/appointment.slice';

// TODO перенести апи с слайсы

export const makeStore = () =>
  configureStore({
    reducer: {
      settings: settingsReducer,
      toaster: toasterReducer,
      smartSearch: smartSearchReducer,
      doctorsPage: doctorsPageReducer,
      appointment: appointmentReducer,
      clinicsPage: clinicsPageReducer,
      [doctorsPageApi.reducerPath]: doctorsPageApi.reducer,
      [clinicsPageApi.reducerPath]: clinicsPageApi.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat([
        doctorsPageApi.middleware,
        clinicsPageApi.middleware,
      ]),
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
