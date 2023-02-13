import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { CollectionResponse } from '../assets';
import {
  IMainService,
  ISpecialty,
  IInsurance,
  IAdvantage,
} from '@/shared/types';

const DIRECTUS_ITEMS_URL = process.env.NEXT_PUBLIC_ITEMS_URL ?? '';

export const mainPageApi = createApi({
  reducerPath: 'mainPageApi',
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
    getServicesList: builder.query<IMainService[], void>({
      query: () => ({
        url: '/services',
        params: {
          fields: 'id, description, title, image.*',
        },
      }),
      transformResponse: (response: CollectionResponse<IMainService>) =>
        response.data,
    }),
    getSpecialtiesList: builder.query<ISpecialty[], void>({
      query: () => ({
        url: '/specialties',
      }),
      transformResponse: (response: CollectionResponse<ISpecialty>) =>
        response.data,
    }),
    getPopularSpecialtiesList: builder.query<ISpecialty[], void>({
      query: () => ({
        url: '/specialties',
        params: {
          filter: JSON.stringify({ popular: { _eq: true } }),
        },
      }),
      transformResponse: (response: CollectionResponse<ISpecialty>) =>
        response.data,
    }),
    getInsurances: builder.query<IInsurance[], void>({
      query: () => ({
        url: '/insurances',
        params: {
          fields: 'id, name, image.*',
        },
      }),
      transformResponse: (response: CollectionResponse<IInsurance>) =>
        response.data,
    }),
    getAdvantages: builder.query<IAdvantage[], void>({
      query: () => ({
        url: '/advantages',
        params: {
          fields: 'id, title, description, image.*',
        },
      }),
      transformResponse: (response: CollectionResponse<IAdvantage>) =>
        response.data,
    }),
  }),
});

export const {
  useGetServicesListQuery,
  useGetSpecialtiesListQuery,
  useGetPopularSpecialtiesListQuery,
  useGetInsurancesQuery,
  useGetAdvantagesQuery,
} = mainPageApi;

export const {
  getServicesList,
  getSpecialtiesList,
  getPopularSpecialtiesList,
  getInsurances,
  getAdvantages,
} = mainPageApi.endpoints;

export default mainPageApi.util.getRunningQueriesThunk;
