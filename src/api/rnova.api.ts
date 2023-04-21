import { SlotModel } from '@/shared/models';
import { nextApi } from './api';

export const getDoctorSlots = async (docId?: string, categoryId?: number) =>
  nextApi
    .get<SlotModel[]>('get-schedule', {
      params: {
        id: docId,
        categoryId,
      },
    })
    .then(res => res.data);
