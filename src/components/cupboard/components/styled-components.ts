import { Box, styled } from '@mui/material';

export const StyledLayoutSkeleton = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',

  '.MuiSkeleton-root': {
    transform: 'none',
  },

  '.header-skeleton': {
    height: 64,
  },

  '.breadcrumbs-skeleton': {
    marginTop: theme.spacing(1),
    width: 400,
    height: 24,
  },

  '.footer-skeleton': {
    height: 100,
  },

  [theme.breakpoints.up('lg')]: {
    '.header-skeleton': {
      height: 80,
    },
  },
}));

export const StyledDetailedDoctorSkeleton = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2, 0),

  '.doctor-card-skeleton': {
    display: 'flex',
    columnGap: theme.spacing(3),
    padding: theme.spacing(2, 0),
  },

  '.user-image-skeleton': {
    width: '40%',
  },

  '.user-info-skeleton': {
    flexGrow: 1,
  },
}));
