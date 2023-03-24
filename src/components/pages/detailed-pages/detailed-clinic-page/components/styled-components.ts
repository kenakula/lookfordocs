import { alpha, styled } from '@mui/material';

export const StyledDetailedClinicDoctorList = styled('ul')(({ theme }) => ({
  position: 'relative',
  listStyle: 'none',
  padding: theme.spacing(0, 0, 4, 0),
  margin: theme.spacing(0, -2),
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(2),

  '.loader': {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 100,
    width: '100%',
    height: '100%',
    backgroundColor: alpha(theme.palette.background.default, 0.5),
  },

  [theme.breakpoints.up('md')]: {
    margin: theme.spacing(0, -4),
  },

  [theme.breakpoints.up('lmd')]: {
    margin: 0,
  },
}));
