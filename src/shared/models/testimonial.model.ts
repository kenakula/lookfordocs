import { TestimonialType } from '../types';

export interface TestimonialModel {
  date: Date;
  type: TestimonialType;
  author: string;
  email: string;
  comment: string;
  rate: number;
  publishedAt: Date | null;
  entityName: string;
  doctor?: number[];
  clinic?: number[];
  insurance?: number[];
}
