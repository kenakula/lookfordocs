import { alpha, Box, styled } from '@mui/material';
import { getTypography } from '@/shared/assets';

export const StyledDialog = styled(Box)(({ theme }) => ({
  position: 'fixed',
  zIndex: theme.zIndex.appBar,
  left: 0,
  top: 0,
  padding: theme.spacing(2),
  width: '100vw',
  height: '100vh',
  backgroundColor: theme.palette.background.default,

  '.input-container': {
    position: 'relative',
    display: 'flex',
    margin: theme.spacing(0, 0, 3, 0),
    paddingRight: theme.spacing(1),
    minHeight: theme.spacing(7),
    backgroundColor: theme.palette.background.default,
    boxShadow: `0px 12px 24px ${alpha(theme.palette.text.primary, 0.04)}`,
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    outline: `4px solid ${theme.palette.primary.light}`,

    '.MuiInput-root::before, .MuiInput-root::after': {
      display: 'none',
    },

    form: {
      display: 'flex',
      width: '100%',
    },
  },

  [theme.breakpoints.up('lmd')]: {
    zIndex: theme.zIndex.fab,
    position: 'absolute',
    top: 'calc(100% + 10px)',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(3, 4, 0),
    width: '100%',
    height: 'auto',
    minHeight: 72,
    maxHeight: 400,
    overflowY: 'auto',
    borderRadius: theme.shape.borderRadius,
    boxShadow: `0px 12px 24px ${alpha(theme.palette.text.primary, 0.04)}`,
  },
}));

export const StyledDialogHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2.5),

  '.MuiTypography-h2': {
    ...getTypography(theme, 20, 23),
    fontWeight: 600,
  },

  '.MuiIconButton-root': {
    color: theme.palette.text.primary,
  },
}));

export const StyledSearchResult = styled(Box)(({ theme }) => ({
  maxHeight: 320,
  overflowY: 'auto',

  '&::-webkit-scrollbar': {
    width: 5,
  },

  '&::-webkit-scrollbar-track': {
    backgroundColor: theme.palette.background.default,
  },

  '&::-webkit-scrollbar-thumb': {
    borderRadius: 23,
    backgroundColor: theme.palette.misc.light,
  },

  '.search-hint': {
    color: theme.palette.text.secondary,

    '&--error': {
      color: theme.palette.error.main,
    },
  },
}));

export const StyledResultList = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.misc.light}`,

  '&:last-child': {
    margin: 0,
    border: 'none',
  },

  '.MuiTypography-h3': {
    ...getTypography(theme, 14, 17),
    marginBottom: theme.spacing(2),
    color: alpha(theme.palette.text.primary, 0.4),
  },

  ul: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    rowGap: theme.spacing(2),
  },

  '.search-link': {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },

  '.complex-item': {
    display: 'flex',
    alignItems: 'center',

    '.MuiAvatar-root': {
      marginRight: theme.spacing(2),
    },
  },

  '.highlighted': {
    color: theme.palette.primary.main,
  },

  '.complex-item-info': {
    '.MuiTypography-body1': {
      ...getTypography(theme, 16, 19),
    },

    '.MuiTypography-caption': {
      ...getTypography(theme, 14, 17),
      color: theme.palette.text.secondary,
    },
  },
}));
