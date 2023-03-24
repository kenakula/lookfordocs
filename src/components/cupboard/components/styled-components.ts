import { styled } from '@mui/material';

export const StyledLayoutSkeleton = styled('div')(({ theme }) => ({
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

export const StyledDetailedDoctorSkeleton = styled('div')(({ theme }) => ({
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

export const StyledDetailedClinicSkeleton = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2, 0),

  '.clinic-card-skeleton': {
    display: 'flex',
    columnGap: theme.spacing(3),
    padding: theme.spacing(2, 0),
  },

  '.clinic-image-skeleton': {
    width: '40%',
  },

  '.clinic-info-skeleton': {
    flexGrow: 1,
  },
}));

export const StyledFilterSkeleton = styled('div')(({ theme }) => ({
  width: '100%',

  '.MuiSkeleton-root': {
    width: '100%',
    transform: 'none',
  },

  '& + .MuiSkeleton-root': {
    marginTop: theme.spacing(1),
  },
}));
