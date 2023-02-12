import { Directus } from '@directus/sdk';

export interface CollectionResponse<T> {
  data: T[];
}

export const directus = new Directus(process.env.NEXT_PUBLIC_API_URL ?? '');
