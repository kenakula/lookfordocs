import { StrapiEditionsInfo } from './api-types.type';
import { ICity } from './city.type';
import { IContact } from './contact.type';
import { IGlobalService } from './global-service.type';
import { IImage } from './image.type';
import { IInsurance } from './insurance.type';
import { ILanguage } from './language.type';
import { IMetro } from './metro.type';
import { IPrice } from './price.type';
import { ISpecialty } from './specialty.type';
import { ITestimonial } from './testimonial.type';
import { IWorkTime } from './work-time.type';

export interface IClinicAddress {
  id: number;
  address: string;
  city: ICity;
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
  description: string;
  specialties: ISpecialty[];
  languages: ILanguage[];
  worktime: IWorkTime[];
  prices: IPrice[];
  longText: string;
  reembolso: boolean;
  testimonials: ITestimonial[];
  rnovaId?: string;
}
