import { ITestimonial } from '../types';

export const getRate = (testimonials: ITestimonial[]): number | null => {
  const count = testimonials.length;

  if (!count) {
    return null;
  }

  const sum = testimonials.reduce((prev, curr) => prev + curr.rate, 0);

  return sum === 0 ? 0 : sum / count;
};
