import {
  Box,
  Checkbox,
  FormControl,
  Input,
  Radio,
  styled,
} from '@mui/material';
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

export const StyledRadioWrapper = styled(FormControl)(({ theme }) => ({
  '.MuiFormLabel-root': {
    ...getTypography(theme, 16, 20),
    marginBottom: theme.spacing(1.5),
    fontWeight: 500,
    color: theme.palette.text.primary,

    '&.Mui-focused': {
      color: theme.palette.text.primary,
    },
  },
}));

export const StyledRadioButton = styled(Radio)(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
  paddingTop: 0,
  paddingBottom: 0,

  svg: {
    color: theme.palette.secondary.light,
  },
}));

export const StyledInputWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',

  '.MuiFormHelperText-root': {
    position: 'absolute',
    bottom: -22,
    left: 0,
    color: theme.palette.error.light,
  },

  '.phone-input .invalid-number-message': {
    display: 'none',
  },

  '.form-control.phone-input__input': {
    paddingLeft: 60,
    width: '100%',
    minHeight: 48,
    color: theme.palette.text.secondary,
    borderColor: theme.palette.misc.light,
    borderRadius: theme.shape.borderRadius,

    '&.invalid-number': {
      borderColor: theme.palette.error.main,
      backgroundColor: 'transparent',
    },
  },

  '.flag-dropdown.phone-input__btn': {
    borderColor: theme.palette.misc.light,

    '.selected-flag': {
      width: 50,
      borderRadius: `${theme.shape.borderRadius}px 0 0 ${theme.shape.borderRadius}px`,

      '.flag': {
        left: 15,
      },
    },
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
  shouldForwardProp: prop => !['limit', 'minHeight'].includes(prop.toString()),
})<{ limit?: number; minHeight?: number }>(
  ({ theme, color, limit, value, minHeight }) => {
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
      // TODO унифицировать тени
      // boxShadow: '0px 4px 16px rgba(7, 20, 48, 0.04)',

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
        minHeight: minHeight ?? 120,
        boxSizing: 'border-box',
      },

      [theme.breakpoints.up('lmd')]: {
        input: {
          minHeight: 56,
        },
      },
    };
  },
);
