import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import {
  CollectionResponse,
  getDoctorsQueryString,
  SingletonResponse,
} from '../assets';
import { DoctorsFilterQuery } from '../types';
import { IDoctor, IPromoBlockData } from '@/shared/types';

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
            '*.*,specialties.specialties_id.*,clinics.clinics_id.*,insurances.insurances_id.*,lang.languages_id.*',
          filter: getDoctorsQueryString(arg),
        },
      }),
      transformResponse: (response: CollectionResponse<IDoctor>) =>
        response.data,
    }),
  }),
});

export const { useGetDoctorsPagePromoDataQuery, useLazyGetDoctorsListQuery } =
  doctorsPageApi;

export const { getDoctorsPagePromoData } = doctorsPageApi.endpoints;

export default doctorsPageApi.util.getRunningQueriesThunk;
