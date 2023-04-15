import {
  ICity,
  IClinic,
  IGlobalService,
  IInsurance,
  ILanguage,
  IPageSettings,
  ISiteSettings,
  ISpecialty,
  StrapiCollection,
  StrapiSingleton,
} from '@/shared/types';
import { api } from './api';

export const getSiteSettings = async () =>
  api
    .get<StrapiSingleton<ISiteSettings>>('site-settings', {
      params: {
        populate: `
          logo,
          socials,
          documents,
          navigation,
          footerLinks,
          favicons.ico,
          favicons.png16,
          favicons.png32,
          favicons.png150,
          favicons.png192,
          favicons.png384,
          constructionImage,
          favicons.webmanifest,
          favicons.browserconfig,
          favicons.appleTouchIcon,
          favicons.safariPinnedTab
        `,
      },
    })
    .then(res => res.data.data);

export const getPageSettings = async (slug: string) =>
  api
    .get<StrapiCollection<IPageSettings>>('pages', {
      params: {
        filters: {
          slug: {
            $eq: slug,
          },
        },
        populate: '*',
      },
    })
    .then(res => res.data.data[0]);

export const getSpecialties = async (popular?: boolean) =>
  api
    .get<StrapiCollection<ISpecialty>>('specialties', {
      params: {
        sort: 'popular:desc',
        populate: '*',
        filters: popular
          ? {
              popular: {
                $eq: true,
              },
            }
          : undefined,
      },
    })
    .then(res => res.data.data);

export const getInsurances = async () =>
  api
    .get<StrapiCollection<IInsurance>>('insurances', {
      params: {
        populate: '*',
      },
    })
    .then(res => res.data.data);

export const getGlobalServices = async () =>
  api
    .get<StrapiCollection<IGlobalService>>('global-services')
    .then(res => res.data.data);

export const getLanguages = async () =>
  api.get<StrapiCollection<ILanguage>>('languages').then(res => res.data.data);

export const getCities = async () =>
  api.get<StrapiCollection<ICity>>('cities').then(res => res.data.data);

export const getClinics = async () =>
  api.get<StrapiCollection<IClinic>>('clinics').then(res => res.data.data);
