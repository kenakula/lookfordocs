import { styled } from '@mui/material';
import { getTypography } from '@/shared/assets';

export const StyledPromoSection = styled('section')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(4, 0, 8),

  '.promo-info': {
    marginBottom: theme.spacing(4),

    '&.padded': {
      paddingBottom: theme.spacing(2),
    },
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

    '.promo-info': {
      paddingRight: '42%',

      '&.padded': {
        paddingBottom: 0,
      },
    },
  },

  [theme.breakpoints.up('lg')]: {
    position: 'relative',
    padding: theme.spacing(7.5, 0, 8.5),

    '.subtitle': {
      marginBottom: theme.spacing(4),
    },

    '.promo-info': {
      paddingRight: '30%',
    },
  },
}));

export const StyledChips = styled('ul')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  columnGap: theme.spacing(1.5),
  rowGap: theme.spacing(1.5),
}));

export const StyledContactsBlock = styled('div')(({ theme }) => ({
  '.title': {
    marginBottom: theme.spacing(2),
  },

  '.contacts-block-list': {
    margin: theme.spacing(0, 0, 4, 0),
    padding: 0,
    listStyle: 'none',
    display: 'grid',
    rowGap: theme.spacing(3),

    h2: {
      ...getTypography(theme, 18, 24),
      margin: theme.spacing(0, 0, 1, 0),
      fontWeight: 500,
    },

    a: {
      ...getTypography(theme, 16, 20),
      color: theme.palette.text.primary,
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      transition: theme.transitions.create('color'),

      '&:hover': {
        color: theme.palette.primary.main,
      },

      '&:active': {
        color: theme.palette.primary.dark,
      },

      '&:focus-visible': {
        color: theme.palette.primary.main,
        textDecoration: 'underline',
        outline: 'none',
      },
    },

    [theme.breakpoints.up('lmd')]: {
      gridTemplateColumns: '1fr 1fr',
      columnGap: theme.spacing(2),
      maxWidth: '60%',
    },

    [theme.breakpoints.up('lg')]: {
      maxWidth: '70%',
    },
  },

  [theme.breakpoints.up('lg')]: {
    '.title': {
      marginBottom: theme.spacing(3),
    },
  },
}));
