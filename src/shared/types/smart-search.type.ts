import { IClinic } from './clinic.type';
import { IDoctor } from './doctor.type';
import { IInsurance } from './insurance.type';
import { ISpecialty } from './specialty.type';

export interface ISmartSearchResult {
  specialties: ISpecialty[] | undefined;
  doctors: IDoctor[] | undefined;
  clinics: IClinic[] | undefined;
  insurances: IInsurance[] | undefined;
}

export type SmartSearchStatus = 'pending' | 'success' | 'error' | 'idle';
