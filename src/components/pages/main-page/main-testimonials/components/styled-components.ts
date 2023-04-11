import { styled } from '@mui/material';
import { getTypography } from '@/shared/assets';

export const StyledInner = styled('div')(({ theme }) => ({
  position: 'relative',
  paddingBottom: theme.spacing(3),

  '.title': {
    marginBottom: theme.spacing(2),
  },

  '.swiper': {
    margin: theme.spacing(0, -2),
    padding: theme.spacing(2, 2, 4),

    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, -4),
      padding: theme.spacing(2, 4, 4),
    },

    [theme.breakpoints.up('lg')]: {
      margin: theme.spacing(0),
      padding: theme.spacing(2, 0, 4),
    },

    [theme.breakpoints.up('xl')]: {
      padding: theme.spacing(2, 0, 0),
    },
  },

  '.swiper-wrapper': {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },

  '.swiper-slide': {
    alignSelf: 'stretch',
    display: 'flex',
    height: 'auto',
  },
}));

export const StyledCard = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3, 3, 2.5),
  background: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  minHeight: 360,
  minWidth: 328,
  boxSizing: 'border-box',

  '.card-header': {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
    borderBottom: `1px solid ${theme.palette.misc.dark}`,
  },

  '.card-info': {
    marginLeft: theme.spacing(2.5),
  },

  '.card-title': {
    ...getTypography(theme, 16, 20),
    fontWeight: 600,
  },

  '.card-title + .card-subtitle': {
    marginTop: theme.spacing(0.5),
  },

  '.card-subtitle': {
    ...getTypography(theme, 14, 18),
    color: theme.palette.text.secondary,
  },

  '.card-text': {
    ...getTypography(theme, 16, 20),
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
  },

  '.card-footer': {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 'auto',
    columnGap: theme.spacing(2),

    time: {
      ...getTypography(theme, 14, 20),
      color: theme.palette.text.secondary,
    },

    '.MuiTypography-root': {
      ...getTypography(theme, 14, 20),
    },
  },

  '.MuiAvatar-root': {
    width: 56,
    height: 56,

    '&.app-avatar': {
      backgroundColor: theme.palette.primary.main,
    },
  },

  [theme.breakpoints.up('lg')]: {
    minWidth: 344,
  },
}));
