import { styled, Typography } from '@mui/material';
import { getTypography } from '@/shared/assets';

export const StyledDoctorsCard = styled('div', {
  shouldForwardProp: prop =>
    !['multipleClinics', 'detailedLocation', 'shadowed'].includes(
      prop.toString(),
    ),
})<{ multipleClinics: boolean; detailedLocation: boolean; shadowed: boolean }>(
  ({ theme, multipleClinics, detailedLocation, shadowed }) => ({
    padding: detailedLocation ? 0 : theme.spacing(2),
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.shape.borderRadius,
    boxShadow: shadowed ? '0px 4px 16px rgba(7, 20, 48, 0.04)' : 'none',

    '.swiper': {
      margin: theme.spacing(0, -2),
      padding: theme.spacing(0, 2, multipleClinics ? 4 : 0),

      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(0, -2),
        padding: theme.spacing(0, 2, multipleClinics ? 4 : 0),
      },
    },

    '.slider-buttons ': {
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

    [theme.breakpoints.up('lg')]: {
      padding: 0,
      display: 'flex',

      '.doctor-card-specialties': detailedLocation
        ? {
            ...getTypography(theme, 16, 20),
            marginBottom: theme.spacing(1.5),
          }
        : {},

      'h3.MuiTypography-h3': detailedLocation
        ? {
            ...getTypography(theme, 32, 40),
            marginBottom: theme.spacing(1.5),
          }
        : {},

      '.doctor-card-text': detailedLocation
        ? {
            ...getTypography(theme, 16, 20),
          }
        : {},

      '.services-list': detailedLocation
        ? {
            'dt, dd': {
              ...getTypography(theme, 16, 20),
            },
          }
        : {},

      '.card-languages': detailedLocation
        ? {
            span: {
              ...getTypography(theme, 14, 20),
            },
          }
        : {},
    },
  }),
);

export const StyledSpecialtiesList = styled('ul')(({ theme }) => ({
  ...getTypography(theme, 12, 16),
  display: 'flex',
  flexWrap: 'wrap',
  columnGap: theme.spacing(1.25),
  listStyle: 'none',
  padding: 0,
  margin: 0,
  color: theme.palette.secondary.light,

  li: {
    position: 'relative',

    '&::after': {
      content: '""',
      position: 'absolute',
      right: -6,
      top: 8,
      width: 2,
      height: 2,
      borderRadius: '50%',
      backgroundColor: theme.palette.secondary.light,
    },

    '&:last-child::after': {
      display: 'none',
    },
  },

  [theme.breakpoints.up('lg')]: {
    marginBottom: theme.spacing(0.5),
  },
}));

export const StyledCardBody = styled('div', {
  shouldForwardProp: prop => prop !== 'detailedLocation',
})<{ detailedLocation: boolean }>(({ theme, detailedLocation }) => ({
  marginBottom: detailedLocation ? 0 : theme.spacing(2),

  '& > .doctor-card-specialties': {
    marginBottom: theme.spacing(2),
  },

  [theme.breakpoints.up('lg')]: {
    marginBottom: 0,
    padding: detailedLocation ? 0 : theme.spacing(3, 3, 4, 3),
    display: 'flex',
    flexGrow: 1,
  },
}));

export const DoctorCardInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  columnGap: theme.spacing(2.25),
  marginBottom: theme.spacing(1.5),

  '.mobile-image-container': {
    width: '36.6%',
    flexShrink: 0,
  },

  [theme.breakpoints.up('lg')]: {
    flexDirection: 'column',
    marginRight: theme.spacing(3),
    width: '26.66%',
    flexShrink: 0,

    '.mobile-image-container': {
      width: '100%',
    },
  },
}));

export const StyledInfo = styled('div')(({ theme }) => ({
  flexGrow: 1,

  '.MuiTypography-h3': {
    ...getTypography(theme, 18, 24),
    marginBottom: theme.spacing(0.75),
    fontWeight: 500,

    a: {
      ...getTypography(theme, 18, 24),
      color: theme.palette.text.primary,
      transition: theme.transitions.create('color'),
      textDecoration: 'none',
      fontWeight: 500,

      '&:hover': {
        color: theme.palette.primary.main,
      },

      '&:active': {
        color: theme.palette.primary.dark,
      },
    },
  },
}));

export const StyledText = styled(Typography)(({ theme }) => ({
  ...getTypography(theme, 14, 20),
  color: theme.palette.text.secondary,
  display: '-webkit-box',
  WebkitLineClamp: '4',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
}));

export const StyleSevices = styled('div')(({ theme }) => ({
  '.services-list': {
    margin: theme.spacing(0, 0, 2, 0),
  },

  '.service': {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1.5),

    '&:last-child': {
      marginBottom: 0,
    },
  },

  dt: {
    ...getTypography(theme, 14, 20),
    marginRight: 'auto',
    paddingRight: theme.spacing(4),
  },

  dd: {
    ...getTypography(theme, 14, 20),
    fontWeight: 600,
  },

  [theme.breakpoints.up('lg')]: {
    marginBottom: theme.spacing(2.5),
  },
}));

export const StyledDoctorRating = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(1),

  'a, & > span': {
    ...getTypography(theme, 14, 20),
    color: theme.palette.secondary.light,
    textDecoration: 'none',
    transition: theme.transitions.create('color'),
  },

  a: {
    '&:hover': {
      color: theme.palette.primary.main,
    },

    '&:active': {
      color: theme.palette.primary.dark,
    },

    '&:focus-visible': {
      outline: 'none',
      textDecoration: 'underline',
      color: theme.palette.primary.main,
    },

    [theme.breakpoints.up('lmd')]: {
      ...getTypography(theme, 16, 20),
    },
  },
}));

export const StyledClinics = styled('div', {
  shouldForwardProp: prop => prop !== 'maxListHeight',
})<{ maxListHeight: number }>(({ theme, maxListHeight }) => ({
  '.doctors-no-clinic': {
    ...getTypography(theme, 14, 20),
    color: theme.palette.primary.main,
    fontWeight: 600,
    textAlign: 'center',
  },

  '.doctors-reembolso': {
    ...getTypography(theme, 14, 20),
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary,
  },

  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    maxWidth: '32.21%',
    borderLeft: `1px solid ${theme.palette.misc.dark}`,
    paddingRight: 4,
    paddingTop: 2,
    paddingBottom: 2,

    '.clinics-wrapper': {
      maxHeight: maxListHeight,
      overflowY: 'auto',

      '&::-webkit-scrollbar': {
        width: 4,
      },

      '&::-webkit-scrollbar-track': {
        backgroundColor: theme.palette.background.default,
      },

      '&::-webkit-scrollbar-thumb': {
        borderRadius: 23,
        backgroundColor: theme.palette.misc.dark,
      },
    },

    '.doctors-no-clinic': {
      ...getTypography(theme, 16, 20),
      padding: theme.spacing(3, 3, 0),
      textAlign: 'left',
    },

    '.doctors-reembolso': {
      padding: theme.spacing(0, 3),
    },
  },
}));

export const StyledClinicCard = styled('div', {
  shouldForwardProp: prop => prop !== 'detailedLocation',
})<{ detailedLocation: boolean }>(({ theme, detailedLocation }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  width: '100%',
  backgroundColor: theme.palette.misc.light,
  borderRadius: theme.shape.borderRadius,

  '.clinic-top': {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),

    a: {
      ...getTypography(theme, 16, 20),
      color: theme.palette.text.primary,
      transition: theme.transitions.create('color'),
      textDecoration: 'none',
      fontWeight: 600,

      '&:hover': {
        color: theme.palette.primary.main,
      },

      '&:active': {
        color: theme.palette.primary.dark,
      },

      '&:focus-visible': {
        color: theme.palette.primary.main,
        outline: 'none',
      },
    },
  },

  '.clinic-image': {
    flexShrink: 0,
    position: 'relative',
    marginRight: theme.spacing(1.5),
    width: 40,
    height: 40,
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',

    img: {
      objectFit: 'cover',
    },
  },

  '.clinic-address': {
    ...getTypography(theme, 12, 16),
    marginBottom: theme.spacing(0.5),
    color: theme.palette.secondary.light,
  },

  '.clinic-metro': {
    ...getTypography(theme, 12, 16),

    color: theme.palette.text.secondary,
    padding: 0,

    li: {
      display: 'flex',
      alignItems: 'center',
    },

    span: {
      display: 'block',
      marginRight: 4,
      width: 6,
      height: 6,
      borderRadius: '50%',
    },
  },

  '.clinic-insurances': {
    display: 'flex',
    flexWrap: 'wrap',
    rowGap: theme.spacing(1),
    columnGap: theme.spacing(1),
    listStyle: 'none',
    margin: 0,
    marginTop: 'auto',
    padding: theme.spacing(2, 0, 0, 0),

    li: {
      cursor: 'pointer',
    },

    '.MuiAvatar-root': {
      ...getTypography(theme, 14, 18),
      backgroundColor: 'transparent',
      color: theme.palette.text.secondary,
      border: `1px solid ${theme.palette.misc.dark}`,
    },
  },

  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(3),
    backgroundColor: detailedLocation
      ? theme.palette.misc.light
      : 'transparent',
    borderRadius: detailedLocation ? theme.shape.borderRadius : 0,
    borderBottom: detailedLocation
      ? 'none'
      : `1px solid ${theme.palette.misc.dark}`,

    '&:last-child': {
      borderBottom: 'none',
    },
  },
}));
