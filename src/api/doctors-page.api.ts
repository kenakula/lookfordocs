import { axiosClient, AxiosResponse } from '@/stores/assets';
import {
  IClinic,
  IDoctorsTestimonials,
  IInsurance,
  IPromoBlockData,
  ISpecialty,
} from '@/shared/types';

export const getDoctorsIds = async () =>
  axiosClient
    .get<AxiosResponse<{ id: number }[]>>('doctors', {
      params: { fields: 'id' },
    })
    .then(res => res.data.data);

export const getDoctorsPagePromoData = async () =>
  axiosClient
    .get<AxiosResponse<IPromoBlockData>>('promo', {
      params: { fields: 'id,title,subtitle' },
    })
    .then(res => res.data.data);

export const getDoctorsSpecialties = async () =>
  axiosClient
    .get<AxiosResponse<ISpecialty[]>>('specialties', {
      params: {
        sort: '-popular',
      },
    })
    .then(res => res.data.data);

export const getDoctorsInsurances = async () =>
  axiosClient
    .get<AxiosResponse<IInsurance[]>>('insurances', {
      params: {
        fields: 'id, name, image.*',
        sort: 'sort',
      },
    })
    .then(res => res.data.data);

export const getDoctorsClinics = async () =>
  axiosClient
    .get<AxiosResponse<IClinic[]>>('clinics', {
      params: {
        fields: 'id, name',
      },
    })
    .then(res => res.data.data);

export const getDoctorsTestimonials = async () =>
  axiosClient
    .get<AxiosResponse<IDoctorsTestimonials[]>>('testimonials_doctors', {
      params: {
        fields: 'doctors_id.id,testimonials_id.rate',
      },
    })
    .then(res => res.data.data);
