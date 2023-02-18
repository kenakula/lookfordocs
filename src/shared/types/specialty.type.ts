export interface ISpecialty {
  id: number;
  slug: string;
  title: string;
  description?: string;
  popular?: boolean;
}

export interface ICountedSpecialties {
  specialties_id: number;
  count: { doctors_id: number };
}
