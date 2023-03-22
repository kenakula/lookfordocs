import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICity, IInsurance } from '@/shared/types';
import { DoctorsFilterQuery } from '../types';

interface DoctorsPageState {
  searshString: string;
  filtersCount: number;
  filterQuery: DoctorsFilterQuery;
  cities: ICity[];
  insurances: IInsurance[];
}

const initialState: DoctorsPageState = {
  searshString: '',
  filtersCount: 0,
  filterQuery: {},
  cities: [],
  insurances: [],
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
    setCities: (state, { payload }: PayloadAction<ICity[] | null>) => {
      if (payload) {
        state.cities = payload;
      }
    },
    setInsurances: (state, { payload }: PayloadAction<IInsurance[] | null>) => {
      if (payload) {
        state.insurances = payload;
      }
    },
  },
});

export const {
  clearDoctorsSearchValue,
  setDoctorsSearchValue,
  setDoctorsFiltersCount,
  setInsurances,
  setCities,
} = doctorsPageSlice.actions;
export const doctorsPageReducer = doctorsPageSlice.reducer;
