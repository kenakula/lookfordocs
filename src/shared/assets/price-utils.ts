import { IPrice } from '../types';

export const getPriceString = ({
  price,
  priceFrom,
  currency: { label },
}: IPrice): string => `${priceFrom ? 'от' : ''} ${price} ${label}`;
