import { IChip } from './chip.type';

export interface IBlockData {
  id: number;
  title: string;
  subtitle?: string;
  titleMobile?: string;
}

export interface IPromoBlockData extends IBlockData {
  buttonText?: string;
  type: 'appointment' | 'contact';
  chips?: IChip[];
}
