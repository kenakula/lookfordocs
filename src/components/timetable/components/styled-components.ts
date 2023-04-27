import { getTypography } from '@/shared/assets';
import { alpha, styled } from '@mui/material';

export const StyledTimetable = styled('form')(({ theme }) => ({
  width: '100%',
  overflowX: 'hidden',

  '.MuiTypography-h3': {
    ...getTypography(theme, 16, 20),
    marginBottom: theme.spacing(1.5),
    fontWeight: 600,
    color: theme.palette.secondary.main,
  },

  '.timetable-day-header': {
    display: 'flex',
    columnGap: theme.spacing(1.5),
    marginBottom: theme.spacing(1),

    '.MuiTypography-h4': {
      ...getTypography(theme, 14, 20),
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      minHeight: 30,
      padding: theme.spacing(0.5, 1),
      fontWeight: 500,
      color: theme.palette.secondary.dark,
      textAlign: 'center',
    },

    '.slider-button': {
      padding: 0,
      color: theme.palette.text.primary,
      transition: theme.transitions.create('opacity'),

      '&.swiper-button-disabled': {
        opacity: 0.3,
        pointerEvents: 'none',
      },

      '&:hover': {
        opacity: 0.7,
      },

      '&:active': {
        opacity: 0.5,
      },

      '&:focus-visible': {
        opacity: 0.5,
      },
    },
  },

  '.timetable-button': {
    marginTop: theme.spacing(2),
    width: '100%',
    minHeight: 42,
  },
}));

export const StyledTimeTableDay = styled('div')(({ theme }) => ({
  width: '100%',

  '.day-slots': {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    columnGap: theme.spacing(1),
    rowGap: theme.spacing(1),
    padding: 0,
    margin: 0,
    listStyle: 'none',

    '.day-slot-input:checked + label': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },

    [theme.breakpoints.up('lmd')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },

    [theme.breakpoints.up('lg')]: {
      gridTemplateColumns: 'repeat(5, 1fr)',
    },
  },

  '.day-slot-label': {
    ...getTypography(theme, 14, 17),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 54,
    minHeight: 37,
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: alpha('#232735', 0.04),
    cursor: 'pointer',
  },
}));
