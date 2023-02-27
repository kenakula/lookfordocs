import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DoctorsFilterQuery } from '../types';

interface DoctorsPageState {
  searshString: string;
  filterQuery: DoctorsFilterQuery;
}

const initialState: DoctorsPageState = {
  searshString: '',
  filterQuery: {},
};

export const doctorsPageSlice = createSlice({
  name: 'doctorsPage',
  initialState,
  reducers: {
    setDoctorsSearchValue: (state, { payload }: PayloadAction<string>) => {
      state.searshString = payload;
    },
    clearDoctorsSearchValue: state => {
      state.searshString = '';
    },
  },
});

export const { setDoctorsSearchValue, clearDoctorsSearchValue } =
  doctorsPageSlice.actions;
export const doctorsPageReducer = doctorsPageSlice.reducer;
