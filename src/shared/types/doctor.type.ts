import {
  SpecialtyRef,
  InsurancesRef,
  LanguagesRef,
  ClinicsRef,
  GlobalServicesRef,
} from './directus-api-refs';
import { IImage } from './image.type';
import { Perk } from './perk.type';

export interface IDoctorCount {
  count: { id: number };
}

export interface IDoctorService {
  name: string;
  value: string;
  price: string;
  priceFrom: boolean;
}

export interface IDoctor {
  id: number;
  status: string;
  sort?: number;
  date_created: Date;
  date_updated: Date;
  firstName: string;
  lastName: string;
  gender: string;
  shortText?: string;
  longText?: string;
  perks: Perk[];
  image: IImage;
  specialties: SpecialtyRef[];
  insurances: InsurancesRef[];
  lang: LanguagesRef[];
  clinics: ClinicsRef[];
  services: IDoctorService[];
  globalServices: GlobalServicesRef[];
}
