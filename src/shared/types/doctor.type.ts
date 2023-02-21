import { IContact } from './contact.type';
import { IImage } from './image.type';
import { ISpecialty } from './specialty.type';

interface SpecialtyRef {
  specialties_id: ISpecialty;
}

export interface IDoctor {
  id: string;
  status: string;
  user_created: string;
  date_created: Date;
  user_updated: string;
  date_updated: Date;
  description?: string;
  contacts?: IContact[];
  firstName: string;
  lastName?: string;
  image: IImage;
  specialties: SpecialtyRef[];
}
