import { SlotModel } from '@/shared/models';
import { nextApi } from './api';

export const getTelemedDoctors = async () =>
  nextApi
    .get<{ name: string; id: string }[]>('get-users')
    .then(res => res.data);

export const getDoctorSlots = async (id?: string) =>
  nextApi
    .get<SlotModel[]>('get-schedule', {
      params: {
        id: id ?? '',
      },
    })
    .then(res => res.data);
