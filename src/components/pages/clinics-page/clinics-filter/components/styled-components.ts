import { getTypography } from '@/shared/assets';
import { alpha, Dialog, FormGroup, styled, Typography } from '@mui/material';

export const StyledFiltersTop = styled('div')(({ theme }) => ({
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

export const StyledFiltersBody = styled('div')(({ theme }) => ({
  '.MuiTypography-h2': {
    ...getTypography(theme, 20, 26),
    fontWeight: 600,
  },

  '.filters-sort': {
    marginBottom: theme.spacing(2),
  },

  '.filters-total': {
    color: theme.palette.text.secondary,
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

    '.filters-sort': {
      display: 'flex',
      marginBottom: theme.spacing(3),
    },

    '.filters-total': {
      marginLeft: 'auto',
    },

    '.filters-result': {
      flexGrow: 1,
      minWidth: '66%',
    },

    '.filters-block': {
      minWidth: 210,
    },
  },

  [theme.breakpoints.up('lg')]: {
    '.filters-block': {
      minWidth: 250,
    },
  },
}));

export const StyledFiltersBlockTop = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
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

export const StyledFilterGroupTop = styled('div')(({ theme }) => ({
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
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(1.5),
  listStyle: 'none',
  padding: 0,
  margin: theme.spacing(0, -2),

  '.loader': {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 100,
    width: '100%',
    height: '100%',
    backgroundColor: alpha(theme.palette.background.default, 0.5),
  },

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
