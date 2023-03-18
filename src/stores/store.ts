import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { doctorsPageApi } from './api';
import {
  toasterReducer,
  smartSearchReducer,
  doctorsPageReducer,
  settingsReducer,
} from './slices';

export const makeStore = () =>
  configureStore({
    reducer: {
      settings: settingsReducer,
      toaster: toasterReducer,
      smartSearch: smartSearchReducer,
      doctorsPage: doctorsPageReducer,
      [doctorsPageApi.reducerPath]: doctorsPageApi.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat([doctorsPageApi.middleware]),
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
