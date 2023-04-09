/* eslint-disable @typescript-eslint/no-explicit-any */

import { StrapiEditionsInfo } from './api-types.type';

export interface IImageFormat {
  name: string;
  width: number;
  height: number;
  formats: any | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
}

export interface IImage extends StrapiEditionsInfo {
  id: number;
  name: string;
  alternativeText: string;
  caption: any | null;
  width: number;
  height: number;
  formats?: {
    large?: IImageFormat;
    small?: IImageFormat;
    medium?: IImageFormat;
    thumbnail?: IImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
}
