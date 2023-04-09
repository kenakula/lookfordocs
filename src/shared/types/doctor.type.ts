import { StrapiEditionsInfo } from './api-types.type';
import { IClinic } from './clinic.type';
import { IGlobalService } from './global-service.type';
import { IImage } from './image.type';
import { IInsurance } from './insurance.type';
import { ILanguage } from './language.type';
import { IPrice } from './price.type';
import { ISpecialty } from './specialty.type';
import { ITestimonial } from './testimonial.type';

export interface IDoctorNosology {
  group: string;
  list: string;
}

export interface IDoctorEducation {
  startYear: string;
  endYear?: string;
  type: string;
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
  prices: IPrice[];
  globalServices: IGlobalService[];
  nosologies: IDoctorNosology[];
  reembolso: boolean;
  education: IDoctorEducation[];
  testimonials: ITestimonial[];
}
