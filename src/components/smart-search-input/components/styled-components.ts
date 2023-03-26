import { alpha, Button, styled } from '@mui/material';

export const StyledSearchBox = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',

  '.input-container': {
    position: 'relative',
    display: 'flex',
    paddingRight: theme.spacing(1),
    minHeight: theme.spacing(7),
    backgroundColor: theme.palette.background.default,
    boxShadow: `0px 12px 24px ${alpha(theme.palette.text.primary, 0.04)}`,
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',

    form: {
      display: 'flex',
      width: '100%',
    },

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
    input: {
      width: '100%',
      paddingLeft: theme.spacing(7),
      fontSize: 18,
      cursor: 'pointer',
    },
  },

  [theme.breakpoints.up('lmd')]: {
    position: 'relative',
    flexDirection: 'row',
    padding: theme.spacing(0, 2, 0, 0),
    minHeight: theme.spacing(10),
    backgroundColor: theme.palette.background.default,
    boxShadow: `0px 12px 24px ${alpha('#071430', 0.04)}`,
    cursor: 'pointer',
    transition: theme.transitions.create(['box-shadow']),
    borderRadius: theme.shape.borderRadius,

    '&:hover': {
      boxShadow: `0px 16px 24px ${alpha('#071430', 0.04)}`,
    },

    '&:focus-within': {
      outline: `4px solid ${theme.palette.primary.light}`,
    },

    '.input-container': {
      flexGrow: 1,
      margin: 0,
      backgroundColor: 'transparent',
      boxShadow: 'none',
      paddingTop: 0,
      paddingBottom: 0,

      '&:focus-within': {
        outline: 'none',
      },

      '& > svg': {
        left: 32,
      },
    },

    '.MuiInput-root': {
      display: 'flex',

      input: {
        paddingLeft: theme.spacing(9),
        height: '100%',
      },
    },
  },
}));

export const StyledSearchButton = styled(Button)(({ theme }) => ({
  minHeight: theme.spacing(7),
  fontSize: theme.typography.pxToRem(18),
  lineHeight: theme.typography.pxToRem(24),
  fontWeight: 600,
  textTransform: 'none',
  backgroundColor: theme.palette.secondary.light,

  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
  },
  '&:active': {
    backgroundColor: theme.palette.secondary.dark,
  },
  '&:focus-visible': {
    outline: `4px solid ${theme.palette.primary.light}`,
  },
  '&.Mui-disabled': {
    backgroundColor: theme.palette.text.disabled,
    color: theme.palette.background.default,
  },

  [theme.breakpoints.up('lmd')]: {
    alignSelf: 'center',
    marginLeft: 'auto',
    maxWidth: 121,
    maxHeight: 56,
  },
}));
