import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  doctorApi,
  globalApi,
  mainPageApi,
  clinicApi,
  insuranceApi,
  doctorsPageApi,
} from './api';
import {
  toasterReducer,
  smartSearchReducer,
  doctorsPageReducer,
} from './slices';

export const makeStore = () =>
  configureStore({
    reducer: {
      toaster: toasterReducer,
      smartSearch: smartSearchReducer,
      doctorsPage: doctorsPageReducer,
      [mainPageApi.reducerPath]: mainPageApi.reducer,
      [globalApi.reducerPath]: globalApi.reducer,
      [doctorApi.reducerPath]: doctorApi.reducer,
      [clinicApi.reducerPath]: clinicApi.reducer,
      [insuranceApi.reducerPath]: insuranceApi.reducer,
      [doctorsPageApi.reducerPath]: doctorsPageApi.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat([
        mainPageApi.middleware,
        globalApi.middleware,
        doctorApi.middleware,
        clinicApi.middleware,
        insuranceApi.middleware,
        doctorsPageApi.middleware,
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

export const wrapper = createWrapper<typeof store>(makeStore, { debug: false });
