import axios from 'axios';

const DIRECTUS_ITEMS_URL = process.env.NEXT_PUBLIC_ITEMS_URL ?? '';

export interface AxiosResponse<T> {
  data: T;
}

export const axiosClient = axios.create({
  baseURL: DIRECTUS_ITEMS_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
