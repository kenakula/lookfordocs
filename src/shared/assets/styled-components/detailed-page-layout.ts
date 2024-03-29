import { styled, Typography } from '@mui/material';
import { getTypography } from '../get-typography';

export const DetailedPageLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(1.5),
  paddingTop: theme.spacing(3),

  '.swiper:not(.timetable .swiper)': {
    margin: theme.spacing(0, -2),
    padding: theme.spacing(0, 2, 4),

    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(0, -4),
      padding: theme.spacing(0, 4, 4),
    },
  },

  '.slider-buttons': {
    display: 'none',
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

  '.detailed-button': {
    marginBottom: theme.spacing(1.5),
    width: '100%',
  },

  '.doctors-no-clinic': {
    ...getTypography(theme, 14, 20),
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
    fontWeight: 600,
    textAlign: 'center',
  },

  [theme.breakpoints.up('lmd')]: {
    flexDirection: 'row',
    maxWidth: '100%',
    minWidth: 0,

    '.detailed-left-column': {
      flexShrink: 0,
      width: 'calc(65% - 8px)',
      marginRight: theme.spacing(2),
    },

    '.detailed-right-column': {
      position: 'relative',
      width: 'calc(35% - 8px)',
    },

    '.sticky-block': {
      position: 'sticky',
      zIndex: theme.zIndex.mobileStepper,
      left: 0,
      top: 87,
    },

    '.clinics-wrapper': {
      display: 'flex',
      flexDirection: 'column',
      rowGap: theme.spacing(1),
    },

    '.doctors-no-clinic': {
      ...getTypography(theme, 14, 20),
      padding: theme.spacing(3, 3, 0),
      textAlign: 'left',
    },
  },

  [theme.breakpoints.up('lg')]: {
    paddingTop: theme.spacing(8),
  },
}));

export const StyledDetailInfoBlockHeader = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing(0, 0, 4),
  },
}));

export const StyledDetailInfoTitle = styled(Typography)(({ theme }) => ({
  ...getTypography(theme, 20, 26),
  margin: theme.spacing(0, 0, 3),
  fontWeight: 600,

  [theme.breakpoints.up('lg')]: {
    ...getTypography(theme, 24, 28),
    marginBottom: 0,
  },
}));

export const StyledDetailLongText = styled('div')(({ theme }) => ({
  p: {
    margin: 0,

    '& + p': {
      marginTop: theme.spacing(2),
    },
  },
}));

export const StyledDetailedInfo = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

export const StyledDetailInfoBlock = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(8),

  '& > ul:not(.detailed-info-block-list)': {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },

  '.detailed-info-empty': {
    ...getTypography(theme, 20, 26),
    padding: theme.spacing(2, 0),
    fontWeight: 500,
    color: theme.palette.text.disabled,
  },

  '.detailed-testimonials-buttons': {
    display: 'flex',
    flexDirection: 'column',
    rowGap: theme.spacing(2),

    [theme.breakpoints.up('lg')]: {
      flexDirection: 'row',
      columnGap: theme.spacing(2),
    },
  },

  '.doctor-education-timeline': {
    '.MuiTimelineItem-root::before': {
      display: 'none',
    },

    '.MuiTimelineContent-root': {
      paddingTop: 0,
      paddingBottom: theme.spacing(3),
      transform: 'translateY(-5px)',
    },

    '.MuiTimelineDot-root': {
      margin: 0,
      padding: 0,
      width: 7,
      height: 7,
      border: 'none',
      backgroundColor: theme.palette.text.primary,
    },

    '.MuiTimelineConnector-root': {
      width: 1,
      backgroundColor: theme.palette.text.primary,
    },
  },

  '.add-more-btn': {
    [theme.breakpoints.up('lmd')]: {
      width: '100%',
    },
  },
}));
