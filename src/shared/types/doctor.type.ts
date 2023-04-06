import { StrapiEditionsInfo } from './api-types.type';
import { IClinic } from './clinic.type';
import { IGlobalService } from './global-service.type';
import { IImage } from './image.type';
import { IInsurance } from './insurance.type';
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
  insurances: IInsurance[];
  languages: ILanguage[];
  clinics: IClinic[];
  services: IService[];
  globalServices: IGlobalService[];
  reembolso?: boolean;
  nosologies?: IDoctorNosology[];
  education?: IDoctorEducation[];
  testimonials: ITestimonial[];
}

export interface IDoctorsTestimonials {
  doctors_id: {
    id: number;
  };
  testimonials_id: ITestimonial | null;
}
