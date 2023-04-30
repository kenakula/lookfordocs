import { StrapiEditionsInfo } from './api-types.type';
import { IImage } from './image.type';
import { ILink } from './link.type';
import { ISocial } from './social.type';

export interface Favicons {
  id: number;
  browserconfig: IImage;
  webmanifest: IImage;
  appleTouchIcon: IImage;
  safariPinnedTab: IImage;
  png384: IImage;
  png192: IImage;
  png150: IImage;
  png32: IImage;
  png16: IImage;
  ico: IImage;
}

export interface ISiteSettings extends StrapiEditionsInfo {
  id: number;
  siteUrl: string;
  siteName: string;
  copyrights: string;
  testimonialsLimit: number;
  navigation: ILink[];
  footerLinks: ILink[];
  documents: ILink[];
  socials: ISocial[];
  logo: IImage;
  constructionImage: IImage;
  favicons: Favicons;
}
