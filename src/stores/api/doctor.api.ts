import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { CollectionResponse } from '../assets';
import { IDoctor } from '@/shared/types';

const DIRECTUS_ITEMS_URL = process.env.NEXT_PUBLIC_ITEMS_URL ?? '';

export const doctorApi = createApi({
  reducerPath: 'doctorApi',
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
    getDocInfo: builder.query<IDoctor, string>({
      query: (docId: string) => ({
        url: '/doctors',
        params: {
          filter: JSON.stringify({ id: { _eq: docId } }),
          fields:
            'id,status,firstName,lastName,image.*,gender,specialties.specialties_id.*,languages.languages_id.*,insurances.insurances_id.*',
        },
      }),
      transformResponse: (response: CollectionResponse<IDoctor>) =>
        response.data[0],
    }),
  }),
});

export const { useGetDocInfoQuery } = doctorApi;

export const { getDocInfo } = doctorApi.endpoints;

export default doctorApi.util.getRunningQueriesThunk;
