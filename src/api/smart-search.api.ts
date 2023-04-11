import {
  StrapiCollection,
  ISpecialty,
  IDoctor,
  IClinic,
  IInsurance,
  IGlobalService,
  ILanguage,
} from '@/shared/types';
import { api } from './api';

export const getFilteredSpecialties = (str: string) =>
  api
    .get<StrapiCollection<ISpecialty>>('specialties', {
      params: {
        populate: '*',
        filters: {
          name: {
            $contains: str,
          },
        },
      },
    })
    .then(res => res.data.data);

export const getFilteredDoctors = (str: string) =>
  api
    .get<StrapiCollection<IDoctor>>('doctors', {
      params: {
        populate: '*',
        filters: {
          $or: [
            {
              fullName: {
                $containsi: str,
              },
            },
            {
              specialties: {
                name: {
                  $containsi: str,
                },
              },
            },
          ],
        },
      },
    })
    .then(res => res.data.data);

export const getFilteredClinics = (str: string) =>
  api
    .get<StrapiCollection<IClinic>>('clinics', {
      params: {
        populate: 'address.city,image',
        filters: {
          $or: [
            {
              name: {
                $containsi: str,
              },
            },
            {
              specialties: {
                name: {
                  $containsi: str,
                },
              },
            },
          ],
        },
      },
    })
    .then(res => res.data.data);

export const getFilteredInsurances = (str: string) =>
  api
    .get<StrapiCollection<IInsurance>>('insurances', {
      params: {
        populate: '*',
        filters: {
          name: {
            $contains: str,
          },
        },
      },
    })
    .then(res => res.data.data);

export const getFilteredGlobalServices = (str: string) =>
  api
    .get<StrapiCollection<IGlobalService>>('global-services', {
      params: {
        populate: '*',
        filters: {
          name: {
            $contains: str,
          },
        },
      },
    })
    .then(res => res.data.data);

export const getFilteredLanguages = (str: string) =>
  api
    .get<StrapiCollection<ILanguage>>('languages', {
      params: {
        populate: '*',
        filters: {
          name: {
            $contains: str,
          },
        },
      },
    })
    .then(res => res.data.data);
