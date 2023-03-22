import { IContact } from './contact.type';
import {
  CitiesRef,
  DoctorRef,
  GlobalServicesRef,
  InsurancesRef,
  LanguagesRef,
  SpecialtyRef,
} from './directus-api-refs';
import { IImage } from './image.type';
import { IMetro } from './metro.type';
import { ITestimonial } from './testimonial.type';

export interface IWorkTimes {
  days: string;
  hours: string;
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
  image: IImage;
  address: string;
  cities: CitiesRef[];
  metro: IMetro[];
  insurances: InsurancesRef[];
  contacts: IContact[];
  globalServices: GlobalServicesRef[];
  doctors: DoctorRef[];
  description: string;
  specialties: SpecialtyRef[];
  lang: LanguagesRef[];
  workTimes: IWorkTimes[];
}

export interface IClinicsTestimonials {
  clinics_id: {
    id: number;
  };
  testimonials_id: ITestimonial | null;
}
