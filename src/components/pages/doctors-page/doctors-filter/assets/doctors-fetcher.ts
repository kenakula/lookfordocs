import {
  DoctorsFilterQuery,
  StrapiPagination,
  StrapiCollection,
  IDoctor,
} from '@/shared/types';
import { axiosClient } from '@/stores/assets';

export const doctorsFetcher = (
  query: DoctorsFilterQuery,
  pagination: Partial<StrapiPagination>,
) =>
  axiosClient<StrapiCollection<IDoctor>>('doctors', {
    params: {
      populate: '*',
      pagination,
      filters: {
        $and: [
          {
            fullName: {
              $contains: query.name,
            },
          },
          {
            $or: [
              {
                specialties: {
                  id: {
                    $in: query.specialty ? query.specialty.split(',') : [],
                  },
                },
              },
              {
                global_services: {
                  id: {
                    $in: query.service ? query.service.split(',') : [],
                  },
                },
              },
              {
                clinics: {
                  id: {
                    $in: query.clinic ? query.clinic.split(',') : [],
                  },
                },
              },
              {
                insurances: {
                  id: {
                    $in: query.insurance ? query.insurance.split(',') : [],
                  },
                },
              },
              {
                languages: {
                  id: {
                    $in: query.lang ? query.lang.split(',') : [],
                  },
                },
              },
            ],
          },
        ],
      },
    },
  }).then(res => res.data);
