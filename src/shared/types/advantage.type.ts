import { IImage } from './image.type';

export interface IAdvantage {
  id: number;
  status: string;
  sort?: number;
  user_created: string;
  date_created: Date;
  user_updated: string;
  date_updated?: Date;
  title: string;
  image: IImage;
  description: string;
}
