import { StrapiEditionsInfo } from './api-types.type';

export type GlobalServiceType =
  | 'clinic'
  | 'home'
  | 'online'
  | 'child'
  | 'receipt';

export interface IGlobalService extends StrapiEditionsInfo {
  id: number;
  slug: string;
  name: string;
  type: GlobalServiceType;
  desctription?: string;
}
