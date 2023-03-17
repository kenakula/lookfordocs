import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { ITestimonial } from '@/shared/types';
import { TestimonialModel } from '@/shared/models';
import { CollectionResponse } from '../assets';

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
  refetchOnMountOrArgChange: 100,
  tagTypes: ['doctorApi'],
  endpoints: builder => ({
    getDocsTestimonials: builder.query<ITestimonial[], string>({
      query: (docId: string) => ({
        url: '/testimonials',
        params: {
          filter: JSON.stringify({
            targetDoctor: { doctors_id: { _eq: docId } },
          }),
          fields: 'id,type,author,date,rate,comment,targetDoctor.*',
          sort: '-date_created',
        },
      }),
      transformResponse: (response: CollectionResponse<ITestimonial>) =>
        response.data,
    }),
    saveDocTestimonial: builder.mutation<ITestimonial, TestimonialModel>({
      query: data => ({
        url: '/testimonials',
        body: data,
        method: 'POST',
      }),
    }),
  }),
});

export const { useGetDocsTestimonialsQuery, useSaveDocTestimonialMutation } =
  doctorApi;

export const { getDocsTestimonials, saveDocTestimonial } = doctorApi.endpoints;

export default doctorApi.util.getRunningQueriesThunk;
