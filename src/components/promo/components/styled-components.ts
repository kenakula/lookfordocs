import { Box, styled } from '@mui/material';

export const StyledPromoSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(4, 0, 8),

  '.promo-info': {
    marginBottom: theme.spacing(4),
  },

  '.title': {
    marginBottom: theme.spacing(1.5),
  },

  '.subtitle': {
    marginBottom: theme.spacing(2),
  },

  '.becas': {
    position: 'absolute',
    bottom: theme.spacing(15),
    right: '6%',
    display: 'block',
    width: 56,
    height: 64,
    cursor: 'default',
    transform: 'scale(-1, 1)',

    [theme.breakpoints.up('md')]: {
      right: '10%',
    },

    [theme.breakpoints.up('lmd')]: {
      bottom: 0,
      right: '20%',
      width: 154,
      height: 179,
    },

    [theme.breakpoints.up('lg')]: {
      right: 'calc(50vw - 564px + 100px)',
      width: 208,
      height: 242,
    },
  },

  [theme.breakpoints.up('lmd')]: {
    '.promo-button': {
      width: 'auto',
    },
  },

  [theme.breakpoints.up('lg')]: {
    position: 'relative',
    padding: theme.spacing(11, 0, 12.5),

    '.subtitle': {
      marginBottom: theme.spacing(4),
    },
  },
}));

export const StyledChips = styled('ul')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  listStyle: 'none',
  margin: 0,
  padding: theme.spacing(0, 13, 0, 0),
  columnGap: theme.spacing(1.5),
  rowGap: theme.spacing(1.5),

  [theme.breakpoints.up('md')]: {
    padding: 0,
  },

  [theme.breakpoints.up('lmd')]: {
    paddingRight: '50%',
  },
}));
