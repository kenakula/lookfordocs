import { TestimonialType } from '../types';

export interface TestimonialModel {
  date: Date;
  type: TestimonialType;
  author: string;
  comment: string;
  rate: number;
  targetDoctor?: number[];
  targetClinic?: number[];
  targetInsurance?: number[];
}
