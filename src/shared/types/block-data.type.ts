export interface IChip {
  text: string;
}

export interface IBlockData {
  id: number;
  title: string;
  subtitle: string;
  titleMobile?: string;
}

export interface IPromoBlockData {
  id: number;
  title: string;
  subtitle: string;
  buttonText?: string;
  chips?: IChip[];
}
