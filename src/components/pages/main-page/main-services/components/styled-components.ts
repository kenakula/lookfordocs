import { Box, styled } from '@mui/material';
import { getTypography } from '@/shared/assets';

export const StyledInner = styled(Box)(({ theme }) => ({
  '.title': {
    marginBottom: theme.spacing(5),

    [theme.breakpoints.up('lmd')]: {
      marginBottom: theme.spacing(7),
    },
  },
}));

export const StyledList = styled('ul')(({ theme }) => ({
  display: 'grid',
  rowGap: theme.spacing(5),
  padding: 0,
  margin: 0,
  listStyle: 'none',
  justifyItems: 'center',

  [theme.breakpoints.up('lmd')]: {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
}));

export const StyledService = styled('li')(({ theme }) => ({
  padding: theme.spacing(0, 4, 3),
  maxWidth: 344,

  '.MuiTypography-h3': {
    ...getTypography(theme, 20, 26),
    marginBottom: theme.spacing(1.5),
    fontWeight: 600,
  },

  '.MuiTypography-body1': {
    ...getTypography(theme, 16, 20),
    color: theme.palette.text.secondary,
  },

  '.image-container': {
    position: 'relative',
    width: '100%',
    paddingBottom: '51.51%',
    marginBottom: theme.spacing(4),

    img: {
      objectFit: 'cover',
    },
  },

  [theme.breakpoints.up('lg')]: {
    paddingBottom: 0,
  },
}));
