import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ISmartSearchResult,
  SmartSearchLocation,
  SmartSearchStatus,
} from '@/shared/types';
import {
  getFilteredClinics,
  getFilteredDoctors,
  getFilteredGlobalServices,
  getFilteredInsurances,
  getFilteredLanguages,
  getFilteredSpecialties,
} from '@/api';

type DirectusError = {
  message: string;
};

interface SmartSearchState {
  opened: boolean;
  searchStr: string;
  searchStatus: SmartSearchStatus;
  errorMessage: string;
  result: ISmartSearchResult[];
  useCustomQuery: boolean;
  smartSearchLocation: SmartSearchLocation;
}

const initialState: SmartSearchState = {
  opened: false,
  searchStr: '',
  searchStatus: 'idle',
  errorMessage: '',
  result: [],
  useCustomQuery: false,
  smartSearchLocation: 'none',
};

export const smartSearch = createAsyncThunk<
  ISmartSearchResult[] | undefined,
  string,
  { rejectValue: DirectusError }
>('smart-search/search', async (value: string, thunkApi) => {
  const search = value.toLowerCase();

  try {
    const response = await Promise.all([
      getFilteredSpecialties(search),
      getFilteredDoctors(search),
      getFilteredClinics(search),
      getFilteredInsurances(search),
      getFilteredGlobalServices(search),
      getFilteredLanguages(search),
    ]);

    const result: ISmartSearchResult[] = [];
    const [
      specialties,
      doctors,
      clinics,
      insurances,
      globalServices,
      languages,
    ] = response;

    result.push({ type: 'specialties', list: specialties });
    result.push({ type: 'docs', list: doctors });
    result.push({ type: 'clinics', list: clinics });
    result.push({ type: 'insurances', list: insurances });
    result.push({ type: 'globalService', list: globalServices });
    result.push({ type: 'languages', list: languages });

    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data as {
        errors: { message: string }[];
      };

      return thunkApi.rejectWithValue(errorData.errors[0]);
    } else {
      throw new Error('error occured on fetch data');
    }
  }
});

export const smartSearchSlice = createSlice({
  name: 'smartSearch',
  initialState,
  reducers: {
    openSmartSearch: state => {
      state.opened = true;
    },
    closeSmartSearch: (
      state,
      { payload }: PayloadAction<{ clear: boolean }>,
    ) => {
      state.opened = false;

      if (payload && payload.clear) {
        state.searchStr = '';
        state.searchStatus = 'idle';
        state.result = [];
      }
    },
    searchFieldInput: (state, { payload }: PayloadAction<string>) => {
      state.searchStr = payload;

      if (!payload.length) {
        state.searchStatus = 'idle';
        state.result = [];
      }
    },
    searchFieldClear: state => {
      state.searchStr = '';
      state.searchStatus = 'idle';
      state.result = [];
    },
    setUseCustomQuery: (state, { payload }: PayloadAction<boolean>) => {
      state.useCustomQuery = payload;
    },
    setSmartSearchLocation: (
      state,
      { payload }: PayloadAction<SmartSearchLocation>,
    ) => {
      state.smartSearchLocation = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(smartSearch.pending, state => {
        state.result = [];
        state.searchStatus = 'pending';
      })
      .addCase(smartSearch.fulfilled, (state, { payload }) => {
        state.searchStatus = 'success';

        if (payload) {
          state.result = payload;
        }
      })
      .addCase(smartSearch.rejected, (state, { payload }) => {
        console.error('error: ', payload?.message);
        state.searchStatus = 'error';
        state.errorMessage = payload ? payload.message : '';
      });
  },
});

export const {
  openSmartSearch,
  closeSmartSearch,
  searchFieldInput,
  searchFieldClear,
  setUseCustomQuery,
  setSmartSearchLocation,
} = smartSearchSlice.actions;
export const smartSearchReducer = smartSearchSlice.reducer;
