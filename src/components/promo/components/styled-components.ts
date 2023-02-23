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

  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(11, 0, 2),

    '.subtitle': {
      marginBottom: theme.spacing(4),
    },
  },

  '.becas': {
    position: 'absolute',
    right: 33,
    button: 0,
    display: 'block',
    width: 86,
    height: 100,
    transform: 'translateY(-100%)',
    cursor: 'default',
  },
}));

export const StyledChips = styled('ul')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  listStyle: 'none',
  margin: 0,
  padding: 0,
  columnGap: theme.spacing(1.5),
  rowGap: theme.spacing(1.5),
}));
