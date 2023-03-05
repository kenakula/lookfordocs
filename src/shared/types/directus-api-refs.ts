import { ICity } from './city.type';
import { IClinic } from './clinic.type';
import { IGlobalService } from './global-service.type';
import { IInsurance } from './insurance.type';
import { ILanguage } from './language.type';
import { ISpecialty } from './specialty.type';

export interface SpecialtyRef {
  specialties_id: ISpecialty;
}

export interface GlobalServicesRef {
  globalServices_id: IGlobalService;
}

export interface ClinicsRef {
  clinics_id: IClinic;
}

export interface LanguagesRef {
  languages_id: ILanguage;
}

export interface InsurancesRef {
  insurances_id: IInsurance;
}

export interface CitiesRef {
  cities_id: ICity;
}

export interface TriggerQueryArgs<T> {
  filter: T;
  page?: number;
  limit?: number;
}
