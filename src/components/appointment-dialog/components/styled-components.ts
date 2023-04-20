import { getTypography } from '@/shared/assets';
import { styled } from '@mui/material';

export const StyledAppointmentForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(3),

  '.appointment': {
    '.MuiTypography-h4': {
      ...getTypography(theme, 18, 24),
      fontWeight: 500,
      marginBottom: theme.spacing(1.5),
    },

    time: {
      ...getTypography(theme, 14, 20),
      flexGrow: 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      minHeight: 30,
      padding: theme.spacing(1, 2),
      fontWeight: 500,
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.shape.borderRadius * 2,
      textAlign: 'center',
    },
  },
}));
