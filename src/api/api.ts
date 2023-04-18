import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? '';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const testApi = axios.create({
  baseURL: 'http://localhost:8082/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
