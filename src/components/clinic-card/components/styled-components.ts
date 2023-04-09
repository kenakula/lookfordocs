import { getTypography } from '@/shared/assets';
import { styled, Typography } from '@mui/material';

export const StyledClinicsCard = styled('div', {
  shouldForwardProp: prop => prop !== 'detailedLocation',
})<{ detailedLocation: boolean }>(({ theme, detailedLocation }) => ({
  padding: detailedLocation ? 0 : theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,

  [theme.breakpoints.up('lg')]: {
    padding: 0,
    display: 'flex',

    '.clinic-card-subtitle': detailedLocation
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

    '.clinic-card-text': detailedLocation
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

    '.clinic-card-language': detailedLocation
      ? {
          span: {
            ...getTypography(theme, 14, 20),
          },
        }
      : {},
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

export const StyledCardSubtitle = styled(Typography)(({ theme }) => ({
  ...getTypography(theme, 12, 16),
  margin: theme.spacing(0, 0, 1, 0),
  color: theme.palette.secondary.light,

  [theme.breakpoints.up('lg')]: {
    marginBottom: theme.spacing(0.5),
  },
}));

export const ClinicCardInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  columnGap: theme.spacing(2.25),
  marginBottom: theme.spacing(1.5),

  '.mobile-image-container': {
    width: '40%',
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

export const StyledClinicRating = styled('div')(({ theme }) => ({
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

export const StyledClinics = styled('div', {
  shouldForwardProp: prop => prop !== 'maxListHeight',
})<{ maxListHeight: number }>(({ theme }) => ({
  '.doctors-reembolso': {
    ...getTypography(theme, 14, 20),
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary,
  },

  [theme.breakpoints.up('lg')]: {
    width: '32.21%',
    borderLeft: `1px solid ${theme.palette.misc.dark}`,
    flexShrink: 0,
    paddingRight: 4,
    paddingTop: 2,
    paddingBottom: 2,

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
    marginBottom: theme.spacing(1),

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
    padding: 0,

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

  '.clinics-reembolso': {
    ...getTypography(theme, 14, 20),
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary,
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
