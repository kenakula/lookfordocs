import { IImage } from './image.type';
import { IStatus } from './status.type';

export interface IInsurance {
  id: number;
  status: IStatus;
  sort?: number;
  user_created: string;
  date_created: Date;
  user_updated?: string;
  date_updated?: Date;
  name: string;
  image: IImage;
}
