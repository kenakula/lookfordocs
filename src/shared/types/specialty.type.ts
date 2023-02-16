export interface ISpecialty {
  id: number;
  slug: string;
  title: string;
  description?: string;
  child_doctor: boolean;
  popular?: boolean;
}
