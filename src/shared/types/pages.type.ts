import { StrapiEditionsInfo } from './api-types.type';
import { IBlockData, IPromoBlockData } from './block-data.type';
import { IMainAdvantage } from './main-advantage.type';
import { IMainPageService } from './main-page-service.type';

export interface IMainPageData extends StrapiEditionsInfo {
  id: number;
  promo: IPromoBlockData;
  appointment: IBlockData;
  services: IMainPageService[];
  advantages: IMainAdvantage[];
}

export interface IDoctorsPageData extends StrapiEditionsInfo {
  id: number;
  promo: IPromoBlockData;
}

export interface IClinicsPageData extends StrapiEditionsInfo {
  id: number;
  promo: IPromoBlockData;
}
