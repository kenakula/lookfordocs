import { getTypography } from '@/shared/assets';
import { styled } from '@mui/material';

export const StyledPartnersPageWrapper = styled('section')(({ theme }) => ({
  paddingTop: theme.spacing(3),

  '.MuiTypography-h2': {
    marginBottom: theme.spacing(1.5),

    [theme.breakpoints.up('lg')]: {
      textAlign: 'left',
    },
  },

  '.MuiTypography-body1': {
    marginBottom: theme.spacing(3),
    color: theme.palette.text.secondary,

    [theme.breakpoints.up('lg')]: {
      ...getTypography(theme, 20, 26),
      textAlign: 'left',
      maxWidth: 609,
    },
  },
}));

export const StyledPartnersPageTabs = styled('div')(({ theme }) => ({
  maxWidth: 464,
  margin: '0 auto',

  '.partners-tabs-list': {
    marginBottom: theme.spacing(3),
  },

  [theme.breakpoints.up('lg')]: {
    margin: 0,
  },
}));

export const StyledPartnersPanels = styled('div')(({ theme }) => ({
  paddingBottom: theme.spacing(5),
}));

export const StyledPartnersForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(3.5),
}));
