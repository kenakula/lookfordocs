import { styled } from '@mui/material';

export const StyledErrorContainer = styled('div')(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4, 2),
  width: '100%',

  h1: {
    marginBottom: theme.spacing(4),
    color: theme.palette.error.main,
  },

  '.error-boundary__inner': {
    display: 'flex',
    flexDirection: 'column',
    alignItmes: 'center',
    width: '100%',
    maxWidth: 500,

    span: {
      marginBottom: theme.spacing(1),
      color: theme.palette.text.secondary,
    },
  },

  '.error-boundary__image': {
    marginBottom: theme.spacing(2),

    svg: {
      width: '100%',
      height: 200,
    },
  },
}));
