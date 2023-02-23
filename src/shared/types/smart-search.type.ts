import { IClinic } from './clinic.type';
import { IDoctor } from './doctor.type';
import { IGlobalService } from './global-service.type';
import { IInsurance } from './insurance.type';
import { ISpecialty } from './specialty.type';

export type SmartSearchStatus = 'pending' | 'success' | 'error' | 'idle';

export interface ISmartSearchResult {
  type: 'clinics' | 'docs' | 'specialties' | 'insurances' | 'globalService';
  list: ISpecialty[] | IDoctor[] | IClinic[] | IInsurance[] | IGlobalService[];
}
