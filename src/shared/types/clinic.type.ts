import { StrapiEditionsInfo } from './api-types.type';
import { ICity } from './city.type';
import { IContact } from './contact.type';
import { IDoctor } from './doctor.type';
import { IGlobalService } from './global-service.type';
import { IImage } from './image.type';
import { IInsurance } from './insurance.type';
import { ILanguage } from './language.type';
import { IMetro } from './metro.type';
import { IService } from './service.type';
import { ISpecialty } from './specialty.type';
import { ITestimonial } from './testimonial.type';
import { IWorkTime } from './work-time.type';

// TODO поправить в апи cities на city
export interface IClinicAddress {
  id: number;
  address: string;
  cities: ICity;
}

export interface IClinic extends StrapiEditionsInfo {
  id: number;
  name: string;
  subtitle: string;
  image: IImage;
  address: IClinicAddress[];
  metro: IMetro[];
  insurances: IInsurance[];
  contacts: IContact[];
  globalServices: IGlobalService[];
  doctors: IDoctor[];
  description: string;
  specialties: ISpecialty[];
  lang: ILanguage[];
  worktime: IWorkTime[];
  services: IService[];
  longText: string;
  reembolso: boolean;
  testimonials: ITestimonial[];
}
