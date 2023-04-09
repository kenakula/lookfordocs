import { StrapiEditionsInfo } from './api-types.type';
import { IImage } from './image.type';

export interface IPageSettings extends StrapiEditionsInfo {
  slug: string;
  pageTitle: string;
  pageDescription: string;
  pageKeywords: string;
  h1: string;
  content?: string;
  socialImage: IImage;
}
