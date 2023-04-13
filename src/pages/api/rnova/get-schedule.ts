import type { NextApiRequest, NextApiResponse } from 'next';
import FormData from 'form-data';
import { rnovaApi } from '@/api';
import { RnovaObjectResponse, SlotModel } from '@/shared/models';

interface Query {
  id?: string;
  start?: string;
  end?: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ data: SlotModel[] | string }>,
) => {
  const query = req.query as Query;
  const formData = new FormData();

  if (query.id) {
    formData.append('user_id', query.id);

    if (query.start) {
      formData.append('time_start', query.start + ' 00:00');
    }

    if (query.end) {
      formData.append('time_end', query.end + ' 23:59');
    } else {
      formData.append('time_end', '31.12.2024 23:59');
    }

    try {
      const response = await rnovaApi
        .post<RnovaObjectResponse<SlotModel>>('getSchedule', formData)
        .then(x => Object.values(x.data.data)[0]);

      res.status(200).json({ data: response });
    } catch (err) {
      res.status(500).json({ data: 'Rnova API error' });
    }
  } else {
    res.status(500).json({ data: 'Rnova API error' });
  }
};

export default handler;
