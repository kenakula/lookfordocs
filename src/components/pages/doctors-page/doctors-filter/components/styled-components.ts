import { alpha, Box, Dialog, FormGroup, styled } from '@mui/material';
import { getTypography } from '@/shared/assets';

export const StyledInput = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  margin: theme.spacing(0, 0, 3, 0),
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

  input: {
    width: '100%',
    paddingLeft: theme.spacing(7),
    fontSize: 18,
    cursor: 'pointer',
  },

  [theme.breakpoints.up('lg')]: {
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: theme.spacing(4.5),

    '& > svg': {
      left: 32,
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

export const StyledFiltersTop = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(3),

  [theme.breakpoints.up('lmd')]: {
    margin: 0,

    '.filter-toggler': {
      display: 'none',
    },
  },
}));

export const StyledFiltersBody = styled(Box)(({ theme }) => ({
  '.filters-column': {
    display: 'none',
  },

  '.MuiTypography-h2': {
    ...getTypography(theme, 20, 26),
    fontWeight: 600,
    margin: theme.spacing(0, 0, 3, 0),
  },

  [theme.breakpoints.up('lmd')]: {
    display: 'grid',
    gridTemplateColumns: '2fr 3fr',
    columnGap: theme.spacing(4),

    '.filters-column': {
      display: 'block',
    },
  },
}));

export const StyledFilterGroup = styled(FormGroup)(({ theme }) => ({
  alignItems: 'flex-start',
  marginBottom: theme.spacing(4),

  '&:last-of-type': {
    marginBottom: 0,
  },

  '.MuiTypography-h3': {
    marginBottom: theme.spacing(1),
    ...getTypography(theme, 16, 20),
    fontWeight: 500,

    [theme.breakpoints.up('lmd')]: {
      ...getTypography(theme, 20, 24),
    },
  },

  '.MuiFormControlLabel-root': {
    margin: theme.spacing(0, 0, 0, -1),

    '&:hover': {
      '.MuiButtonBase-root': {
        span: {
          borderColor: theme.palette.text.secondary,
        },
      },
    },
  },

  '.MuiFormControlLabel-label': {
    marginLeft: theme.spacing(0.25),
    ...getTypography(theme, 14, 20),

    '&:first-letter': {
      textTransform: 'uppercase',
    },

    [theme.breakpoints.up('lmd')]: {
      ...getTypography(theme, 16, 20),
    },
  },

  '.MuiCollapse-root ': {
    marginBottom: theme.spacing(2),
  },

  '.MuiCollapse-wrapperInner': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flexStart',
  },

  '.collapse-button': {
    ...getTypography(theme, 14, 20),
    padding: 0,
    fontWeight: 400,
    textTransform: 'none',
    color: theme.palette.secondary.light,

    '&:hover': {
      background: 'none',
    },
  },
}));

export const StyledMobileFilter = styled(Dialog)(({ theme }) => ({
  header: {
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: theme.zIndex.appBar,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1.5, 2),
    // boxShadow: '0px 12px 24px rgba(7, 20, 48, 0.04)',

    '.MuiTypography-h2': {
      ...getTypography(theme, 20, 26),
      paddingRight: theme.spacing(2),
      fontWeight: 600,
    },

    '.MuiIconButton-root': {
      marginLeft: 'auto',
    },
  },

  '.filters-box': {
    padding: theme.spacing(0, 2, 8),
  },

  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: theme.spacing(1.5, 2),
  },
}));
