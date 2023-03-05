import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import {
  CollectionResponse,
  getDoctorsQueryString,
  SingletonResponse,
} from '../assets';
import { DoctorsFilterQuery } from '../types';
import {
  IClinic,
  IDoctor,
  IDoctorCount,
  IGlobalService,
  IInsurance,
  ILanguage,
  IPromoBlockData,
  ISpecialty,
  TriggerQueryArgs,
} from '@/shared/types';

const DIRECTUS_ITEMS_URL = process.env.NEXT_PUBLIC_ITEMS_URL ?? '';
export const DOCTORS_PAGE_LIMIT = 6;

// TODO трансформировать ответы без рефов чтобы было

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
    getDoctorsList: builder.query<
      IDoctor[],
      TriggerQueryArgs<DoctorsFilterQuery>
    >({
      query: ({ filter, page, limit }) => ({
        url: '/doctors?fields=*.*,specialties.specialties_id.*,clinics.clinics_id.*,insurances.insurances_id.*,lang.languages_id.*,globalServices.globalServices_id.*&fields=clinics.clinics_id.cities.cities_id.*.*&fields=clinics.clinics_id.insurances.insurances_id.*.*',
        params: {
          filter: getDoctorsQueryString(filter),
          page,
          limit,
        },
      }),
      transformResponse: (response: CollectionResponse<IDoctor>) =>
        response.data,
    }),
    getDoctorsCount: builder.query<
      IDoctorCount,
      TriggerQueryArgs<DoctorsFilterQuery>
    >({
      query: ({ filter }) => ({
        url: '/doctors',
        params: {
          filter: getDoctorsQueryString(filter),
          'aggregate[count]': 'id',
        },
      }),
      transformResponse: (response: CollectionResponse<IDoctorCount>) =>
        response.data[0],
    }),
    getDoctorsSpecialtiesList: builder.query<ISpecialty[], void>({
      query: () => ({
        url: '/specialties?sort=-popular',
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
          sort: 'sort',
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
    getDoctorsClinics: builder.query<IClinic[], void>({
      query: () => ({
        url: '/clinics',
        params: {
          fields: 'id, name',
        },
      }),
      transformResponse: (response: CollectionResponse<IClinic>) =>
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
  useGetDoctorsClinicsQuery,
  useLazyGetDoctorsCountQuery,
} = doctorsPageApi;

export const {
  getDoctorsPagePromoData,
  getDoctorsSpecialtiesList,
  getGlobalServicesList,
  getDoctorsInsurances,
  getDoctorsLanguages,
  getDoctorsClinics,
  getDoctorsCount,
} = doctorsPageApi.endpoints;

export default doctorsPageApi.util.getRunningQueriesThunk;
