import { TestimonialType } from '../types';

export interface TestimonialModel {
  date: Date;
  type: TestimonialType;
  author: string;
  comment: string;
  rate: number;
  targetDoctor?: { doctors_id: number }[];
  targetClinic?: { clinics_id: number }[];
  targetInsurance?: { insurances_id: number }[];
}
