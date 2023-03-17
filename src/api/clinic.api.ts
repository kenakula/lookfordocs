import { IClinic } from '@/shared/types';
import { axiosClient } from '@/stores/assets';
import { AxiosResponse } from 'axios';

export const getClinicInfo = async (id: string) =>
  axiosClient
    .get<AxiosResponse<IClinic>>(`/clinics/${id}`, {
      params: { fields: 'id,name,image.*,address,contacts,city' },
    })
    .then(res => res.data.data);
