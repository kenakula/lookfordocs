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
  result: ISmartSearchResult[];
}

const initialState: SmartSearchState = {
  opened: false,
  searchStr: '',
  searchStatus: 'idle',
  errorMessage: '',
  result: [],
};

export const smartSearch = createAsyncThunk<
  ISmartSearchResult[] | undefined,
  string,
  { rejectValue: DirectusError }
>('smart-search/search', async (value: string, thunkApi) => {
  try {
    const response = await Promise.all([
      axiosClient.get<AxiosResponse<ISpecialty[]>>('/specialties', {
        params: {
          search: value,
          fields: 'id,slug,title',
        },
      }),
      axiosClient.get<AxiosResponse<IDoctor[]>>('/doctors', {
        params: {
          search: value.toLowerCase(),
          fields: 'id,firstName,lastName,image.*,specialties.specialties_id.*',
        },
      }),
      axiosClient.get<AxiosResponse<IClinic[]>>('/clinics', {
        params: {
          search: value.toLowerCase(),
          fields: 'id,slug,name,address,image.*',
        },
      }),
      axiosClient.get<AxiosResponse<IInsurance[]>>('/insurances', {
        params: {
          search: value.toLowerCase(),
          fields: 'id,name,image.*',
        },
      }),
    ]);

    const result: ISmartSearchResult[] = [];
    const [specialties, doctors, clinics, insurances] = response;

    result.push({ type: 'specialties', list: specialties.data.data });
    result.push({ type: 'docs', list: doctors.data.data });
    result.push({ type: 'clinics', list: clinics.data.data });
    result.push({ type: 'insurances', list: insurances.data.data });

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
    closeSmartSearch: state => {
      state.opened = false;
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
} = smartSearchSlice.actions;
export const smartSearchReducer = smartSearchSlice.reducer;
