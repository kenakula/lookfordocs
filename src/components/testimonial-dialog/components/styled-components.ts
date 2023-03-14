import { getTypography } from '@/shared/assets';
import { Box, Dialog, styled } from '@mui/material';

export const StyledTestimonialDialog = styled(Dialog)(({ theme }) => ({
  '.MuiContainer-root': {
    padding: theme.spacing(2),
  },

  [theme.breakpoints.up('lmd')]: {
    '.MuiContainer-root': {
      padding: 0,
    },

    '.MuiPaper-root': {
      padding: theme.spacing(4),
      maxWidth: 528,
    },
  },
}));

export const StyledDialogHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),

  '.MuiTypography-h3': {
    ...getTypography(theme, 20, 23),
    marginRight: 'auto',
    fontWeight: 600,
  },

  '.MuiButtonBase-root': {
    marginRight: theme.spacing(-1),
  },

  [theme.breakpoints.up('lmd')]: {
    paddingTop: 0,

    '.MuiTypography-h3': {
      ...getTypography(theme, 24, 28),
    },
  },
}));

export const StyledDialogBody = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(4),

  [theme.breakpoints.up('lmd')]: {
    rowGap: theme.spacing(2),
  },
}));

export const StyledRatingWrapper = styled(Box)(({ theme }) => ({
  '.MuiTypography-h4': {
    ...getTypography(theme, 16, 20),
    marginBottom: theme.spacing(2),
    fontWeight: 500,
  },

  '.MuiFormHelperText-root': {
    marginTop: theme.spacing(1),
    color: theme.palette.error.light,
  },

  [theme.breakpoints.up('lmd')]: {
    '.MuiTypography-h4': {
      ...getTypography(theme, 18, 24),
      marginBottom: theme.spacing(2),
    },
  },
}));
