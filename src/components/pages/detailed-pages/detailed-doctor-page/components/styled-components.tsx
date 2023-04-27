import { styled } from '@mui/material';
import { getTypography } from '@/shared/assets';

export const StyledDetailLongText = styled('div')(({ theme }) => ({
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
  borderBottom: `1px solid ${theme.palette.misc.dark}`,

  '&:last-child': {
    borderBottom: 'none',
  },

  '.testimonial-card-header': {
    display: 'flex',
    marginBottom: theme.spacing(2),

    '& > span': {
      ...getTypography(theme, 16, 20),
      marginRight: 'auto',
      paddingRight: theme.spacing(2),
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

export const StyledDoctorEducationItem = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(1),

  '.doctor-education-year': {
    ...getTypography(theme, 16, 20),
    fontWeight: 500,
    color: theme.palette.text.disabled,
    minWidth: 55,
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

export const StyledDoctorAppointments = styled('div')(({ theme }) => ({
  '.doctor-appointments-tabs': {
    marginBottom: theme.spacing(3),
  },

  [theme.breakpoints.up('lmd')]: {
    paddingTop: theme.spacing(3),
  },

  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(3),
    borderTop: `1px solid ${theme.palette.misc.dark}`,
    backgroundColor: theme.palette.misc.light,
  },
}));
