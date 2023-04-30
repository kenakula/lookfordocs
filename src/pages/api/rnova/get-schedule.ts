import type { NextApiRequest, NextApiResponse } from 'next';
import FormData from 'form-data';
import { rnovaApi } from '@/api';
import { RnovaObjectResponse, SlotModel } from '@/shared/models';
import { formatRnovaDate } from '@/shared/assets';

interface GetScheduleQuery {
  id?: string;
  categoryId?: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<SlotModel[]>,
) => {
  const query = req.query as GetScheduleQuery;
  const formData = new FormData();

  if (query.id) {
    const currMonth = new Date().getMonth();
    const endDate = new Date(new Date().setMonth(currMonth + 5));
    const endDateString = formatRnovaDate(endDate, true);

    formData.append('user_id', query.id);
    formData.append('time_end', endDateString);

    const response = await rnovaApi
      .post<RnovaObjectResponse<SlotModel>>('getSchedule', formData)
      .then(x => x.data);

    if (response.error === 1) {
      res.status(500).end();
      return;
    }

    const resultArr = Object.values(response.data);

    if (!resultArr.length) {
      res.status(200).json([]);
      return;
    }

    const result = resultArr[0].map(slot => ({
      ...slot,
      time_end: new Date(slot.time_end),
      time_start: new Date(slot.time_start),
    }));

    if (result) {
      const filtered = result.filter(
        ({ category_id }) => category_id.toString() === query.categoryId,
      );

      res.status(200).json(filtered);

      return;
    }

    res.status(200).json([]);
  }
};

export default handler;
