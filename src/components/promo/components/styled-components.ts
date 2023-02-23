import { Box, styled } from '@mui/material';

export const StyledPromoSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(4, 0, 2),

  '.title': {
    marginBottom: theme.spacing(1.5),
  },

  '.subtitle': {
    marginBottom: theme.spacing(2),
  },

  '.chips': {
    marginBottom: theme.spacing(5),
  },

  '.becas': {
    position: 'absolute',
    bottom: theme.spacing(8),
    right: 40,
    display: 'block',
    width: 86,
    height: 100,
    cursor: 'default',
    transform: 'scale(-1, 1)',

    [theme.breakpoints.up('lg')]: {
      bottom: 0,
      right: 290,
      width: 154,
      height: 179,
    },
  },

  [theme.breakpoints.up('lg')]: {
    position: 'relative',
    padding: theme.spacing(11, 0, 2),

    '.subtitle': {
      marginBottom: theme.spacing(4),
    },
  },
}));

export const StyledChips = styled('ul')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  listStyle: 'none',
  margin: 0,
  padding: theme.spacing(0, 17.5, 0, 0),
  columnGap: theme.spacing(1.5),
  rowGap: theme.spacing(1.5),
}));
