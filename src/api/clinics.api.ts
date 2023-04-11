import {
  ClinicsFilterQuery,
  IClinic,
  IDoctor,
  ITestimonial,
  StrapiCollection,
  StrapiPagination,
  StrapiSingleton,
} from '@/shared/types';
import { api } from './api';

export const getClinicsIds = async () =>
  api
    .get<StrapiCollection<IClinic>>('clinics', {
      params: { fields: 'id' },
    })
    .then(res => res.data.data);

export const getClinicDoctors = async (
  id: string,
  pagination: Partial<StrapiPagination>,
) =>
  api
    .get<StrapiCollection<IDoctor>>('doctors', {
      params: {
        pagination,
        filters: {
          clinics: {
            id: {
              $eq: id,
            },
          },
        },
        populate: `
          clinics.image,
          clinics.address.city,
          clinics.metro.color,
          clinics.insurances,
          languages.icon,
          specialties,
          insurances,
          globalServices,
          prices.currency,
          testimonials,
          image
        `,
      },
    })
    .then(res => res.data);

export const getClinicInfo = async (id: string) =>
  api
    .get<StrapiSingleton<IClinic>>(`clinics/${id}`, {
      params: {
        populate: `
        image,
        address.city,
        metro.color,
        insurances,
        languages.icon,
        specialties,
        insurances,
        globalServices,
        prices.currency,
        testimonials,
        worktime,
        image,
      `,
      },
    })
    .then(res => res.data.data);

export const getClinicTestimonials = async (id: string) =>
  api
    .get<StrapiCollection<ITestimonial>>('testimonials', {
      params: {
        populate: '*',
        filters: {
          clinic: {
            id: {
              $eq: id,
            },
          },
        },
      },
    })
    .then(res => res.data.data);

export const getClinicsList = (
  pagination: Partial<StrapiPagination>,
  query?: ClinicsFilterQuery,
) =>
  api<StrapiCollection<IClinic>>('clinics', {
    params: {
      populate: `
        image,
        address.city,
        metro.color,
        insurances,
        languages.icon,
        specialties,
        insurances,
        globalServices,
        prices.currency,
        testimonials,
        worktime,
        image
      `,
      pagination,
      filters: {
        $and: [
          {
            name: {
              $containsi: query && query.name,
            },
          },
          {
            $or: [
              {
                specialties: {
                  id: {
                    $in:
                      query && query.specialty
                        ? query.specialty.split(',')
                        : [],
                  },
                },
              },
              {
                globalServices: {
                  id: {
                    $in: query && query.service ? query.service.split(',') : [],
                  },
                },
              },
              {
                insurances: {
                  id: {
                    $in:
                      query && query.insurance
                        ? query.insurance.split(',')
                        : [],
                  },
                },
              },
              {
                languages: {
                  id: {
                    $in: query && query.lang ? query.lang.split(',') : [],
                  },
                },
              },
            ],
          },
        ],
      },
    },
  }).then(res => res.data);
