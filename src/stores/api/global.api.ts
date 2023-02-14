import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { SingletonResponse } from '../assets';
import { ISiteSettings } from '@/shared/types';

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
            'logo.*, documents, copyrights, socials, footerLinks, navigation',
        },
      }),
      transformResponse: (response: SingletonResponse<ISiteSettings>) =>
        response.data,
    }),
  }),
});

export const { useGetSiteSettingsQuery } = globalApi;

export const { getSiteSettings } = globalApi.endpoints;

export default globalApi.util.getRunningQueriesThunk;
