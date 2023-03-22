import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { IClinic, IItemsCount, TriggerQueryArgs } from '@/shared/types';
import { CollectionResponse, getDoctorsQueryString } from '../assets';
import { ClinicsFilterQuery } from '../types';

const DIRECTUS_ITEMS_URL = process.env.NEXT_PUBLIC_ITEMS_URL ?? '';
export const CLINICS_PAGE_LIMIT = 6;

// TODO заменить функцию фильтра

export const clinicsPageApi = createApi({
  reducerPath: 'clinicsPageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: DIRECTUS_ITEMS_URL,
  }),
  refetchOnMountOrArgChange: 100,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['clinicsPageApi'],
  endpoints: builder => ({
    getClinicsList: builder.query<
      IClinic[],
      TriggerQueryArgs<ClinicsFilterQuery>
    >({
      query: ({ filter, page, limit }) => ({
        url: '/clinics?fields=*.*,specialties.specialties_id.*,insurances.insurances_id.*,lang.languages_id.*,globalServices.globalServices_id.*',
        params: {
          filter: getDoctorsQueryString(filter),
          sort: '-image',
          page,
          limit,
        },
      }),
      transformResponse: (response: CollectionResponse<IClinic>) =>
        response.data,
    }),
    getClinicsCount: builder.query<
      IItemsCount,
      TriggerQueryArgs<ClinicsFilterQuery>
    >({
      query: ({ filter }) => ({
        url: '/clinics',
        params: {
          filter: getDoctorsQueryString(filter),
          'aggregate[count]': 'id',
        },
      }),
      transformResponse: (response: CollectionResponse<IItemsCount>) =>
        response.data[0],
    }),
  }),
});

export const { useLazyGetClinicsListQuery, useLazyGetClinicsCountQuery } =
  clinicsPageApi;

export const { getClinicsCount } = clinicsPageApi.endpoints;
