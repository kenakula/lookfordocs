import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DoctorsPageState {
  searshString: string;
  filtersCount: number;
}

const initialState: DoctorsPageState = {
  searshString: '',
  filtersCount: 0,
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
    setDoctorsFiltersCount: (state, { payload }: PayloadAction<number>) => {
      state.filtersCount = payload;
    },
  },
});

export const {
  clearDoctorsSearchValue,
  setDoctorsSearchValue,
  setDoctorsFiltersCount,
} = doctorsPageSlice.actions;
export const doctorsPageReducer = doctorsPageSlice.reducer;
