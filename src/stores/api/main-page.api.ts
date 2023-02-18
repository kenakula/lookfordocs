import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { CollectionResponse, SingletonResponse } from '../assets';
import {
  IMainService,
  ISpecialty,
  IInsurance,
  IAdvantage,
  ITestimonial,
  IMainPromo,
  IMainAppointment,
  ICountedSpecialties,
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
    getPromoData: builder.query<IMainPromo, void>({
      query: () => ({
        url: '/promo',
        params: {
          fields: 'id,title,subtitle,inputPlaceholder',
        },
      }),
      transformResponse: (response: SingletonResponse<IMainPromo>) =>
        response.data,
    }),
    getAppointmentData: builder.query<IMainAppointment, void>({
      query: () => ({
        url: '/appointment',
        params: {
          fields: 'id,title,subtitle,titleMobile',
        },
      }),
      transformResponse: (response: SingletonResponse<IMainAppointment>) =>
        response.data,
    }),
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
    getCountedSpecialties: builder.query<ICountedSpecialties[], void>({
      query: () => ({
        url: '/doctors_specialties',
        params: {
          groupBy: 'specialties_id',
          'aggregate[count]': 'doctors_id',
        },
      }),
      transformResponse: (response: CollectionResponse<ICountedSpecialties>) =>
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
    getTestimonials: builder.query<ITestimonial[], void>({
      query: () => ({
        url: '/testimonials',
        params: {
          fields: 'id, type, text, author, title, subtitle, date, image.*',
        },
      }),
      transformResponse: (response: CollectionResponse<ITestimonial>) =>
        response.data,
    }),
  }),
});

export const {
  useGetServicesListQuery,
  useGetSpecialtiesListQuery,
  useGetCountedSpecialtiesQuery,
  useGetPopularSpecialtiesListQuery,
  useGetInsurancesQuery,
  useGetAdvantagesQuery,
  useGetTestimonialsQuery,
  useGetPromoDataQuery,
  useGetAppointmentDataQuery,
} = mainPageApi;

export const {
  getServicesList,
  getSpecialtiesList,
  getCountedSpecialties,
  getPopularSpecialtiesList,
  getInsurances,
  getAdvantages,
  getTestimonials,
  getPromoData,
  getAppointmentData,
} = mainPageApi.endpoints;

export default mainPageApi.util.getRunningQueriesThunk;
