import { styled } from '@mui/material';

export const StyledPromoSection = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(4, 0, 8),
  backgroundColor: theme.palette.misc.main,

  '.promo-info': {
    marginBottom: theme.spacing(13.75),
  },

  '.title': {
    marginBottom: theme.spacing(1.5),
  },

  '.becas': {
    position: 'absolute',
    right: 33,
    top: 0,
    display: 'block',
    width: 86,
    height: 100,
    transform: 'translateY(-100%)',
    cursor: 'default',
  },

  '.input-container': {
    marginBottom: theme.spacing(3),
  },

  [theme.breakpoints.up('md')]: {
    '.becas': {
      right: 45,
      width: 103,
      height: 120,
    },

    '.promo-info': {
      paddingRight: '30%',
    },
  },

  [theme.breakpoints.up('lmd')]: {
    '.input-container': {
      marginBottom: 0,
    },

    '.becas': {
      right: 120,
      width: 154,
      height: 179,
    },

    '.promo-info': {
      paddingRight: '40%',
    },
  },

  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(17.5, 0, 12.5),

    '.becas': {
      right: 190,
      width: 154,
      height: 179,
    },

    '.promo-info': {
      marginBottom: theme.spacing(7.75),
    },
  },
}));
