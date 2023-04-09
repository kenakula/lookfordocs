import {
  DoctorsFilterQuery,
  IDoctor,
  StrapiCollection,
  StrapiPagination,
  StrapiSingleton,
} from '@/shared/types';
import { api } from './api';

export const getDoctorsIds = async () =>
  api
    .get<StrapiCollection<IDoctor>>('doctors', {
      params: { fields: 'id' },
    })
    .then(res => res.data.data);

export const getDoctorInfo = async (id: string) =>
  api
    .get<StrapiSingleton<IDoctor>>(`doctors/${id}`, {
      params: {
        populate: `
          clinics.image,
          clinics.address.city,
          clinics.metro.color,
          clinics.insurances,
          languages.icon,
          specialties,
          nosologies,
          insurances,
          globalServices,
          prices.currency,
          education,
          testimonials,
          image
        `,
      },
    })
    .then(res => res.data.data);

export const getDoctorsList = (
  pagination: Partial<StrapiPagination>,
  query?: DoctorsFilterQuery,
) =>
  api<StrapiCollection<IDoctor>>('doctors', {
    params: {
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
      pagination,
      filters: {
        $and: [
          {
            fullName: {
              $contains: query && query.name,
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
                clinics: {
                  id: {
                    $in: query && query.clinic ? query.clinic.split(',') : [],
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
