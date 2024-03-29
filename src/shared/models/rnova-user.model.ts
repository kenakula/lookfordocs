export interface RnovaUserModel {
  avatar: string;
  avatar_small: string;
  avg_time: number | null;
  avg_time_company: number | null;
  avg_time_repeate: number;
  avg_time_repeat_company: number | null;
  birth_date: string | Date | null;
  clinic: string[];
  clinic_titles: string;
  contacts: string[];
  date_work_from: string;
  default_clinic: number;
  default_room: string;
  document_date: Date | null;
  document_number: string;
  education: string;
  education_courses: string;
  email: string;
  gender: number;
  has_company: boolean;
  id: number;
  is_adult_doctor: boolean;
  is_child_doctor: boolean;
  is_deleted: boolean;
  is_outside: boolean;
  is_telemedicine: boolean;
  name: string;
  patient_age_from: number;
  patient_age_to: number;
  profession: string[];
  profession_titles: string;
  qualification: string | null;
  role: string[];
  role_titles: string;
  second_profession: string[];
  second_profession_titles: string;
  services: string[];
  work_academy_status: string;
  work_degree: string | null;
  work_period: string;
  work_rand: string | null;
}
