import { StrapiEditionsInfo } from './api-types.type';
import { IImage } from './image.type';

export interface IInsurance extends StrapiEditionsInfo {
  id: number;
  name: string;
  image: IImage;
}
