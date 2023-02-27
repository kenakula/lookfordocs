import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DoctorsFilterQuery } from '../types';

interface DoctorsPageState {
  searshString: string;
  filtersCount: number;
  filterQuery: DoctorsFilterQuery;
}

const initialState: DoctorsPageState = {
  searshString: '',
  filtersCount: 0,
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
    setFiltersCount: (state, { payload }: PayloadAction<number>) => {
      state.filtersCount = payload;
    },
  },
});

export const {
  setDoctorsSearchValue,
  clearDoctorsSearchValue,
  setFiltersCount,
} = doctorsPageSlice.actions;
export const doctorsPageReducer = doctorsPageSlice.reducer;
