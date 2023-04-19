import type { NextApiRequest, NextApiResponse } from 'next';
import FormData from 'form-data';
import { rnovaApi } from '@/api';
import { RnovaAppointmentModel } from '@/shared/models';
import { appointmentDataMapper } from '@/shared/assets/mappers';

interface ExtendedNextApiRequest extends NextApiRequest {
  body: RnovaAppointmentModel;
}

const handler = async (
  req: ExtendedNextApiRequest,
  res: NextApiResponse<{ success: boolean }>,
) => {
  const { body } = req;
  const formData = new FormData();
  const model = appointmentDataMapper(body);

  for (const key in model) {
    formData.append(key, model[key]);
  }

  try {
    await rnovaApi.post('createAppointment', formData);

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

export default handler;
