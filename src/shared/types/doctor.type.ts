import {
  SpecialtyRef,
  InsurancesRef,
  LanguagesRef,
  ClinicsRef,
  GlobalServicesRef,
} from './directus-api-refs';
import { IImage } from './image.type';
import { Perk } from './perk.type';
import { IService } from './service.type';
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

export interface IDoctor {
  id: number;
  status: string;
  sort?: number;
  date_created: Date;
  date_updated: Date;
  firstName: string;
  lastName?: string;
  gender: string;
  shortText?: string;
  longText?: string;
  perks: Perk[];
  image: IImage;
  specialties: SpecialtyRef[];
  insurances: InsurancesRef[];
  lang: LanguagesRef[];
  clinics: ClinicsRef[];
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
