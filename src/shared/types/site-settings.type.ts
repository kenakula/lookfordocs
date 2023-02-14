import { IImage } from './image.type';
import { IStatus } from './status.type';

export type SocialType = 'email' | 'telegram' | 'watsapp';

export interface ISiteSettings {
  id: number;
  status: IStatus;
  user_created: string;
  date_created: Date;
  user_updated?: string;
  date_updated?: Date;
  navigation: INavigation[];
  footerLinks: IFooterLink[];
  socials: ISocial[];
  copyrights: string;
  documents: IDocumentLink[];
  logo: IImage;
}

export interface INavigation {
  name: string;
  url: string;
  isAccent: boolean;
}

export interface IFooterLink {
  name: string;
  url: string;
}

export interface ISocial {
  type: SocialType;
  label: string;
  link: string;
}

export interface IDocumentLink {
  name: string;
  url: string;
}
