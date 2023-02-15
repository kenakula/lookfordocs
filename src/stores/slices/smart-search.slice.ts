import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosClient, AxiosResponse } from '../assets';
import { IDoctor, ISpecialty } from '@/shared/types';

interface SmartSearchState {
  opened: boolean;
  searchStr: string;
  searchState: 'pending' | 'not-found' | 'idle';
}

const initialState: SmartSearchState = {
  opened: false,
  searchStr: '',
  searchState: 'idle',
};

export interface SearchResult {
  specialties: ISpecialty[];
  doctors: IDoctor[];
}

export const smartSearch = createAsyncThunk<SearchResult | undefined, string>(
  'smart-search/search',
  async (value: string, thunkApi) => {
    try {
      const specialtiesResponse = await axiosClient.get<
        AxiosResponse<ISpecialty[]>
      >('/specialties', {
        params: {
          search: value,
        },
      });

      const doctorsResponse = await axiosClient.get<AxiosResponse<IDoctor[]>>(
        `/doctors?filter={"first_name":{"_contains": "${value}"}}`,
      );

      const specialties = specialtiesResponse.data.data;
      const doctors = doctorsResponse.data.data;

      return {
        specialties,
        doctors,
      };
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  },
);

export const smartSearchSlice = createSlice({
  name: 'smartSearch',
  initialState,
  reducers: {
    openSmartSearch: state => {
      state.opened = true;
    },
    closeSmartSearch: state => {
      state.opened = false;
    },
    searchFieldInput: (state, { payload }: PayloadAction<string>) => {
      state.searchStr = payload;
    },
    searchFieldClear: state => {
      state.searchStr = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(smartSearch.pending, state => {
        state.searchState = 'pending';
      })
      .addCase(smartSearch.fulfilled, (state, { payload }) => {
        console.error('search result:', payload);
      });
  },
});

export const {
  openSmartSearch,
  closeSmartSearch,
  searchFieldInput,
  searchFieldClear,
} = smartSearchSlice.actions;
export const smartSearchReducer = smartSearchSlice.reducer;
