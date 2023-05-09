/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL ?? '';
const LOCAL_API_URL = process.env.NEXT_PUBLIC_STRAPI_LOCAL_URL ?? '';
const RNOVA_API_URL = process.env.NEXT_PUBLIC_RNOVA_API_URL;
const RNOVA_API_KEY = process.env.NEXT_PUBLIC_RNOVA_API_KEY;

export const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? API_URL : API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const rnovaApi = axios.create({
  baseURL: RNOVA_API_URL,
  params: {
    api_key: RNOVA_API_KEY,
  },
});

export const nextApi = axios.create({
  baseURL: '/api/rnova',
});
