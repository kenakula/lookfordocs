import { Box, styled } from '@mui/material';
import { getTypography } from '@/shared/assets';

export const StyledInner = styled(Box)(({ theme }) => ({
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

  '.slider-buttons': {
    position: 'absolute',
    display: 'none',
    justifyContent: 'space-between',
    top: '56%',
    left: -50,
    right: -50,
    transform: 'translateY(-50%)',

    [theme.breakpoints.up('xl')]: {
      display: 'flex',
    },
  },

  '.slider-button': {
    opacity: 0.7,
    transition: theme.transitions.create('opacity'),
    borderRadius: '50%',

    '&.swiper-button-disabled': {
      opacity: 0.3,
      pointerEvents: 'none',
    },

    '&:hover': {
      opacity: 1,
    },

    '&:active': {
      backgroundColor: theme.palette.misc.dark,
    },

    '&:focus-visible': {
      outline: `4px solid ${theme.palette.primary.light}`,
    },
  },

  '.swiper-pagination': {
    '&.swiper-pagination': {
      bottom: 0,
    },

    '.swiper-pagination-bullet': {
      backgroundColor: theme.palette.primary.light,
      width: 12,
      height: 12,
      opacity: 1,
    },

    '.swiper-pagination-bullet-active': {
      backgroundColor: theme.palette.primary.main,
    },

    '.swiper-pagination-bullet-active-next, .swiper-pagination-bullet-active-prev':
      {
        transform: 'scale(1)',
      },

    '.swiper-pagination-bullet-active-next-next, .swiper-pagination-bullet-active-prev-prev':
      {
        transform: 'scale(0.66)',
        opacity: 0.6,
      },

    [theme.breakpoints.up('xl')]: {
      display: 'none',
    },
  },
}));

export const StyledCard = styled(Box)(({ theme }) => ({
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
    borderBottom: `1px solid ${theme.palette.misc.light}`,
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
    ...getTypography(theme, 14, 20),
    color: theme.palette.text.secondary,
  },

  '.card-text': {
    ...getTypography(theme, 16, 20),
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

  [theme.breakpoints.up('lg')]: {
    minWidth: 344,
  },
}));
