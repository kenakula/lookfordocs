import { IImage } from './image.type';

export interface IInsurance {
  id: number;
  status: string;
  sort?: number;
  user_created: string;
  date_created: Date;
  user_updated?: string;
  date_updated?: Date;
  name: string;
  image: IImage;
}
