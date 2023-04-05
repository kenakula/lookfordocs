import { IImage } from './image.type';

export interface IMainPageService {
  id: number;
  title: string;
  description: string;
  image: IImage;
}
