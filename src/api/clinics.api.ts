import { AxiosResponse } from 'axios';
import { axiosClient } from '@/stores/assets';
import {
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
      params: { fields: 'id,name,image.*,address,contacts,city' },
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
