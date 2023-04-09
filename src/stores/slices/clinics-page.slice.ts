import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ClinicsPageState {
  searshString: string;
  filtersCount: number;
}

const initialState: ClinicsPageState = {
  searshString: '',
  filtersCount: 0,
};

export const clinicsPageSlice = createSlice({
  name: 'clinicsPage',
  initialState,
  reducers: {
    setClinicsSearchValue: (state, { payload }: PayloadAction<string>) => {
      state.searshString = payload;
    },
    clearClinicsSearchValue: state => {
      state.searshString = '';
    },
    setClinicsFiltersCount: (state, { payload }: PayloadAction<number>) => {
      state.filtersCount = payload;
    },
  },
});

export const {
  clearClinicsSearchValue,
  setClinicsFiltersCount,
  setClinicsSearchValue,
} = clinicsPageSlice.actions;
export const clinicsPageReducer = clinicsPageSlice.reducer;
