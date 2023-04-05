import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? '';

export const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
