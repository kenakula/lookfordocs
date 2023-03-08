export type ChipVariant = 'contained' | 'outlined';
export type ChipSize = 'medium' | 'small';

export interface IChip {
  text: string;
  variant?: ChipVariant;
  size?: ChipSize;
}
