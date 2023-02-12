export interface ISpecialty {
  id: number;
  title: string;
  description?: string;
  child_doctor: boolean;
  popular?: boolean;
}
