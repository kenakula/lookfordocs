export type SlotCategory = 'Онлайн' | 'По записи';
export type SlotCategoryId = 248 | 198;

export interface SlotModel {
  time_start: Date;
  time_end: Date;
  clinic_id: number;
  room: string;
  is_busy: boolean;
  is_past: boolean;
  userId: number;
  user: string;
  profession: string;
  date: string;
  time: string;
  time_start_short: string;
  time_end_short: string;
  color: number;
  beautyDate: string;
  category_id: number;
  category: SlotCategory;
}
