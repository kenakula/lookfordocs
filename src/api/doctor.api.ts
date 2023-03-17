import { IDoctor } from '@/shared/types';
import { axiosClient, AxiosResponse } from '@/stores/assets';

export const getDoctorInfo = async (docId: string) =>
  axiosClient
    .get<AxiosResponse<IDoctor>>(`doctors/${docId}`, {
      params: {
        fields: `
            id,
            firstName,
            lastName,
            shortText,
            longText,
            perks,
            services,
            reembolso,
            nosologies,
            education,
            image.*,
            gender,
            specialties.specialties_id.*,
            lang.languages_id.*,
            insurances.insurances_id.*,
            clinics.clinics_id.*,
            globalServices.globalServices_id.*
          `,
      },
    })
    .then(res => res.data.data);
