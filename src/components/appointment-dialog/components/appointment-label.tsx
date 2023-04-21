import { Typography } from '@mui/material';
import { getDayString } from '@/shared/assets';
import { StyledAppointmentLabel } from './styled-components';

interface Props {
  date: Date;
}

export const AppointmentLabel = ({ date }: Props): JSX.Element => {
  return (
    <StyledAppointmentLabel className="appointment-label">
      <Typography variant="h4">Дата и время приема</Typography>
      <time dateTime={date.toDateString()}>{getDayString(date, true)}</time>
    </StyledAppointmentLabel>
  );
};
