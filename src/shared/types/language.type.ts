import { StrapiEditionsInfo } from './api-types.type';

export type LanguageSlug = 'rus' | 'en' | 'port';

export interface ILanguage extends StrapiEditionsInfo {
  id: number;
  slug: LanguageSlug;
  name: string;
}
