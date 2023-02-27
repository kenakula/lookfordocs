import { Checkbox, styled } from '@mui/material';

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
