import { styled, Typography } from '@mui/material';

export const Subtitle = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(16),
  lineHeight: theme.typography.pxToRem(20),
  color: theme.palette.text.secondary,

  [theme.breakpoints.up('lg')]: {
    fontSize: theme.typography.pxToRem(20),
    lineHeight: theme.typography.pxToRem(26),
  },
}));
