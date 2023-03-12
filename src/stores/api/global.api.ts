import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import {
  ICity,
  IInsurance,
  IPageSettings,
  ISiteSettings,
} from '@/shared/types';
import { CollectionResponse, SingletonResponse } from '../assets';

const DIRECTUS_ITEMS_URL = process.env.NEXT_PUBLIC_ITEMS_URL ?? '';

export const globalApi = createApi({
  reducerPath: 'globalApi',
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
    getSiteSettings: builder.query<ISiteSettings, void>({
      query: () => ({
        url: '/site_settings',
        params: {
          fields:
            'logo.*, documents, copyrights, socials, footerLinks, navigation, testimonialsLimit',
        },
      }),
      transformResponse: (response: SingletonResponse<ISiteSettings>) =>
        response.data,
    }),
    getPageSettings: builder.query<IPageSettings[], string>({
      query: (str: string) => ({
        url: '/pages',
        params: {
          filter: JSON.stringify({ slug: { _eq: str } }),
        },
      }),
      transformResponse: (response: CollectionResponse<IPageSettings>) =>
        response.data,
    }),
    getGlobalCities: builder.query<ICity[], void>({
      query: () => ({
        url: '/cities',
      }),
      transformResponse: (response: CollectionResponse<ICity>) => response.data,
    }),
    getGlobalInsurances: builder.query<IInsurance[], void>({
      query: () => ({
        url: '/insurances',
      }),
      transformResponse: (response: CollectionResponse<IInsurance>) =>
        response.data,
    }),
  }),
});

export const {
  useGetSiteSettingsQuery,
  useGetPageSettingsQuery,
  useGetGlobalCitiesQuery,
  useGetGlobalInsurancesQuery,
} = globalApi;

export const {
  getSiteSettings,
  getPageSettings,
  getGlobalCities,
  getGlobalInsurances,
} = globalApi.endpoints;

export default globalApi.util.getRunningQueriesThunk;
