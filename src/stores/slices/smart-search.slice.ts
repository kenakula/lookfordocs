import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  axiosClient,
  AxiosResponse,
  getClinicsFilterString,
  getDoctorsFilterString,
  getGlobalServicesFilterString,
  getInsurancesFilterString,
  getLanguagesFilterString,
  getSpecialtiesFilterString,
} from '../assets';
import {
  IClinic,
  IDoctor,
  IGlobalService,
  IInsurance,
  ILanguage,
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
  useCustomQuery: boolean;
}

const initialState: SmartSearchState = {
  opened: false,
  searchStr: '',
  searchStatus: 'idle',
  errorMessage: '',
  result: [],
  useCustomQuery: false,
};

export const smartSearch = createAsyncThunk<
  ISmartSearchResult[] | undefined,
  string,
  { rejectValue: DirectusError }
>('smart-search/search', async (value: string, thunkApi) => {
  const search = value.toLowerCase();

  try {
    const response = await Promise.all([
      axiosClient.get<AxiosResponse<ISpecialty[]>>('/specialties', {
        params: {
          filter: getSpecialtiesFilterString(search),
          fields: 'id,slug,title',
        },
      }),
      axiosClient.get<AxiosResponse<IDoctor[]>>('/doctors', {
        params: {
          filter: getDoctorsFilterString(search),
          fields: 'id,firstName,lastName,image.*,specialties.specialties_id.*',
        },
      }),
      axiosClient.get<AxiosResponse<IClinic[]>>('/clinics', {
        params: {
          filter: getClinicsFilterString(search),
          fields: 'id,slug,name,address,image.*',
        },
      }),
      axiosClient.get<AxiosResponse<IInsurance[]>>('/insurances', {
        params: {
          filter: getInsurancesFilterString(search),
          fields: 'id,name,image.*',
        },
      }),
      axiosClient.get<AxiosResponse<IGlobalService[]>>('/globalServices', {
        params: {
          filter: getGlobalServicesFilterString(search),
          fields: 'id,name,slug',
        },
      }),
      axiosClient.get<AxiosResponse<ILanguage[]>>('/languages', {
        params: {
          filter: getLanguagesFilterString(search),
          fields: 'id,name,slug',
        },
      }),
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

    result.push({ type: 'specialties', list: specialties.data.data });
    result.push({ type: 'docs', list: doctors.data.data });
    result.push({ type: 'clinics', list: clinics.data.data });
    result.push({ type: 'insurances', list: insurances.data.data });
    result.push({ type: 'globalService', list: globalServices.data.data });
    result.push({ type: 'languages', list: languages.data.data });

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
} = smartSearchSlice.actions;
export const smartSearchReducer = smartSearchSlice.reducer;
