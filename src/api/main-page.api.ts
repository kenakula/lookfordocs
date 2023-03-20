import {
  IAdvantage,
  IBlockData,
  ICountedSpecialties,
  IInsurance,
  IMainService,
  IPromoBlockData,
  ISpecialty,
  ITestimonial,
} from '@/shared/types';
import { axiosClient } from '@/stores/assets';
import { AxiosResponse } from 'axios';

export const getMainPagePromoData = async () =>
  axiosClient
    .get<AxiosResponse<IPromoBlockData>>('promo', {
      params: { fields: 'id,title,subtitle' },
    })
    .then(res => res.data.data);

export const getMainPageAppointmentData = async () =>
  axiosClient
    .get<AxiosResponse<IBlockData>>('appointment', {
      params: { fields: 'id,title,subtitle,titleMobile' },
    })
    .then(res => res.data.data);

export const getPopularSpecialties = async () =>
  axiosClient
    .get<AxiosResponse<ISpecialty[]>>('specialties', {
      params: { filter: JSON.stringify({ popular: { _eq: true } }) },
    })
    .then(res => res.data.data);

export const getCountedSpecialties = async () =>
  axiosClient
    .get<AxiosResponse<ICountedSpecialties[]>>('doctors_specialties', {
      params: { groupBy: 'specialties_id', 'aggregate[count]': 'doctors_id' },
    })
    .then(res => res.data.data);

export const getMainServices = async () =>
  axiosClient
    .get<AxiosResponse<IMainService[]>>('services', {
      params: {
        fields: 'id, description, title, image.*',
      },
    })
    .then(res => res.data.data);

export const getMainInsurances = async () =>
  axiosClient
    .get<AxiosResponse<IInsurance[]>>('insurances', {
      params: {
        fields: 'id, name, image.*, sort',
        sort: 'sort',
      },
    })
    .then(res => res.data.data);

export const getMainAdvantages = async () =>
  axiosClient
    .get<AxiosResponse<IAdvantage[]>>('advantages', {
      params: {
        fields: 'id, title, description, image.*',
      },
    })
    .then(res => res.data.data);

export const getMainTestimonials = async () =>
  axiosClient
    .get<AxiosResponse<ITestimonial[]>>('testimonials', {
      params: {
        filter: JSON.stringify({ showOnMainPage: { _eq: true } }),
        fields: `
          id,
          type,
          showOnMainPage,
          author,
          date,
          comment,
          targetClinic.clinics_id.*,
          targetDoctor.doctors_id.*,
          specialty.specialties_id.*,
          targetInsurance.insurances_id.*,
          city.cities_id.*
        `,
      },
    })
    .then(res => res.data.data);
