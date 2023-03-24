import {
  ICity,
  IGlobalService,
  IInsurance,
  ILanguage,
  IPageSettings,
  ISiteSettings,
  ISpecialty,
} from '@/shared/types';
import { axiosClient } from '@/stores/assets';
import { AxiosResponse } from 'axios';

export const getSiteSettings = async (): Promise<ISiteSettings> =>
  axiosClient
    .get<AxiosResponse<ISiteSettings>>('/site_settings', {
      params: {
        fields:
          'logo.*, documents, copyrights, socials, footerLinks, navigation, testimonialsLimit',
      },
    })
    .then(res => res.data.data);

export const getPageSettings = async (slug: string): Promise<IPageSettings> =>
  axiosClient
    .get<AxiosResponse<IPageSettings[]>>('/pages', {
      params: { filter: JSON.stringify({ slug: { _eq: slug } }) },
    })
    .then(res => res.data.data[0]);

export const getGlobalServices = async (): Promise<IGlobalService[]> =>
  axiosClient
    .get<AxiosResponse<IGlobalService[]>>('/globalServices')
    .then(res => res.data.data);

export const getLanguages = async (): Promise<ILanguage[]> =>
  axiosClient
    .get<AxiosResponse<ILanguage[]>>('/languages', {
      params: {
        fields: 'id, name, slug',
      },
    })
    .then(res => res.data.data);

export const getCities = async () =>
  axiosClient.get<AxiosResponse<ICity[]>>('cities').then(res => res.data.data);

export const getInsurances = async () =>
  axiosClient
    .get<AxiosResponse<IInsurance[]>>('insurances', {
      params: {
        fields: 'id, name, image.*',
        sort: 'sort',
      },
    })
    .then(res => res.data.data);

export const getSpecialties = async () =>
  axiosClient
    .get<AxiosResponse<ISpecialty[]>>('specialties', {
      params: {
        sort: '-popular',
      },
    })
    .then(res => res.data.data);
