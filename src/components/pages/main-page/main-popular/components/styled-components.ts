import { Box, styled } from '@mui/material';

export const StyledInner = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  margin: theme.spacing(0, -2),

  '.title': {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(0, 2),
  },

  [theme.breakpoints.up('lg')]: {
    '.title': {
      marginBottom: theme.spacing(4),
    },
  },
}));

export const StyledList = styled('ul', {
  shouldForwardProp: prop => prop !== 'gap',
})<{ gap: number }>(({ gap, theme }) => ({
  display: 'grid',
  rowGap: gap,
  margin: 0,
  padding: theme.spacing(0, 2),
  listStyle: 'none',

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '1fr 1fr',
    columnGap: theme.spacing(2),
  },

  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    columnGap: theme.spacing(3),
    rowGap: theme.spacing(3),
  },
}));

export const StyledButtonContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(0, 2),
}));

export const StyledCard = styled('li', {
  shouldForwardProp: prop => prop !== 'minHeight',
})<{ minHeight: number }>(({ theme, minHeight }) => ({
  borderRadius: theme.shape.borderRadius,

  '.MuiTypography-h3': {
    marginBottom: 'auto',
    fontSize: theme.typography.pxToRem(18),
    lineHeight: theme.typography.pxToRem(24),
    fontWeight: 500,
    color: theme.palette.text.primary,
  },

  '.MuiLink-root': {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2.5, 3),
    minHeight: minHeight,
    height: '100%',
    border: '1px solid transparent',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.misc.light,
    transition: theme.transitions.create('border-color'),

    '&:hover': {
      borderColor: theme.palette.misc.dark,
    },
    '&:active': {
      borderColor: theme.palette.text.disabled,
    },
    '&:focus': {
      outline: 'none',
      borderColor: 'transparent',
    },
  },

  '.MuiTypography-caption': {
    fontSize: theme.typography.pxToRem(16),
    lineHeight: theme.typography.pxToRem(20),
    color: theme.palette.secondary.light,
  },

  [theme.breakpoints.up('md')]: {
    '.MuiLink-root': {
      minHeight: 122,
    },
  },

  [theme.breakpoints.up('lg')]: {
    '&:focus-within': {
      outline: `4px solid ${theme.palette.primary.light}`,

      '.MuiLink-root:active': {
        borderColor: 'transparent',
      },
    },
  },
}));
