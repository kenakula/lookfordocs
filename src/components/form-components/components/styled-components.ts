import { Box, Checkbox, Input, styled } from '@mui/material';
import { getTypography } from '@/shared/assets';

export const CheckboxIcon = styled('span', { label: 'unchecked' })(
  ({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    width: 18,
    height: 18,
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.text.disabled}`,
    transition: theme.transitions.create('border-color'),
  }),
);

export const CheckboxCheckedIcon = styled(CheckboxIcon, { label: 'checked' })(
  ({ theme }) => ({
    borderColor: 'transparent',
    backgroundColor: theme.palette.primary.main,

    '&:before': {
      display: 'block',
      width: 18,
      height: 18,
      content: '""',
      backgroundPosition: '-1px -1px',
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 8.5L7.5 12L14.5 5' stroke='white' stroke-width='1.5'/%3E%3C/svg%3E%0A\")",
    },
  }),
);

export const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  marginRight: theme.spacing(0.25),
}));

export const StyledInputWrapper = styled(Box)(({ theme }) => ({
  '.MuiFormHelperText-root': {
    color: theme.palette.error.light,
  },
}));

export const StyledInputLabel = styled('label')(({ theme }) => ({
  ...getTypography(theme, 16, 20),
  display: 'block',
  marginBottom: theme.spacing(2),
  fontWeight: 500,

  [theme.breakpoints.up('lmd')]: {
    ...getTypography(theme, 18, 24),
  },
}));

export const StyledInputComponent = styled(Input, {
  shouldForwardProp: prop => prop !== 'limit',
})<{ limit?: number }>(({ theme, color, limit, value }) => {
  const textLength = limit ? limit - (value as string).length : 0;
  let counterColor = theme.palette.text.disabled;

  if (textLength < 20 && textLength >= 0) {
    counterColor = theme.palette.warning.light;
  }

  if (textLength < 0) {
    counterColor = theme.palette.error.main;
  }

  return {
    ...getTypography(theme, 16, 20),
    display: 'flex',
    padding: 0,
    border: `1px solid ${
      color === 'error' ? theme.palette.error.light : theme.palette.misc.light
    }`,
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.secondary,

    '&:hover': {
      '&::before': {
        border: 'none !important',
      },
    },

    '&::before, &::after': {
      display: 'none',
    },

    '&::before': limit
      ? {
          ...getTypography(theme, 12, 16),
          left: 'auto',
          right: 7,
          bottom: 3,
          display: 'inline-block',
          content: `"${textLength}"`,
          border: 'none',
          color: counterColor,
        }
      : {},

    input: {
      padding: theme.spacing(0, 2),
      minHeight: 48,
    },

    textarea: {
      padding: theme.spacing(2),
      minHeight: 120,
    },

    [theme.breakpoints.up('lmd')]: {
      input: {
        minHeight: 56,
      },
    },
  };
});
