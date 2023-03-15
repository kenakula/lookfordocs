import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import {
  IMainService,
  ISpecialty,
  IInsurance,
  IAdvantage,
  ITestimonial,
  IBlockData,
  ICountedSpecialties,
  IPromoBlockData,
} from '@/shared/types';
import { CollectionResponse, SingletonResponse } from '../assets';

const DIRECTUS_ITEMS_URL = process.env.NEXT_PUBLIC_ITEMS_URL ?? '';

export const mainPageApi = createApi({
  reducerPath: 'mainPageApi',
  baseQuery: fetchBaseQuery({
    baseUrl: DIRECTUS_ITEMS_URL,
  }),
  refetchOnMountOrArgChange: 100,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ['mainPageQueries'],
  endpoints: builder => ({
    getMainPagePromoData: builder.query<IPromoBlockData, void>({
      query: () => ({
        url: '/promo',
        params: {
          fields: 'id,title,subtitle',
        },
      }),
      transformResponse: (response: SingletonResponse<IPromoBlockData>) =>
        response.data,
    }),
    getAppointmentData: builder.query<IBlockData, void>({
      query: () => ({
        url: '/appointment',
        params: {
          fields: 'id,title,subtitle,titleMobile',
        },
      }),
      transformResponse: (response: SingletonResponse<IBlockData>) =>
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
          fields: 'id, name, image.*, sort',
          sort: 'sort',
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
          filter: JSON.stringify({ showOnMainPage: { _eq: true } }),
          fields:
            'id,type,showOnMainPage,author,date,comment,targetClinic.clinics_id.*,targetDoctor.doctors_id.*,specialty.specialties_id.*,targetInsurance.insurances_id.*,city.cities_id.*',
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
  useGetMainPagePromoDataQuery,
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
  getMainPagePromoData,
  getAppointmentData,
} = mainPageApi.endpoints;

export default mainPageApi.util.getRunningQueriesThunk;
