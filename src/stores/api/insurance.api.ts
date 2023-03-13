import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { IInsurance } from '@/shared/types';
import { CollectionResponse } from '../assets';

const DIRECTUS_ITEMS_URL = process.env.NEXT_PUBLIC_ITEMS_URL ?? '';

export const insuranceApi = createApi({
  reducerPath: 'insuranceApi',
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
    getInsuranceInfo: builder.query<IInsurance, string>({
      query: (insuranceId: string) => ({
        url: '/insurances',
        params: {
          filter: JSON.stringify({ id: { _eq: insuranceId } }),
          fields: 'id,name,image.*',
        },
      }),
      transformResponse: (response: CollectionResponse<IInsurance>) =>
        response.data[0],
    }),
  }),
});

export const { useGetInsuranceInfoQuery } = insuranceApi;

export const { getInsuranceInfo } = insuranceApi.endpoints;

export default insuranceApi.util.getRunningQueriesThunk;
