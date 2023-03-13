import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { IClinic } from '@/shared/types';
import { CollectionResponse } from '../assets';

const DIRECTUS_ITEMS_URL = process.env.NEXT_PUBLIC_ITEMS_URL ?? '';

export const clinicApi = createApi({
  reducerPath: 'clinicApi',
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
    getClinicInfo: builder.query<IClinic, string>({
      query: (clinicId: string) => ({
        url: '/clinics',
        params: {
          filter: JSON.stringify({ id: { _eq: clinicId } }),
          fields: 'id,name,image.*,address,contacts,city',
        },
      }),
      transformResponse: (response: CollectionResponse<IClinic>) =>
        response.data[0],
    }),
  }),
});

export const { useGetClinicInfoQuery } = clinicApi;

export const { getClinicInfo } = clinicApi.endpoints;

export default clinicApi.util.getRunningQueriesThunk;
