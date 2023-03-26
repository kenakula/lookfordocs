import { styled } from '@mui/material';

export const StyledInner = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 auto',
  maxWidth: 350,

  '.title': {
    marginBottom: theme.spacing(2),
  },

  '.subtitle': {
    marginBottom: theme.spacing(4),
  },

  [theme.breakpoints.up('lg')]: {
    maxWidth: 650,

    '.title': {
      marginBottom: theme.spacing(3),
    },

    '.subtitle': {
      marginBottom: theme.spacing(5),
    },
  },
}));
