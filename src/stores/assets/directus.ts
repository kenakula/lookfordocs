import { Directus } from '@directus/sdk';

export const DIRECTUS_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';
export const DIRECTUS_ITEMS_URL = `${DIRECTUS_BASE_URL}/items`;
export const DIRECTUS_ASSETS_URL = `${DIRECTUS_BASE_URL}/assets`;

export interface CollectionResponse<T> {
  data: T[];
}

export interface SingletonResponse<T> {
  data: T;
}

export const directus = new Directus(DIRECTUS_BASE_URL);
