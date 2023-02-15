import { alpha, Box, styled } from '@mui/material';

export const StyledInner = styled(Box)(({ theme }) => ({
  '.title': {
    marginBottom: theme.spacing(2),
  },

  '.subtitle': {
    marginBottom: theme.spacing(4),
  },

  '.MuiCollapse-root': {
    margin: theme.spacing(0, -3),
    padding: theme.spacing(0, 3),
  },
}));

export const StyledList = styled('ul', {
  shouldForwardProp: prop => prop !== 'gap',
})<{ gap: number }>(({ gap, theme }) => ({
  display: 'grid',
  rowGap: gap,
  padding: 0,
  margin: 0,
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

  '.button-link': {
    '&:hover': {
      borderColor: theme.palette.text.disabled,
      backgroundColor: 'transparent',
    },

    '&:focus-visible': {
      outline: `4px solid ${theme.palette.primary.light}`,
      borderColor: 'transparent',
    },
  },

  [theme.breakpoints.up('md')]: {
    display: 'flex',
    justifyContent: 'center',

    '.button-link': {
      minHeight: 48,
      borderColor: theme.palette.misc.light,
      fontSize: theme.typography.pxToRem(16),
      lineHeight: theme.typography.pxToRem(20),
      fontWeight: 600,
      textTransform: 'none',
      color: theme.palette.text.primary,

      [theme.breakpoints.up('md')]: {
        minWidth: 159,
      },
    },
  },

  [theme.breakpoints.up('lg')]: {
    marginTop: theme.spacing(5),
  },
}));

export const StyledCard = styled('li', {
  shouldForwardProp: prop => prop !== 'minHeight',
})<{ minHeight: number }>(({ theme, minHeight }) => ({
  position: 'relative',
  display: 'flex',
  minHeight: minHeight,
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.background.default,
  boxShadow: `0px 4px 16px ${alpha(theme.palette.text.primary, 0.04)}`,
  transition: theme.transitions.create(['box-shadow', 'border-color']),

  '.MuiLink-root': {
    flexGrow: 1,
    position: 'relative',
    display: 'block',
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius,

    img: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: 200,
      height: 'auto',
      transform: 'translate(-50%, -50%)',
    },
  },

  [theme.breakpoints.up('lg')]: {
    border: `1px solid transparent`,

    '.MuiLink-root': {
      img: {
        width: 160,
      },
    },

    '&:hover': {
      boxShadow: `0px 8px 16px ${alpha(theme.palette.text.primary, 0.08)}`,
    },

    '&:active': {
      border: `1px solid ${theme.palette.text.disabled}`,
    },

    '&:focus-within': {
      outline: `4px solid ${theme.palette.primary.light}`,

      '.MuiLink-root': {
        outline: 'none',
      },
    },
  },
}));
