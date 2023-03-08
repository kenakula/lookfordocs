import { getTypography } from '@/shared/assets';
import { Box, styled, Typography } from '@mui/material';

export const StyledDetailedPageLayout = styled('section')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(1.5),
  paddingTop: theme.spacing(3),

  '.swiper': {
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

  [theme.breakpoints.up('lmd')]: {
    flexDirection: 'row',
    columnGap: theme.spacing(3),

    '.detailed-left-column': {
      width: 'calc(65% - 12px)',
    },

    '.detailed-right-column': {
      position: 'relative',
      flexGrow: 1,
    },

    '.sticky-block': {
      position: 'sticky',
      zIndex: theme.zIndex.appBar,
      left: 0,
      top: 87,
    },

    '.clinics-wrapper': {
      display: 'flex',
      flexDirection: 'column',
      rowGap: theme.spacing(1),
    },
  },

  [theme.breakpoints.up('lg')]: {
    paddingTop: theme.spacing(8),

    '.detailed-left-column': {
      width: 'calc(66.5% - 12px)',
    },
  },
}));

export const StyledDetailedInfo = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

export const StyledDetailInfoBlock = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(8),

  '& > ul': {
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
}));

export const StyledDetailInfoBlockHeader = styled(Box)(({ theme }) => ({
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

export const StyledDetailLongText = styled(Box)(({ theme }) => ({
  p: {
    margin: 0,

    '& + p': {
      marginTop: theme.spacing(2),
    },
  },
}));

export const StyledDetailedTestimonialList = styled('ul')(({ theme }) => ({
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(1),
  margin: 0,
  padding: 0,
}));

export const StyledDetailedTestimonial = styled('li')(({ theme }) => ({
  padding: theme.spacing(2, 0),
  borderBottom: `1px solid ${theme.palette.misc.light}`,

  '&:last-child': {
    borderBottom: 'none',
  },

  '.testimonial-card-header': {
    display: 'flex',
    marginBottom: theme.spacing(2),

    span: {
      ...getTypography(theme, 16, 20),
    },
  },

  '.testimonial-card-body': {
    marginBottom: theme.spacing(2),

    span: {
      ...getTypography(theme, 14, 20),
      display: 'inline-flex',
      marginBottom: theme.spacing(0.75),
      color: theme.palette.text.disabled,
    },
  },

  '.testimonial-card-footer': {
    time: {
      ...getTypography(theme, 12, 16),
      color: theme.palette.text.disabled,
    },
  },
}));

export const StyledDoctorNosology = styled('li')(({ theme }) => ({
  marginBottom: theme.spacing(5),

  '&:last-child': {
    marginBottom: 0,
  },

  '.nosology-header': {
    display: 'flex',
    alignItems: 'center',
    columnGap: theme.spacing(2),
    marginBottom: theme.spacing(1.5),
  },

  '.nosology-header-info': {
    h4: {
      ...getTypography(theme, 18, 24),
      fontWeight: 500,
    },

    span: {
      ...getTypography(theme, 14, 20),
      color: theme.palette.text.disabled,
    },
  },

  '.nosology-icon': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: '50%',
    backgroundColor: theme.palette.misc.main,

    svg: {
      fill: 'transparent',
    },
  },

  '.nosology-list': {
    display: 'flex',
    rowGap: theme.spacing(1.5),
    columnGap: theme.spacing(1.5),
    flexWrap: 'wrap',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
}));

export const StyledDoctorEducationItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(1),

  '.doctor-education-year': {
    ...getTypography(theme, 16, 20),
    fontWeight: 500,
    color: theme.palette.text.disabled,
  },

  '.doctor-education-text': {
    marginBottom: theme.spacing(1),
  },

  '.doctor-education-description': {
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: theme.spacing(2),
    color: theme.palette.primary.main,

    span: {
      position: 'relative',

      '&::before': {
        content: '""',
        position: 'absolute',
        right: -9,
        top: '50%',
        transform: 'translateY(-50%)',
        width: 3,
        height: 3,
        borderRadius: '50%',
        backgroundColor: theme.palette.primary.main,
      },

      '&:last-child': {
        '&::before': {
          display: 'none',
        },
      },
    },
  },

  [theme.breakpoints.up('lg')]: {
    flexDirection: 'row',
    columnGap: theme.spacing(2),

    '.doctor-education-info': {
      transform: 'translateY(-3px)',
    },
  },

  [theme.breakpoints.up('xl')]: {
    columnGap: theme.spacing(4),
  },
}));
