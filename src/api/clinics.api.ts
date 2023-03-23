import { AxiosResponse } from 'axios';
import { axiosClient } from '@/stores/assets';
import {
  DoctorRef,
  IClinic,
  IClinicsTestimonials,
  IPromoBlockData,
  ITestimonial,
} from '@/shared/types';

export const getClinicsIds = async () =>
  axiosClient
    .get<AxiosResponse<{ id: number }[]>>('clinics', {
      params: { fields: 'id' },
    })
    .then(res => res.data.data);

export const getClinicInfo = async (id: string) =>
  axiosClient
    .get<AxiosResponse<IClinic>>(`/clinics/${id}`, {
      params: {
        fields: `*.*,specialties.specialties_id.*,insurances.insurances_id.*,lang.languages_id.*,globalServices.globalServices_id.*,cities.cities_id.*`,
      },
    })
    .then(res => res.data.data);

export const getClinicDoctors = async (
  id: string,
  page: number,
  limit: number,
) =>
  axiosClient
    .get<AxiosResponse<DoctorRef[]>>('/clinics_doctors', {
      params: {
        filter: JSON.stringify({
          clinics_id: { _eq: id },
        }),
        page,
        limit,
        fields: `
            doctors_id.*,
            doctors_id.specialties.specialties_id.*,
            doctors_id.image.*,
            doctors_id.globalServices.globalServices_id.*,
            doctors_id.lang.languages_id.*,
            doctors_id.clinics.clinics_id.*,
            doctors_id.insurances.insurances_id.*,
            doctors_id.clinics.clinics_id.cities.cities_id.*,
            doctors_id.clinics.clinics_id.insurances.insurances_id.*
          `,
      },
    })
    .then(res => res.data.data);

export const getClinicsPagePromoData = async () =>
  axiosClient
    .get<AxiosResponse<IPromoBlockData>>('clinics_promo', {
      params: { fields: 'id,title,subtitle,chips' },
    })
    .then(res => res.data.data);

export const getClinicTestimonials = async (clinicId: string) =>
  axiosClient
    .get<AxiosResponse<ITestimonial[]>>('testimonials', {
      params: {
        filter: JSON.stringify({
          targetClinic: { clinics_id: { _eq: clinicId } },
        }),
        fields: 'id,type,author,date,rate,comment,targetClinic.*',
        sort: '-date_created',
      },
    })
    .then(res => res.data.data);

export const getClinicsTestimonialsRates = async () =>
  axiosClient
    .get<AxiosResponse<IClinicsTestimonials[]>>('testimonials_clinics', {
      params: {
        fields: 'clinics_id.id,testimonials_id.rate',
      },
    })
    .then(res => res.data.data);
