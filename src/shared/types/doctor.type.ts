import { IContact } from './contact.type';

export interface IDoctor {
  id: string;
  status: string;
  user_created: string;
  date_created: Date;
  user_updated: string;
  date_updated: Date;
  description?: string;
  contacts?: IContact[];
  first_name: string;
  last_name: string;
}
