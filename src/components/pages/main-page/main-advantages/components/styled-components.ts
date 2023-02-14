import { Box, styled } from '@mui/material';
import { getTypography } from '@/shared/assets';

export const StyledInner = styled(Box)(({ theme }) => ({
  '.title': {
    marginBottom: theme.spacing(6),
  },
}));

export const StyledList = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

export const StyledListItem = styled('li')(({ theme }) => ({
  padding: theme.spacing(2, 0),
  marginBottom: theme.spacing(4),

  '&:last-child': {
    marginBottom: 0,
  },

  [theme.breakpoints.up('md')]: {
    margin: '0 auto',
    maxWidth: '70%',
  },

  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    maxWidth: '100%',
    marginBottom: 160,
    paddingBottom: 0,

    '&:nth-of-type(odd)': {
      '.image-container': {
        order: 1,
      },
    },
  },
}));

export const StyledInfoContainer = styled(Box)(({ theme }) => ({
  '.MuiTypography-h3': {
    marginBottom: theme.spacing(1.5),
  },

  '.MuiTypography-body1': {
    color: theme.palette.text.secondary,
  },

  [theme.breakpoints.up('lg')]: {
    '.MuiTypography-root': {
      textAlign: 'left',
    },

    '.MuiTypography-h3': {
      marginBottom: theme.spacing(3),
    },

    '.MuiTypography-body1': {
      ...getTypography(theme, 20, 26),
    },
  },
}));

export const StyledImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(4),
  paddingBottom: '41.76%',
  maxWidth: '100%',

  img: {
    position: 'absolute',
    left: 0,
    top: 0,
    maxWidth: '100%',
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  },

  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    marginBottom: 0,
    paddingBottom: '20.67%',
    width: 527,
  },
}));
