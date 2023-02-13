import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { DIRECTUS_ITEMS_URL, SingletonResponse } from '../assets';
import { ISiteSettings } from '@/shared/types';

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
      query: () => '/site_settings',
      transformResponse: (response: SingletonResponse<ISiteSettings>) =>
        response.data,
    }),
  }),
});

export const { useGetSiteSettingsQuery } = globalApi;

export const { getSiteSettings } = globalApi.endpoints;

export default globalApi.util.getRunningQueriesThunk;
