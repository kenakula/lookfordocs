import { alpha, Box, styled } from '@mui/material';
import { getTypography } from '@/shared/assets';

export const StyledDialog = styled(Box, {
  shouldForwardProp: prop => prop !== 'fullscreenMode',
})<{ fullscreenMode?: boolean }>(({ theme, fullscreenMode }) => ({
  position: 'fixed',
  zIndex: theme.zIndex.drawer,
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
  },

  [theme.breakpoints.up('lmd')]: !fullscreenMode
    ? {
        position: 'absolute',
        top: 'calc(100% + 10px)',
        padding: theme.spacing(3, 4, 0),
        width: '100%',
        maxHeight: 400,
        borderRadius: theme.shape.borderRadius,
        boxShadow: `0px 12px 24px ${alpha(theme.palette.text.primary, 0.04)}`,
      }
    : {},
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

export const StyledDialogBody = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0, 0, 3),
}));
