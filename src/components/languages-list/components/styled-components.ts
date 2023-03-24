import { styled } from '@mui/material';
import { getTypography } from '@/shared/assets';

export const StyledLanguages = styled('div')(({ theme }) => ({
  '.MuiTypography-caption': {
    ...getTypography(theme, 12, 16),
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0.5),
  },

  ul: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },

  li: {
    ...getTypography(theme, 12, 16),
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0.5),

    '&:last-child': {
      marginBottom: 0,
    },

    '.icon': {
      display: 'inline-flex',
      alignItems: 'center',
      marginRight: 6,

      svg: {
        width: 14,
        height: 16,
      },
    },
  },

  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    alignItems: 'center',

    '.MuiTypography-caption': {
      margin: theme.spacing(0, 1.5, 0, 0),
    },

    ul: {
      display: 'flex',
      alignItems: 'center',
      columnGap: theme.spacing(1.5),
    },

    li: {
      marginBottom: 0,
    },
  },
}));
