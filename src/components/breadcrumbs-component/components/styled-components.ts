import { alpha, Box, styled } from '@mui/material';

export const StyledBreadcrumbs = styled(Box)(({ theme }) => ({
  '.breadcrumb-link': {
    color: theme.palette.text.disabled,
    textDecoration: 'none',
    transition: theme.transitions.create('color'),

    '&:hover': {
      color: theme.palette.primary.main,
    },

    '&:active': {
      color: alpha(theme.palette.primary.main, 0.5),
    },

    '&:focus-visible': {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
      outline: 'none',
    },
  },

  '.MuiTypography-body1': {
    color: theme.palette.text.primary,
  },

  '.MuiBreadcrumbs-separator': {
    color: theme.palette.text.disabled,
  },
}));
