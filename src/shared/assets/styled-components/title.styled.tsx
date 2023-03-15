import { styled, Typography } from '@mui/material';

export const Title = styled(Typography, {
  shouldForwardProp: prop => prop !== 'minor',
})<{ minor?: boolean }>(({ theme, minor }) => ({
  fontSize: theme.typography.pxToRem(minor ? 20 : 28),
  lineHeight: theme.typography.pxToRem(minor ? 26 : 32),
  fontWeight: 600,

  '.highlighted': {
    display: 'inline-flex',
    marginRight: theme.spacing(1),
    padding: theme.spacing(0, 0.5),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.light,

    '&:last-of-type': {
      marginRight: 0,
    },
  },

  [theme.breakpoints.up('lmd')]: {
    fontSize: theme.typography.pxToRem(minor ? 24 : 34),
    lineHeight: theme.typography.pxToRem(minor ? 28 : 36),
  },

  [theme.breakpoints.up('lg')]: {
    fontSize: theme.typography.pxToRem(minor ? 32 : 48),
    lineHeight: theme.typography.pxToRem(minor ? 40 : 58),

    '.highlighted': {
      padding: theme.spacing(0, 1),
    },
  },
}));
