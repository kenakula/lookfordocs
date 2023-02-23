type GlobalServiceType = 'clinic' | 'home' | 'online' | 'child' | 'recipe';

export interface IGlobalService {
  id: number;
  status: string;
  sort?: number;
  user_created: string;
  date_created: Date;
  user_updated: string;
  date_updated?: Date;
  slug: string;
  name: string;
  description?: string;
  type: GlobalServiceType;
}
