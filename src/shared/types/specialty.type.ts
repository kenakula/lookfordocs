import { IDoctor } from './doctor.type';

export interface ISpecialty {
  id: number;
  slug: string;
  name: string;
  popular: boolean;
  doctors: IDoctor[];
  description?: string;
  keywords?: string;
}
