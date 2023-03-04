import {
  alpha,
  Box,
  Dialog,
  FormGroup,
  styled,
  Typography,
} from '@mui/material';
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
  marginBottom: theme.spacing(3),

  '.filter-toggler': {
    display: 'block',
    width: '100%',
  },

  '.input-container': {
    marginBottom: theme.spacing(3),
  },

  [theme.breakpoints.up('lmd')]: {
    '.filter-toggler': {
      display: 'none',
    },

    '.input-container': {
      marginBottom: 0,
    },
  },
}));

export const StyledFiltersBody = styled(Box)(({ theme }) => ({
  '.MuiTypography-h2': {
    ...getTypography(theme, 20, 26),
    fontWeight: 600,
  },

  '.MuiSkeleton-root': {
    width: '100%',
    transform: 'none',

    '& + .MuiSkeleton-root': {
      marginTop: theme.spacing(1),
    },
  },

  [theme.breakpoints.up('lmd')]: {
    display: 'flex',
    columnGap: theme.spacing(2),

    '.filters-result': {
      width: '60%',
      flexGrow: 1,
    },

    '.filters-block': {
      width: `calc(40% - ${theme.spacing(2)})`,
    },
  },

  [theme.breakpoints.up('lg')]: {
    '.filters-result': {
      width: '75%',
    },

    '.filters-block': {
      width: `calc(25% - ${theme.spacing(2)})`,
    },
  },
}));

export const StyledFiltersBlockTop = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(3),
}));

export const StyledFilterGroup = styled(FormGroup)(({ theme }) => ({
  alignItems: 'flex-start',
  marginBottom: theme.spacing(4),

  '&:last-of-type': {
    marginBottom: 0,
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

export const StyledFilterGroupTop = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),

  '.filters-counter': {
    display: 'none',
  },

  '.MuiTypography-h3': {
    ...getTypography(theme, 16, 20),
    fontWeight: 500,
  },

  [theme.breakpoints.up('lmd')]: {
    '.filters-counter': {
      display: 'flex',
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

    '.filters-counter': {
      marginRight: theme.spacing(1),
    },

    '.MuiTypography-h2': {
      ...getTypography(theme, 20, 26),
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

export const FilterResultList = styled('ul')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(1.5),
  listStyle: 'none',
  padding: 0,
  margin: theme.spacing(0, -2),

  [theme.breakpoints.up('lmd')]: {
    margin: 0,
  },

  [theme.breakpoints.up('lg')]: {
    rowGap: theme.spacing(2),
  },
}));

export const FilterEmptyResult = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.disabled,
}));
