import { alpha, Box, Dialog, styled } from '@mui/material';
import { getTypography } from '@/shared/assets';

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '.MuiPaper-root': {
    padding: theme.spacing(2.5, 0),
  },

  '.input-container': {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(0, 0, 1.5, 0),
    paddingRight: theme.spacing(1),
    minHeight: theme.spacing(7),
    backgroundColor: theme.palette.background.default,
    boxShadow: `0px 12px 24px ${alpha(theme.palette.text.primary, 0.04)}`,
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',

    '&:focus-within': {
      outline: `4px solid ${theme.palette.primary.light}`,
    },

    '& > svg': {
      position: 'absolute',
      left: 19,
      top: '50%',
      transform: 'translateY(-50%)',
      stroke: theme.palette.text.secondary,
    },

    '.MuiFormControl-root': {
      alignSelf: 'stretch',
      display: 'flex',
    },

    '.MuiInputBase-root::before, .MuiInputBase-root::after': {
      display: 'none',
    },
  },

  '.MuiInput-root': {
    height: '100%',

    input: {
      width: '100%',
      paddingLeft: theme.spacing(7),
      fontSize: 18,
      cursor: 'pointer',
    },
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
