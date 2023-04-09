import { StrapiEditionsInfo } from './api-types.type';
import { IClinic } from './clinic.type';
import { IDoctor } from './doctor.type';
import { IInsurance } from './insurance.type';

export type TestimonialType = 'app' | 'doctor' | 'clinic' | 'insurance';

export interface ITestimonial extends StrapiEditionsInfo {
  id: string;
  date: string;
  type: TestimonialType;
  rate: number;
  comment: string;
  author: string;
  reviewed: boolean;
  doctor?: IDoctor;
  clinic?: IClinic;
  insurance?: IInsurance;
}
