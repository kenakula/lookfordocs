import { ICurrency } from './currency.type';

export interface IPrice {
  name: string;
  price: string;
  priceFrom: boolean;
  currency: ICurrency;
}
