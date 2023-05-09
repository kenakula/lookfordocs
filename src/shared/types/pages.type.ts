import { StrapiEditionsInfo } from './api-types.type';
import { IBlockData, IPromoBlockData } from './block-data.type';
import { IImage } from './image.type';
import { IMainAdvantage } from './main-advantage.type';
import { IMainPageService } from './main-page-service.type';
import { ITabItem } from './tabs.type';

export interface IMainPageData extends StrapiEditionsInfo {
  id: number;
  promo: IPromoBlockData;
  appointment: IBlockData;
  services: IMainPageService[];
  advantages: IMainAdvantage[];
  popularBlock: IBlockData;
  insurancesBlock: IBlockData;
  servicesBlock: IBlockData;
  advantagesBlock: IBlockData;
  testimonialsBlock: IBlockData;
}

export interface IDoctorsPageData extends StrapiEditionsInfo {
  id: number;
  promo: IPromoBlockData;
}

export interface IClinicsPageData extends StrapiEditionsInfo {
  id: number;
  promo: IPromoBlockData;
}

export interface IPartnersPageData extends StrapiEditionsInfo {
  title: string;
  description: string;
  tabs: ITabItem[];
}

export interface IContactsPageData extends StrapiEditionsInfo {
  id: number;
  promo: IPromoBlockData;
  aboutTitle: string;
  aboutContent: string;
  aboutButtonText: string;
  aboutButtonLink: string;
}

export interface IAboutPageData extends StrapiEditionsInfo {
  id: number;
  title: string;
  content: string;
  image: IImage;
  buttonText: string;
}
