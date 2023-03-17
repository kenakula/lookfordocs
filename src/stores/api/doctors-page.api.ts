import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { IDoctor, IDoctorCount, TriggerQueryArgs } from '@/shared/types';
import { CollectionResponse, getDoctorsQueryString } from '../assets';
import { DoctorsFilterQuery } from '../types';

const DIRECTUS_ITEMS_URL = process.env.NEXT_PUBLIC_ITEMS_URL ?? '';
export const DOCTORS_PAGE_LIMIT = 6;

export const doctorsPageApi = createApi({
  reducerPath: 'doctorsPageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: DIRECTUS_ITEMS_URL,
  }),
  refetchOnMountOrArgChange: 100,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['doctorsPageApi'],
  endpoints: builder => ({
    getDoctorsList: builder.query<
      IDoctor[],
      TriggerQueryArgs<DoctorsFilterQuery>
    >({
      query: ({ filter, page, limit }) => ({
        url: '/doctors?fields=*.*,specialties.specialties_id.*,clinics.clinics_id.*,insurances.insurances_id.*,lang.languages_id.*,globalServices.globalServices_id.*&fields=clinics.clinics_id.cities.cities_id.*.*&fields=clinics.clinics_id.insurances.insurances_id.*.*',
        params: {
          filter: getDoctorsQueryString(filter),
          sort: '-image',
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
  }),
});

export const { useLazyGetDoctorsCountQuery, useLazyGetDoctorsListQuery } =
  doctorsPageApi;

export const { getDoctorsCount } = doctorsPageApi.endpoints;

export default doctorsPageApi.util.getRunningQueriesThunk;
