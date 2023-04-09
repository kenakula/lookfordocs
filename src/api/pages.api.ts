import {
  IDoctorsPageData,
  IMainPageData,
  ITestimonial,
  StrapiCollection,
  StrapiSingleton,
} from '@/shared/types';
import { api } from './api';

export const getMainPageData = async () =>
  api
    .get<StrapiSingleton<IMainPageData>>('main-page', {
      params: {
        populate: 'promo,appointment,services.image,advantages.image',
      },
    })
    .then(res => res.data.data);

export const getMainPageTestimonials = () =>
  api
    .get<StrapiCollection<ITestimonial>>('testimonials', {
      params: {
        populate: `
          clinic.image,
          clinic.address,
          clinic.address.city,
          doctor.image,
          doctor.specialties
        `,
      },
    })
    .then(res => res.data.data);

export const getDoctorsPageData = async () =>
  api
    .get<StrapiSingleton<IDoctorsPageData>>('doctors-page', {
      params: {
        populate: 'promo.chips',
      },
    })
    .then(res => res.data.data);
