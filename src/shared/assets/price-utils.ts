export const getPriceString = (price: string, from?: boolean): string =>
  `${from ? 'от' : ''} ${price} €`;
