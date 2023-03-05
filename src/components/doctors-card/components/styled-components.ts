import { Box, styled, Typography } from '@mui/material';
import { getTypography } from '@/shared/assets';

export const StyledDoctorsCard = styled(Box, {
  shouldForwardProp: prop => prop !== 'multipleClinics',
})<{ multipleClinics: boolean }>(({ theme, multipleClinics }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,

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
  },
}));

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

export const StyledCardBody = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),

  '& > .doctor-card-specialties': {
    marginBottom: theme.spacing(2),
  },

  [theme.breakpoints.up('lg')]: {
    marginBottom: 0,
    padding: theme.spacing(3, 3, 4, 3),
    display: 'flex',
    flexGrow: 1,
  },
}));

export const DoctorCardInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  columnGap: theme.spacing(2.25),
  marginBottom: theme.spacing(1.5),

  [theme.breakpoints.up('lg')]: {
    flexDirection: 'column',
    marginRight: theme.spacing(3),
    width: '26.66%',
    flexShrink: 0,
  },
}));

export const DoctorsCardTextsBlock = styled(Box)({});

export const StyledImage = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  width: '36.6%',

  a: {
    position: 'relative',
    paddingBottom: '136.66%',
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
  },

  img: {
    display: 'block',
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },

  [theme.breakpoints.up('lg')]: {
    width: '100%',
  },
}));

export const StyledInfo = styled(Box)(({ theme }) => ({
  flexGrow: 1,

  '.MuiTypography-h3': {
    ...getTypography(theme, 18, 24),
    marginBottom: theme.spacing(0.75),

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

export const StyledGlobalServices = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(1.5),

  ul: {
    padding: 0,
    listStyle: 'none',
    display: 'flex',
    flexWrap: 'wrap',
    columnGap: theme.spacing(1),
    rowGap: theme.spacing(1),
  },

  li: {
    display: 'flex',
    flexShrink: 0,
    width: 32,
    height: 32,
    borderRadius: '50%',
    backgroundColor: theme.palette.misc.main,
    cursor: 'pointer',

    span: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },

    svg: {
      fill: 'transparent',
      width: 16,
      height: 16,
      pointerEvents: 'none',
    },
  },
}));

export const StyledText = styled(Typography)(({ theme }) => ({
  ...getTypography(theme, 12, 16),
  marginBottom: theme.spacing(1.5),
  color: theme.palette.text.secondary,
  display: '-webkit-box',
  WebkitLineClamp: '4',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
}));

export const StyleSevices = styled(Box)(({ theme }) => ({
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

export const StyledLanguages = styled(Box)(({ theme }) => ({
  '.MuiTypography-caption': {
    ...getTypography(theme, 12, 16),
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0.5),
  },

  ul: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },

  li: {
    ...getTypography(theme, 12, 16),
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0.5),

    '&:last-child': {
      marginBottom: 0,
    },

    '.icon': {
      display: 'inline-flex',
      alignItems: 'center',
      marginRight: 6,

      svg: {
        width: 14,
        height: 16,
      },
    },
  },

  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    alignItems: 'center',

    '.MuiTypography-caption': {
      margin: theme.spacing(0, 1.5, 0, 0),
    },

    ul: {
      display: 'flex',
      alignItems: 'center',
      columnGap: theme.spacing(1.5),
    },

    li: {
      marginBottom: 0,
    },
  },
}));

export const StyledClinics = styled(Box, {
  shouldForwardProp: prop => prop !== 'maxListHeight',
})<{ maxListHeight: number }>(({ theme, maxListHeight }) => ({
  '.doctors-no-clinic': {
    ...getTypography(theme, 14, 20),
    color: theme.palette.text.disabled,
    textAlign: 'center',
  },

  [theme.breakpoints.up('lg')]: {
    width: '32.21%',
    borderLeft: `1px solid ${theme.palette.misc.light}`,
    flexShrink: 0,
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
        backgroundColor: theme.palette.misc.light,
      },
    },

    '.doctors-no-clinic': {
      ...getTypography(theme, 16, 20),
      paddingTop: theme.spacing(3),
    },
  },
}));

export const StyledClinicCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  width: '100%',
  backgroundColor: theme.palette.misc.dark,
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
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
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
      border: `1px solid ${theme.palette.misc.light}`,
    },
  },

  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(3),
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderBottom: `1px solid ${theme.palette.misc.light}`,

    '&:last-child': {
      borderBottom: 'none',
    },
  },
}));
