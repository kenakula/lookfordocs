import { rnovaApi } from '@/api';
import { RnovaResponseModel, RnovaUserModel } from '@/shared/models';
import { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Data {
  name: string;
  id: number;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data[]>) => {
  const response = await rnovaApi
    .post<void, AxiosResponse<RnovaResponseModel<RnovaUserModel>>>('getUsers')
    .then(x => x.data);

  const withTelemed = response.data
    .filter(({ is_telemedicine }) => Boolean(is_telemedicine))
    .map(({ id, name, clinic }) => ({ name, id, clinic }));

  res.status(200).json(withTelemed);
};

export default handler;
