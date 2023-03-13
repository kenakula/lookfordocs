import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { IDoctor, ITestimonial } from '@/shared/types';
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
  tagTypes: [],
  endpoints: builder => ({
    getDocInfo: builder.query<IDoctor, string>({
      query: (docId: string) => ({
        url: '/doctors',
        params: {
          filter: JSON.stringify({ id: { _eq: docId } }),
          fields:
            'id,firstName,lastName,shortText,longText,perks,services,reembolso,nosologies,education,image.*,gender,specialties.specialties_id.*,lang.languages_id.*,insurances.insurances_id.*,clinics.clinics_id.*,globalServices.globalServices_id.*',
        },
      }),
      transformResponse: (response: CollectionResponse<IDoctor>) =>
        response.data[0],
    }),
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

export const {
  useGetDocInfoQuery,
  useGetDocsTestimonialsQuery,
  useSaveDocTestimonialMutation,
} = doctorApi;

export const { getDocInfo, getDocsTestimonials, saveDocTestimonial } =
  doctorApi.endpoints;

export default doctorApi.util.getRunningQueriesThunk;
