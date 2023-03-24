import { axiosClient, AxiosResponse } from '@/stores/assets';
import {
  IClinic,
  IDoctor,
  IDoctorsTestimonials,
  IPromoBlockData,
  ITestimonial,
} from '@/shared/types';

export const getDoctorsIds = async () =>
  axiosClient
    .get<AxiosResponse<{ id: number }[]>>('doctors', {
      params: { fields: 'id' },
    })
    .then(res => res.data.data);

export const getDoctorsPagePromoData = async () =>
  axiosClient
    .get<AxiosResponse<IPromoBlockData>>('doctors_promo', {
      params: { fields: 'id,title,subtitle,chips' },
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

export const getDoctorsTestimonialsRates = async () =>
  axiosClient
    .get<AxiosResponse<IDoctorsTestimonials[]>>('testimonials_doctors', {
      params: {
        fields: 'doctors_id.id,testimonials_id.rate',
      },
    })
    .then(res => res.data.data);

export const getDoctorInfo = async (docId: string) =>
  axiosClient
    .get<AxiosResponse<IDoctor>>(`doctors/${docId}`, {
      params: {
        fields: `
            id,
            firstName,
            lastName,
            shortText,
            longText,
            perks,
            services,
            reembolso,
            nosologies,
            education,
            image.*,
            gender,
            specialties.specialties_id.*,
            lang.languages_id.*,
            insurances.insurances_id.*,
            clinics.clinics_id.*,
            globalServices.globalServices_id.*
          `,
      },
    })
    .then(res => res.data.data);

export const getDocTestimonials = async (docId: string) =>
  axiosClient
    .get<AxiosResponse<ITestimonial[]>>('testimonials', {
      params: {
        filter: JSON.stringify({
          targetDoctor: { doctors_id: { _eq: docId } },
        }),
        fields: 'id,type,author,date,rate,comment,targetDoctor.*',
        sort: '-date_created',
      },
    })
    .then(res => res.data.data);
