import { getTypography } from '@/shared/assets';
import { styled } from '@mui/material';

export const StyledTimetable = styled('div')(({ theme }) => ({
  width: '100%',
  paddingTop: theme.spacing(3),
  borderTop: `1px solid ${theme.palette.misc.dark}`,
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
      alignSelf: 'center',
      padding: theme.spacing(0.5, 1),
      fontWeight: 500,
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      borderRadius: theme.shape.borderRadius * 2,
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
  },

  '.day-slot': {
    ...getTypography(theme, 14, 17),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 54,
    minHeight: 37,
    borderRadius: theme.shape.borderRadius * 2,
    backgroundColor: theme.palette.misc.light,
    cursor: 'pointer',
  },
}));
