import { StrapiEditionsInfo } from './api-types.type';
import { IImage } from './image.type';
import { ILink } from './link.type';
import { ISocial } from './social.type';

export interface ISiteSettings extends StrapiEditionsInfo {
  id: number;
  siteUrl: string;
  copyrights: string;
  testimonialsLimit: number;
  navigation: ILink[];
  footerLinks: ILink[];
  documents: ILink[];
  socials: ISocial[];
  logo: IImage;
  constructionImage: IImage;
}
