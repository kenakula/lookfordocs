import { ICity } from './city.type';
import { IContact } from './contact.type';
import { GlobalServicesRef, InsurancesRef } from './directus-api-refs';
import { IDoctor } from './doctor.type';
import { IImage } from './image.type';
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

export interface IClinic {
  id: number;
  status: string;
  sort?: number;
  user_created: string;
  date_created: Date;
  user_updated: string;
  date_updated?: Date;
  name: string;
  subtitle: string;
  image: IImage;
  address: IClinicAddress[];
  metro: IMetro[];
  insurances: InsurancesRef[];
  contacts: IContact[];
  globalServices: GlobalServicesRef[];
  doctors: IDoctor[];
  description: string;
  specialties: ISpecialty[];
  lang: ILanguage[];
  worktime: IWorkTime[];
  services: IService[];
  longText: string;
  reembolso: boolean;
}

export interface IClinicsTestimonials {
  clinics_id: {
    id: number;
  };
  testimonials_id: ITestimonial | null;
}
