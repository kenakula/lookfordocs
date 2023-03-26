import { styled } from '@mui/material';

export const StyledAppointmentForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(3),
}));
