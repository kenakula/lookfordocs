export interface ILanguage {
  id: number;
  slug: LanguageSlug;
  name: string;
}

export type LanguageSlug = 'rus' | 'en' | 'port';
