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
      .then(x => x.data.data);

    const result = Object.values(response)[0];

    const filtered = result.filter(
      ({ category_id }) => category_id.toString() === query.categoryId,
    );

    res.status(200).json(filtered);
  }
};

export default handler;