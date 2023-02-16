import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosClient, AxiosResponse } from '../assets';
import {
  IClinic,
  IDoctor,
  IInsurance,
  ISmartSearchResult,
  ISpecialty,
  SmartSearchStatus,
} from '@/shared/types';

type DirectusError = {
  message: string;
};

interface SmartSearchState {
  opened: boolean;
  searchStr: string;
  searchStatus: SmartSearchStatus;
  errorMessage: string;
  result: ISmartSearchResult | null;
}

const initialState: SmartSearchState = {
  opened: false,
  searchStr: '',
  searchStatus: 'idle',
  errorMessage: '',
  result: null,
};

// TODO прерывать при новом запросе

export const smartSearch = createAsyncThunk<
  ISmartSearchResult | undefined,
  string,
  { rejectValue: DirectusError }
>('smart-search/search', async (value: string, thunkApi) => {
  try {
    const specialtiesResponse = await axiosClient.get<
      AxiosResponse<ISpecialty[]>
    >('/specialties', {
      params: {
        search: value,
        fields: 'id,slug,title',
      },
    });

    const docsResponse = await axiosClient.get<AxiosResponse<IDoctor[]>>(
      '/doctors',
      {
        params: {
          search: value.toLowerCase(),
          fields: 'id,firstName,lastName,image.*',
        },
      },
    );

    const clinicsResponse = await axiosClient.get<AxiosResponse<IClinic[]>>(
      '/clinics',
      {
        params: {
          search: value.toLowerCase(),
          fields: 'id,name,image.*',
        },
      },
    );

    const insurancesResponse = await axiosClient.get<
      AxiosResponse<IInsurance[]>
    >('/insurances', {
      params: {
        search: value.toLowerCase(),
        fields: 'id,name,image.*',
      },
    });

    const specialties = specialtiesResponse.data.data;
    const doctors = docsResponse.data.data;
    const clinics = clinicsResponse.data.data;
    const insurances = insurancesResponse.data.data;

    return {
      specialties,
      doctors,
      clinics,
      insurances,
    };
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
    closeSmartSearch: state => {
      state.opened = false;
    },
    searchFieldInput: (state, { payload }: PayloadAction<string>) => {
      state.searchStr = payload;

      if (!payload.length) {
        state.searchStatus = 'idle';
        state.result = null;
      }
    },
    searchFieldClear: state => {
      state.searchStr = '';
      state.searchStatus = 'idle';
      state.result = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(smartSearch.pending, state => {
        state.result = null;
        state.searchStatus = 'pending';
      })
      .addCase(smartSearch.fulfilled, (state, { payload }) => {
        state.searchStatus = 'success';
        state.result = {
          specialties: payload?.specialties,
          clinics: payload?.clinics,
          doctors: payload?.doctors,
          insurances: payload?.insurances,
        };
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
} = smartSearchSlice.actions;
export const smartSearchReducer = smartSearchSlice.reducer;
