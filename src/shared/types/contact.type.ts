export type ContactType = 'phone' | 'watsapp' | 'telegram';

export interface IPhone {
  label: string;
  number: string;
}

export interface IContact {
  phones: IPhone[];
}
