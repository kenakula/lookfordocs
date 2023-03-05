import { CitiesRef, InsurancesRef } from './directus-api-refs';
import { IImage } from './image.type';

export interface IMetro {
  color: string;
  name: string;
  slug: string;
}

export interface IClinic {
  id: number;
  status: string;
  sort?: number;
  user_created: string;
  date_created: Date;
  user_updated: string;
  date_updated?: Date;
  name: string;
  image: IImage;
  address: string;
  cities: CitiesRef[];
  metro: IMetro[];
  insurances: InsurancesRef[];
}
