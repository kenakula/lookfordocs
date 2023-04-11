import { TestimonialType } from '../types';

export interface TestimonialModel {
  date: Date;
  type: TestimonialType;
  author: string;
  comment: string;
  rate: number;
  publishedAt: Date | null;
  doctor?: number[];
  clinic?: number[];
  insurance?: number[];
}
