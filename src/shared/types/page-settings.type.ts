import { IImage } from './image.type';

export interface IPageSettings {
  slug?: string;
  pageTitle: string;
  pageDescription: string;
  pageKeywords: string;
  h1?: string;
  content?: string;
  socialImage: IImage;
}
