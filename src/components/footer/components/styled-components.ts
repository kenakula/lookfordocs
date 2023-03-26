import { Box, styled } from '@mui/material';
import { getTypography } from '@/shared/assets';

export const StyledFooterInner = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0, 2.5),

  '.copyrights': {
    ...getTypography(theme, 12, 16),
    color: theme.palette.text.disabled,
  },

  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(8.8, 0, 8),

    '.copyrights': {
      order: -1,
      marginRight: 'auto',
      paddingRight: theme.spacing(5),
    },
  },
}));

export const StyledFooterTop = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',

  [theme.breakpoints.up('lmd')]: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
}));

export const StyledFooterInfo = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),

  [theme.breakpoints.up('lmd')]: {
    marginRight: 'auto',
    marginBottom: 0,
  },
}));

export const StyledFooterList = styled('ul')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  rowGap: theme.spacing(4),
  columnGap: theme.spacing(2),
  width: '100%',
  margin: theme.spacing(0, 0, 5, 0),
  padding: 0,
  listStyle: 'none',

  a: {
    ...getTypography(theme, 16, 20),
    color: theme.palette.text.primary,
    textDecoration: 'none',
    transition: theme.transitions.create('color'),

    '&.disabled': {
      pointerEvents: 'none',
      cursor: 'default',
      opacity: 0.2,
    },

    '&:hover': {
      color: theme.palette.primary.main,
    },

    '&:active': {
      color: theme.palette.primary.dark,
    },

    '&:focus-visible': {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
      outline: 'none',
    },
  },

  [theme.breakpoints.up('lmd')]: {
    gridTemplateColumns: '1fr 1fr 1fr',
    rowGap: theme.spacing(2.5),
    columnGap: theme.spacing(2),
    margin: 0,
    maxWidth: '60%',
  },

  [theme.breakpoints.up('lg')]: {
    maxWidth: 'none',
    width: 'auto',
    columnGap: theme.spacing(11.25),
  },
}));

export const StyledFooterDocuments = styled('ul')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(3),
  margin: theme.spacing(0, 0, 4, 0),
  padding: 0,
  listStyle: 'none',

  a: {
    ...getTypography(theme, 12, 16),
    color: theme.palette.text.primary,
    textDecoration: 'none',
    transition: theme.transitions.create('color'),

    '&.disabled': {
      pointerEvents: 'none',
      cursor: 'default',
      opacity: 0.2,
    },

    '&:hover': {
      color: theme.palette.primary.main,
    },

    '&:active': {
      color: theme.palette.primary.dark,
    },

    '&:focus-visible': {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
      outline: 'none',
    },
  },

  [theme.breakpoints.up('lg')]: {
    flexDirection: 'row',
    rowGap: 0,
    columnGap: theme.spacing(5),
    margin: 0,
  },
}));

export const StyledFooterBottom = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(5),
  borderTop: `1px solid ${theme.palette.misc.dark}`,

  [theme.breakpoints.up('lg')]: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(2.5),
  },
}));
