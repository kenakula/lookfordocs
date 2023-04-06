import { StrapiEditionsInfo } from './api-types.type';

export interface ICity extends StrapiEditionsInfo {
  id: number;
  name: string;
  slug: string;
}
