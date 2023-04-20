import { Typography } from '@mui/material';
import { getDayString } from '@/shared/assets';

interface Props {
  date: Date;
}

export const AppointmentLabel = ({ date }: Props): JSX.Element => {
  return (
    <div className="appointment">
      <Typography variant="h4">Дата и время приема</Typography>
      <time dateTime={date.toDateString()}>{getDayString(date, true)}</time>
    </div>
  );
};
