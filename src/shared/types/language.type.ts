import { StrapiEditionsInfo } from './api-types.type';
import { IImage } from './image.type';

export type LanguageSlug = 'rus' | 'en' | 'port' | 'ua';

export interface ILanguage extends StrapiEditionsInfo {
  id: number;
  slug: LanguageSlug;
  name: string;
  icon: IImage;
}
