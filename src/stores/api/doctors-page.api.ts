import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import {
  CollectionResponse,
  getDoctorsQueryString,
  SingletonResponse,
} from '../assets';
import { DoctorsFilterQuery } from '../types';
import {
  IDoctor,
  IGlobalService,
  IInsurance,
  ILanguage,
  IPromoBlockData,
  ISpecialty,
} from '@/shared/types';

const DIRECTUS_ITEMS_URL = process.env.NEXT_PUBLIC_ITEMS_URL ?? '';

export const doctorsPageApi = createApi({
  reducerPath: 'doctorsPageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: DIRECTUS_ITEMS_URL,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [],
  endpoints: builder => ({
    getDoctorsPagePromoData: builder.query<IPromoBlockData, void>({
      query: () => ({
        url: '/doctors_promo',
      }),
      transformResponse: (response: SingletonResponse<IPromoBlockData>) =>
        response.data,
    }),
    getDoctorsList: builder.query<IDoctor[], DoctorsFilterQuery>({
      query: arg => ({
        url: '/doctors',
        params: {
          fields:
            '*.*,specialties.specialties_id.*,clinics.clinics_id.*,insurances.insurances_id.*,lang.languages_id.*,globalServices.globalServices_id.*',
          filter: getDoctorsQueryString(arg),
        },
      }),
      transformResponse: (response: CollectionResponse<IDoctor>) =>
        response.data,
    }),
    getDoctorsSpecialtiesList: builder.query<ISpecialty[], void>({
      query: () => ({
        url: '/specialties',
      }),
      transformResponse: (response: CollectionResponse<ISpecialty>) =>
        response.data,
    }),
    getGlobalServicesList: builder.query<IGlobalService[], void>({
      query: () => ({
        url: '/globalServices',
      }),
      transformResponse: (response: CollectionResponse<IGlobalService>) =>
        response.data,
    }),
    getDoctorsInsurances: builder.query<IInsurance[], void>({
      query: () => ({
        url: '/insurances',
        params: {
          fields: 'id, name, image.*',
        },
      }),
      transformResponse: (response: CollectionResponse<IInsurance>) =>
        response.data,
    }),
    getDoctorsLanguages: builder.query<ILanguage[], void>({
      query: () => ({
        url: '/languages',
        params: {
          fields: 'id, name, slug',
        },
      }),
      transformResponse: (response: CollectionResponse<ILanguage>) =>
        response.data,
    }),
  }),
});

export const {
  useGetDoctorsPagePromoDataQuery,
  useLazyGetDoctorsListQuery,
  useGetDoctorsSpecialtiesListQuery,
  useGetGlobalServicesListQuery,
  useGetDoctorsInsurancesQuery,
  useGetDoctorsLanguagesQuery,
} = doctorsPageApi;

export const {
  getDoctorsPagePromoData,
  getDoctorsSpecialtiesList,
  getGlobalServicesList,
  getDoctorsInsurances,
  getDoctorsLanguages,
} = doctorsPageApi.endpoints;

export default doctorsPageApi.util.getRunningQueriesThunk;
