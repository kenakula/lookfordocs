import { rnovaApi } from '@/api';
import { RnovaUserModel } from '@/shared/models';
import { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<RnovaUserModel[]>,
) => {
  const response = await rnovaApi
    .post<void, AxiosResponse<RnovaUserModel[]>>('getUsers')
    .then(x => x.data);

  res.status(200).json(response);
};

export default handler;
