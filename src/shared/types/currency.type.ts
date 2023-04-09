export type CurrencyType = 'euro' | 'dollar' | 'ruble';

export interface ICurrency {
  id: string;
  label: string;
  type: CurrencyType;
}
