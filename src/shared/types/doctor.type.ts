import { StrapiEditionsInfo } from './api-types.type';
import { IClinic } from './clinic.type';
import { InsurancesRef, GlobalServicesRef } from './directus-api-refs';
import { IImage } from './image.type';
import { ILanguage } from './language.type';
import { IService } from './service.type';
import { ISpecialty } from './specialty.type';
import { ITestimonial } from './testimonial.type';

export type DoctorEducationType =
  | 'base'
  | 'internship'
  | 'ordinator'
  | 'training'
  | 'retrainig';

export interface IDoctorNosology {
  group: string;
  list: string;
}

export interface IDoctorEducation {
  year: string;
  type: DoctorEducationType;
  typeString: string;
  specialty: string;
  text: string;
}

export interface IDoctor extends StrapiEditionsInfo {
  id: number;
  fullName: string;
  shortText?: string;
  longText?: string;
  image: IImage;
  specialties: ISpecialty[];
  insurances: InsurancesRef[];
  lang: ILanguage[];
  clinics: IClinic[];
  services: IService[];
  globalServices: GlobalServicesRef[];
  reembolso?: boolean;
  nosologies?: IDoctorNosology[];
  education?: IDoctorEducation[];
}

export interface IDoctorsTestimonials {
  doctors_id: {
    id: number;
  };
  testimonials_id: ITestimonial | null;
}
